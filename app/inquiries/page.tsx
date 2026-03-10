import Link from "next/link";
import Layout from "@/components/Layout";
import Window from "@/components/Window";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "inquiries",
  description:
    "contact us with questions, submissions, or just to say hello.",
  alternates: { canonical: "/inquiries" },
};

export default function InquiriesPage() {
  return (
    <Layout page="inquiries">
      <Window className="small" crumbs={[{ title: "submissions" }]}>
        <h1>inquiries</h1>
        <h2>
          have a question, or simply want to say hello? email us at{" "}
          <a href="mailto:hi@9vtbackslash5.com" rel="nofollow">
            hi@9vtbackslash5.com
          </a>
          .
        </h2>
        <h2>
          want a recipe from Jack, a poem from Zelda, or a picture of Nico, the
          cutest husky, from Merryweather? find their emails{" "}
          <Link href="/about">here</Link>.
        </h2>
        <h2>
          interested in submitting your work? find all submissions-related
          information <Link href="/submissions">here</Link>, unless you already
          know what you&apos;re doing, in which case email us at{" "}
          <a href="mailto:submissions@9vtbackslash5.com" rel="nofollow">
            submissions@9vtbackslash5.com
          </a>
          .
        </h2>
        <h2>
          have any questions about a transaction? email{" "}
          <a href="mailto:transactions@9vtbackslash5.com" rel="nofollow">
            transactions@9vtbackslash5.com
          </a>
          .
        </h2>
        <h2>
          and you can always find on Instagram at{" "}
          <a
            href="https://instagram.com/9vtbackslash5"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            @9vtbackslash5
          </a>
          .
        </h2>
      </Window>
    </Layout>
  );
}
