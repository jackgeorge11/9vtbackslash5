import { Link } from "gatsby";
import * as React from "react";
import Layout from "../components/Layout";
import Window from "../components/Window";

export default function NotFoundPage() {
  return (
    <Layout page="404">
      <Window className="small">
        <h1>404 \\ this page does not exist</h1>
        <h2>
          well, clearly <span className="italic">a</span> page exists, but it's
          probably not the page you were looking for.
        </h2>
        <h2>
          <Link to="/">click here</Link> to navigate back to the home page.
        </h2>
        <h2>
          or{" "}
          <a
            href="https://instagram.com/9vtbackslash5"
            target="_blank"
            rel="noopener noreferrer"
          >
            click here
          </a>{" "}
          to checkout our Instagram.
        </h2>
      </Window>
    </Layout>
  );
}
