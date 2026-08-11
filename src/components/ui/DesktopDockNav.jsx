import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { NavLink } from '../../lib/router'

function DockItem({ link, mouseX }) {
  const ref = useRef(null)
  const distance = useTransform(mouseX, (value) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect || !Number.isFinite(value)) return 220
    return value - (rect.left + rect.width / 2)
  })
  const scale = useSpring(useTransform(distance, [-86, 0, 86], [1, 1.16, 1]), {
    mass: 0.12,
    stiffness: 420,
    damping: 28,
  })
  const lift = useSpring(useTransform(distance, [-86, 0, 86], [0, -4, 0]), {
    mass: 0.12,
    stiffness: 420,
    damping: 28,
  })

  return (
    <motion.div ref={ref} style={{ scale, y: lift }} className="origin-bottom">
      <NavLink
        to={link.to}
        end
        className={({ isActive }) => `dock-nav-link ${isActive ? 'is-active' : ''}`}
      >
        {link.label}
      </NavLink>
    </motion.div>
  )
}

export default function DesktopDockNav({ links }) {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.div
      className="hidden lg:flex items-end gap-1 rounded-2xl border border-gold-400/15 bg-primary-700/45 p-1.5 shadow-[0_10px_30px_rgba(4,10,6,0.18)]"
      onMouseMove={(event) => mouseX.set(event.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      role="list"
      aria-label="Primary navigation"
    >
      {links.map((link) => <DockItem key={link.to} link={link} mouseX={mouseX} />)}
    </motion.div>
  )
}
