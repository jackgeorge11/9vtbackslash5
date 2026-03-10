"use client";

import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "@/components/Layout";
import Window from "@/components/Window";
import { richTextOptions } from "@/lib/richText";
import type { Entry, EntrySkeletonType } from "contentful";
import type { ContentfulFields } from "@/lib/types";

interface OpenCallClientProps {
  openCall: Entry<EntrySkeletonType>;
}

export default function OpenCallClient({ openCall }: OpenCallClientProps) {
  const call = openCall.fields as ContentfulFields;

  return (
    <Layout page="submissions">
      <Window
        className="small"
        crumbs={[
          { title: "submissions", slug: "/submissions" },
          { title: call.title, slug: `/submissions/${call.slug}` },
        ]}
      >
        {call.description &&
          documentToReactComponents(call.description, richTextOptions)}
        <h2>
          submit your work or any questions you might have to{" "}
          <a href="mailto:submissions@9vtbackslash5.com" rel="nofollow">
            submissions@9vtbackslash5.com
          </a>
          .
        </h2>
        <h2 className="ta-right">
          <Link href="/submissions">click here</Link> to navigate back to our
          submissions page.
        </h2>
      </Window>
    </Layout>
  );
}
