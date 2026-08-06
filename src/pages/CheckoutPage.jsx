import { useState } from 'react'
import { Link } from '../lib/router'
import { ArrowRight, Lock, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCart } from '../contexts/CartContext'
import { siteConfig } from '../config/siteConfig'
import { PRODUCT_IMAGE_FALLBACK, syncCartToWooCommerce } from '../services/woocommerce'

const unitPrice = (item) => {
  const sale = parseFloat(item.salePrice)
  const price = parseFloat(item.price)
  if (!Number.isNaN(sale) && sale > 0 && sale < price) return sale
  return Number.isNaN(price) ? 0 : price
}

export default function CheckoutPage() {
  const { items, cartTotal } = useCart()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const shipping = cartTotal >= siteConfig.freeShippingThreshold || cartTotal === 0
    ? 0
    : siteConfig.shippingCost
  const total = cartTotal + shipping

  const continueToCheckout = async () => {
    if (items.length === 0 || isRedirecting) return
    setIsRedirecting(true)
    try {
      await syncCartToWooCommerce(items)
      window.location.assign(siteConfig.checkoutUrl)
    } catch (error) {
      console.error('[Checkout] Cart handoff failed:', error)
      toast.error('We could not prepare checkout. Please try again.')
      setIsRedirecting(false)
    }
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <nav className="font-body text-gray-400 text-xs mb-6">
          <Link to="/cart" className="hover:text-gold-600">Cart</Link>
          {' / '}
          <span className="text-primary-500">Secure checkout</span>
        </nav>

        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-11 h-11 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
              <ShieldCheck size={23} />
            </span>
            <div>
              <h1 className="font-display text-2xl text-primary-500 font-bold">Continue to secure checkout</h1>
              <p className="font-body text-sm text-gray-500">Shipping and payment are completed securely through WooCommerce.</p>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-10">
              <p className="font-body text-gray-500 mb-4">Your cart is empty.</p>
              <Link to="/shop" className="inline-flex bg-primary-500 text-white font-body font-semibold px-6 py-3 rounded-xl">
                Browse products
              </Link>
            </div>
          ) : (
            <>
              <ul data-lenis-prevent className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3 border-b border-gold-100 pb-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-primary-500 flex-shrink-0">
                      {item.image && (
                        <img
                          src={item.image}
                          alt=""
                          onError={(event) => {
                            event.currentTarget.onerror = null
                            event.currentTarget.src = PRODUCT_IMAGE_FALLBACK
                          }}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm text-primary-500 font-medium truncate">{item.name}</p>
                      <p className="font-body text-xs text-gray-400">Quantity: {item.quantity}</p>
                    </div>
                    {unitPrice(item) > 0 && (
                      <span className="font-mono text-sm text-primary-500">
                        ₹{(unitPrice(item) * item.quantity).toLocaleString('en-IN')}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-2 font-body text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>₹{cartTotal.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Estimated shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
                <div className="flex justify-between pt-3 border-t border-gold-100 text-lg font-semibold">
                  <span>Estimated total</span><span className="font-mono text-gold-600">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={continueToCheckout}
                disabled={isRedirecting}
                className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-60 text-primary-500 font-bold py-4 rounded-xl text-lg font-body btn-shimmer mt-6 flex items-center justify-center gap-2"
              >
                <Lock size={18} />
                {isRedirecting ? 'Preparing secure checkout…' : 'Continue to WooCommerce'}
                {!isRedirecting && <ArrowRight size={18} />}
              </button>
              <p className="text-center font-body text-xs text-gray-400 mt-3">
                No card or banking information is collected by this React storefront.
              </p>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
