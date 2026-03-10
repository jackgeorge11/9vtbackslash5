import Link from "next/link";
import Layout from "@/components/Layout";
import Window from "@/components/Window";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Layout page="404">
      <Window className="small" crumbs={[{ title: "404 \\ page not found" }]}>
        <h1>404 \\ this page does not exist</h1>
        <h2>
          well, clearly <span className="italic">a</span> page exists, but
          it&apos;s probably not the page you were looking for.
        </h2>
        <h2>
          <Link href="/">click here</Link> to navigate back to the home page,
        </h2>
        <h2>
          <Link href="/catalogue">click here</Link> to check out our catalogue,
        </h2>
        <h2>
          or{" "}
          <a
            href="https://instagram.com/9vtbackslash5"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            click here
          </a>{" "}
          to check out our Instagram.
        </h2>
      </Window>
    </Layout>
  );
}
