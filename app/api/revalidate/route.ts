import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Every route that reads from Contentful. The webhook payload is not
// inspected and all of them are cleared on any event: content changes here a
// few times a year, so regenerating a handful of pages costs nothing next to
// the risk of missing one. The [slug] entries use the route pattern rather
// than a single path so unpublishing or renaming clears the page an entry
// used to occupy.
const CONTENTFUL_ROUTES: [string, ("page" | "layout")?][] = [
  ["/catalogue"],
  ["/catalogue/[slug]", "page"],
  ["/cart"],
  ["/submissions"],
  ["/submissions/[slug]", "page"],
  ["/sitemap.xml"],
];

// Contentful webhook target. Publishing an entry drops the cached pages that
// render it, so a CMS correction is live in seconds instead of waiting out the
// hour-long revalidate window.
export async function POST(request: NextRequest) {
  const secret = process.env.CONTENTFUL_REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  for (const [path, type] of CONTENTFUL_ROUTES) revalidatePath(path, type);

  return NextResponse.json({
    revalidated: true,
    paths: CONTENTFUL_ROUTES.map(([path]) => path),
  });
}
