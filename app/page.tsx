import Layout from "@/components/Layout";
import HomeLogo from "@/components/HomeLogo";
import { organizationJsonLd } from "@/lib/jsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "9VT\\5 — independent publishing house",
  description:
    "9VT\\5 is an independent publishing house and creative platform for artists, authors, and others.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <Layout page="home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd()),
        }}
      />
      <HomeLogo />
    </Layout>
  );
}
