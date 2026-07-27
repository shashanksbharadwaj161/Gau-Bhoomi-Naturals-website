import { motion } from 'framer-motion'
import { siteConfig } from '../../config/siteConfig'
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
        {siteConfig.categories.map((cat, i) => {
          const Icon = iconMap[cat.slug] || AllIcon
          const isActive = activeSlug === cat.slug

          return (
            <motion.button
              key={cat.slug}
              onClick={() => onCategoryChange?.(cat.slug)}
              initial={{ opacity: 0, y: 24, scale: 0.8 }}
              // Active scale(1.06) is driven by Framer Motion — it owns the inline
              // transform, so a style.transform would be overridden. Scale gets its
              // own quick spring so selecting a pill isn't delayed by the stagger.
              animate={{ opacity: 1, y: 0, scale: isActive ? 1.06 : 1 }}
              transition={{
                default: { type: 'spring', stiffness: 280, damping: 18, delay: i * 0.07 },
                scale:   { type: 'spring', stiffness: 280, damping: 18 },
              }}
              whileTap={{ scale: 0.92 }}
              // Colours come from the Tailwind tokens rather than inline hex, so
              // a palette change reaches this component too. Border width is
              // constant to avoid a 0.5px reflow when the active pill changes.
              className={`flex-shrink-0 min-w-[88px] flex flex-col items-center justify-center gap-2 rounded-2xl border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-[background-color,border-color,box-shadow] duration-200 ${
                isActive
                  ? 'bg-primary-500 border-gold-500 shadow-card'
                  : 'bg-white border-gold-500/30 shadow-sm hover:border-gold-500 hover:shadow-card'
              }`}
              style={{ width: 88, height: 88 }}
            >
              <Icon
                size={26}
                color={isActive ? '#FFFFFF' : '#C9A84C'}
              />
              <span
                className={`font-body font-semibold text-center leading-tight text-[10px] max-w-[72px] tracking-[0.03em] ${
                  isActive ? 'text-white' : 'text-primary-500'
                }`}
              >
                {cat.name}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
