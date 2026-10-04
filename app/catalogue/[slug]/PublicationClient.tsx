"use client";

import { useContext, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import dayjs from "dayjs";
import Product from "@/components/Product";
import { ColorContext } from "@/contexts/ColorContext";
import { CartContext } from "@/contexts/CartContext";
import { richTextOptions } from "@/lib/richText";
import { formatPrice } from "@/lib/utils";
import type { Entry, EntrySkeletonType } from "contentful";
import type { ContentfulFields } from "@/lib/types";

interface PublicationClientProps {
  publication: Entry<EntrySkeletonType>;
}

export default function PublicationClient({
  publication,
}: PublicationClientProps) {
  const pub = publication?.fields as ContentfulFields;
  const coverUrl: string | undefined = pub?.cover?.fields?.file?.url;
  const description = pub?.description;

  // Zooming prefers the photograph of the physical book where there is one: it
  // shows the object a buyer is actually being sold — paper, binding, size in
  // a hand — which a flat cover scan at a larger size cannot. Titles without
  // one fall back to the cover rather than losing the zoom.
  const alternateFile = pub?.alternatePhoto?.fields?.file;
  const zoomFile = alternateFile ?? pub?.cover?.fields?.file;
  const zoomSize = zoomFile?.details?.image;

  const { loading } = useContext(ColorContext);
  const { addCartItem, cart } = useContext(CartContext);

  const publicationWindow = useRef<HTMLElement>(null);

  const releaseDate = pub.releaseDate
    ? dayjs(pub.releaseDate).format("MMMM YYYY")
    : null;

  // A preorder is open while its ship date is still ahead.
  const isPreorder =
    !!pub.preorder && dayjs(pub.preorderShipDate).isAfter(dayjs());

  return (
    <Product
      src={coverUrl ? `https:${coverUrl}` : ""}
      alt={`${pub.title} cover`}
      zoom={
        zoomFile?.url
          ? {
              src: `https:${zoomFile.url}`,
              alt: alternateFile
                ? `${pub.title}, photographed`
                : `${pub.title} cover`,
              width: zoomSize?.width ?? 1200,
              height: zoomSize?.height ?? 1600,
            }
          : undefined
      }
      scroller={publicationWindow}
      crumbs={[
        { title: "catalogue", slug: "/catalogue" },
        { title: pub.title, slug: `/catalogue/${pub.slug}` },
      ]}
    >
      {loading ? (
        <h2 className="--muted loading">(loading)</h2>
      ) : (
        <>
          <div className="product-header">
            {/* Open preorders sell ahead of release; everything else goes
                on sale once it has been released. */}
            {/* A sold-out title keeps the button and wears it out, rather
                than leaving a gap the buyer has to read the details list to
                explain. */}
            {pub.soldOut ? (
              <button disabled>
                <h4>sold out</h4>
              </button>
            ) : (
              !pub.saleEnded &&
              (isPreorder || !dayjs(pub.releaseDate).isAfter(dayjs())) && (
                <>
                  {cart?.some((i) => i.slug === pub.slug) ? (
                    <Link className="button disarm" href="/cart">
                      <h4>
                        {
                          cart.filter((i) => i.slug === pub.slug)[0]
                            .quantity
                        }{" "}
                        in cart
                      </h4>
                    </Link>
                  ) : (
                    <button onClick={() => addCartItem(pub.slug)}>
                      <h4>add to cart</h4>
                    </button>
                  )}
                </>
              )
            )}
            <h1 className="italic title">{pub.title}</h1>
          </div>
          <h2 className="--muted ta-right author">by {pub.author}</h2>
          {description &&
            documentToReactComponents(description, richTextOptions)}
          <div className="image image-mobile">
            {coverUrl && (
              <Image
                src={`https:${coverUrl}`}
                alt={`${pub.title} cover`}
                width={600}
                height={800}
                style={{ width: "100%", height: "auto" }}
              />
            )}
          </div>
          {pub.copies && (
            <h2 className="--muted">
              this edition is limited to {pub.copies} copies.
            </h2>
          )}
          {isPreorder && (
            <h2 className="--muted">
              this book is currently available for preorder and ships{" "}
              {dayjs(pub.preorderShipDate).format("MMMM D")}.
            </h2>
          )}
          <h1>details</h1>
          {pub.editors && <h2 className="m-0">edited by {pub.editors}</h2>}
          {pub.typesetting && (
            <h2 className="m-0">typesetting by {pub.typesetting}</h2>
          )}
          {pub.coverDesign && (
            <h2 className="m-0">cover design by {pub.coverDesign}</h2>
          )}
          {pub.artwork && <h2 className="m-0">artwork by {pub.artwork}</h2>}
          {pub.publisher && (
            <h2 className="m-0">printed by {pub.publisher}</h2>
          )}
          {releaseDate && (
            <h2 className="m-0">published in {releaseDate}</h2>
          )}
          {pub.genre && <h2 className="m-0">{pub.genre}</h2>}
          {pub.format && <h2 className="m-0">{pub.format}</h2>}
          {pub.pageCount && (
            <h2 className="m-0">{pub.pageCount} pages</h2>
          )}
          {pub.isbn && <h2 className="m-0">ISBN: {pub.isbn}</h2>}
          {pub.price && (
            <h2 className="m-0">{formatPrice(pub.price, "USD")}</h2>
          )}
          {pub.copies && (
            <h2 className="m-0">limited to {pub.copies} copies</h2>
          )}
          {pub.soldOut && (
            <h2 className="m-0 --muted">this publication is sold out</h2>
          )}
          {pub.saleEnded && (
            <h2 className="m-0 --muted">
              sales for this publication have ended
            </h2>
          )}
        </>
      )}
    </Product>
  );
}
