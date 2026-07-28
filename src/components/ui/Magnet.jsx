import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

// Magnet — adapted from the React Bits "Magnet" concept.
// Hand-built: the upstream source is unreachable from this environment.
//
// The element leans toward the cursor while it is nearby and springs back on
// exit. Movement is capped at `strength` px so a button never drifts far enough
// to break the layout rhythm around it.
//
// Uses MotionValues plus a spring rather than React state: pointermove fires
// dozens of times a second and re-rendering on each one would be wasteful.
//
// Disabled entirely on touch and under reduced motion. There is no cursor to
// lean toward on a touchscreen, and a pointerenter fired by a tap would leave
// the element stuck off-centre.
export default function Magnet({ children, strength = 6, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 })

  const still = prefersReducedMotion()

  const onPointerMove = (e) => {
    if (still || e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    x.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * strength)
    y.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * strength)
  }

  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
