import type { MetadataRoute } from "next";
import {
  getPublicationSitemapEntries,
  getOpenCallSitemapEntries,
} from "@/lib/contentful";
import type { SitemapEntry } from "@/lib/contentful";

const SITE_URL = "https://www.9vtbackslash5.com";

// The newest change among a set of entries, for the index page that lists
// them. Contentful returns UTC ISO strings, which sort correctly as text.
function newestUpdate(entries: SitemapEntry[]): string | undefined {
  return entries.reduce<string | undefined>(
    (latest, entry) =>
      !latest || entry.updatedAt > latest ? entry.updatedAt : latest,
    undefined
  );
}

// `lastModified` is set only where a real date exists, which means the pages
// Contentful drives and nothing else. Stamping the build time on every URL is
// what teaches a crawler the field is an artifact rather than a signal, after
// which it discounts the whole sitemap — so the pages that genuinely do change
// lose the benefit along with the ones that never did. Omitting the field is
// allowed; claiming a date we cannot stand behind is what costs us.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [publications, openCalls] = await Promise.all([
    getPublicationSitemapEntries(),
    getOpenCallSitemapEntries(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${SITE_URL}/catalogue`,
      lastModified: newestUpdate(publications),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/submissions`,
      lastModified: newestUpdate(openCalls),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${SITE_URL}/inquiries`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/returns`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.4 },
  ];

  const publicationPages: MetadataRoute.Sitemap = publications.map(
    ({ slug, updatedAt }) => ({
      url: `${SITE_URL}/catalogue/${slug}`,
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  const openCallPages: MetadataRoute.Sitemap = openCalls.map(
    ({ slug, updatedAt }) => ({
      url: `${SITE_URL}/submissions/${slug}`,
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    })
  );

  return [...staticPages, ...publicationPages, ...openCallPages];
}
