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
  fast: 0.22,
  base: 0.64,
  slow: 0.76,
}

// How far elements travel on entry. Small on purpose: large offsets read as
// clumsy and cost more paint area.
const RISE = 24

// Enter when scrolled into view. `once` so sections don't re-animate on the way
// back up, and a negative margin so the reveal starts slightly before the
// element is fully on screen.
export const viewport = {
  once: true,
  margin: '0px 0px -12% 0px',
  amount: 0.16,
}

// Single element rising into view.
export const reveal = {
  hidden: { opacity: 0.01, y: RISE, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: DURATION.base, ease: EASE },
  },
}

// Parent that staggers its children. Pair with `staggerItem` on each child.
export const staggerContainer = (stagger = 0.1, delayChildren = 0.04) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: Math.max(stagger, 0.085),
      delayChildren: Math.max(delayChildren, 0.04),
    },
  },
})

export const staggerItem = {
  hidden: { opacity: 0.01, y: RISE, filter: 'blur(5px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
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
