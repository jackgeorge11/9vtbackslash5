import { getOpenCall, getAllOpenCallSlugs } from "@/lib/contentful";
import OpenCallClient from "./OpenCallClient";
import type { Metadata } from "next";
import type { ContentfulFields } from "@/lib/types";

export const revalidate = 3600;

export async function generateStaticParams() {
  return await getAllOpenCallSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getOpenCall(slug);
  const call = entry?.fields as ContentfulFields;
  if (!call) return {};
  return {
    title: `submissions | ${call.title}`,
    description: `submissions: we currently have an open call for ${call.title}. learn more about how to submit your work.`,
    alternates: {
      canonical: `/submissions/${call.slug}`,
    },
  };
}

export default async function OpenCallPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getOpenCall(slug);
  return <OpenCallClient openCall={entry} />;
}
