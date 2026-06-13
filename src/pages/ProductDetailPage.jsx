import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { motion } from 'framer-motion'
import { Star, Minus, Plus, Truck, ShoppingBag, ChevronDown, MessageCircle, Check } from 'lucide-react'
import ProductCarousel from '../components/ui/ProductCarousel'
import { getProduct, getRelatedProducts, formatPrice, buildAddToCartUrl, PRODUCT_IMAGE_FALLBACK } from '../services/woocommerce'
import { useCart } from '../contexts/CartContext'
import { useWishlist } from '../contexts/WishlistContext'
import { useUI } from '../contexts/UIContext'
import { siteConfig } from '../config/siteConfig'

const RECENT_KEY = 'gbn_recent_v2'

const stripHtml = (html = '') => html.replace(/<[^>]+>/g, '').trim()

function Accordion({ title, children, defaultOpen = false }) {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <div className="border-b border-gold-100">
          <Disclosure.Button className="flex w-full items-center justify-between py-4 text-left font-body font-semibold text-primary-500">
            {title}
            <ChevronDown size={18} className={`transition-transform ${open ? 'rotate-180' : ''} text-gold-600`} />
          </Disclosure.Button>
          <Disclosure.Panel className="pb-4 font-body text-sm text-gray-600 leading-relaxed">
            {children}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}

export default function ProductDetailPage() {
  const { slug } = useParams()
  const { addItem } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const { openCart } = useUI()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [qty, setQty] = useState(1)
  const [related, setRelated] = useState([])
  const [recent, setRecent] = useState([])
  const [showStickyBar, setShowStickyBar] = useState(false)

  const addBtnRef = useRef(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setActiveImage(0)
    setQty(1)
    window.scrollTo(0, 0)
    ;(async () => {
      const p = await getProduct(slug)
      if (!active) return
      setProduct(p)
      setLoading(false)

      // Related
      const rel = await getRelatedProducts(p.id, p.categories?.[0]?.id, 8)
      if (active) setRelated(rel)

      // Recently viewed
      try {
        const prev = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]')
        setRecent(prev.filter((r) => r.id !== p.id))
        const summary = {
          id: p.id, name: p.name, slug: p.slug, price: p.price, sale_price: p.sale_price,
          images: p.images, categories: p.categories, average_rating: p.average_rating, featured: p.featured,
        }
        const next = [summary, ...prev.filter((r) => r.id !== p.id)].slice(0, 6)
        localStorage.setItem(RECENT_KEY, JSON.stringify(next))
      } catch { /* ignore */ }
    })()
    return () => { active = false }
  }, [slug])

  // Sticky mobile bar: show when add-to-cart button scrolls out of view
  useEffect(() => {
    const el = addBtnRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { rootMargin: '0px 0px -80px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [product])

  if (loading || !product) {
    return (
      <div className="bg-cream min-h-screen py-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="aspect-square rounded-2xl bg-shimmer-gold bg-[length:200%_100%] animate-shimmer bg-gold-50" />
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-5 rounded bg-shimmer-gold bg-[length:200%_100%] animate-shimmer bg-gold-50" style={{ width: `${90 - i * 10}%` }} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const price = formatPrice(product.price, product.sale_price)
  const images = product.images?.length ? product.images : []
  const category = product.categories?.[0]
  const wishlisted = isWishlisted(product.id)
  const isFreeShip = !price.isOnRequest && parseFloat(product.sale_price || product.price) >= siteConfig.freeShippingThreshold

  const handleAdd = () => {
    if (price.isOnRequest) {
      window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi, I'd like to know the price of ${product.name}`)}`, '_blank')
      return
    }
    addItem(product, qty)
    openCart()
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left — gallery */}
        <div className="md:sticky md:top-28 md:self-start">
          <div className="aspect-square rounded-2xl overflow-hidden bg-primary-500 group">
            {images[activeImage]?.src ? (
              <img
                src={images[activeImage].src}
                alt={product.name}
                crossOrigin="anonymous"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PRODUCT_IMAGE_FALLBACK }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display text-6xl text-gold-400 tracking-widest">GBN</span>
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${i === activeImage ? 'border-gold-500' : 'border-transparent'}`}
                >
                  <img src={img.src} alt={`${product.name} ${i + 1}`} crossOrigin="anonymous" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PRODUCT_IMAGE_FALLBACK }} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right — details */}
        <div>
          <nav className="font-body text-gray-400 text-xs mb-3">
            <Link to="/" className="hover:text-gold-600">Home</Link> /{' '}
            {category && <><Link to={`/shop/${category.slug}`} className="hover:text-gold-600">{category.name}</Link> / </>}
            <span className="text-primary-500">{product.name}</span>
          </nav>

          {category && (
            <span className="inline-block bg-gold-50 text-gold-700 text-[11px] font-body font-semibold uppercase px-2 py-0.5 rounded">
              {category.name}
            </span>
          )}

          <h1 className="font-display text-display-md text-primary-500 font-bold mt-2 leading-tight">{product.name}</h1>

          <div className="flex items-center gap-2 mt-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} className="fill-gold-400 text-gold-400" />)}
            </div>
            <span className="font-body text-sm text-gray-500">
              {product.average_rating || '4.8'} ({product.rating_count || 0} reviews)
            </span>
          </div>

          <div className="mt-4">
            {price.isOnRequest ? (
              <span className="font-body text-lg text-gray-400 italic">Price on Request</span>
            ) : price.isOnSale ? (
              <span>
                <span className="font-mono text-gold-600 font-bold text-3xl">{price.display}</span>
                <span className="line-through text-gray-400 text-lg ml-2">{price.original}</span>
              </span>
            ) : (
              <span className="font-mono text-gold-600 font-bold text-3xl">{price.display}</span>
            )}
          </div>

          {product.short_description && (
            <p className="font-body text-gray-600 mt-4 leading-relaxed">{stripHtml(product.short_description)}</p>
          )}

          {/* Quantity + actions */}
          {!price.isOnRequest && (
            <div className="flex items-center gap-3 mt-6">
              <div className="flex items-center border border-gold-200 rounded-xl bg-white">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-11 h-11 flex items-center justify-center text-primary-500"><Minus size={16} /></button>
                <input
                  type="number" min="1" value={qty}
                  onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 text-center font-mono outline-none bg-transparent"
                />
                <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} className="w-11 h-11 flex items-center justify-center text-primary-500"><Plus size={16} /></button>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              ref={addBtnRef}
              type="button"
              onClick={handleAdd}
              className="flex-1 btn-shimmer bg-primary-500 hover:bg-primary-600 text-white font-body font-semibold h-12 rounded-xl flex items-center justify-center gap-2"
            >
              {price.isOnRequest ? <><MessageCircle size={18} /> Ask Us on WhatsApp</> : <><ShoppingBag size={18} /> Add to Cart</>}
            </button>
            {!price.isOnRequest && (
              <a
                href={buildAddToCartUrl(product.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 border border-gold-400 text-gold-700 hover:bg-gold-500 hover:text-primary-500 font-body font-semibold h-12 rounded-xl flex items-center justify-center transition-colors"
              >
                Buy Now
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            className="mt-3 text-sm font-body text-gray-500 hover:text-gold-600"
          >
            {wishlisted ? '♥ Saved to wishlist' : '♡ Add to wishlist'}
          </button>

          {isFreeShip && (
            <p className="mt-4 inline-flex items-center gap-2 bg-primary-50 text-primary-600 text-xs font-body font-semibold px-3 py-1.5 rounded-full">
              <Check size={14} /> Eligible for FREE shipping
            </p>
          )}

          <div className="flex items-center gap-2 mt-4 font-body text-sm text-gray-500">
            <Truck size={18} className="text-gold-600" /> Usually ships in 2–3 days
          </div>

          {/* Accordion */}
          <div className="mt-8">
            <Accordion title="Description" defaultOpen>
              <div dangerouslySetInnerHTML={{ __html: product.description || `<p>${siteConfig.description}</p>` }} />
            </Accordion>
            <Accordion title="Ingredients / Contents">
              100% natural ingredients. No preservatives, no artificial colours, no additives. Sourced directly from our gaushala and trusted organic farms.
            </Accordion>
            <Accordion title="Benefits">
              Rich in nutrients and traditionally prepared to preserve goodness. Supports a wholesome, chemical-free lifestyle for the whole family.
            </Accordion>
            <Accordion title="How to Use">
              Use as part of your daily cooking and wellness routine. Store in a cool, dry place away from direct sunlight.
            </Accordion>
            <Accordion title="Shipping & Returns">
              Free shipping on orders above ₹{siteConfig.freeShippingThreshold}. Dispatched within 2–3 days. Easy 7-day return policy on unopened items.
            </Accordion>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <ProductCarousel title="You May Also Like" products={related} bgClass="bg-white" />
      )}

      {/* Recently viewed */}
      {recent.length > 0 && (
        <ProductCarousel title="Recently Viewed" products={recent} bgClass="bg-cream" />
      )}

      {/* Sticky mobile add-to-cart bar */}
      <motion.div
        className="fixed bottom-16 left-0 right-0 z-30 md:hidden bg-white border-t border-gold-100 px-4 py-3 flex items-center gap-3"
        initial={false}
        animate={{ y: showStickyBar ? 0 : 120 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      >
        <div className="flex-1 min-w-0">
          <p className="font-body text-sm text-primary-500 font-medium truncate">{product.name}</p>
          <p className="font-mono text-gold-600 text-sm">{price.display}</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="bg-primary-500 text-white font-body font-semibold px-5 h-11 rounded-xl whitespace-nowrap flex items-center gap-2"
        >
          <ShoppingBag size={16} /> {price.isOnRequest ? 'Enquire' : 'Add'}
        </button>
      </motion.div>
    </div>
  )
}
