import { getPublication, getAllPublicationSlugs } from "@/lib/contentful";
import PublicationClient from "./PublicationClient";
import {
  productJsonLd,
  breadcrumbJsonLd,
  serializeJsonLd,
} from "@/lib/jsonLd";
import { richTextToPlainText } from "@/lib/utils";
import type { Metadata } from "next";
import type { ContentfulFields } from "@/lib/types";

export const revalidate = 3600;

export async function generateStaticParams() {
  return await getAllPublicationSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getPublication(slug);
  const pub = entry?.fields as ContentfulFields;
  if (!pub) return {};
  const coverUrl = pub.cover?.fields?.file?.url as string | undefined;
  const blurb = richTextToPlainText(pub.description);
  const description =
    blurb ||
    `${pub.title}, by ${pub.author}. ${
      pub.genre
        ? `${pub.genre} published in ${pub.format}.`
        : `published in ${pub.format}.`
    }`;
  return {
    title: `${pub.title}, by ${pub.author}`,
    description,
    alternates: {
      canonical: `/catalogue/${pub.slug}`,
    },
    openGraph: {
      title: `${pub.title}, by ${pub.author}`,
      description,
      type: "article",
      images: coverUrl
        ? [
            {
              url: `https:${coverUrl}`,
              width: 800,
              height: 1000,
              alt: `${pub.title} cover`,
            },
          ]
        : [],
    },
  };
}

export default async function PublicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getPublication(slug);
  const pub = entry?.fields as ContentfulFields;
  return (
    <>
      {pub && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: serializeJsonLd(
                productJsonLd(pub, richTextToPlainText(pub.description))
              ),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: serializeJsonLd(
                breadcrumbJsonLd([
                  { name: "catalogue", url: "/catalogue" },
                  { name: pub.title, url: `/catalogue/${pub.slug}` },
                ])
              ),
            }}
          />
        </>
      )}
      <PublicationClient publication={entry} />
    </>
  );
}
