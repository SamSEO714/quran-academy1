export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  | { type: "note"; text: string };

export type Faq = { q: string; a: string };

export type Currency = "USD" | "GBP" | "AUD" | "CAD";
