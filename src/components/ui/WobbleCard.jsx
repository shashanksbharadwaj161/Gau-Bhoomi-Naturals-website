import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

// WobbleCard — adapted from the Aceternity UI concept.
// Hand-built: the upstream source is unreachable from this environment.
//
// The card tilts toward the pointer in 3D. Rotation is capped at `tilt` degrees
// — past roughly 8° the perspective distortion starts to look like a bug rather
// than a response.
//
// Pointer offset goes through MotionValues and a spring, never React state:
// pointermove fires dozens of times a second and re-rendering the card on each
// one would undo the smoothness the effect is for.
//
// Mouse-only. On touch there is no hover to leave, so a tilt applied on tap
// would stay stuck until the next tap elsewhere.
export default function WobbleCard({ children, className = '', tilt = 6 }) {
  const ref = useRef(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const spring = { stiffness: 220, damping: 18, mass: 0.5 }
  const rotateX = useSpring(useTransform(py, [-1, 1], [tilt, -tilt]), spring)
  const rotateY = useSpring(useTransform(px, [-1, 1], [-tilt, tilt]), spring)

  const still = prefersReducedMotion()

  const onPointerMove = (e) => {
    if (still || e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - (r.left + r.width / 2)) / (r.width / 2))
    py.set((e.clientY - (r.top + r.height / 2)) / (r.height / 2))
  }

  const reset = () => { px.set(0); py.set(0) }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 700 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
