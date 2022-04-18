import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../../components/Layout";
import Window from "../../components/Window";

export default function index() {
  return (
    <div>
      <Layout page="about">
        <Window className="small about">
          <h1>about</h1>
          <h2>
            9VT\5 is an independent publishing house and creative platform for
            artists, authors, and others.
          </h2>
          <h2>
            We like to put novel ideas and stories into the world with a focus
            on limited-run collections and editions.
          </h2>
          <h2>
            Our interests lie across an array of disciplines, from the
            manifestations of psychics to the publication of academic theses.
          </h2>
          <h1>our name</h1>
          <h2>
            Isabella wandered into her local body art studio armed with
            sixty-odd keyboard characters, scrawled each on a fragment of torn
            notebook paper, enclosed in a worn out winter cap.
          </h2>
          <h2>
            she invited the first available artist to roll a six-sided die, give
            the cap a shake, and blindly draw the respective number of scraps
            from the selection.
          </h2>
          <h2>
            she left that morning with the symbols{" "}
            <span className="thick">"9VT\5"</span> tattooed on the outside of
            her left wrist.
          </h2>
          <h2>
            what better way to deify this mistrustfulness of meaning than to
            found a platform for creators to give their ideas expression.
          </h2>
          <h1>our team</h1>
          <div className="team">
            <div className="member">
              <div>
                <h2>Jack George</h2>
                <h2 className="--muted">(founder)</h2>
              </div>
              <div className="sketch">
                <StaticImage src="../../assets/team/jack.png" alt="jack" />
              </div>
            </div>
            <div className="member">
              <div>
                <h2>Isabella Greenwood</h2>
                <h2 className="--muted">(creative-director)</h2>
              </div>
              <div className="sketch">
                <StaticImage
                  src="../../assets/team/isabella.png"
                  alt="isabella"
                />
              </div>
            </div>
            <div className="member">
              <div>
                <h2>Marlon Webster Paine</h2>
                <h2 className="--muted">(editor-in-chief)</h2>
              </div>
              <div className="sketch">
                <StaticImage src="../../assets/team/marlon.png" alt="marlon" />
              </div>
            </div>
          </div>
        </Window>
      </Layout>
    </div>
  );
}
