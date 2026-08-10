import { getAllPublications } from "@/lib/contentful";
import CartClient from "./CartClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "cart",
  robots: { index: false, follow: false },
};

export const revalidate = 3600;

export default async function CartPage() {
  const publications = await getAllPublications();
  return <CartClient publications={publications} />;
}
