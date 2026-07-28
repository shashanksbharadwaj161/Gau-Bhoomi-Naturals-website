import { useScroll, useTransform } from 'framer-motion'
import { prefersReducedMotion } from '../hooks/useReducedMotion'

// Scroll-linked parallax. One hook for every parallax surface on the site so the
// depth effect is consistent rather than re-derived per section.
//
// `distance` is how far the element drifts, in pixels, across the whole time it
// crosses the viewport. Positive drifts up (element appears to sit behind the
// page and lag it); negative drifts down (appears to lead). Layering two
// elements with different distances is what produces the depth separation.
//
// Reduced motion needs an explicit guard here. <MotionConfig reducedMotion="user">
// in App.jsx strips variant-driven transitions, but a MotionValue applied through
// style={{ y }} bypasses that entirely — it is a direct subscription, not an
// animation. So we return a plain 0 instead and the element never moves.
//
// The default offset runs from "element's top touches the viewport bottom" to
// "element's bottom leaves the viewport top", i.e. the full pass, so travel is
// spread evenly instead of finishing early.
export function useParallax(ref, distance = 20, offset = ['start end', 'end start']) {
  const { scrollYProgress } = useScroll({ target: ref, offset })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])

  return prefersReducedMotion() ? 0 : y
}
