import { Link } from "gatsby";
import React from "react";
import Product from "../../../components/Product";

export default function index() {
  return (
    <Product src="./assets/catalogue/publications/triple-entendre/front.jpg">
      <h1 className="italic">Triple Entendre</h1>
      <h2>
        written by Jack George, artwork by Isabella Greenwood, published in
        March 2021
      </h2>
      <h2>
        put unbecomingly, this story is about a person searching for a blue
        piece of sea glass, a person speaking reminiscently to an (for the most
        part) unidentified interlocutor, and a person who, well, doesn't give
        much away.
      </h2>
      <h2>
        put technically, the story is a meditation on time told over the tail
        end of thirty days on an uncanny island, thirty minutes of anecdotal
        retrospection, and thirty seconds of sheer denial.
      </h2>
      <h2 className="--muted">(this publication is sold out)</h2>
      <h2>
        <Link to="/catalogue">click here</Link> to navigate back to our
        catalogue.
      </h2>
      <h1>details</h1>
      <h2 className="m-0">published in March 2022</h2>
      <h2 className="m-0">fiction</h2>
      <h2 className="m-0">softcover</h2>
      <h2 className="m-0">101 pages</h2>
      <h2 className="m-0">ISBN: 978-1-63848-545-2</h2>
      <h2 className="m-0">$12</h2>
      <h2 className="--muted">(this publication is sold out)</h2>
      <h2>
        <Link to="/catalogue">click here</Link> to navigate back to our
        catalogue.
      </h2>
    </Product>
  );
}
