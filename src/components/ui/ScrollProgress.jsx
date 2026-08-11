import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    mass: 0.25,
  })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[10000] h-[3px] origin-left bg-gold-400 shadow-[0_2px_10px_rgba(201,168,76,0.45)] motion-reduce:hidden"
      style={{ scaleX }}
    />
  )
}
