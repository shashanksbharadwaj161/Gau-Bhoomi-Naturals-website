// Single source of truth for the reduced-motion policy.
// React components use framer-motion's MotionConfig (see App.jsx); this is the
// imperative read for Lenis, GSAP and canvas code that Motion doesn't reach.
// Not reactive by design — honouring a mid-session OS toggle would mean tearing
// down and rebuilding Lenis, every ScrollTrigger and the particle loop. Applies
// on reload.
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
