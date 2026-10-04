import Link from "next/link";
import Layout from "@/components/Layout";
import Window from "@/components/Window";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "privacy policy",
  description:
    "what 9VT\\5 collects, what we do not, and how to reach us about it.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Layout page="about">
      <Window className="small about" crumbs={[{ title: "privacy" }]}>
        <h1>privacy policy</h1>
        <h3 className="--muted mb-md">last updated 3 October 2026</h3>
        <h2>
          we are a small publishing house and we collect as little as we can get
          away with. this page describes all of it.
        </h2>

        <h1>what we do not do</h1>
        <h2>
          we run no analytics, no advertising pixels and no third-party
          tracking of any kind. we do not profile you, and we have nothing to
          sell to anyone about you.
        </h2>
        <h2>
          we set no cookies of our own. when the PayPal button loads on the
          cart page, PayPal sets its own cookies under its own policy — that is
          the only cookie activity on this site.
        </h2>

        <h1>your cart</h1>
        <h2>
          your cart lives in your browser&apos;s local storage, on your own
          device. it holds only which titles you picked, how many, and the
          shipping destination you chose. it is never sent to us and we cannot
          read it.
        </h2>
        <h2>
          clearing your browser storage deletes it. nothing of it survives
          anywhere else.
        </h2>

        <h1>when you buy something</h1>
        <h2>
          payment is handled entirely by PayPal. your card details go to PayPal
          and never to us — we never see or store them.
        </h2>
        <h2>
          PayPal passes us what we need to send you a book: your name, your
          shipping address, and the email address on your PayPal account. we
          use it to fulfil and support your order, and for nothing else. we
          keep order records for as long as tax and accounting rules require.
        </h2>
        <h2>
          we never sell, rent or trade your details, and we do not add you to a
          mailing list because you bought something.
        </h2>

        <h1>when you email us</h1>
        <h2>
          everything on this site is a plain mailto link, so emailing us simply
          sends us an email. we keep correspondence as long as it is useful to
          answer you, and submissions for as long as we are considering them.
        </h2>

        <h1>who else is involved</h1>
        <h2>
          our pages and book details are stored with Contentful, our payments
          run through PayPal, and the site itself runs on a hosting provider
          that keeps standard server logs — including IP addresses — for
          security and diagnostics. each handles data under its own policy.
        </h2>
        <h2>
          if you arrive here by tapping a product on Instagram, Meta knows you
          tapped it, in the same way it knows about any link you follow. we do
          not run a Meta pixel and we send nothing back to Meta about what you
          do here.
        </h2>

        <h1>your rights</h1>
        <h2>
          you can ask us what we hold about you, ask us to correct it, or ask
          us to delete it. if you are in the UK or EU you have these rights
          under the GDPR, and we will honour the same request from anyone,
          anywhere.
        </h2>
        <h2>
          email{" "}
          <a href="mailto:transactions@9vtbackslash5.com" rel="nofollow">
            transactions@9vtbackslash5.com
          </a>{" "}
          and we will answer within 30 days. we may need to keep a record of a
          completed sale even after a deletion request, where the law requires
          it.
        </h2>

        <h1>children</h1>
        <h2>
          this site is not aimed at children under 13, and we do not knowingly
          collect anything from them.
        </h2>

        <h1>changes</h1>
        <h2>
          if this policy changes we will update the date at the top of this
          page. questions about any of it go to{" "}
          <a href="mailto:transactions@9vtbackslash5.com" rel="nofollow">
            transactions@9vtbackslash5.com
          </a>
          .
        </h2>
        <h3 className="--muted">
          see also our <Link href="/returns">return policy</Link>.
        </h3>
      </Window>
    </Layout>
  );
}
