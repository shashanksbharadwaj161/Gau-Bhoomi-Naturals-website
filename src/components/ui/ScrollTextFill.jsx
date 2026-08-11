import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/** A restrained scroll-fill treatment inspired by the supplied Framer module. */
export default function ScrollTextFill({ children, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 88%', 'end 48%'],
  })
  const clipPath = useTransform(scrollYProgress, [0, 1], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'])

  return (
    <span ref={ref} className={`relative block ${className}`}>
      <span className="text-current opacity-25">{children}</span>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 whitespace-normal text-current"
        style={{ clipPath }}
      >
        {children}
      </motion.span>
    </span>
  )
}
