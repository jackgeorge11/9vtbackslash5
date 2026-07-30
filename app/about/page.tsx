import Layout from "@/components/Layout";
import Window from "@/components/Window";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "about",
  description:
    "about us: 9VT\\5 is an independent publishing house for artists and writers.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Layout page="about">
      <Window className="small about" crumbs={[{ title: "about" }]}>
        <h1>about</h1>
        <h2>
          9VT\5 is an independent publishing house for artists and writers.
        </h2>
        <h2>
          we like to put novel stories and ideas into the world with a focus on
          limited-run editions.
        </h2>
        <h2>
          our interests lie across an array of disciplines, from the work of
          visual artists to the publication of academic theses.
        </h2>
        <h1>our name</h1>
        <h2>
          a product of chance: our previous creative lead, Isabella, wandered
          into her local tattoo shop with numbers, letters and characters
          scrawled out individually on torn fragments of notebook paper,
          enclosed in a winter cap.
        </h2>
        <h2>
          she invited the first available artist to roll a six-sided die, give
          the cap a shake, and blindly draw the respective number of scraps from
          the selection.
        </h2>
        <h2>
          she left that morning with the symbols{" "}
          <span className="thick">&quot;9VT\5&quot;</span> tattooed on the
          outside of her left wrist.
        </h2>
        <h2>
          what better way to deify this mistrustfulness of meaning than to name
          our platform after it, one that helps artists give expression to their
          ideas.
        </h2>
        <h1>our team</h1>
        <h2>
          Jack George <span className="--muted">(founder, editor)</span>
        </h2>
        <a
          href="mailto:jack@9vtbackslash5.com"
          rel="nofollow"
          className="mb-md"
        >
          jack@9vtbackslash5.com
        </a>
        <h2>
          Marlon Paine (Merryweather){" "}
          <span className="--muted">(editor in chief)</span>
        </h2>
        <a
          href="mailto:merryweather@9vtbackslash5.com"
          rel="nofollow"
          className="mb-md"
        >
          merryweather@9vtbackslash5.com
        </a>
        <h2>
          Zelda Solomon <span className="--muted">(creative lead, editor)</span>
        </h2>
        <a
          href="mailto:zelda@9vtbackslash5.com"
          rel="nofollow"
          className="mb-md"
        >
          zelda@9vtbackslash5.com
        </a>
      </Window>
    </Layout>
  );
}
