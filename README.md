# Rehal Quran Academy website (a project of Pajee Foundation)

A complete lead-generation website for an online Quran academy, with an admin dashboard for trial requests.

- **Framework:** Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript
- **Hosting:** Vercel, with the code on GitHub
- **Database:** Postgres (Neon through Vercel works out of the box)
- **Pages:** 30 public pages, all pre-rendered as static HTML for speed

> "Rehal Quran Academy" and "Pajee Foundation" are **temporary names**. The academy name, the parent organisation ("A project of ...") and the address `quran.pajee.org` are all set in one file: `src/content/site.ts`.

---

## 1. Run it on your computer

```bash
npm install
cp .env.example .env.local     # then open .env.local and set ADMIN_PASSWORD and AUTH_SECRET
npm run dev
```

Open http://localhost:3000. The dashboard is at http://localhost:3000/admin.

Without a `DATABASE_URL`, leads are saved to `.data/leads.json` on your computer so you can try everything first.

## 2. Put it live (GitHub + Vercel)

1. Create a new **empty** repository on GitHub.
2. In this folder run:
   ```bash
   git init
   git add .
   git commit -m "Quran academy website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
   Use these commands rather than uploading through the GitHub website. Drag-and-drop upload can flatten the folders, and the site will not build.
3. On vercel.com choose **Add New > Project**, import the repository and press **Deploy**. No build settings need changing.
4. In the Vercel project open **Storage > Create Database > Neon (Postgres)** and connect it to the project. This adds `DATABASE_URL` for you. The `leads` table is created automatically on the first request.
5. In **Settings > Environment Variables** add the values below, then **Redeploy**.

| Variable | Needed | What it is |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://quran.pajee.org`. Used for canonical URLs, the sitemap and schema. |
| `ADMIN_PASSWORD` | Yes | Password for `/admin`. The dashboard stays locked until this is set. |
| `AUTH_SECRET` | Yes | Any long random text. It signs the login cookie. |
| `DATABASE_URL` | Yes | Added by the Neon integration. |
| `NEXT_PUBLIC_WHATSAPP` | Recommended | WhatsApp number, digits only with country code. Empty hides every WhatsApp button. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Recommended | Public email. Empty hides it. |
| `RESEND_API_KEY`, `LEAD_ALERT_TO`, `LEAD_ALERT_FROM` | Recommended | Email alert for each new lead, sent through resend.com. |
| `LEAD_WEBHOOK_URL` | Optional | Posts each lead as JSON to Zapier, Make or a Google Sheet script. |
| `NEXT_PUBLIC_GA_ID` | Optional | Google Analytics 4 ID (`G-XXXX`). |
| `NEXT_PUBLIC_META_PIXEL_ID` | Optional | Meta Pixel ID. |
| `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` | Optional | Google Ads conversion (`AW-XXXX` and the label). |
| `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION` | Optional | Search Console and Bing Webmaster verification codes. |
| `ADMIN_TIMEZONE` | Optional | Time zone for dates in the dashboard, e.g. `Asia/Karachi`. |

6. Connect the subdomain:
   1. In Vercel open **Settings > Domains**, type `quran.pajee.org` and press **Add**.
   2. Vercel shows a **CNAME** record. Where the DNS for `pajee.org` is managed (your domain registrar or Cloudflare), add it: type `CNAME`, name `quran`, value exactly as Vercel shows it.
   3. Wait until Vercel shows the domain as valid. It issues the HTTPS certificate by itself.
   4. Do not point the main `pajee.org` record at this project. Only the `quran` subdomain belongs to the academy.

## 3. Before you launch: make it yours

Everything a visitor reads comes from the files in `src/content/`. No page code needs touching.

| File | What you change there |
|---|---|
| `site.ts` | Academy name, parent organisation name, WhatsApp, email, address, social links, trial offer, teaching languages, sibling discount, **your story**, **your teachers**, **your reviews** |
| `pricing.ts` | Monthly fees in USD, GBP, AUD and CAD |
| `courses.ts` | The 8 course pages |
| `pages.ts` | Country pages (USA, UK, Australia, Canada) and audience pages (kids, adults, female teachers) |
| `faqs.ts` | Questions and answers |
| `blog.ts` | Guide articles |
| `legal.ts` | Privacy policy, terms, refund policy |

**Check these four things. They are statements about your academy, so they must be true:**

1. **Fees** in `pricing.ts`. The figures are a competitive starting point, not your decision.
2. **Teacher statements** on the About page and in `faqs.ts` (how teachers are selected, female teachers, Ijazah holders, English).
3. **Policies**: 3 free trial classes, no registration fee, 10% sibling discount, missed-class and refund rules.
4. **Legal pages** in `legal.ts`.

The site shows **no reviews, student numbers or star ratings** because none have been supplied. Add real reviews to `site.ts` and the reviews section and rating schema appear automatically. Do not add invented ones: Google penalises fake review markup and families can tell.

## 4. The dashboard (`/admin`)

- **Overview:** leads waiting for a reply, last 7 and 30 days, trials, enrolments, leads per day, and breakdowns by pipeline stage, source, country, course, page and campaign.
- **Leads:** search and filter by status, country and source.
- **Lead page:** one-tap WhatsApp, call and email. Shows the family's local time, their request, and exactly how they found you (UTM tags, Google and Meta click IDs, referrer, first page visited). Set the status and keep notes.
- **Download CSV:** every lead with every field.

Pipeline stages: New, Contacted, Trial booked, Trial done, Enrolled, Lost.

**Tracking ad campaigns:** tag every ad link, for example
`https://quran.pajee.org/online-quran-classes-uk?utm_source=facebook&utm_medium=paid&utm_campaign=uk-mums-video`.
The tags are remembered while the visitor browses and saved with the lead, so the dashboard shows which campaign produced which enrolment.

## 5. Add content

**A new guide article:** copy one object in `src/content/blog.ts`, change the `slug`, write the `answer` (40 to 60 words that answer the title question on their own) and the `blocks`. It gets its own page, schema, sitemap entry and a line in `/llms.txt` automatically.

**A new country or city page:** copy a country object in `src/content/pages.ts` and change the slug, text, time zones and FAQs. Only add a page when you can write something specific to that place. Thin copies with the city name swapped do not rank.

**A new course:** add an object in `src/content/courses.ts`.

After any change: `git add . && git commit -m "Update content" && git push`. Vercel redeploys by itself.

## 6. What is built in for SEO, GEO and AEO

- One keyword target per page, in the URL, title, H1 and first paragraph
- A direct 40 to 60 word answer at the top of every page
- Schema: EducationalOrganization, WebSite, Course, Service, FAQPage, BreadcrumbList, BlogPosting, OfferCatalog
- `hreflang` between the USA, UK, Australia and Canada pages
- `/sitemap.xml`, `/robots.txt` (search and AI crawlers allowed), `/llms.txt`
- Fees, time zones and comparisons in real HTML tables
- Static pages, self-hosted fonts, no images to download, no tracking until consent
- Cookie consent that gates Google Analytics, Google Ads and Meta Pixel

See `docs/SEO-PLAYBOOK.md` for the competitor analysis and the plan for ranking.
