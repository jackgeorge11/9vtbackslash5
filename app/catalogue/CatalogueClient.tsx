"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import Layout from "@/components/Layout";
import Window from "@/components/Window";
import type { Entry, EntrySkeletonType } from "contentful";
import type { ContentfulFields } from "@/lib/types";

interface CatalogueClientProps {
  catalogue: Entry<EntrySkeletonType>;
}

export default function CatalogueClient({ catalogue }: CatalogueClientProps) {
  const fields = catalogue.fields as ContentfulFields;
  const allItems: Entry<EntrySkeletonType>[] = fields.items || [];

  // Filter out moods collections
  const items = allItems.filter(
    (item) => item.sys.contentType.sys.id !== "moodsCollection"
  );

  const sortedCatalogue = [...items].sort(
    (a, b) =>
      dayjs((b.fields as ContentfulFields).releaseDate).valueOf() -
      dayjs((a.fields as ContentfulFields).releaseDate).valueOf()
  );

  const scroller = useRef<HTMLElement>(null);

  return (
    <div>
      <Layout page="catalogue">
        <Window
          className="large catalogue"
          scroller={scroller}
          crumbs={[{ title: "catalogue", slug: "/catalogue" }]}
        >
          <h2
            className="--muted scroll pointer"
            onClick={
              scroller?.current
                ? () =>
                    (scroller.current!.scrollLeft =
                      scroller.current!.clientWidth / 2)
                : undefined
            }
          >
            (scroll --&gt;)
          </h2>
          {sortedCatalogue?.map((item) => {
            const f = item.fields as ContentfulFields;
            const imageUrl = f.cover?.fields?.file?.url as string | undefined;
            return (
              <div className="idea" key={f.slug}>
                <Link href={`/catalogue/${f.slug}`} className="cover">
                  {imageUrl && (
                    <Image
                      src={`https:${imageUrl}`}
                      alt={f.title}
                      width={300}
                      height={300}
                      style={{
                        maxHeight: "300px",
                        width: "auto",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </Link>
                <div className="info">
                  <h1 className="italic">
                    <Link href={`/catalogue/${f.slug}`}>{f.title}</Link>
                  </h1>
                  <h2>by {f.author}</h2>
                  <h3>{dayjs(f.releaseDate).format("MMM YYYY")}</h3>
                </div>
              </div>
            );
          })}
        </Window>
      </Layout>
    </div>
  );
}
