import { createFileRoute } from "@tanstack/react-router";
import { StoreHome } from "@/components/store-home";

const title = "Guilherme Bazar e Papelaria | Bazar, Papelaria e Utilidades em Nova Iguaçu";
const description = "Guilherme Bazar e Papelaria em Nova Iguaçu - RJ. Encontre papelaria, utilidades, decoração, presentes e muito mais. Entre em contato pelo WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: "Bazar em Nova Iguaçu, Papelaria em Nova Iguaçu, Utilidades em Nova Iguaçu, Decoração em Nova Iguaçu, Papelaria Belterra, Bazar Belterra, Guilherme Bazar e Papelaria" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Store",
        name: "Guilherme Bazar e Papelaria",
        description,
        telephone: "+5521983443183",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Estr. Dr. Mário Pinotti, 1657 - Belterra",
          addressLocality: "Nova Iguaçu",
          addressRegion: "RJ",
          postalCode: "26262-131",
          addressCountry: "BR",
        },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.7", reviewCount: "95", bestRating: "5" },
      }),
    }],
  }),
  component: Index,
});

function Index() {
  return <StoreHome />;
}
