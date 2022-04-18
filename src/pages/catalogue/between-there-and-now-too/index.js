import { Link } from "gatsby";
import React from "react";
import Product from "../../../components/Product";

export default function index() {
  return (
    <Product src="./assets/catalogue/publications/between-there-and-now-too/front.jpg">
      <h1 className="italic">Between There and Now, too</h1>
      <h2>
        written by various authors, artwork by Isabella Greenwood, published in
        May 2022
      </h2>
      <h2>
        twenty-three stories from eleven different authors; something you’re
        guaranteed to love.
      </h2>
      <h2>
        at least we did — that’s why they’re in here. Fiction and nonfiction,
        from writers who will see their work in print for the first time to
        those who teach at college classes on the subject.
      </h2>
      <h2>this publication will be available for preorder on May 1st, 2022.</h2>
      <h2>
        <Link to="/catalogue">click here</Link> to navigate back to our
        catalogue.
      </h2>
      <h1>details</h1>
      <h2 className="m-0">fiction</h2>
      <h2 className="m-0">softcover</h2>
      <h2 className="m-0">205 pages</h2>
      <h2 className="m-0">ISBN: 978-1-63848-545-2</h2>
      <h2 className="m-0">$17</h2>
      <h2>
        <Link to="/catalogue">click here</Link> to navigate back to our
        catalogue.
      </h2>
    </Product>
  );
}
