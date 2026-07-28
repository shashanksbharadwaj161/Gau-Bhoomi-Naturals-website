import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

// TracingBeam — adapted from the Aceternity UI concept.
// Hand-built: the upstream source is unreachable from this environment.
//
// A gold rail down the left of the content that fills as the reader scrolls,
// with a bead marking the current position. Upstream measures the content with
// a ResizeObserver and animates an SVG path; a scaled div does the same job here
// without the observer or the path maths.
//
// The rail is decorative, so it is aria-hidden and hidden below `md` — on a
// phone the content already runs full-bleed and a rail would just eat width.
export default function TracingBeam({ children, className = '' }) {
  const ref = useRef(null)
  // Offset ordering matters and is easy to get backwards. The second entry must
  // be reached LATER in the scroll than the first, or progress runs in reverse.
  // For a block shorter than the viewport, "end 0.85" happens before
  // "start 0.35" — the beam then starts full and drains as you read. Anchoring
  // the start low (0.85) and the end high (0.35) keeps it monotonic.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.35'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.6 })
  const beadY = useTransform(fill, (v) => `${v * 100}%`)

  const still = prefersReducedMotion()

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div aria-hidden="true" className="hidden md:block absolute left-0 top-0 bottom-0 w-px">
        <div className="absolute inset-0 bg-gold-500/15" />
        <motion.div
          className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-gold-500 to-gold-300"
          style={{ height: '100%', scaleY: still ? 1 : fill }}
        />
        {!still && (
          <motion.span
            className="absolute -left-[3px] w-[7px] h-[7px] rounded-full bg-gold-500 shadow-[0_0_8px_rgba(201,168,76,0.8)]"
            style={{ top: beadY }}
          />
        )}
      </div>
      <div className="md:pl-6">{children}</div>
    </div>
  )
}
