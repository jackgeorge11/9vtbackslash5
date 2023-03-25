import { Link } from "gatsby";
import * as React from "react";
import Layout from "../components/Layout";
import Window from "../components/Window";

export default function NotFoundPage() {
  return (
    <Layout
      page="404"
      title="page not found"
      additional={[{ name: "robots", content: "noindex" }]}
    >
      <Window className="small" crumbs={[{ title: "404 \\ page not found" }]}>
        <h1>404 \\ this page does not exist</h1>
        <h2>
          well, clearly <span className="italic">a</span> page exists, but it's
          probably not the page you were looking for.
        </h2>
        <h2>
          <Link to="/">click here</Link> to navigate back to the home page,
        </h2>
        <h2>
          <Link to="/catalogue">click here</Link> to check out our catalogue,
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
