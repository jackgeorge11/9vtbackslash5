import { useStaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../../components/Layout";
import Window from "../../components/Window";

export default function Index() {
  const getMood = (range) => {
    const n = Math.floor(Math.random() * 10) + 1;
    if (n === 10) {
      return n;
    } else {
      return "0" + n;
    }
  };

  const { allContentfulPublication } = useStaticQuery(graphql`
    query MyQuery {
      allContentfulPublication {
        edges {
          node {
            id
            releaseDate(formatString: "MMMM YYYY")
            soldOut
            title
            description {
              raw
            }
            slug
            cover {
              id
              gatsbyImage(width: 10, height: 10)
            }
          }
        }
      }
    }
  `);

  const items = allContentfulPublication?.edges;

  const image = getImage(items[1].node.cover);

  console.log(items[1].node.cover);

  return (
    <div>
      <Layout page="catalogue">
        <Window className="large catalogue">
          <GatsbyImage src={image} alt="test" />
          <div className="description">
            <h1>catalogue</h1>
            <h2>discover everything 9VT\5 has put into the world.</h2>
            <h2 className="--muted">(scroll -->)</h2>
          </div>
          {items.map((item, i) => {
            return (
              <div className="idea">
                <Link
                  to={`/catalogue/${item.node.slug}`}
                  className="cover"
                >
                  <GatsbyImage
                    src={getImage(item.node.cover)}
                    alt={item.node.title}
                  />
                </Link>
                <div className="info">
                  <h1 className="italic">
                    <Link to={`/catalogue/${item.node.slug}`}>
                      {item.node.title}
                    </Link>
                  </h1>
                  <h2>by {item.node.authors}</h2>
                  <h3>{item.node.release}</h3>
                </div>
              </div>
            );
          })}
          {/* <div className="idea">
            <Link to="/catalogue/between-there-and-now-too" className="cover">
              <StaticImage src="../../assets/catalogue/publications/between-there-and-now-too/front.png" />
            </Link>
            <div className="info">
              <h1 className="italic">
                <Link to="/catalogue/between-there-and-now-too">
                  Between There and Now, too
                </Link>
              </h1>
              <h2>by various authors</h2>
              <h3>May 2022</h3>
            </div>
          </div>
          <div className="idea">
            <Link to="/catalogue/moods/cottu" className="cover">
              {getCover()}
            </Link>
            <div className="info">
              <Link to="/catalogue/moods/cottu">
                <h1 className="italic">Moods</h1>
              </Link>
              <h2>by Juliette Cottu</h2>
              <h3>May 2021</h3>
              <h3 className="--muted">(sale ended)</h3>
            </div>
          </div>
          <div className="idea">
            <Link to="/catalogue/triple-entendre" className="cover">
              <StaticImage src="../../assets/catalogue/publications/triple-entendre/front.jpg" />
            </Link>
            <div className="info">
              <Link to="/catalogue/triple-entendre">
                <h1 className="italic">Triple Entendre</h1>
              </Link>
              <h2>by Jack George</h2>
              <h3>March 2021</h3>
              <h3 className="--muted">(sold out)</h3>
            </div>
          </div> */}
        </Window>
      </Layout>
    </div>
  );
}
