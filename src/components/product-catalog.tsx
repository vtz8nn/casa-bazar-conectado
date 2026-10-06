import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Search, Sparkles, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { catalog as fallbackCatalog, brl, type Product } from "@/data/catalog";
import { fetchProducts, registerOrder } from "@/lib/store-db";

const waLink = (p: Product) =>
  `https://wa.me/5521983443183?text=${encodeURIComponent(`Olá! Vi o site da Guilherme Bazar e Papelaria e tenho interesse no produto: ${p.name} (${brl(p.price)}).`)}`;

const CATS = ["Todos", "Papelaria", "Utilidades", "Decoração", "Presentes"];

function Card({ p, onOpen }: { p: Product; onOpen: (p: Product) => void }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-card)]">
      <button onClick={() => onOpen(p)} className="relative aspect-square overflow-hidden" aria-label={`Ver detalhes de ${p.name}`}>
        <img src={p.image} alt={p.name} loading="lazy" width={816} height={816} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-2 top-2 flex flex-col gap-1">
          {p.oldPrice && <span className="rounded-sm bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">Oferta</span>}
          {p.isNew && <span className="rounded-sm bg-background/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">Novo</span>}
        </span>
      </button>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">{p.category}</p>
        <button onClick={() => onOpen(p)} className="mt-1 text-left font-display text-base font-semibold leading-snug sm:text-xl">{p.name}</button>
        <div className="mt-auto pt-3">
          {p.oldPrice && <p className="text-xs text-muted-foreground line-through">{brl(p.oldPrice)}</p>}
          <p className="font-display text-xl font-semibold text-primary sm:text-2xl">{brl(p.price)}</p>
          <div className="mt-3 grid gap-2">
            <Button variant="warm" size="sm" asChild><a href={waLink(p)} target="_blank" rel="noreferrer" onClick={() => void registerOrder(p.id)}>Tenho interesse</a></Button>
            <Button variant="soft" size="sm" asChild><a href={waLink(p)} target="_blank" rel="noreferrer" onClick={() => void registerOrder(p.id)}><MessageCircle /> WhatsApp</a></Button>
          </div>
        </div>
      </div>
    </article>
  );
}

const Grid = ({ items, onOpen }: { items: Product[]; onOpen: (p: Product) => void }) => (
  <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{items.map((p) => <Card key={p.id} p={p} onOpen={onOpen} />)}</div>
);

export function ProductCatalog({ filter, setFilter }: { filter: string; setFilter: (f: string) => void }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Product | null>(null);
  const [catalog, setCatalog] = useState<Product[]>(fallbackCatalog);
  useEffect(() => {
    fetchProducts().then((rows) => rows.length && setCatalog(rows)).catch((e) => console.error("produtos", e));
  }, []);
  const active = CATS.includes(filter) ? filter : "Todos";

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return catalog.filter((p) => (active === "Todos" || p.category === active) && (!term || `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(term)));
  }, [q, active, catalog]);

  return (
    <>
      <section id="produtos" className="section-pad reveal"><div className="shell">
        <div className="max-w-2xl"><p className="eyebrow">Seleção da loja</p><h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">Produtos em destaque</h2><p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">Alguns dos itens que você encontra na nossa loja.</p></div>
        <Grid items={catalog.filter((p) => p.featured).slice(0, 8)} onOpen={setOpen} />
      </div></section>

      <section id="ofertas" className="section-pad reveal bg-secondary"><div className="shell">
        <p className="eyebrow flex items-center gap-2"><Tag className="size-4" /> Ofertas</p>
        <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Preços especiais</h2>
        <Grid items={catalog.filter((p) => p.oldPrice)} onOpen={setOpen} />
      </div></section>

      <section id="novidades" className="section-pad reveal"><div className="shell">
        <p className="eyebrow flex items-center gap-2"><Sparkles className="size-4" /> Novidades</p>
        <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Acabaram de chegar</h2>
        <Grid items={catalog.filter((p) => p.isNew)} onOpen={setOpen} />
      </div></section>

      <section id="loja" className="section-pad reveal bg-card"><div className="shell">
        <p className="eyebrow">Nossa Loja</p>
        <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Vitrine completa</h2>
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Pesquisar produtos..." aria-label="Pesquisar produtos" className="h-11 w-full rounded-md border border-border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary" />
          </label>
          <div className="flex max-w-full gap-2 overflow-x-auto pb-1">{CATS.map((c) => <Button key={c} size="sm" variant={active === c ? "warm" : "soft"} onClick={() => setFilter(c)}>{c}</Button>)}</div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{results.length} produto(s) encontrado(s)</p>
        {results.length ? <Grid items={results} onOpen={setOpen} /> : <div className="mt-8 rounded-lg border border-border bg-background p-10 text-center"><p className="font-display text-2xl">Nenhum produto encontrado</p><p className="mt-2 text-sm text-muted-foreground">Fale conosco pelo WhatsApp para consultar.</p></div>}
        <p className="mt-6 text-xs text-muted-foreground">* Fotos ilustrativas. Preços e disponibilidade podem variar — confirme pelo WhatsApp.</p>
      </div></section>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-3xl">
          {open && <div className="grid gap-6 sm:grid-cols-2">
            <img src={open.image} alt={open.name} width={816} height={816} className="aspect-square w-full rounded-md object-cover" />
            <div className="flex flex-col">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">{open.category}</p>
              <DialogTitle className="mt-2 font-display text-3xl font-semibold">{open.name}</DialogTitle>
              <DialogDescription className="mt-3 text-sm leading-6">{open.description}</DialogDescription>
              {open.oldPrice && <p className="mt-5 text-sm text-muted-foreground line-through">{brl(open.oldPrice)}</p>}
              <p className="font-display text-3xl font-semibold text-primary">{brl(open.price)}</p>
              <Button className="mt-6" variant="warm" size="lg" asChild><a href={waLink(open)} target="_blank" rel="noreferrer" onClick={() => void registerOrder(open.id)}><MessageCircle /> Tenho interesse</a></Button>
            </div>
          </div>}
        </DialogContent>
      </Dialog>
    </>
  );
}
