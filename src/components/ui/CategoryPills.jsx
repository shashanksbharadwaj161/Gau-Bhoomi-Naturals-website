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
              className="flex-shrink-0 flex flex-col items-center justify-center gap-2 rounded-2xl transition-[background-color,border-color,box-shadow] duration-200 focus:outline-none"
              style={{
                width: 88,
                height: 88,
                minWidth: 88,
                backgroundColor: isActive ? '#142A1D' : '#FFFFFF',
                border: isActive
                  ? '2px solid #C9A84C'
                  : '1.5px solid rgba(201,168,76,0.3)',
                boxShadow: isActive
                  ? '0 4px 16px rgba(20,42,29,0.18)'
                  : '0 1px 4px rgba(20,42,29,0.06)',
              }}
            >
              <Icon
                size={26}
                color={isActive ? '#FFFFFF' : '#C9A84C'}
              />
              <span
                className="font-body font-semibold text-center leading-tight"
                style={{
                  fontSize: 10,
                  color: isActive ? '#FFFFFF' : '#142A1D',
                  letterSpacing: '0.03em',
                  maxWidth: 72,
                }}
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
