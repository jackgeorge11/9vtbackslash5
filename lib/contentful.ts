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

export async function getAllOpenCalls(): Promise<Entry<EntrySkeletonType>[]> {
  const entries = await client.getEntries({
    content_type: "openCall",
    select: ["fields.title", "fields.slug"],
  });
  return entries.items;
}
