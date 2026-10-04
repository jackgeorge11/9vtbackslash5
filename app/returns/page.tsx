import Link from "next/link";
import Layout from "@/components/Layout";
import Window from "@/components/Window";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "return policy",
  description:
    "how to return or exchange a book bought from 9VT\\5, and what happens if one arrives damaged.",
  alternates: { canonical: "/returns" },
};

export default function ReturnsPage() {
  return (
    <Layout page="about">
      <Window className="small about" crumbs={[{ title: "returns" }]}>
        <h1>return policy</h1>
        <h3 className="--muted mb-md">last updated 3 October 2026</h3>
        <h2 className="--muted">
          if a book is not what you hoped for, we will take it back. email{" "}
          <a href="mailto:transactions@9vtbackslash5.com" rel="nofollow">
            transactions@9vtbackslash5.com
          </a>{" "}
          and we will sort it out with you directly.
        </h2>

        <h2 className="--muted">
          you have 30 days from the day your order arrives to tell us you want
          to return it, and 14 days after that to post it back. books need to
          come back unread and undamaged, in the condition they reached you.
          these are small limited runs and a returned copy has to be sellable to
          someone else.
        </h2>

        <h2 className="--muted">
          we refund what you paid for the book, including the original shipping,
          once it is back with us and we have checked it over. refunds go back
          to the PayPal account you paid with, usually within five working days
          of arrival. however, return postage is yours to cover unless the book
          arrived damaged, we sent the wrong title, or it never turned up—in
          which case all of it is on us.
        </h2>

        <h2 className="--muted">
          if a book is damaged you must email us a photograph within 14 days of
          arrival. we will replace the copy if we still have one and refund you
          in full if we do not. you will not be asked to post a damaged book
          back at your own expense.
        </h2>

        <h2 className="--muted">
          a preorder can be cancelled for a full refund at any point before it
          ships, for any reason. just email us. once it has shipped it is an
          ordinary order and the 30 days above apply from the day it arrives.
        </h2>

        <h2 className="--muted">
          nothing here replaces the rights you already have. buyers in the UK
          and EU keep the statutory right to cancel a distance purchase within
          14 days of delivery, and the policy above is intended to be more
          generous than that rather than a substitute for it.
        </h2>
        <h3 className="--muted">
          see also our <Link href="/privacy">privacy policy</Link>.
        </h3>
      </Window>
    </Layout>
  );
}
