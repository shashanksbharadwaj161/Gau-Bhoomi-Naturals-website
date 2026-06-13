import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import ProductCard from './ProductCard'
import SkeletonCard from './SkeletonCard'
import CategoryPills from './CategoryPills'
import { useUI } from '../../contexts/UIContext'
import { getProductsByCategory } from '../../services/woocommerce'

const SORTS = [
  { key: 'popularity', label: 'Popularity' },
  { key: 'newest',     label: 'Newest' },
  { key: 'price-asc',  label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
]

const effectivePrice = (p) => {
  const sale = parseFloat(p.sale_price)
  const reg = parseFloat(p.price)
  if (!isNaN(sale) && sale > 0 && sale < reg) return sale
  return isNaN(reg) ? 0 : reg
}

export default function ProductGrid({ slug = 'all', onCategoryChange, perPage = 24 }) {
  const { announcementVisible } = useUI()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('popularity')
  const [sortOpen, setSortOpen] = useState(false)
  const [visible, setVisible] = useState(12)
  const sortRef = useRef(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setVisible(12)
    ;(async () => {
      const data = await getProductsByCategory(slug, perPage)
      if (active) { setProducts(data); setLoading(false) }
    })()
    return () => { active = false }
  }, [slug, perPage])

  // Close sort dropdown on outside click
  useEffect(() => {
    const onClick = (e) => { if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false) }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const sorted = useMemo(() => {
    const arr = [...products]
    switch (sort) {
      case 'newest':     return arr.sort((a, b) => b.id - a.id)
      case 'price-asc':  return arr.sort((a, b) => effectivePrice(a) - effectivePrice(b))
      case 'price-desc': return arr.sort((a, b) => effectivePrice(b) - effectivePrice(a))
      default:           return arr.sort((a, b) => (b.featured === a.featured ? (b.rating_count || 0) - (a.rating_count || 0) : b.featured ? 1 : -1))
    }
  }, [products, sort])

  const shown = sorted.slice(0, visible)
  const topClass = announcementVisible ? 'top-[108px] lg:top-[116px]' : 'top-16 lg:top-[72px]'
  const activeSortLabel = SORTS.find((s) => s.key === sort)?.label

  return (
    <>
      {/* Sticky filter bar */}
      <div className={`sticky ${topClass} bg-cream/95 backdrop-blur-md z-20 py-3 border-b border-gold-100`}>
        <div className="max-w-7xl mx-auto">
          <CategoryPills activeSlug={slug} onCategoryChange={onCategoryChange} />
          <div className="flex items-center justify-between px-4 md:px-8 mt-3">
            <p className="font-body text-sm text-gray-500">
              {loading ? 'Loading…' : `Showing ${shown.length} of ${sorted.length} products`}
            </p>
            <div className="relative" ref={sortRef}>
              <button
                type="button"
                onClick={() => setSortOpen((o) => !o)}
                className="flex items-center gap-2 bg-white border border-gold-200 rounded-lg px-4 py-2 font-body text-sm text-primary-500 hover:border-gold-400"
              >
                {activeSortLabel} <ChevronDown size={15} className={sortOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-card border border-gold-100 overflow-hidden z-30"
                  >
                    {SORTS.map((s) => (
                      <li key={s.key}>
                        <button
                          type="button"
                          onClick={() => { setSort(s.key); setSortOpen(false) }}
                          className="w-full flex items-center justify-between px-4 py-2.5 font-body text-sm text-primary-500 hover:bg-gold-50 text-left"
                        >
                          {s.label}
                          {sort === s.key && <Check size={15} className="text-gold-600" />}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <>
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence mode="popLayout">
                {shown.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {shown.length === 0 && (
              <p className="text-center font-body text-gray-400 py-16">No products found in this category.</p>
            )}

            {visible < sorted.length && (
              <div className="text-center mt-10">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + 8)}
                  className="border border-gold-400 text-gold-700 hover:bg-gold-500 hover:text-primary-500 font-body font-semibold px-8 py-3 rounded-full transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
