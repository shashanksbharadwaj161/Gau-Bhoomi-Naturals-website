import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const x = useMotionValue(-80)
  const y = useMotionValue(-80)
  const ringX = useSpring(x, { stiffness: 720, damping: 42, mass: 0.18 })
  const ringY = useSpring(y, { stiffness: 720, damping: 42, mass: 0.18 })
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches || reduced.matches) return

    setEnabled(true)
    document.documentElement.classList.add('gbn-custom-cursor')

    const move = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
      setActive(Boolean(event.target.closest('a, button, [role="button"], input, select, textarea')))
    }
    const hide = () => setVisible(false)
    const show = () => setVisible(true)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', hide)
    document.documentElement.addEventListener('mouseenter', show)

    return () => {
      document.documentElement.classList.remove('gbn-custom-cursor')
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('mouseleave', hide)
      document.documentElement.removeEventListener('mouseenter', show)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.span
        aria-hidden="true"
        className="gbn-cursor-dot"
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0, scale: active ? 0.65 : 1 }}
      />
      <motion.span
        aria-hidden="true"
        className="gbn-cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0, scale: active ? 1.45 : 1 }}
        transition={{ duration: 0.16 }}
      />
    </>
  )
}
