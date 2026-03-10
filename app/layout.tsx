import "@/styles/styles.scss";
import Providers from "@/contexts/Providers";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "9VT\\5",
    template: "%s | 9VT\\5",
  },
  description:
    "9VT\\5, also 9vtbackslash5, is an independent publishing house and creative platform for artists, authors, and others. We love putting novel ideas into the world, from books to collections of art.",
  metadataBase: new URL("https://www.9vtbackslash5.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "9VT\\5",
    url: "/",
    title: "9VT\\5",
    description:
      "independent publishing house and creative platform for artists, authors, and others.",
  },
  twitter: {
    card: "summary",
    title: "9VT\\5",
    description:
      "independent publishing house and creative platform for artists, authors, and others.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
