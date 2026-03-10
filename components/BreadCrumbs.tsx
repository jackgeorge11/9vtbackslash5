import Link from "next/link";
import type { Crumb } from "@/lib/types";

interface BreadCrumbsProps {
  crumbs?: Crumb[];
  className?: string;
}

export default function BreadCrumbs({ crumbs, className }: BreadCrumbsProps) {
  return crumbs && crumbs.length ? (
    <div className={`breadcrumbs ${className ? className : ""}`}>
      <h4 className="--muted">
        {crumbs.map((c, i) => (
          <span key={c.title}>
            {i === crumbs.length - 1 ? (
              <span className="--dark">{c.title}</span>
            ) : (
              <Link href={c.slug!} className="under --muted">
                {c.title}
              </Link>
            )}
            {i !== crumbs.length - 1 && <span className="divider">•</span>}
          </span>
        ))}
      </h4>
    </div>
  ) : null;
}
