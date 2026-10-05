import { useEffect, useState } from "react";
import {
  ArrowRight, BookOpen, ChevronRight, Clock3, Gift, Heart, Home, Instagram,
  MapPin, Menu, MessageCircle, PackageCheck, Phone, Search, Sparkles, Star,
  Store, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCatalog } from "@/components/product-catalog";
import heroImage from "@/assets/bazar-hero.jpg";
import papelariaImage from "@/assets/categoria-papelaria.jpg";
import utilidadesImage from "@/assets/categoria-utilidades.jpg";
import decoracaoImage from "@/assets/categoria-decoracao.jpg";

const WHATSAPP = "https://wa.me/5521983443183?text=Ol%C3%A1%21%20Vi%20o%20site%20da%20Guilherme%20Bazar%20e%20Papelaria%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos.";
const MAPS = "https://www.google.com/maps/search/?api=1&query=Estr.+Dr.+M%C3%A1rio+Pinotti%2C+1657+-+Belterra%2C+Nova+Igua%C3%A7u+-+RJ%2C+26262-131";

const nav = [
  ["Início", "inicio"], ["Produtos", "loja"], ["Categorias", "categorias"],
  ["Sobre nós", "sobre"], ["Serviços", "servicos"], ["Avaliações", "avaliacoes"],
  ["Localização", "localizacao"], ["Contato", "contato"],
] as const;

const categories = [
  { name: "Papelaria", icon: BookOpen, image: papelariaImage, text: "Materiais para estudar, criar e organizar suas ideias." },
  { name: "Utilidades", icon: Home, image: utilidadesImage, text: "Soluções práticas para deixar sua rotina mais leve." },
  { name: "Decoração", icon: Sparkles, image: decoracaoImage, text: "Detalhes que renovam e acolhem cada ambiente." },
  { name: "Presentes", icon: Gift, image: decoracaoImage, text: "Escolhas especiais para demonstrar carinho." },
  { name: "Organização", icon: PackageCheck, image: utilidadesImage, text: "Mais ordem e funcionalidade para sua casa." },
  { name: "Novidades", icon: Star, image: papelariaImage, text: "Descobertas e lançamentos que acabaram de chegar." },
] as const;

const demos = [
  { name: "Cadernos e materiais de escrita", category: "Papelaria", image: papelariaImage, text: "Opções para estudo, trabalho e criatividade." },
  { name: "Organizadores para o lar", category: "Organização", image: utilidadesImage, text: "Peças práticas para uma casa bem organizada." },
  { name: "Objetos decorativos", category: "Decoração", image: decoracaoImage, text: "Detalhes acolhedores para transformar ambientes." },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function StoreHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("Todos");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);


  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto grid h-20 max-w-[1480px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:px-8">
          <button className="flex min-w-0 items-center gap-3 text-left" onClick={() => scrollTo("inicio")} aria-label="Ir ao início">
            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary font-display text-sm font-bold text-primary-foreground">GB</span>
            <span className="min-w-0"><span className="block truncate font-display text-lg font-semibold leading-none">Guilherme</span><span className="mt-1 block truncate text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Bazar & Papelaria</span></span>
          </button>
          <nav className="hidden items-center gap-5 xl:flex" aria-label="Navegação principal">
            {nav.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)} className="text-xs font-semibold text-muted-foreground transition-colors hover:text-primary">{label}</button>)}
            <Button variant="warm" asChild><a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle /> Falar no WhatsApp</a></Button>
          </nav>
          <Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav className="border-t border-border bg-background px-5 py-5 xl:hidden" aria-label="Menu mobile"><div className="mx-auto grid max-w-2xl gap-1">{nav.map(([label, id]) => <button key={id} onClick={() => { scrollTo(id); setMenuOpen(false); }} className="flex min-h-11 items-center justify-between border-b border-border/60 text-left text-sm font-semibold">{label}<ChevronRight className="size-4" /></button>)}<Button className="mt-4" variant="warm" size="lg" asChild><a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle /> Falar no WhatsApp</a></Button></div></nav>}
      </header>

      <main>
        <section id="inicio" className="relative min-h-[92svh] overflow-hidden pt-20">
          <img src={heroImage} alt="Papelaria, itens de organização e decoração em ambiente elegante" width={1920} height={1280} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[62%_center]" />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative mx-auto flex min-h-[calc(92svh-5rem)] max-w-[1480px] items-center px-5 py-20 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary"><span className="h-px w-10 bg-primary" /> Em Belterra, Nova Iguaçu</p>
              <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl">Tudo para sua casa, papelaria e decoração <em className="font-normal text-primary">em um só lugar.</em></h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-foreground/75 sm:text-lg">Encontre utilidades, itens de papelaria, decoração e muito mais na Guilherme Bazar e Papelaria.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button variant="warm" size="lg" onClick={() => scrollTo("produtos")}>Ver produtos <ArrowRight /></Button><Button variant="cream" size="lg" asChild><a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle /> Falar pelo WhatsApp</a></Button></div>
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-foreground/15 pt-6 text-xs font-semibold text-foreground/70"><span className="flex items-center gap-2"><MapPin className="size-4 text-primary" /> Nova Iguaçu — RJ</span><span className="flex items-center gap-2"><Star className="size-4 fill-primary text-primary" /> 4,7 de 5 · 95 avaliações</span></div>
            </div>
          </div>
        </section>

        <section id="categorias" className="section-pad reveal bg-card"><div className="shell"><SectionHead eyebrow="Categorias" title="Encontre o que você precisa" text="Uma seleção pensada para facilitar sua rotina e deixar seus espaços mais bonitos." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{categories.map(({name, icon: Icon, image, text}, index) => <button key={name} onClick={() => { setFilter(name); scrollTo("loja"); }} className="group relative min-h-[280px] overflow-hidden rounded-lg text-left shadow-[var(--shadow-card)]"><img src={image} alt={`Categoria ${name}`} loading="lazy" width={1024} height={1024} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" /><span className="category-overlay absolute inset-0" /><span className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground"><span className="mb-4 grid size-10 place-items-center rounded-md bg-background/90 text-primary"><Icon className="size-5" /></span><span className="font-display text-2xl font-semibold">{name}</span><span className="mt-1 block max-w-xs text-sm leading-6 text-primary-foreground/80">{text}</span><span className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em]">Explorar <ArrowRight className="size-4 transition group-hover:translate-x-1" /></span></span><span className="absolute right-5 top-4 font-display text-4xl text-primary-foreground/40">0{index + 1}</span></button>)}</div>
        </div></section>

        <ProductCatalog filter={filter} setFilter={setFilter} />

        <section id="sobre" className="section-pad reveal bg-primary text-primary-foreground"><div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"><div className="relative"><img src={decoracaoImage} alt="Seleção acolhedora de decoração e presentes" loading="lazy" width={1024} height={1024} className="aspect-[4/5] w-full rounded-lg object-cover" /><div className="absolute -bottom-5 -right-3 max-w-[210px] rounded-md bg-background p-5 text-foreground shadow-[var(--shadow-float)] sm:right-6"><p className="font-display text-3xl font-semibold text-primary">4,7</p><p className="mt-1 text-xs text-muted-foreground">de 5, com 95 avaliações</p></div></div><div><p className="eyebrow text-primary-foreground/70">Sobre nós</p><h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Sobre a Guilherme Bazar e Papelaria</h2><p className="mt-6 text-base leading-8 text-primary-foreground/75">A Guilherme Bazar e Papelaria oferece uma variedade de produtos para facilitar o dia a dia, com opções de papelaria, utilidades, decoração e muito mais. Nossa proposta é reunir variedade, praticidade e atendimento próximo em um só lugar.</p><Button className="mt-8" variant="cream" size="lg" asChild><a href={WHATSAPP} target="_blank" rel="noreferrer">Conheça nossas opções <ArrowRight /></a></Button></div></div></section>

        <section id="servicos" className="section-pad reveal"><div className="shell"><SectionHead eyebrow="Nossos diferenciais" title="Um atendimento feito para você" text="Escolhas práticas e um contato próximo, do jeito que uma boa loja de bairro deve ser." /><div className="mt-10 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">{[[Sparkles,"Variedade","Produtos para diferentes necessidades."],[PackageCheck,"Praticidade","Tudo em um só lugar."],[Heart,"Atendimento","Atendimento próximo e personalizado."],[Star,"Qualidade","Produtos selecionados para nossos clientes."]].map(([Icon,title,text], i) => { const I = Icon as typeof Star; return <div key={String(title)} className="border-b border-border p-7 last:border-b-0 sm:border-r sm:[&:nth-child(2)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2)]:border-r"><span className="text-xs font-bold text-muted-foreground">0{i+1}</span><I className="mt-8 size-7 text-primary" /><h3 className="mt-5 font-display text-2xl font-semibold">{String(title)}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{String(text)}</p></div>})}</div></div></section>

        <section id="avaliacoes" className="section-pad reveal bg-secondary"><div className="shell text-center"><p className="eyebrow">Avaliações</p><h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">O que nossos clientes dizem</h2><div className="mx-auto mt-10 max-w-2xl rounded-lg border border-border bg-card p-8 shadow-[var(--shadow-card)] sm:p-12"><div className="flex justify-center gap-1">{Array.from({length:5}).map((_,i)=><Star key={i} className="size-6 fill-primary text-primary" />)}</div><p className="mt-5 font-display text-6xl font-semibold text-primary">4,7 <span className="text-2xl text-muted-foreground">/ 5</span></p><p className="mt-3 font-semibold">95 avaliações</p><p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-muted-foreground">A nota apresentada é agregada. Depoimentos individuais serão exibidos somente quando fornecidos por uma fonte autorizada.</p></div></div></section>

        <section id="localizacao" className="section-pad reveal bg-card"><div className="shell"><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div className="flex flex-col justify-center"><p className="eyebrow">Localização</p><h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Visite nossa loja</h2><p className="mt-6 text-base leading-7 text-muted-foreground">Estr. Dr. Mário Pinotti, 1657 - Belterra<br />Nova Iguaçu - RJ<br />CEP 26262-131</p><Button className="mt-7 w-fit" variant="warm" size="lg" asChild><a href={MAPS} target="_blank" rel="noreferrer"><MapPin /> Como chegar</a></Button><div className="mt-9 border-t border-border pt-7"><div className="flex items-center gap-3"><Clock3 className="size-5 text-primary"/><h3 className="font-display text-xl font-semibold">Horário de funcionamento</h3></div><p className="mt-3 text-sm leading-6 text-muted-foreground">Horários ainda não cadastrados. Entre em contato para confirmar se a loja está aberta.</p><a className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline" href={WHATSAPP} target="_blank" rel="noreferrer">Confirmar pelo WhatsApp <ArrowRight className="size-4" /></a></div></div><div className="min-h-[420px] overflow-hidden rounded-lg border border-border"><iframe title="Mapa da Guilherme Bazar e Papelaria" src="https://www.google.com/maps?q=Estr.%20Dr.%20M%C3%A1rio%20Pinotti%2C%201657%20Belterra%20Nova%20Igua%C3%A7u%20RJ&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full min-h-[420px] w-full border-0" /></div></div></div></section>

        <section id="contato" className="section-pad reveal"><div className="shell"><div className="rounded-lg bg-primary p-7 text-primary-foreground sm:p-12 lg:p-16"><div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"><div><p className="eyebrow text-primary-foreground/65">Fale com a gente</p><h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold sm:text-5xl">Entre em contato. Estamos perto de você.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-primary-foreground/70">Tire dúvidas sobre produtos e disponibilidade ou planeje sua visita à loja.</p></div><div className="grid gap-3"><Button variant="cream" size="lg" asChild><a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a></Button><Button variant="soft" size="lg" asChild><a href="tel:+5521983443183"><Phone /> Ligar: (21) 98344-3183</a></Button><Button variant="soft" size="lg" asChild><a href={MAPS} target="_blank" rel="noreferrer"><MapPin /> Como chegar</a></Button></div></div></div></div></section>
      </main>

      <footer className="bg-footer text-footer-foreground"><div className="shell py-14"><div className="grid gap-10 border-b border-footer-foreground/15 pb-10 md:grid-cols-[1.2fr_1fr_1fr]"><div><p className="font-display text-2xl font-semibold">Guilherme Bazar e Papelaria</p><p className="mt-3 text-sm text-footer-foreground/65">🏠 Utilidades & 🎀 Decorações<br />Nova Iguaçu - RJ</p></div><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-footer-foreground/45">Navegue</p><div className="mt-4 grid grid-cols-2 gap-3">{nav.filter((_,i)=>[0,1,2,3,6,7].includes(i)).map(([label,id])=><button key={id} onClick={()=>scrollTo(id)} className="text-left text-sm text-footer-foreground/70 hover:text-footer-foreground">{label}</button>)}</div></div><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-footer-foreground/45">Redes sociais</p><p className="mt-4 text-sm leading-6 text-footer-foreground/65">Perfis serão adicionados quando os links oficiais forem cadastrados.</p><div className="mt-4 flex gap-2"><span className="grid size-9 place-items-center rounded-md border border-footer-foreground/20"><Instagram className="size-4" /></span><span className="grid size-9 place-items-center rounded-md border border-footer-foreground/20 text-xs font-bold">f</span><span className="grid size-9 place-items-center rounded-md border border-footer-foreground/20 text-xs font-bold">♪</span></div></div></div><div className="flex flex-col gap-3 pt-6 text-xs text-footer-foreground/50 sm:flex-row sm:justify-between"><p>© 2026 Guilherme Bazar e Papelaria. Todos os direitos reservados.</p><p>Estr. Dr. Mário Pinotti, 1657 — Belterra</p></div></div></footer>

      <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" className="whatsapp-float fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-[var(--shadow-float)] transition hover:scale-105"><MessageCircle className="size-7" /></a>
    </div>
  );
}

function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="max-w-2xl"><p className="eyebrow">{eyebrow}</p><h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">{title}</h2><p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">{text}</p></div>;
}