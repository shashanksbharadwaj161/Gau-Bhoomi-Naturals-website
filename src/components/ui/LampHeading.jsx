import { motion } from 'framer-motion'
import { DURATION, EASE, viewport } from '../../animations/motion'

// LampHeading — adapted from the Aceternity UI "Lamp Effect" concept.
// Hand-built: the upstream source is unreachable from this environment.
//
// A gold light source that widens above the title as it enters view: a thin
// bright line that grows outward, with a soft glow behind it. Upstream renders
// this as two large rotated conic gradients on a dark panel; that only works on
// dark, and most of our section headings sit on cream. This version is a scaled
// line plus a blurred ellipse, which reads correctly on either background.
//
// `scaleX` and `opacity` only — both compositor properties, so the heading
// never triggers layout while it animates.

export default function LampHeading({ children, className = '' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={`relative flex flex-col items-center ${className}`}
    >
      {/* Glow pool, sitting behind and above the text */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 h-16 w-56 rounded-full bg-gold-500/25 blur-2xl"
        variants={{
          hidden: { opacity: 0, scaleX: 0.3 },
          show: { opacity: 1, scaleX: 1, transition: { duration: DURATION.slow, ease: EASE } },
        }}
      />
      {/* The filament itself */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -top-1 h-px w-40 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          show: { scaleX: 1, opacity: 1, transition: { duration: DURATION.slow, ease: EASE } },
        }}
      />
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 16 },
          show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE, delay: 0.12 } },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
