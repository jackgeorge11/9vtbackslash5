import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Contentful webhook target. Publishing an entry drops the cached pages that
// render it, so a CMS correction is live in seconds instead of waiting out the
// hour-long revalidate window.
export async function POST(request: NextRequest) {
  const secret = process.env.CONTENTFUL_REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  let contentType: string | undefined;
  try {
    const payload = await request.json();
    contentType = payload?.sys?.contentType?.sys?.id;
  } catch {
    // Unpublish and delete events arrive without a body we can read; fall
    // through and revalidate the publication pages, which is the safe default.
  }

  const revalidated: string[] = [];
  const bump = (path: string, type?: "page" | "layout") => {
    revalidatePath(path, type);
    revalidated.push(path);
  };

  bump("/sitemap.xml");

  if (contentType === "openCall") {
    bump("/submissions");
    bump("/submissions/[slug]", "page");
  } else {
    bump("/catalogue");
    // The cart prices every line from live publication data, so it goes stale
    // with the pages that list the books.
    bump("/cart");
    // The route pattern rather than one slug, so unpublishing or renaming an
    // entry clears the page it used to live at as well.
    bump("/catalogue/[slug]", "page");
  }

  return NextResponse.json({ revalidated: true, paths: revalidated });
}
