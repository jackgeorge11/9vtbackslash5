import { Link } from "gatsby";
import React from "react";
import Layout from "../../components/Layout";
import Window from "../../components/Window";

export default function index() {
  return (
    <div>
      <Layout
        page="inquiries"
        title="inquiries"
        description="contact us if you have any questions about what we do or how you can get involved."
      >
        <Window className="small">
          <h1>inquiries</h1>
          <h2>
            have any questions, or simply want to say hello? email us at{" "}
            <a href="mailto:hi@9vtbackslash5.com">hi@9vtbackslash5.com</a>.
          </h2>
          <h2>
            want a recipe from jack, a tarot reading from isabella, or a picture
            of Nico, our favorite dog, from Marlon? find their emails{" "}
            <Link to="/about">here</Link>.
          </h2>
        </Window>
      </Layout>
    </div>
  );
}
