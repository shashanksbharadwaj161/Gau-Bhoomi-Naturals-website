import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { useUI } from '../../contexts/UIContext'
import { searchProducts, formatPrice } from '../../services/woocommerce'
import { getLenis } from '../../hooks/useLenis'

const POPULAR = ['A2 Ghee', 'Mustard Oil', 'Forest Honey', 'Basmati Rice', 'Cashews']

export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useUI()
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  // Lock background scroll + autofocus while open
  useEffect(() => {
    if (!searchOpen) return
    const lenis = getLenis()
    lenis?.stop()
    const t = setTimeout(() => inputRef.current?.focus(), 80)
    const onKey = (e) => { if (e.key === 'Escape') closeSearch() }
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [searchOpen, closeSearch])

  // Reset on close
  useEffect(() => {
    if (!searchOpen) { setQuery(''); setResults([]) }
  }, [searchOpen])

  // Debounced search
  useEffect(() => {
    if (query.trim().length < 2) { setResults([]); setLoading(false); return }
    setLoading(true)
    const t = setTimeout(async () => {
      const data = await searchProducts(query.trim())
      setResults(data)
      setLoading(false)
    }, 300)
    return () => clearTimeout(t)
  }, [query])

  const goTo = (slug) => {
    closeSearch()
    navigate(`/product/${slug}`)
  }

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-[200] bg-primary-900/95 backdrop-blur-lg px-4 pt-20 md:pt-28"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.22 }}
          onClick={closeSearch}
        >
          <div className="max-w-2xl mx-auto" onClick={(e) => e.stopPropagation()}>
            {/* Input */}
            <div className="relative">
              <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search ghee, honey, masalas..."
                className="w-full bg-white rounded-2xl pl-14 pr-14 py-4 font-body text-lg text-primary-500 outline-none focus:ring-2 focus:ring-gold-400"
              />
              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full hover:bg-gold-50 flex items-center justify-center text-primary-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="mt-6 bg-white rounded-2xl overflow-hidden max-h-[60vh] overflow-y-auto">
              {query.trim().length < 2 ? (
                <div className="p-6">
                  <p className="font-body text-gray-400 text-xs uppercase tracking-wide mb-3">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 rounded-full bg-gold-50 text-gold-700 font-body text-sm hover:bg-gold-100"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : loading ? (
                <div className="p-4 space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-shimmer-gold bg-[length:200%_100%] animate-shimmer bg-gold-50" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-2/3 rounded bg-shimmer-gold bg-[length:200%_100%] animate-shimmer bg-gold-50" />
                        <div className="h-3 w-1/3 rounded bg-shimmer-gold bg-[length:200%_100%] animate-shimmer bg-gold-50" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : results.length === 0 ? (
                <div className="p-8 text-center font-body text-gray-400">No products found for “{query}”.</div>
              ) : (
                <ul>
                  {results.map((product) => {
                    const price = formatPrice(product.price, product.sale_price)
                    const image = product.images?.[0]?.src
                    return (
                      <li key={product.id}>
                        <button
                          type="button"
                          onClick={() => goTo(product.slug)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-gold-50 text-left transition-colors"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-primary-500 flex-shrink-0 flex items-center justify-center">
                            {image
                              ? <img src={image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                              : <span className="text-gold-400 text-[10px] font-display">GBN</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-body text-sm text-primary-500 font-medium truncate">{product.name}</p>
                            <p className="font-body text-xs text-gray-400">{product.categories?.[0]?.name || 'Product'}</p>
                          </div>
                          <span className="font-mono text-gold-600 text-sm font-semibold whitespace-nowrap">{price.display}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
