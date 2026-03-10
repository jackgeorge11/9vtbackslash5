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
