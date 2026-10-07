import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { Product } from "@/data/catalog";
import cadernos from "@/assets/p-cadernos.jpg";
import escrita from "@/assets/p-escrita.jpg";
import eletronicos from "@/assets/p-eletronicos.jpg";
import almofadas from "@/assets/p-almofadas.jpg";
import casa from "@/assets/p-casa.jpg";
import presentes from "@/assets/p-presentes.jpg";
import estojos from "@/assets/p-estojos.jpg";
import enfeites from "@/assets/p-enfeites.jpg";
import decoracao from "@/assets/categoria-decoracao.jpg";
import utilidades from "@/assets/categoria-utilidades.jpg";
import papelaria from "@/assets/categoria-papelaria.jpg";

// imagem_url may hold a local photo key or a full https URL.
const localImages: Record<string, string> = {
  "p-cadernos": cadernos, "p-escrita": escrita, "p-eletronicos": eletronicos, "p-almofadas": almofadas,
  "p-casa": casa, "p-presentes": presentes, "p-estojos": estojos, "p-enfeites": enfeites,
  "categoria-decoracao": decoracao, "categoria-utilidades": utilidades, "categoria-papelaria": papelaria,
};
const resolveImage = (v: string | null) => (v && (localImages[v] ?? (v.startsWith("http") ? v : null))) || papelaria;

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("produtos")
    .select("id,nome,descricao,preco,preco_promocional,imagem_url,destaque,oferta,novidade,criado_em,categorias(nome)")
    .order("criado_em");
  if (error) throw error;
  return (data ?? []).map((r) => {
    const promo = r.preco_promocional != null ? Number(r.preco_promocional) : null;
    return {
      id: r.id, name: r.nome, description: r.descricao,
      category: (r.categorias?.nome ?? "Papelaria") as Product["category"],
      price: promo ?? Number(r.preco),
      oldPrice: promo != null && r.oferta ? Number(r.preco) : undefined,
      image: resolveImage(r.imagem_url), featured: r.destaque, isNew: r.novidade,
    };
  });
}

const isUuid = (s: string) => /^[0-9a-f-]{36}$/i.test(s);

/** Records an interest order before the WhatsApp redirect. Never blocks the user. */
export async function registerOrder(productId: string) {
  if (!isUuid(productId)) return;
  const pedidoId = crypto.randomUUID();
  const { error } = await supabase.from("pedidos").insert({ id: pedidoId });
  if (error) return console.error("pedido", error);
  const { error: e2 } = await supabase.from("itens_pedido").insert({ pedido_id: pedidoId, produto_id: productId, quantidade: 1 });
  if (e2) console.error("itens_pedido", e2);
}
