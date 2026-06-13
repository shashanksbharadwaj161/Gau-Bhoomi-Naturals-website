import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import ProductCarousel from '../components/ui/ProductCarousel'
import { useCart } from '../contexts/CartContext'
import { getProducts } from '../services/woocommerce'
import { siteConfig } from '../config/siteConfig'

const unitPrice = (it) => {
  const sale = parseFloat(it.salePrice)
  const price = parseFloat(it.price)
  if (!isNaN(sale) && sale > 0 && sale < price) return sale
  return isNaN(price) ? 0 : price
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, cartTotal } = useCart()
  const navigate = useNavigate()
  const [coupon, setCoupon] = useState('')
  const [crossSell, setCrossSell] = useState([])

  useEffect(() => {
    getProducts({ per_page: 8 }).then(setCrossSell)
  }, [])

  const threshold = siteConfig.freeShippingThreshold
  const shipping = cartTotal >= threshold || cartTotal === 0 ? 0 : siteConfig.shippingCost
  const total = cartTotal + shipping
  const remaining = Math.max(0, threshold - cartTotal)

  const applyCoupon = (e) => {
    e.preventDefault()
    if (!coupon.trim()) return
    toast.success(`Coupon "${coupon.toUpperCase()}" applied!`)
    setCoupon('')
  }

  if (items.length === 0) {
    return (
      <div className="bg-cream min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
        <ShoppingBag size={80} className="text-gold-300" />
        <h1 className="font-display text-2xl text-primary-500 font-bold mt-4">Your cart is empty</h1>
        <p className="font-body text-gray-500 mt-2">Looks like you haven’t added anything yet.</p>
        <Link to="/shop" className="mt-6 bg-gold-500 hover:bg-gold-400 text-primary-500 font-body font-bold px-8 py-3.5 rounded-full">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <nav className="font-body text-gray-400 text-xs mb-2">
          <Link to="/" className="hover:text-gold-600">Home</Link> / <span className="text-primary-500">Cart</span>
        </nav>
        <h1 className="font-display text-display-md text-primary-500 font-bold mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence initial={false}>
              {items.map((it) => (
                <motion.div
                  key={it.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  className="bg-white rounded-2xl p-4 flex gap-4 shadow-card"
                >
                  <Link to={`/product/${it.slug}`} className="relative block w-20 h-20 rounded-lg overflow-hidden bg-primary-500 flex-shrink-0">
                    <span className="absolute inset-0 flex items-center justify-center text-gold-400 text-xs font-display">GBN</span>
                    {it.image && <img src={it.image} alt={it.name} onError={(e) => { e.currentTarget.style.display = 'none' }} className="absolute inset-0 w-full h-full object-cover" />}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${it.slug}`} className="font-body text-sm md:text-base text-primary-500 font-medium line-clamp-2 hover:text-gold-600">{it.name}</Link>
                    {it.categorySlug && <p className="font-body text-xs text-gray-400 capitalize mt-0.5">{it.categorySlug.replace('-', ' ')}</p>}
                    <p className="font-mono text-gold-600 font-semibold mt-1">₹{unitPrice(it).toLocaleString('en-IN')}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gold-200 rounded-lg">
                        <button type="button" aria-label="Decrease" onClick={() => updateQuantity(it.id, it.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-primary-500"><Minus size={14} /></button>
                        <span className="w-8 text-center font-mono text-sm">{it.quantity}</span>
                        <button type="button" aria-label="Increase" onClick={() => updateQuantity(it.id, it.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-primary-500"><Plus size={14} /></button>
                      </div>
                      <button type="button" onClick={() => removeItem(it.id)} className="text-gray-400 hover:text-red-500 flex items-center gap-1 text-xs font-body">
                        <Trash2 size={15} /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="font-mono text-primary-500 font-semibold whitespace-nowrap">
                    ₹{(unitPrice(it) * it.quantity).toLocaleString('en-IN')}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Coupon */}
            <form onSubmit={applyCoupon} className="bg-white rounded-2xl p-4 shadow-card flex gap-3">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code (e.g. WELCOME15)"
                className="flex-1 border border-gold-200 rounded-lg px-4 py-2.5 font-body text-sm outline-none focus:border-gold-500 min-w-0"
              />
              <button type="submit" className="bg-primary-500 text-white font-body font-semibold px-5 rounded-lg text-sm">Apply</button>
            </form>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <h2 className="font-display text-lg text-primary-500 font-bold mb-4">Order Summary</h2>
              <div className="space-y-2.5 font-body text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-mono text-primary-500">₹{cartTotal.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="font-mono">{shipping === 0 ? <span className="text-green-600 font-semibold">FREE</span> : `₹${shipping}`}</span></div>
              </div>

              {cartTotal < threshold && (
                <div className="mt-4">
                  <p className="font-body text-xs text-primary-600 mb-1.5">Add ₹{remaining.toLocaleString('en-IN')} more for free shipping 🚚</p>
                  <div className="h-1.5 rounded-full bg-gold-100 overflow-hidden">
                    <div className="h-full bg-gold-500" style={{ width: `${Math.min(100, (cartTotal / threshold) * 100)}%` }} />
                  </div>
                </div>
              )}

              <div className="border-t border-gold-100 mt-4 pt-4 flex justify-between items-center">
                <span className="font-body text-primary-500 font-semibold">Total</span>
                <span className="font-mono text-2xl text-gold-600 font-bold">₹{total.toLocaleString('en-IN')}</span>
              </div>

              <button type="button" onClick={() => navigate('/checkout')} className="w-full btn-shimmer bg-gold-500 hover:bg-gold-400 text-primary-500 font-body font-bold py-3.5 rounded-xl mt-5 flex items-center justify-center gap-2">
                Proceed to Checkout <ArrowRight size={18} />
              </button>
              <Link to="/shop" className="block text-center w-full border border-gold-300 text-primary-500 hover:bg-gold-50 font-body font-semibold py-3 rounded-xl mt-3">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {crossSell.length > 0 && <ProductCarousel title="You Might Also Like" products={crossSell} bgClass="bg-white" />}
    </div>
  )
}
