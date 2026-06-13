import { motion } from 'framer-motion'
import { siteConfig } from '../../config/siteConfig'
import {
  AllIcon, GheeIcon, OilsIcon, RiceIcon, MasalaIcon, HoneyIcon, DryFruitsIcon, SeedsIcon, OtherIcon,
} from './CategoryIcons'

const ICON_MAP = {
  all: AllIcon,
  ghee: GheeIcon,
  oils: OilsIcon,
  rice: RiceIcon,
  masalas: MasalaIcon,
  honey: HoneyIcon,
  'dry-fruits': DryFruitsIcon,
  seeds: SeedsIcon,
  other: OtherIcon,
}

const ACTIVE_ICON = '#FFFFFF'
const INACTIVE_ICON = '#C9A84C'

export default function CategoryPills({ activeSlug = 'all', onCategoryChange }) {
  return (
    <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4 md:px-0 py-2">
      {siteConfig.categories.map((cat, index) => {
        const Icon = ICON_MAP[cat.slug] || OtherIcon
        const active = activeSlug === cat.slug
        return (
          <motion.button
            key={cat.slug}
            type="button"
            onClick={() => onCategoryChange?.(cat.slug)}
            // Staggered spring entrance; the active scale(1.05) is driven by
            // Framer Motion (it owns the inline transform, so a CSS scale class
            // would be overridden). Scale gets its own quick spring so selecting
            // a pill feels instant rather than waiting out the stagger delay.
            initial={{ opacity: 0, y: 20, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: active ? 1.05 : 1 }}
            transition={{
              opacity: { type: 'spring', stiffness: 300, damping: 20, delay: index * 0.06 },
              y:       { type: 'spring', stiffness: 300, damping: 20, delay: index * 0.06 },
              scale:   { type: 'spring', stiffness: 300, damping: 20 },
            }}
            whileTap={{ scale: 0.92 }}
            className={`flex-shrink-0 flex flex-col items-center justify-center gap-2 rounded-2xl w-[88px] h-[88px] md:w-[100px] md:h-[100px] transition-colors duration-200 ${
              active
                ? 'bg-primary-500 border-2 border-gold-500'
                : 'bg-white border border-gold-200/60'
            }`}
          >
            <Icon size={28} color={active ? ACTIVE_ICON : INACTIVE_ICON} />
            <span
              className={`font-body text-[11px] font-semibold tracking-wide text-center ${
                active ? 'text-white' : 'text-primary-500'
              }`}
            >
              {cat.name}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
