import type { MetadataRoute } from "next";
import { getAllPublicationSlugs, getAllOpenCallSlugs } from "@/lib/contentful";

const SITE_URL = "https://www.9vtbackslash5.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [publicationSlugs, openCallSlugs] = await Promise.all([
    getAllPublicationSlugs(),
    getAllOpenCallSlugs(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/catalogue`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/submissions`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/inquiries`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  const publicationPages: MetadataRoute.Sitemap = publicationSlugs.map(({ slug }) => ({
    url: `${SITE_URL}/catalogue/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const openCallPages: MetadataRoute.Sitemap = openCallSlugs.map(({ slug }) => ({
    url: `${SITE_URL}/submissions/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...publicationPages, ...openCallPages];
}
