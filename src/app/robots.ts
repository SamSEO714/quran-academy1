import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Search crawlers and AI crawlers are both welcome on the public pages.
 * Being readable by GPTBot, ClaudeBot, PerplexityBot and Google-Extended is what makes
 * the site eligible to be quoted in AI answers (GEO / AEO).
 */
const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "CCBot", "Amazonbot", "meta-externalagent"];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/admin", "/api/", "/free-trial/thank-you"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: AI_BOTS, allow: "/", disallow },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
