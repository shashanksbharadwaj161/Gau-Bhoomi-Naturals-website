import { motion } from 'framer-motion'
import { DURATION, EASE, viewport } from '../../animations/motion'

// The short gold rule that sits under a section heading, drawing itself in as
// the heading enters view. Replaces four separate static `h-0.5 bg-gold-500`
// divs so the accent behaves identically everywhere.
//
// `from` sets the transform origin: rules under centred headings grow outward
// from the middle, rules under left-aligned headings grow rightward. A centred
// rule drawing from its left edge looks like it is sliding into place rather
// than being drawn.
//
// scaleX rather than width — width animates layout, scaleX composites.
export default function GoldRule({ from = 'left', width = 'w-16', className = '' }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`${width} h-0.5 bg-gold-500 ${from === 'center' ? 'origin-center' : 'origin-left'} ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={viewport}
      transition={{ duration: DURATION.base, ease: EASE }}
    />
  )
}
