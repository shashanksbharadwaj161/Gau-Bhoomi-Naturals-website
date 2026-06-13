# Gau Bhoomi Naturals

A premium, mobile-first ecommerce storefront for **Gau Bhoomi Naturals** — A2 Gir cow ghee,
cold pressed oils, organic rice, masalas, honey and dry fruits, straight from the gaushala.

Built as a React + Vite single-page app that sits in front of a WooCommerce/WordPress backend
(the WP admin + REST API stay intact; React replaces the storefront theme).

## Tech stack

- **React 19 + Vite** — SPA with route-based code splitting
- **Tailwind CSS 3** — design system (dark green + gold brand palette)
- **Lenis** — smooth scroll
- **GSAP + ScrollTrigger** — cinematic scroll animations (pinned horizontal "Bilona Method", parallax, count-ups)
- **Three.js** — golden particle field in the hero (desktop only, lazy-loaded)
- **Framer Motion** — page transitions and UI micro-interactions
- **Embla Carousel** — product carousels, hero slider, testimonials
- **WooCommerce REST API** — product data, with a built-in mock-data fallback so the site is never empty

## Getting started

```bash
npm install
cp .env.example .env   # fill in your WooCommerce keys (optional — mock data is used if absent)
npm run dev
```

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Environment variables

| Variable | Purpose |
| --- | --- |
| `VITE_WC_URL` | WooCommerce site base URL |
| `VITE_WC_KEY` | WooCommerce consumer key |
| `VITE_WC_SECRET` | WooCommerce consumer secret |

Keys are optional in development — when missing or unreachable, the app falls back to mock
products so every section still renders. Never commit real keys; `.env` is gitignored and
secrets are injected at build time via GitHub Actions.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the app, copies
`public/.htaccess` into `dist/`, and deploys to Hostinger over **FTPS**. The `.htaccess`
passes WordPress routes (`wp-admin`, `wp-json`, `wp-content`, …) straight through and serves
the React SPA for everything else. WordPress files on the server are preserved
(`dangerous-clean-slate: false`).

Required GitHub Actions secrets: `VITE_WC_URL`, `VITE_WC_KEY`, `VITE_WC_SECRET`,
`FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_SERVER_DIR`.

## Notes

- The brand logo is a self-contained SVG at `public/images/logo.svg`. To use the real
  raster logo, drop it in and point `siteConfig.logoUrl` at it.
- Cart and wishlist persist to `localStorage`. Checkout is a UI mockup — "Pay Now" hands off
  to the WooCommerce checkout URL; no payment data is collected in the React app.
