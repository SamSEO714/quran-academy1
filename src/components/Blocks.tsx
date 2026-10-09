import Link from "next/link";
import type { ReactNode } from "react";
import type { Block } from "@/content/types";

/** Turns "[text](/path)" inside content strings into links. */
export function rich(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const href = m[2];
    out.push(
      href.startsWith("/") ? (
        <Link key={m.index} href={href} className="link">
          {m[1]}
        </Link>
      ) : (
        <a key={m.index} href={href} className="link" rel="noopener">
          {m[1]}
        </a>
      ),
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function Table({ head, rows, caption }: { head: string[]; rows: ReactNode[][]; caption?: string }) {
  return (
    <div className="tbl-wrap" tabIndex={0} role="region" aria-label={caption ?? "Table"}>
      <table className="tbl">
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) =>
                j === 0 ? (
                  <th key={j} scope="row">
                    {c}
                  </th>
                ) : (
                  <td key={j}>{c}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-q">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} id={slugify(b.text)}>
                {b.text}
              </h2>
            );
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "p":
            return <p key={i}>{rich(b.text)}</p>;
          case "note":
            return (
              <p key={i} className="rounded-lg border-l-4 border-gold bg-white px-4 py-3">
                {rich(b.text)}
              </p>
            );
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{rich(it)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{rich(it)}</li>
                ))}
              </ol>
            );
          case "table":
            return <Table key={i} head={b.head} caption={b.caption} rows={b.rows.map((r) => r.map((c) => rich(c)))} />;
        }
      })}
    </div>
  );
}
