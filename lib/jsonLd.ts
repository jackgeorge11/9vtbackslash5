import type { ContentfulFields } from "@/lib/types";

const SITE_URL = "https://www.9vtbackslash5.com";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "9VT\\5",
    url: SITE_URL,
    sameAs: ["https://instagram.com/9vtbackslash5"],
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "home",
        item: SITE_URL,
      },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${SITE_URL}${item.url}`,
      })),
    ],
  };
}

export function productJsonLd(pub: ContentfulFields) {
  const coverUrl = pub.cover?.fields?.file?.url as string | undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pub.title,
    description: `${pub.title}, by ${pub.author}`,
    ...(coverUrl && { image: `https:${coverUrl}` }),
    ...(pub.author && {
      brand: { "@type": "Person", name: pub.author },
    }),
    ...(pub.isbn && { isbn: pub.isbn }),
    ...(pub.price != null && {
      offers: {
        "@type": "Offer",
        price: pub.price,
        priceCurrency: "USD",
        availability:
          pub.soldOut === true
            ? "https://schema.org/SoldOut"
            : "https://schema.org/InStock",
        url: `${SITE_URL}/catalogue/${pub.slug}`,
      },
    }),
  };
}
