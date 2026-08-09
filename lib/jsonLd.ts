import type { ContentfulFields, ShippingOption } from "@/lib/types";
import { countriesForDestination } from "@/lib/regions";

const SITE_URL = "https://www.9vtbackslash5.com";
const CURRENCY = "USD";

// Days between an order being placed and it going in the mail, and days in
// transit thereafter. Applied to every destination.
const HANDLING_DAYS = 5;
const TRANSIT_DAYS = 5;

// Returns are accepted within this window; the customer pays return postage.
const RETURN_WINDOW_DAYS = 30;

// Escapes "<" so a literal "</script>" in CMS data can't close the
// JSON-LD script tag early.
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

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

// ISBN-13 is a valid GTIN, which is the global identifier Google asks for on
// Product markup. ISBN-10 is not, so it is left off.
function gtin13(isbn?: string): string | undefined {
  const digits = isbn?.replace(/\D/g, "");
  return digits?.length === 13 ? digits : undefined;
}

// Turns the shipping table into per-destination OfferShippingDetails. Earlier
// rows win any country a later row also covers, so a specific rate ("Italy")
// is not overridden by a broader one ("Europe and the United Kingdom").
function shippingFor(shipping: unknown) {
  const options: ShippingOption[] = Array.isArray(shipping) ? shipping : [];
  const covered = new Set<string>();
  const details = [];
  for (const option of options) {
    if (typeof option?.to !== "string" || typeof option?.cost !== "number")
      continue;
    const countries = countriesForDestination(option.to)?.filter(
      (code) => !covered.has(code)
    );
    if (!countries?.length) continue;
    countries.forEach((code) => covered.add(code));
    details.push({
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        // option.cost is stored in cents
        value: (option.cost / 100).toFixed(2),
        currency: CURRENCY,
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: countries,
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: HANDLING_DAYS,
          maxValue: HANDLING_DAYS,
          unitCode: "DAY",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: TRANSIT_DAYS,
          maxValue: TRANSIT_DAYS,
          unitCode: "DAY",
        },
      },
    });
  }
  return { details, countries: [...covered] };
}

function returnPolicyFor(countries: string[]) {
  if (!countries.length) return undefined;
  return {
    "@type": "MerchantReturnPolicy",
    applicableCountry: countries,
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: RETURN_WINDOW_DAYS,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/ReturnShippingFees",
    refundType: "https://schema.org/FullRefund",
  };
}

export function productJsonLd(pub: ContentfulFields, description?: string) {
  const coverUrl = pub.cover?.fields?.file?.url as string | undefined;
  const gtin = gtin13(pub.isbn);
  const shipping = shippingFor(pub.shipping);
  const returnPolicy = returnPolicyFor(shipping.countries);
  return {
    "@context": "https://schema.org",
    "@type": ["Product", "Book"],
    name: pub.title,
    description: description || `${pub.title}, by ${pub.author}`,
    ...(coverUrl && { image: `https:${coverUrl}` }),
    ...(pub.author && {
      author: { "@type": "Person", name: pub.author },
    }),
    publisher: { "@type": "Organization", name: "9VT\\5" },
    brand: { "@type": "Brand", name: "9VT\\5" },
    ...(pub.releaseDate && { datePublished: pub.releaseDate }),
    ...(pub.pageCount && { numberOfPages: pub.pageCount }),
    ...(pub.genre && { genre: pub.genre }),
    ...(pub.isbn && { isbn: pub.isbn }),
    ...(gtin && { gtin13: gtin }),
    ...(pub.price != null && {
      offers: {
        "@type": "Offer",
        // pub.price is stored in cents; schema.org expects major units
        price: (pub.price / 100).toFixed(2),
        priceCurrency: "USD",
        availability:
          pub.soldOut === true
            ? "https://schema.org/SoldOut"
            : "https://schema.org/InStock",
        url: `${SITE_URL}/catalogue/${pub.slug}`,
        ...(shipping.details.length && { shippingDetails: shipping.details }),
        ...(returnPolicy && { hasMerchantReturnPolicy: returnPolicy }),
      },
    }),
  };
}
