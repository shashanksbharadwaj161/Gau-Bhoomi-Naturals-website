// Shared motion tokens and Framer Motion variants.
//
// One motion system, applied consistently, is what reads as designed — a
// different bespoke effect per section reads as unfinished. Import from here;
// never hardcode a duration or easing inline.
//
// Reduced motion is handled globally by <MotionConfig reducedMotion="user"> in
// App.jsx, which drops transforms and keeps opacity. Nothing here needs a guard.

// Standard ease-out. Matches the curve already used by the page transitions.
export const EASE = [0.22, 1, 0.36, 1]

export const DURATION = {
  fast: 0.3,
  base: 0.55,
  slow: 0.7,
}

// How far elements travel on entry. Small on purpose: large offsets read as
// clumsy and cost more paint area.
const RISE = 28

// Enter when scrolled into view. `once` so sections don't re-animate on the way
// back up, and a negative margin so the reveal starts slightly before the
// element is fully on screen.
export const viewport = { once: true, margin: '-80px' }

// Single element rising into view.
export const reveal = {
  hidden: { opacity: 0, y: RISE },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
}

// Parent that staggers its children. Pair with `staggerItem` on each child.
export const staggerContainer = (stagger = 0.06, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
})

export const staggerItem = {
  hidden: { opacity: 0, y: RISE },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
}

// Convenience spread for the common "reveal this block on scroll" case:
//   <motion.div {...revealOnScroll} />
export const revealOnScroll = {
  variants: reveal,
  initial: 'hidden',
  whileInView: 'show',
  viewport,
}

// Same, for a container whose children stagger.
export const staggerOnScroll = (stagger, delayChildren) => ({
  variants: staggerContainer(stagger, delayChildren),
  initial: 'hidden',
  whileInView: 'show',
  viewport,
})
