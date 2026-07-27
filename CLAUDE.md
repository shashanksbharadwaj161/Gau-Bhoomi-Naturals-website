# Claude Code Behavioral Guidelines

## 1. Think Before Coding
- State assumptions explicitly. If uncertain, ask rather than guess.
- Present multiple interpretations when ambiguity exists. Do not pick silently.
- Push back when a simpler approach exists.
- Stop when confused. Name what is unclear and ask for clarification.

## 2. Simplicity First
- Write the minimum code that solves the problem.
- No speculative features, abstractions, or configurability unless requested.
- No error handling for impossible scenarios.
- If 200 lines could be 50, rewrite it.
- Test: would a senior engineer say this is overcomplicated?

## 3. Surgical Changes
- Touch only what you must. Do not improve adjacent code.
- Match existing style even if you would do it differently.
- Every changed line must trace to the user's request.
- Do not rearrange products, categories, WooCommerce data, or business logic.

## 4. Goal-Driven Execution
- Transform tasks into verifiable goals with success criteria.
- For multi-step tasks, state a brief plan with verify steps before starting.
- Loop until criteria are met, not until it seems done.

---

# Project Notes — Gau Bhoomi Naturals

## Stack
React 19 + Vite + Tailwind. WooCommerce Store API (public, read-only, no auth).
Deployed via GitHub Actions → FTP to Hostinger on push to `main`.

## Animation stack — do not add more
Three libraries cover everything. Do not install `motion` (that IS `framer-motion` v12,
just rebranded) or `animejs` (GSAP already does timelines, staggers, count-ups and
character splitting).

| Library | Used for |
|---|---|
| `lenis` | Global smooth scroll. Driven by the single `gsap.ticker` rAF loop. |
| `framer-motion` | All React component animation, page transitions, layout animation. |
| `gsap` + ScrollTrigger | Scroll-linked effects, pinned sections, count-ups, SplitText. |

Shared easings, durations and Motion variants live in `src/animations/motion.js`.
Never hardcode a duration or easing inline — import it.

## Brand — never change
- Deep green `#142A1D` (`primary-500`), gold `#C9A84C` (`gold-500`), cream `#FBF7EF`
- Playfair Display (display) / DM Sans (body) / DM Mono (mono)
- Logo, product names, descriptions, categories, prices

## Never touch
- `src/services/woocommerce.js` — API logic and price mapping
- `src/contexts/` — cart, wishlist, UI state
- Cart, checkout and order flow
- Category structure and ordering
- Best Sellers ordering on the homepage: Ghee products first, then Oils

## Accessibility
Every animation must respect `prefers-reduced-motion`. The mechanism is centralised —
use it, do not add a second one.

## Verify before declaring done
1. `npm run build` — zero errors
2. `npm run lint` — zero errors (3 pre-existing `react-refresh` warnings are expected)
3. Check 1440×900 and 390×844 viewports
4. No horizontal overflow, touch targets ≥ 44×44px
5. Confirm no product data, price, category order or WooCommerce logic changed
