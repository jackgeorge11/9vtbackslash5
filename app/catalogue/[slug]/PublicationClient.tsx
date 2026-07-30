"use client";

import { useContext, useEffect, useRef, useState } from "react";
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

  const { loading } = useContext(ColorContext);
  const { addCartItems, cart } = useContext(CartContext);

  const [, setTotal] = useState(pub.price + pub.price * pub.tax);
  const [subtotal, setSubtotal] = useState(pub.price);
  const [buyerOptions, setBuyerOptions] = useState({
    quantity: 1,
    shipping: "Select",
  });

  useEffect(() => {
    setSubtotal(pub.price * Number(buyerOptions.quantity));
  }, [buyerOptions.quantity, pub.price]);

  useEffect(() => {
    setTotal(
      subtotal +
        subtotal * pub.tax +
        (buyerOptions.shipping !== "Select"
          ? pub.shipping[Number(buyerOptions.shipping)].cost *
            buyerOptions.quantity
          : 0)
    );
  }, [buyerOptions, subtotal, pub]);

  const publicationWindow = useRef<HTMLElement>(null);

  const releaseDate = pub.releaseDate
    ? dayjs(pub.releaseDate).format("MMMM YYYY")
    : null;

  return (
    <Product
      src={coverUrl ? `https:${coverUrl}` : ""}
      alt={`${pub.title} cover`}
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
            {!pub.soldOut &&
              !pub.saleEnded &&
              ((pub.preorder &&
                !dayjs(pub.preorderShipDate).isAfter(dayjs())) ||
                !dayjs(pub.releaseDate).isAfter(dayjs())) && (
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
                    <button
                      onClick={() =>
                        addCartItems({
                          quantity: 1,
                          maxQuantity: 5,
                          slug: pub.slug,
                          url: `/catalogue/${pub.slug}`,
                          type: publication.sys.contentType.sys.id,
                          price: pub.price,
                          tax: pub.tax,
                          title: pub.title,
                          author: pub.author,
                          image: coverUrl
                            ? `https:${coverUrl}`
                            : undefined,
                          shipping: pub.shipping ?? [],
                          preorder: pub.preorder,
                          preorderShipDate: pub.preorderShipDate,
                        })
                      }
                    >
                      <h4>add to cart</h4>
                    </button>
                  )}
                </>
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
