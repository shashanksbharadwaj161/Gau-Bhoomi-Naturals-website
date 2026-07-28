import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DURATION, EASE } from '../../animations/motion'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

// TextFlip — adapted from the Aceternity UI "Container Text Flip" concept.
// Hand-built: the upstream source is unreachable from this environment.
//
// Cycles a list of phrases in place. The container is sized to the longest
// phrase up front (an invisible sizing span) so the surrounding line never
// reflows as the words change — a width that animates on every tick drags the
// whole paragraph around and looks broken.
//
// Under reduced motion it renders the first phrase and stops cycling entirely;
// a looping text swap is exactly the kind of motion that setting exists for.

export default function TextFlip({ phrases, interval = 2600, className = '' }) {
  const [index, setIndex] = useState(0)
  const still = prefersReducedMotion()

  useEffect(() => {
    if (still) return
    const id = setInterval(() => setIndex((i) => (i + 1) % phrases.length), interval)
    return () => clearInterval(id)
  }, [phrases.length, interval, still])

  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), '')

  if (still) return <span className={className}>{phrases[0]}</span>

  return (
    <span className={`relative inline-grid align-bottom overflow-hidden ${className}`}>
      {/* Reserves the width and height of the longest phrase. */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-pre">
        {longest}
      </span>

      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="col-start-1 row-start-1 whitespace-pre"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: DURATION.fast, ease: EASE }}
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
