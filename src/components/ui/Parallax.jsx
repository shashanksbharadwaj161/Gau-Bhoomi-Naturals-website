import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useParallax } from '../../animations/useParallax'

// Wrapper that drifts its children as they cross the viewport.
//
// It owns its own element on purpose. Parallax writes `y`, and so do hover
// lifts, layout animations and entrance variants — putting two of those on one
// element means the last writer wins and the effect silently disappears. Giving
// parallax its own node keeps each transform independent.
export default function Parallax({ distance = 20, className = '', children }) {
  const ref = useRef(null)
  const y = useParallax(ref, distance)

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
