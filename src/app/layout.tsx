import type { Metadata, Viewport } from "next";
import "@fontsource-variable/figtree/index.css";
import "@fontsource-variable/literata/index.css";
import "@fontsource/amiri/arabic-400.css";
import "./globals.css";
import { site } from "@/content/site";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `Online Quran Classes for Kids and Adults | ${site.name}`, template: `%s | ${site.shortName}` },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = { themeColor: "#0f2340", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
