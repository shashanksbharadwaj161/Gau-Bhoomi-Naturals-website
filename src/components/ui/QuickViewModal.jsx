import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { X, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { formatPrice, PRODUCT_IMAGE_FALLBACK } from '../../services/woocommerce'
import { siteConfig } from '../../config/siteConfig'

export default function QuickViewModal({ product, onClose }) {
  const navigate = useNavigate()
  const { addItem } = useCart()

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!product) return null

  const price = formatPrice(product.price, product.sale_price)
  const image = product.images?.[0]?.src
  const category = product.categories?.[0]

  const handleAdd = () => {
    if (price.isOnRequest) {
      window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi, I'd like to know the price of ${product.name}`)}`, '_blank')
      return
    }
    addItem(product)
  }

  const goToProduct = () => {
    onClose()
    navigate(`/product/${product.slug}`)
  }

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white w-full md:max-w-2xl rounded-t-3xl md:rounded-3xl overflow-hidden h-[80vh] md:h-auto md:max-h-[90vh] flex flex-col md:flex-row"
        initial={{ y: '100%', scale: 1, opacity: 1 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative md:w-1/2 h-56 md:h-auto bg-primary-500 flex-shrink-0">
          {image ? (
            <img src={image} alt={product.name} crossOrigin="anonymous" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PRODUCT_IMAGE_FALLBACK }} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-display text-5xl text-gold-400 tracking-widest">GBN</span>
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-primary-500 flex items-center justify-center md:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="relative md:w-1/2 p-6 overflow-y-auto">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-9 h-9 rounded-full hover:bg-gold-50 text-primary-500 hidden md:flex items-center justify-center"
          >
            <X size={18} />
          </button>

          {category && (
            <span className="inline-block bg-gold-50 text-gold-700 text-[11px] font-body font-semibold uppercase px-2 py-0.5 rounded">
              {category.name}
            </span>
          )}

          <h3 className="font-display text-2xl text-primary-500 font-bold mt-2 leading-snug">
            {product.name}
          </h3>

          <div className="mt-3">
            {price.isOnRequest ? (
              <span className="font-body text-sm text-gray-400 italic">Price on Request</span>
            ) : price.isOnSale ? (
              <span>
                <span className="font-mono text-gold-500 font-bold text-2xl">{price.display}</span>
                <span className="line-through text-gray-400 text-sm ml-2">{price.original}</span>
              </span>
            ) : (
              <span className="font-mono text-gold-500 font-bold text-2xl">{price.display}</span>
            )}
          </div>

          <p className="font-body text-gray-600 text-sm leading-relaxed mt-3">
            {product.short_description?.replace(/<[^>]+>/g, '') || siteConfig.description}
          </p>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={handleAdd}
              className="w-full btn-shimmer bg-primary-500 hover:bg-primary-600 text-white font-body font-semibold h-12 rounded-xl flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} />
              {price.isOnRequest ? 'Contact Us' : 'Add to Cart'}
            </button>
            <button
              type="button"
              onClick={goToProduct}
              className="w-full border border-gold-300 text-primary-500 hover:bg-gold-50 font-body font-semibold h-12 rounded-xl flex items-center justify-center gap-2"
            >
              View Full Product <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}
