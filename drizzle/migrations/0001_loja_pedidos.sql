CREATE TABLE public.categorias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  slug text NOT NULL UNIQUE,
  criada_em timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.produtos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  categoria_id uuid NOT NULL REFERENCES public.categorias(id) ON DELETE RESTRICT,
  nome text NOT NULL,
  descricao text NOT NULL DEFAULT '',
  preco numeric(10,2) NOT NULL CHECK (preco >= 0),
  preco_promocional numeric(10,2) CHECK (preco_promocional >= 0),
  imagem_url text,
  destaque boolean NOT NULL DEFAULT false,
  oferta boolean NOT NULL DEFAULT false,
  novidade boolean NOT NULL DEFAULT false,
  criado_em timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX produtos_categoria_idx ON public.produtos(categoria_id);
CREATE TABLE public.pedidos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_nome text,
  cliente_whatsapp text,
  status text NOT NULL DEFAULT 'interesse' CHECK (status IN ('interesse','confirmado','concluido','cancelado')),
  valor_total numeric(10,2) NOT NULL DEFAULT 0,
  criado_em timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.itens_pedido (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id uuid NOT NULL REFERENCES public.pedidos(id) ON DELETE CASCADE,
  produto_id uuid NOT NULL REFERENCES public.produtos(id) ON DELETE RESTRICT,
  quantidade integer NOT NULL DEFAULT 1 CHECK (quantidade > 0 AND quantidade <= 100),
  preco_unitario numeric(10,2) NOT NULL DEFAULT 0
);
CREATE INDEX itens_pedido_pedido_idx ON public.itens_pedido(pedido_id);
CREATE INDEX itens_pedido_produto_idx ON public.itens_pedido(produto_id);

GRANT SELECT ON public.categorias, public.produtos TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.categorias, public.produtos TO authenticated;
GRANT INSERT ON public.pedidos, public.itens_pedido TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.pedidos, public.itens_pedido TO authenticated;
GRANT ALL ON public.categorias, public.produtos, public.pedidos, public.itens_pedido TO service_role;

ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itens_pedido ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos leem categorias" ON public.categorias FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin gerencia categorias" ON public.categorias FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Todos leem produtos" ON public.produtos FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin gerencia produtos" ON public.produtos FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Visitantes registram pedidos" ON public.pedidos FOR INSERT TO anon, authenticated WITH CHECK (status = 'interesse' AND valor_total = 0);
CREATE POLICY "Admin gerencia pedidos" ON public.pedidos FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Visitantes registram itens" ON public.itens_pedido FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admin gerencia itens" ON public.itens_pedido FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Preço unitário vem sempre do cadastro do produto, e o total do pedido é recalculado.
CREATE OR REPLACE FUNCTION public.itens_pedido_preco() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  SELECT COALESCE(preco_promocional, preco) INTO NEW.preco_unitario FROM produtos WHERE id = NEW.produto_id;
  RETURN NEW;
END $$;
CREATE TRIGGER trg_itens_pedido_preco BEFORE INSERT ON public.itens_pedido FOR EACH ROW EXECUTE FUNCTION public.itens_pedido_preco();

CREATE OR REPLACE FUNCTION public.pedidos_recalcular_total() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE pedidos SET valor_total = (SELECT COALESCE(SUM(quantidade * preco_unitario),0) FROM itens_pedido WHERE pedido_id = NEW.pedido_id) WHERE id = NEW.pedido_id;
  RETURN NEW;
END $$;
CREATE TRIGGER trg_pedidos_total AFTER INSERT ON public.itens_pedido FOR EACH ROW EXECUTE FUNCTION public.pedidos_recalcular_total();
REVOKE EXECUTE ON FUNCTION public.itens_pedido_preco(), public.pedidos_recalcular_total() FROM anon, authenticated, public;