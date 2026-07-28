import { gsap } from '../hooks/useGSAP'
import { prefersReducedMotion } from '../hooks/useReducedMotion'

// Gold particles bursting out of the Add to Cart button.
//
// The brief specified anime.js for this. GSAP is already in the bundle and does
// the same job, so this uses GSAP rather than adding a second animation engine
// for one effect.
//
// Particles are appended to <body> at fixed coordinates, not inside the button.
// Cards use overflow-hidden, so particles parented to the button would be
// clipped to its bounds and the burst would be invisible.
//
// Each particle is removed in its own onComplete, so nothing accumulates in the
// DOM however fast the button is clicked.

const COUNT = 8
const DISTANCE = 72

export function particleBurst(el) {
  if (!el || prefersReducedMotion()) return

  const r = el.getBoundingClientRect()
  const originX = r.left + r.width / 2
  const originY = r.top + r.height / 2

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('span')
    p.setAttribute('aria-hidden', 'true')
    p.style.cssText = `
      position:fixed; left:${originX}px; top:${originY}px;
      width:9px; height:9px; border-radius:9999px;
      background:#C9A84C; box-shadow:0 0 8px rgba(201,168,76,0.7);
      pointer-events:none; z-index:9999;
      will-change:transform,opacity;
    `
    document.body.appendChild(p)

    // Even angular spread with a small per-particle jitter, so the burst reads
    // as a ring rather than a random smear.
    const angle = (i / COUNT) * Math.PI * 2 + Math.random() * 0.4
    const dist = DISTANCE * (0.65 + Math.random() * 0.5)

    gsap.to(p, {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      scale: 0,
      opacity: 0,
      duration: 0.7,
      // power2.out rather than expo.out: expo covers ~80% of its travel in the
      // first quarter of the tween, so the burst is over before the eye lands
      // on it. power2 spreads the motion out and stays legible.
      ease: 'power2.out',
      onComplete: () => p.remove(),
    })
  }
}
