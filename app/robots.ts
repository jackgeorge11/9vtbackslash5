import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/cart",
    },
    sitemap: "https://www.9vtbackslash5.com/sitemap.xml",
  };
}
