import Link from "next/link";
import { getAllOpenCalls } from "@/lib/contentful";
import Layout from "@/components/Layout";
import Window from "@/components/Window";
import type { Metadata } from "next";
import type { ContentfulFields } from "@/lib/types";

export const metadata: Metadata = {
  title: "submissions",
  description:
    "find out everything you need to know about releasing or publishing your work with 9VT\\5.",
  alternates: { canonical: "/submissions" },
};

export const revalidate = 3600;

export default async function SubmissionsPage() {
  const openCalls = await getAllOpenCalls();

  return (
    <Layout page="submissions">
      <Window className="small" crumbs={[{ title: "submissions" }]}>
        <h1>submissions</h1>
        <h2>
          we seek all sorts of work, from books in print to collections of art
          to alternative mediums, whether they be material, digital or
          conceptual in nature.
        </h2>
        <h2>
          if you are interested in publishing your work with us, or want to
          discuss giving expression to a project you&apos;ve been ruminating
          over, send a note to{" "}
          <a href="mailto:submissions@9vtbackslash5.com" rel="nofollow">
            submissions@9vtbackslash5.com
          </a>
          .
        </h2>
        <h2>
          if we love it, we&apos;ll work with you to bring it further into the
          world. `
        </h2>
        <h1>open calls</h1>
        <h2 className="--muted">
          (this is where we list projects our team is currently working on, new
          and recurring.)
        </h2>
        {openCalls.map((call) => {
          const f = call.fields as ContentfulFields;
          return (
            <Link
              key={f.slug}
              href={`/submissions/${f.slug}`}
              className="m-0"
            >
              {f.title}
            </Link>
          );
        })}
      </Window>
    </Layout>
  );
}
