import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { useWishlist } from '../../contexts/WishlistContext'
import { formatPrice } from '../../services/woocommerce'
import { siteConfig } from '../../config/siteConfig'
import QuickViewModal from './QuickViewModal'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const [quickOpen, setQuickOpen] = useState(false)

  const price = formatPrice(product.price, product.sale_price)
  const image = product.images?.[0]?.src
  const category = product.categories?.[0]
  const wishlisted = isWishlisted(product.id)
  const productUrl = `/product/${product.slug}`

  const handleAddToCart = () => {
    if (price.isOnRequest) {
      window.open(
        `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi, I'd like to know the price of ${product.name}`)}`,
        '_blank'
      )
      return
    }
    addItem(product)
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="group relative rounded-2xl overflow-hidden bg-white shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col h-full"
      >
        {/* Image area */}
        <div className="relative h-[220px] overflow-hidden bg-primary-500">
          <Link to={productUrl} className="block w-full h-full">
            {/* GBN fallback — always rendered behind the image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-3xl text-gold-400 tracking-widest">GBN</span>
            </div>
            {image && (
              <img
                src={image}
                alt={product.name}
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.featured && (
              <span className="bg-gold-500 text-primary-500 text-[10px] font-body font-bold uppercase tracking-wide px-2 py-1 rounded-full">
                Bestseller
              </span>
            )}
          </div>
          {price.isOnSale && (
            <span className="absolute top-3 right-3 z-10 bg-red-600 text-white text-[10px] font-body font-bold uppercase tracking-wide px-2 py-1 rounded-full">
              Sale
            </span>
          )}

          {/* Hover overlay — Quick View (desktop) */}
          <div className="absolute inset-0 bg-primary-500/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-end justify-center pb-5">
            <button
              type="button"
              onClick={() => setQuickOpen(true)}
              className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300 inline-flex items-center gap-2 bg-gold-500 text-primary-500 font-body font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-gold-400"
            >
              <Eye size={16} /> Quick View
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="p-4 space-y-2 flex flex-col flex-1">
          {category && (
            <span className="inline-block self-start bg-gold-50 text-gold-700 text-[11px] font-body font-semibold uppercase px-2 py-0.5 rounded">
              {category.name}
            </span>
          )}

          <Link to={productUrl}>
            <h3 className="font-display text-[15px] text-primary-500 font-semibold line-clamp-2 leading-snug hover:text-gold-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Price */}
          <div className="min-h-[1.75rem]">
            {price.isOnRequest ? (
              <span className="font-body text-sm text-gray-400 italic">Price on Request</span>
            ) : price.isOnSale ? (
              <span>
                <span className="font-mono text-gold-500 font-bold text-lg">{price.display}</span>
                <span className="line-through text-gray-400 text-sm ml-1">{price.original}</span>
              </span>
            ) : (
              <span className="font-mono text-gold-500 font-bold text-lg">{price.display}</span>
            )}
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className="fill-gold-400 text-gold-400" />
              ))}
            </div>
            <span className="text-gray-400 text-xs ml-1">
              {product.average_rating || '4.8'}
            </span>
          </div>

          {/* Button row */}
          <div className="flex gap-2 pt-2 mt-auto">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 btn-shimmer bg-primary-500 hover:bg-primary-600 text-white font-body font-semibold text-sm h-11 rounded-xl transition-colors"
            >
              {price.isOnRequest ? 'Contact Us' : 'Add to Cart'}
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={wishlisted}
              className="w-11 h-11 rounded-xl border border-gold-200 hover:border-gold-500 flex items-center justify-center transition-colors flex-shrink-0"
            >
              <motion.span
                key={wishlisted ? 'on' : 'off'}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              >
                <Heart
                  size={18}
                  className={wishlisted ? 'fill-red-500 text-red-500' : 'text-primary-500'}
                />
              </motion.span>
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {quickOpen && (
          <QuickViewModal product={product} onClose={() => setQuickOpen(false)} />
        )}
      </AnimatePresence>
    </>
  )
}
