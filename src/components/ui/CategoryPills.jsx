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

const INACTIVE_ICON = '#C9A84C'
const ACTIVE_ICON   = '#FFFFFF'

export default function CategoryPills({ activeSlug = 'all', onCategoryChange }) {
  return (
    <div className="flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-4 md:px-0 md:flex-wrap md:justify-center py-1">
      {siteConfig.categories.map((cat, i) => {
        const Icon = ICON_MAP[cat.slug] || OtherIcon
        const active = activeSlug === cat.slug
        return (
          <motion.button
            key={cat.slug}
            type="button"
            onClick={() => onCategoryChange?.(cat.slug)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 20 }}
            whileTap={{ scale: 0.95 }}
            className={`snap-start flex-shrink-0 flex flex-col items-center justify-center gap-2 rounded-2xl w-20 md:w-24 min-h-[88px] px-2 py-3 border transition-colors ${
              active
                ? 'bg-primary-500 border-primary-500'
                : 'bg-white border-gold-200 hover:border-gold-400'
            }`}
          >
            <Icon size={32} color={active ? ACTIVE_ICON : INACTIVE_ICON} />
            <span
              className={`text-[10px] font-body font-semibold text-center leading-tight line-clamp-2 ${
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
