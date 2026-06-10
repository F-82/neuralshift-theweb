# NeuralShift — Marketing Site

A small, dependency-free static site for NeuralShift. Pure HTML, CSS, and vanilla
JavaScript — no build step, no package manager, no framework. Open the files
directly in a browser or serve the folder with any static file server.

## File structure

```
neuralshift/
├── index.html              # Home
├── about.html              # About
├── systems.html            # BizCore systems
├── case-studies.html       # Stacko Café case study
├── pricing.html            # Audit + Foundation / Growth / Full
├── contact.html            # Channels and static contact form
├── robots.txt              # Allow-all + sitemap pointer
├── sitemap.xml             # Six URLs at https://neuralshift.lk
├── css/
│   ├── tokens.css          # Design tokens (`:root` is light; `html.dark` overrides)
│   ├── base.css            # Reset, typography, layout utilities, fade-in animation
│   ├── components.css      # Nav, mobile nav, buttons, page hero, CTA strip, footer, WA fab
│   └── pages/
│       ├── home.css        # Home + reusable cross-page pieces (systems grid, phone mockup,
│       │                   # case results, pain/shift rows, dashboard preview)
│       ├── about.css       # About-only layout
│       ├── systems.css     # Page-specific overrides only (uses styles from home.css)
│       ├── case-studies.css# Page-specific overrides only (uses styles from home.css)
│       ├── pricing.css     # Audit card, system level cards, payment note, closer
│       └── contact.css     # Channels list, contact form
├── js/
│   ├── theme.js            # `window.NSTheme.toggle()` — adds/removes `html.dark`
│   ├── components.js       # Injects the shared nav + footer + WhatsApp button,
│   │                       # wires the hamburger + theme buttons, sets active link
│   ├── reveal.js           # IntersectionObserver fade-ins for `.fi` elements
│   ├── nav-scroll.js       # Toggles `.scrolled` on the nav at 30 px
│   └── contact.js          # Loaded on contact.html only — temporary "Sent" feedback
└── assets/
    └── logo.jpg            # Brand mark used in the nav
```

## Previewing locally

The simplest approach:

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```

Any static server works (`npx serve`, `caddy file-server`, `php -S`, etc.). Opening
the HTML files directly from disk usually works too, though some browsers restrict
`fetch`/storage on the `file://` scheme — using a local server avoids any surprises.

## How the shared nav and footer work

There is no build step and no server-side include layer, so the nav and footer
markup live as JavaScript template strings in `js/components.js`. Each page has
two placeholder elements that get replaced when the script runs:

```html
<div id="site-nav"></div>
...
<div id="site-footer"></div>
<div id="site-wa-fab"></div>
```

To edit the nav, footer, or the floating WhatsApp button, change `js/components.js`
in one place — every page picks up the new markup on the next load.

## Theme handling

Light is the default. The dark palette is applied when `<html>` has the `dark`
class. The user’s choice is persisted under the `ns-theme` key in `localStorage`.

To prevent a flash of the wrong theme on page load, every page includes a small
inline blocking script in `<head>` that reads `localStorage` and adds the `dark`
class **before** stylesheets evaluate. After that, `theme.js` exposes
`window.NSTheme.toggle()` and `components.js` wires both header and mobile drawer
toggle buttons to it.

## Adding a new page

1. Copy an existing page (`about.html` is a good template) to `your-page.html`.
2. Update `<title>`, `<meta name="description">`, `<link rel="canonical">`, and the
   `og:*` tags at the top.
3. Set `<body data-page="your-page">` — `components.js` uses this attribute (matched
   against each nav link’s `data-nav`) to highlight the active link.
4. Create `css/pages/your-page.css` and add `<link rel="stylesheet" href="css/pages/your-page.css">`
   in the page `<head>` (keep the existing tokens/base/components links in that order).
5. Add a `{ id, href, label }` entry to the `NAV_LINKS` array in `js/components.js`
   so it appears in the nav and mobile drawer.
6. Add a `<url>` entry to `sitemap.xml`.
