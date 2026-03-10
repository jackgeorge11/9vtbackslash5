import { getCatalogueItems } from "@/lib/contentful";
import CatalogueClient from "./CatalogueClient";
import { breadcrumbJsonLd } from "@/lib/jsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "catalogue",
  description:
    "discover everything we've put into the world, from books to collections of art.",
  alternates: { canonical: "/catalogue" },
};

export const revalidate = 3600;

export default async function CataloguePage() {
  const catalogue = await getCatalogueItems();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: "catalogue", url: "/catalogue" }])
          ),
        }}
      />
      <CatalogueClient catalogue={catalogue} />
    </>
  );
}
