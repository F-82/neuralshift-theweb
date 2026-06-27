# NeuralShift — SEO / AEO / GEO Readiness Audit

**Scope:** `neuralshift/` static site (6 pages: `index`, `about`, `systems`, `case-studies`, `pricing`, `contact`).
**Date:** 2026-06-27
**Method:** Static source review only. No crawler, no Lighthouse, no live HTTP checks. No source files were modified.

**Status legend:** `[PASS]` present & adequate · `[PARTIAL]` present but incomplete · `[MISSING]` absent.

---

## 1. On-page SEO

| Item | Status | Where | Fix |
|---|---|---|---|
| `<title>` unique & descriptive | [PASS] | all 6 pages, line 6 | None — each page has a distinct, keyword-relevant title. |
| Meta description | [PASS] | all 6 pages, line 7 | None — all present, ~150–170 chars, benefit-led. |
| Exactly one `<h1>` | [PASS] | `index.html:42`, `about.html:39`, `systems.html:40`, `case-studies.html:40`, `pricing.html:39`, `contact.html:39` | None — every page has exactly one H1. |
| Heading hierarchy (no skipped levels) | [PASS] | H1 → H2 throughout; no H3/H4 jumps found | None. |
| Semantic HTML | [PARTIAL] | `<main>`/`<section>`/`<nav>`/`<footer>` used well; contact "form" is loose `<div>`s with `<label for>`, no `<form>` element (`contact.html:72–89`) | Wrap contact fields in `<form>`; consider `<article>` for the case study. |
| Image alt text | [PASS] | Only `<img>` is the nav logo, intentionally decorative (`alt=""` + `aria-hidden`, `components.js:36`) | None — wordmark text sits adjacent, so decorative alt is correct. |
| Internal linking | [PASS] | Shared nav + footer link all pages; in-body CTAs cross-link (`index.html:46,200,234`) | None — solid internal link graph. |
| Descriptive URLs | [PARTIAL] | URLs carry `.html` extensions (`about.html`, etc.) | Optional: serve extensionless clean URLs via host rewrites; keep canonicals consistent. |

---

## 2. Technical SEO

| Item | Status | Where | Fix |
|---|---|---|---|
| robots.txt | [PASS] | `neuralshift/robots.txt` | None — allows all, references sitemap. |
| sitemap.xml | [PARTIAL] | `neuralshift/sitemap.xml` | Valid & lists all 6 pages, but every URL lacks `<lastmod>`; add it for freshness signals. |
| Canonical tags | [PASS] | all 6 pages, line 8 | None — self-referential, absolute, HTTPS, matches sitemap. |
| `lang` attribute | [PASS] | `<html lang="en">` on all pages, line 2 | None. (Site mentions SI/TA support — `hreflang` only needed if localized pages ship.) |
| 404 handling | [MISSING] | no `404.html` in `neuralshift/` | Add a branded `404.html`; configure host to serve it. |
| HTTPS / redirect setup | [N/A — not verifiable in code] | host-level | Confirm HTTPS + non-www→www (or reverse) + `http→https` 301s at the host. |
| Broken internal links | [PASS] | all `href` targets (`index`/`about`/`systems`/`case-studies`/`pricing`/`contact`.html) exist; `mailto:` + `wa.me` valid | None found. |
| `meta robots` directives | [PASS] | none present (default index,follow) | None — absence is correct for a public marketing site. |

---

## 3. Structured data (schema.org JSON-LD)

| Item | Status | Where | Fix |
|---|---|---|---|
| Any JSON-LD present | [MISSING] | none in any page | Add `application/ld+json` blocks. |
| Organization | [MISSING] | — | Add `Organization` (name, url, logo, sameAs, contactPoint) site-wide. |
| LocalBusiness | [MISSING] | — | Add `LocalBusiness`/`ProfessionalService` with `areaServed: Sri Lanka`, Colombo/Galle, `telephone` (the wa.me number), `priceRange`. High value for a Sri Lankan service business. |
| FAQPage | [MISSING] | — | No FAQ content exists to mark up (see §4); add FAQ then `FAQPage`. |
| BreadcrumbList | [MISSING] | — | Flat site; low priority, but add `BreadcrumbList` on inner pages. |
| Product/Offer (pricing) | [MISSING] | `pricing.html` has 3 tiers + audit | Consider `Service`/`Offer` markup for the three BizCore levels and the 5,000 LKR audit. |

---

## 4. AEO / GEO (answer-engine & generative-engine readiness)

| Item | Status | Where | Fix |
|---|---|---|---|
| FAQ-style content | [MISSING] | no Q&A sections anywhere | Add a real FAQ (pricing, timeline, languages, what's included) — feeds both `FAQPage` schema and AI answers. |
| Answer-first copy | [PARTIAL] | copy is persuasive/narrative (`index.html`, `pricing.html`); facts exist but aren't framed as direct answers | Lead key sections with a one-sentence factual answer (e.g. "BizCore go-live takes 3 weeks."). |
| `llms.txt` | [MISSING] | not present at site root | Add `/llms.txt` summarizing what NeuralShift is, services, pricing entry point, contact, key pages. |
| Quotable / citable facts | [PARTIAL] | strong concrete stats exist (0 missed orders, +31% in 60 days, 3-week delivery, prices in LKR) but unattributed/unstructured for machines | Pair each stat with structured data + a crawlable plain-text claim; keep numbers in HTML text (they already are — good). |
| Entity clarity | [PARTIAL] | "NeuralShift", "BizCore", "Stacko Café, Galle" named consistently | Reinforce with `Organization`/`sameAs` links to social profiles once they exist. |

---

## 5. Social / sharing

| Item | Status | Where | Fix |
|---|---|---|---|
| Open Graph core tags | [PARTIAL] | all pages have `og:type`, `og:title`, `og:description`, `og:url` (lines 13–16) | Add `og:site_name` and `og:locale`. |
| `og:image` | [MISSING] | none on any page | Add a 1200×630 share image (`og:image`, `og:image:width/height`, `og:image:alt`). Critical — links currently preview with no image. |
| Twitter Card tags | [MISSING] | none on any page | Add `twitter:card=summary_large_image`, `twitter:title/description/image`. |
| Dedicated share image asset | [MISSING] | `assets/` has logo, favicons, reel only | Create and ship an OG share image. |

---

## 6. Performance signals (static review — no Lighthouse)

| Item | Status | Where | Fix |
|---|---|---|---|
| Render-blocking CSS | [PARTIAL] | 4–5 separate `<link rel=stylesheet>` per page (`index.html:25–28`), unminified | Bundle/minify CSS; acceptable for a small static site but each file is a blocking request. |
| Render-blocking fonts | [PASS] | Google Fonts with `preconnect` (lines 18–19) + `display=swap` (line 20) | None — correct font-loading strategy. |
| Unoptimized images | [PARTIAL] | `assets/logo.jpg` is **1254×1254, 143 KB** but rendered as a ~32 px nav mark (`components.js:36`) | Ship a small (e.g. 64×64) optimized PNG/WebP/SVG for the nav; huge overdraw today. |
| Missing `width`/`height` on media | [PARTIAL] | nav `<img>` has no dimensions (`components.js:36`); hero `<video>` has none (`index.html:61–72`) | Add intrinsic `width`/`height` (or aspect-ratio) to prevent CLS. (Logo is small/decorative, so low impact.) |
| Lazy-loading | [PARTIAL] | no `loading="lazy"` on logo; video uses `preload="metadata"` + `poster` (good) | Add `loading="lazy" decoding="async"` to the logo `<img>`. |
| Video weight | [PASS] | `reel-1080.mp4` 2.7 MB, `preload="metadata"`, poster shown first (`index.html:68–69`) | None — sensible; a 720p `<source>` swap for mobile would help further. |
| JS footprint | [PASS] | 6 small vanilla scripts, no framework, deferred behavior via DOMContentLoaded | None. |

---

## 7. Measurement

| Item | Status | Where | Fix |
|---|---|---|---|
| GA4 (or any analytics) | [MISSING] | no `gtag`/`googletagmanager`/Clarity in any page | Add GA4 (or privacy-friendly analytics) so traffic/conversions are measurable. |
| Google Search Console verification | [MISSING] | no `google-site-verification` meta or DNS evidence in repo | Verify property (HTML meta or DNS TXT) and submit `sitemap.xml`. |
| Bing Webmaster Tools | [MISSING] | no `msvalidate.01` meta | Verify in Bing Webmaster (also feeds ChatGPT/Copilot answer surfaces). |

---

## Prioritized Backlog

| # | Item | Impact | Effort | Priority |
|---|---|---|---|---|
| 1 | Add `og:image` + Twitter Card + share image asset | High | Low | **High** |
| 2 | Add Organization + LocalBusiness JSON-LD (site-wide) | High | Low | **High** |
| 3 | Set up GA4 + Search Console verification + submit sitemap | High | Low | **High** |
| 4 | Add an FAQ section + `FAQPage` JSON-LD (AEO/GEO) | High | Med | **High** |
| 5 | Optimize/resize nav `logo.jpg` (1254² → small asset) | Med | Low | **Med** |
| 6 | Add `llms.txt` at site root | Med | Low | **Med** |
| 7 | Add branded `404.html` + host config | Med | Low | **Med** |
| 8 | Add `<lastmod>` to sitemap URLs | Med | Low | **Med** |
| 9 | Add `width`/`height`/`loading` to logo + video; minify/bundle CSS | Med | Med | **Med** |
| 10 | Service/Offer JSON-LD on pricing tiers | Med | Med | **Med** |
| 11 | Bing Webmaster verification | Low | Low | **Low** |
| 12 | Answer-first copy rewrites for key sections | Med | Med | **Low** |
| 13 | Wrap contact fields in `<form>`; add `BreadcrumbList`; clean (extensionless) URLs | Low | Med | **Low** |
| 14 | Confirm HTTPS + canonical-host 301 redirects at host | High | — (host) | Verify |

---

## Quick Wins

- **OG/Twitter image** — ship one 1200×630 image and add `og:image` + `twitter:card` to all 6 `<head>`s. Biggest visible payoff for shared links.
- **Organization + LocalBusiness JSON-LD** — one `<script type="application/ld+json">` (ideally injected via `components.js` so it's site-wide) covering name, logo, Colombo/Galle, `areaServed: LK`, WhatsApp number.
- **GA4 + Search Console** — drop in the GA4 snippet and a verification meta; submit the existing sitemap.
- **`llms.txt`** — a few lines at the root summarizing NeuralShift, BizCore, pricing entry point, and contact.
- **Resize `logo.jpg`** — a 143 KB 1254² image rendered at 32 px is pure waste; swap for a ~2–5 KB asset.
- **`<lastmod>` in sitemap** + **`og:site_name`/`og:locale`** — trivial edits, small but real gains.
