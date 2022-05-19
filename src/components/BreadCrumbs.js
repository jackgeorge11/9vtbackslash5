import { Link } from "gatsby";
import React from "react";

function BreadCrumbs({ crumbs, className }) {
  return crumbs && crumbs.length ? (
    <div className={`breadcrumbs ${className ? className : ""}`}>
      <h4 className="--muted">
        {crumbs.map((c, i) => (
          <>
            {i === crumbs.length - 1 ? (
              <span className="--dark">{c.title}</span>
            ) : (
              <Link to={c.slug} className="under --muted">
                {c.title}
              </Link>
            )}
            {i !== crumbs.length - 1 && <span className="divider">•</span>}
          </>
        ))}
      </h4>
    </div>
  ) : null;
}

export default BreadCrumbs;
