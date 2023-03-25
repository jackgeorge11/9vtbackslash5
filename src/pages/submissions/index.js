import { Link, graphql, useStaticQuery } from "gatsby";
import React from "react";
import Layout from "../../components/Layout";
import Window from "../../components/Window";

export default function Index() {
  const { allContentfulOpenCall } = useStaticQuery(graphql`
    query {
      allContentfulOpenCall {
        edges {
          node {
            title
            slug
          }
        }
      }
    }
  `);

  return (
    <Layout
      page="submissions"
      title="submissions"
      description="find out everything you need to know about releasing or publishing your work with 9VT\5."
    >
      <Window className="small" crumbs={[{ title: "submissions" }]}>
        <h1>submissions</h1>
        <h2>
          we seek all sorts of work, from books in print to collections of art
          to alternative mediums, whether they be material, digital or
          conceptual in nature.
        </h2>
        <h2>
          if you are interested in publishing your work with us, or want to
          discuss giving expression to a project you've been ruminating over,
          send a note to{" "}
          <a href="mailto:submissions@9vtbackslash5.com" rel="nofollow">
            submissions@9vtbackslash5.com
          </a>
          .
        </h2>
        <h2>
          if we love it, we'll work with you to bring it further into the world.
          `
        </h2>
        <h1>open calls</h1>
        <h2 className="--muted">
          (this is where we list projects our team is currently working on, new
          and recurring.)
        </h2>
        {allContentfulOpenCall.edges.map((call) => (
          <Link to={`/submissions/${call.node.slug}`} className="m-0">
            {call.node.title}
          </Link>
        ))}
      </Window>
    </Layout>
  );
}
