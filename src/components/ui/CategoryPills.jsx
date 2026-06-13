import { motion } from 'framer-motion'
import {
  LayoutGrid, Cylinder, Droplets, Wheat, Flame, Star, Circle, Leaf, Sparkles,
} from 'lucide-react'
import { siteConfig } from '../../config/siteConfig'

const ICONS = { LayoutGrid, Cylinder, Droplets, Wheat, Flame, Star, Circle, Leaf, Sparkles }

export default function CategoryPills({ activeSlug = 'all', onCategoryChange }) {
  return (
    <div className="flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-4 md:px-0 md:flex-wrap md:justify-center py-1">
      {siteConfig.categories.map((cat, i) => {
        const Icon = ICONS[cat.icon] || Sparkles
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
            className={`snap-start flex-shrink-0 flex flex-col items-center gap-1.5 min-w-[72px] rounded-2xl px-4 py-3 transition-colors ${
              active
                ? 'bg-primary-500 border-2 border-gold-500 text-gold-400'
                : 'bg-white border border-gold-200 text-primary-500 hover:border-gold-400'
            }`}
          >
            <Icon size={24} strokeWidth={active ? 2.2 : 1.8} />
            <span className="text-[11px] font-body font-semibold whitespace-nowrap">{cat.name}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
