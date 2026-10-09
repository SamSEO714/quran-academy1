import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export function Breadcrumbs({ items, light = false }: { items: { name: string; path: string }[]; light?: boolean }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${light ? "text-white/70" : "text-muted"}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {all.map((it, i) => (
          <li key={it.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i < all.length - 1 ? (
              <Link href={it.path} className="underline-offset-2 hover:underline">
                {it.name}
              </Link>
            ) : (
              <span aria-current="page" className={light ? "text-white" : "text-ink"}>
                {it.name}
              </span>
            )}
          </li>
        ))}
      </ol>
      <JsonLd data={breadcrumbSchema(all)} />
    </nav>
  );
}
