import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function RouteProgress() {
  const location = useLocation()
  const [active, setActive] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setActive(true)
    setProgress(0)
    let p = 0
    const fast = setInterval(() => {
      p += 8
      if (p >= 85) { clearInterval(fast); return }
      setProgress(p)
    }, 40)

    const done = setTimeout(() => {
      setProgress(100)
      setTimeout(() => setActive(false), 400)
    }, 600)

    return () => {
      clearInterval(fast)
      clearTimeout(done)
    }
  }, [location.pathname])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed top-0 left-0 z-[10000] h-[3px] bg-gold-500"
          style={{ width: `${progress}%` }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </AnimatePresence>
  )
}
