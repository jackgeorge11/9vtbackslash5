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
        <h2 className="--muted">
          we are a small publishing house and we collect as little as we can get
          away with. this page describes all of it.
        </h2>

        <h2 className="--muted">
          we run no analytics, no advertising pixels and no third-party tracking
          of any kind. we do not profile you, and we have nothing to sell to
          anyone about you. we set no cookies of our own either—when the PayPal
          button loads on the cart page, PayPal sets its own under its own
          policy, and that is the only cookie activity on this site.
        </h2>

        <h2 className="--muted">
          your cart lives in your browser&apos;s local storage, on your own
          device. it holds only which titles you picked, how many, and the
          shipping destination you chose. it is never sent to us and we cannot
          read it. clearing your browser storage deletes it, and nothing of it
          survives anywhere else.
        </h2>

        <h2 className="--muted">
          payment is handled entirely by PayPal, so your card details go to them
          and never to us. PayPal stores information like your name, your
          shipping address, and the email address on your account, not us. we
          use this information to fulfil and support your order and for nothing
          else, we keep order records in Paypal for as long as tax and
          accounting rules require, and we never sell, rent or trade any of it.
        </h2>

        <h2 className="--muted">
          our pages and book details are stored with Contentful, our payments
          run through PayPal, and this site runs on a hosting provider that
          keeps standard server logs—including IP addresses—for security and
          diagnostics. each handles data under its own policy. if you arrive
          here by tapping a product on Instagram then Meta knows you tapped it,
          in the same way it knows about any link you follow, but we run no Meta
          pixel and send nothing back to them about what you do here.
        </h2>

        <h2 className="--muted">
          you can ask us what we hold about you, ask us to correct it, or ask us
          to delete it, but know that we may not always be able to complete the
          request, and may ask you to forward the request to PayPal where
          applicable. if you are in the UK or EU you have these rights under the
          GDPR, and we will honour the same request from anyone, anywhere. email{" "}
          <a href="mailto:transactions@9vtbackslash5.com" rel="nofollow">
            transactions@9vtbackslash5.com
          </a>
          . we will answer within 30 days.
        </h2>

        <h2 className="--muted">
          this site is not aimed at children under 13, and we do not knowingly
          collect anything from them.
        </h2>

        <h2 className="--muted">
          if this policy changes we will update the date at the top of this
          page. questions about any of it go to the same address.
        </h2>
        <h3 className="--muted">
          see also our <Link href="/returns">return policy</Link>.
        </h3>
      </Window>
    </Layout>
  );
}
