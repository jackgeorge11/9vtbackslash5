import { createClient, Entry, EntrySkeletonType } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getCatalogueItems(): Promise<Entry<EntrySkeletonType>> {
  const entries = await client.getEntries({
    content_type: "catalogue",
    include: 3,
  });
  return entries.items[0];
}

// Every publication, limited to what the cart needs to price a line. The cart
// joins against this by slug rather than querying the slugs it holds, because
// those live in localStorage and are not known at render time on the server.
export async function getAllPublications(): Promise<Entry<EntrySkeletonType>[]> {
  const entries = await client.getEntries({
    content_type: "publication",
    include: 1,
    select: [
      "fields.slug",
      "fields.title",
      "fields.author",
      "fields.price",
      "fields.tax",
      "fields.shipping",
      "fields.cover",
      "fields.blurb",
      "fields.soldOut",
      "fields.saleEnded",
      "fields.preorder",
      "fields.preorderShipDate",
    ],
  });
  return entries.items;
}

export async function getPublication(
  slug: string
): Promise<Entry<EntrySkeletonType>> {
  const entries = await client.getEntries({
    content_type: "publication",
    "fields.slug": slug,
    include: 2,
  });
  return entries.items[0];
}

export async function getAllPublicationSlugs(): Promise<{ slug: string }[]> {
  const entries = await client.getEntries({
    content_type: "publication",
    select: ["fields.slug"],
  });
  return entries.items.map((item) => ({
    slug: (item.fields as Record<string, unknown>).slug as string,
  }));
}

export async function getOpenCall(
  slug: string
): Promise<Entry<EntrySkeletonType>> {
  const entries = await client.getEntries({
    content_type: "openCall",
    "fields.slug": slug,
    include: 1,
  });
  return entries.items[0];
}

export async function getAllOpenCallSlugs(): Promise<{ slug: string }[]> {
  const entries = await client.getEntries({
    content_type: "openCall",
    select: ["fields.slug"],
  });
  return entries.items.map((item) => ({
    slug: (item.fields as Record<string, unknown>).slug as string,
  }));
}

// A slug paired with the moment its entry last changed in the CMS.
export interface SitemapEntry {
  slug: string;
  updatedAt: string;
}

// `sys.updatedAt` is the only honest modification date available to us, and it
// has to be asked for by name: selecting fields alone strips `sys` from the
// response entirely, which is why the slug queries above return no date.
//
// Kept separate from the `...Slugs` functions rather than widening them,
// because those feed `generateStaticParams`, where every key in the returned
// object is treated as a route parameter.
async function getSitemapEntries(
  contentType: string
): Promise<SitemapEntry[]> {
  const entries = await client.getEntries({
    content_type: contentType,
    select: ["fields.slug", "sys.updatedAt"],
  });
  return entries.items
    .map((item) => ({
      slug: (item.fields as Record<string, unknown>).slug as string,
      updatedAt: item.sys.updatedAt,
    }))
    .filter((entry) => !!entry.slug && !!entry.updatedAt);
}

export function getPublicationSitemapEntries(): Promise<SitemapEntry[]> {
  return getSitemapEntries("publication");
}

export function getOpenCallSitemapEntries(): Promise<SitemapEntry[]> {
  return getSitemapEntries("openCall");
}

export async function getAllOpenCalls(): Promise<Entry<EntrySkeletonType>[]> {
  const entries = await client.getEntries({
    content_type: "openCall",
    select: ["fields.title", "fields.slug"],
  });
  return entries.items;
}
