import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useUI } from '../../contexts/UIContext'
import { useCart } from '../../contexts/CartContext'
import { siteConfig } from '../../config/siteConfig'
import { getLenis } from '../../hooks/useLenis'

const unitPrice = (it) => {
  const sale = parseFloat(it.salePrice)
  const price = parseFloat(it.price)
  if (!isNaN(sale) && sale > 0 && sale < price) return sale
  return isNaN(price) ? 0 : price
}

export default function CartDrawer() {
  const { cartOpen, closeCart } = useUI()
  const { items, updateQuantity, removeItem, cartTotal, cartCount } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    if (!cartOpen) return
    const lenis = getLenis()
    lenis?.stop()
    const onKey = (e) => { if (e.key === 'Escape') closeCart() }
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [cartOpen, closeCart])

  const threshold = siteConfig.freeShippingThreshold
  const remaining = Math.max(0, threshold - cartTotal)
  const progress = Math.min(100, (cartTotal / threshold) * 100)

  const go = (path) => { closeCart(); navigate(path) }

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[210] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed top-0 right-0 bottom-0 z-[220] w-full sm:w-96 bg-cream flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-gold-100 bg-white">
              <h2 className="font-display text-lg text-primary-500 font-bold">
                Your Cart {cartCount > 0 && <span className="text-gold-600">({cartCount})</span>}
              </h2>
              <button type="button" onClick={closeCart} aria-label="Close cart"
                className="w-9 h-9 rounded-full hover:bg-gold-50 flex items-center justify-center text-primary-500">
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-4">
                <ShoppingBag size={56} className="text-gold-300" />
                <p className="font-display text-xl text-primary-500">Your cart is empty</p>
                <button type="button" onClick={() => go('/shop')}
                  className="bg-gold-500 hover:bg-gold-400 text-primary-500 font-body font-semibold px-6 py-3 rounded-full">
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Free shipping progress */}
                {cartTotal < threshold && (
                  <div className="px-5 py-3 bg-gold-50 border-b border-gold-100">
                    <p className="font-body text-xs text-primary-600 mb-1.5">
                      Add <span className="font-semibold">₹{remaining.toLocaleString('en-IN')}</span> more for free shipping 🚚
                    </p>
                    <div className="h-1.5 rounded-full bg-gold-200 overflow-hidden">
                      <motion.div className="h-full bg-gold-500" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )}

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((it) => (
                      <motion.div
                        key={it.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-3"
                      >
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-primary-500 flex-shrink-0">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-gold-400 text-[10px] font-display">GBN</span>
                          </div>
                          {it.image && <img src={it.image} alt={it.name} onError={(e) => { e.currentTarget.style.display = 'none' }} className="absolute inset-0 w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm text-primary-500 font-medium line-clamp-2 leading-snug">{it.name}</p>
                          <p className="font-mono text-gold-600 text-sm mt-0.5">₹{(unitPrice(it)).toLocaleString('en-IN')}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <div className="flex items-center border border-gold-200 rounded-lg">
                              <button type="button" aria-label="Decrease" onClick={() => updateQuantity(it.id, it.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center text-primary-500"><Minus size={13} /></button>
                              <span className="w-7 text-center font-mono text-sm">{it.quantity}</span>
                              <button type="button" aria-label="Increase" onClick={() => updateQuantity(it.id, it.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-primary-500"><Plus size={13} /></button>
                            </div>
                            <button type="button" aria-label="Remove" onClick={() => removeItem(it.id)}
                              className="text-gray-400 hover:text-red-500 ml-1"><Trash2 size={15} /></button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="border-t border-gold-100 bg-white px-5 py-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-gray-500">Total</span>
                    <span className="font-mono text-xl text-gold-600 font-bold">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => go('/cart')}
                      className="border border-gold-300 text-primary-500 hover:bg-gold-50 font-body font-semibold py-3 rounded-xl text-sm">
                      View Cart
                    </button>
                    <button type="button" onClick={() => go('/checkout')}
                      className="btn-shimmer bg-primary-500 hover:bg-primary-600 text-white font-body font-semibold py-3 rounded-xl text-sm">
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
