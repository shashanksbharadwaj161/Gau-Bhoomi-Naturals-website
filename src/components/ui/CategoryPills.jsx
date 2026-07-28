import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { siteConfig } from '../../config/siteConfig'
import { EASE } from '../../animations/motion'
import {
  AllIcon, GheeIcon, OilsIcon, RiceIcon,
  MasalaIcon, HoneyIcon, DryFruitsIcon,
  SeedsIcon, OtherIcon
} from './CategoryIcons'

const iconMap = {
  all:         AllIcon,
  ghee:        GheeIcon,
  oils:        OilsIcon,
  rice:        RiceIcon,
  masalas:     MasalaIcon,
  honey:       HoneyIcon,
  'dry-fruits': DryFruitsIcon,
  seeds:       SeedsIcon,
  other:       OtherIcon,
}

// Which edge the pointer crossed, as an offset for the sweep overlay.
// Compare the pointer's position to the box centre, normalised by the box's own
// aspect, and take whichever axis dominates.
const OFFSETS = [
  { x: '0%', y: '-100%' },  // 0 top
  { x: '100%', y: '0%' },   // 1 right
  { x: '0%', y: '100%' },   // 2 bottom
  { x: '-100%', y: '0%' },  // 3 left
]

function edgeFrom(event, el) {
  const r = el.getBoundingClientRect()
  const dx = (event.clientX - (r.left + r.width / 2)) / (r.width / 2)
  const dy = (event.clientY - (r.top + r.height / 2)) / (r.height / 2)
  if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? 1 : 3
  return dy > 0 ? 2 : 0
}

function Pill({ cat, isActive, index, onSelect }) {
  const ref = useRef(null)
  const [edge, setEdge] = useState(0)
  const [hovered, setHovered] = useState(false)
  const Icon = iconMap[cat.slug] || AllIcon

  const onEnter = (e) => { setEdge(edgeFrom(e, ref.current)); setHovered(true) }
  const onLeave = (e) => { setEdge(edgeFrom(e, ref.current)); setHovered(false) }

  return (
    <motion.button
      ref={ref}
      onClick={() => onSelect(cat.slug)}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      initial={{ opacity: 0, y: 24, scale: 0.8 }}
      // Active scale(1.06) is driven by Framer Motion — it owns the inline
      // transform, so a style.transform would be overridden. Scale gets its own
      // quick spring so selecting a pill isn't delayed by the stagger.
      animate={{ opacity: 1, y: 0, scale: isActive ? 1.06 : 1 }}
      transition={{
        default: { type: 'spring', stiffness: 280, damping: 18, delay: index * 0.07 },
        scale:   { type: 'spring', stiffness: 280, damping: 18 },
      }}
      whileTap={{ scale: 0.92 }}
      // Colours come from the Tailwind tokens rather than inline hex, so a
      // palette change reaches this component too. Border width is constant to
      // avoid a 0.5px reflow when the active pill changes.
      className={`relative flex-shrink-0 min-w-[88px] overflow-hidden flex flex-col items-center justify-center gap-2 rounded-2xl border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-[border-color,box-shadow] duration-200 ${
        isActive
          ? 'bg-primary-500 border-gold-500 shadow-card'
          : 'bg-white border-gold-500/30 shadow-sm hover:border-gold-500 hover:shadow-card'
      }`}
      style={{ width: 88, height: 88 }}
    >
      {/* Direction-aware sweep: enters from the edge the pointer crossed and
          leaves toward the edge it exits by. Inactive pills only — the active
          pill is already filled. */}
      {!isActive && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 bg-primary-500 pointer-events-none"
          initial={false}
          animate={hovered ? { x: '0%', y: '0%' } : OFFSETS[edge]}
          transition={{ duration: 0.32, ease: EASE }}
        />
      )}

      <span className="relative z-10 flex flex-col items-center gap-2">
        <Icon size={26} color={isActive || hovered ? '#FFFFFF' : '#C9A84C'} />
        <span
          className={`font-body font-semibold text-center leading-tight text-[10px] max-w-[72px] tracking-[0.03em] transition-colors ${
            isActive || hovered ? 'text-white' : 'text-primary-500'
          }`}
        >
          {cat.name}
        </span>
      </span>
    </motion.button>
  )
}

export default function CategoryPills({ activeSlug = 'all', onCategoryChange }) {
  return (
    <div className="px-4 md:px-8">
      <div
        className="flex gap-3 overflow-x-auto pb-2"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {siteConfig.categories.map((cat, i) => (
          <Pill
            key={cat.slug}
            cat={cat}
            index={i}
            isActive={activeSlug === cat.slug}
            onSelect={(slug) => onCategoryChange?.(slug)}
          />
        ))}
      </div>
    </div>
  )
}
