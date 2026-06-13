import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CreditCard, Smartphone, Building2, Wallet, ShieldCheck, Lock } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { siteConfig } from '../config/siteConfig'

const INDIAN_STATES = ['Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal']

const PAYMENT_TABS = [
  { key: 'card',    label: 'Card',        Icon: CreditCard },
  { key: 'upi',     label: 'UPI',         Icon: Smartphone },
  { key: 'netbank', label: 'Net Banking', Icon: Building2 },
  { key: 'wallet',  label: 'Wallet',      Icon: Wallet },
]

const Field = ({ label, type = 'text', required, full, placeholder }) => (
  <div className={full ? 'sm:col-span-2' : ''}>
    <label className="block font-body text-sm text-primary-500 mb-1.5">{label}{required && <span className="text-red-500">*</span>}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-white border border-gold-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 rounded-lg px-4 py-3 font-body text-sm outline-none"
    />
  </div>
)

const unitPrice = (it) => {
  const sale = parseFloat(it.salePrice)
  const price = parseFloat(it.price)
  if (!isNaN(sale) && sale > 0 && sale < price) return sale
  return isNaN(price) ? 0 : price
}

export default function CheckoutPage() {
  const { items, cartTotal } = useCart()
  const [tab, setTab] = useState('card')

  const shipping = cartTotal >= siteConfig.freeShippingThreshold || cartTotal === 0 ? 0 : siteConfig.shippingCost
  const total = cartTotal + shipping

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <nav className="font-body text-gray-400 text-xs mb-2">
          <Link to="/cart" className="hover:text-gold-600">Cart</Link> / <span className="text-primary-500">Checkout</span>
        </nav>

        {/* Step indicator */}
        <div className="flex items-center gap-3 font-body text-sm mb-8">
          <span className="flex items-center gap-2 text-primary-500 font-semibold"><span className="w-6 h-6 rounded-full bg-gold-500 text-primary-500 flex items-center justify-center text-xs">1</span> Shipping</span>
          <span className="w-8 h-px bg-gold-300" />
          <span className="flex items-center gap-2 text-gray-400"><span className="w-6 h-6 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center text-xs">2</span> Payment</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping */}
            <section className="bg-white rounded-2xl p-6 shadow-card">
              <h2 className="font-display text-lg text-primary-500 font-bold mb-5">Shipping Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" required placeholder="Your name" />
                <Field label="Email" type="email" required placeholder="you@example.com" />
                <Field label="Phone" type="tel" required placeholder="+91" />
                <Field label="PIN Code" required placeholder="560001" />
                <Field label="Address Line 1" required full placeholder="House no., street" />
                <Field label="Address Line 2" full placeholder="Area, landmark (optional)" />
                <Field label="City" required placeholder="City" />
                <div>
                  <label className="block font-body text-sm text-primary-500 mb-1.5">State<span className="text-red-500">*</span></label>
                  <select className="w-full bg-white border border-gold-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 rounded-lg px-4 py-3 font-body text-sm outline-none">
                    <option value="">Select state</option>
                    {INDIAN_STATES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="bg-white rounded-2xl p-6 shadow-card">
              <h2 className="font-display text-lg text-primary-500 font-bold mb-5">Payment Method</h2>
              <div className="flex flex-wrap gap-2 mb-5">
                {PAYMENT_TABS.map(({ key, label, Icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTab(key)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-body text-sm font-semibold border transition-colors ${
                      tab === key ? 'bg-primary-500 text-white border-primary-500' : 'bg-white text-primary-500 border-gold-200 hover:border-gold-400'
                    }`}
                  >
                    <Icon size={16} /> {label}
                  </button>
                ))}
              </div>

              {tab === 'card' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Card Number" full placeholder="1234 5678 9012 3456" />
                  <Field label="Name on Card" full placeholder="Name as on card" />
                  <Field label="Expiry" placeholder="MM/YY" />
                  <Field label="CVV" placeholder="•••" />
                </div>
              )}
              {tab === 'upi' && (
                <div className="space-y-4">
                  <Field label="UPI ID" placeholder="name@upi" />
                  <button type="button" className="w-full border border-gold-300 text-gold-700 hover:bg-gold-50 font-body font-semibold py-3 rounded-lg">Pay via UPI App</button>
                </div>
              )}
              {tab === 'netbank' && (
                <div>
                  <label className="block font-body text-sm text-primary-500 mb-1.5">Select Bank</label>
                  <select className="w-full bg-white border border-gold-200 rounded-lg px-4 py-3 font-body text-sm outline-none focus:border-gold-500">
                    <option>HDFC Bank</option><option>State Bank of India</option><option>ICICI Bank</option><option>Axis Bank</option><option>Kotak Mahindra</option>
                  </select>
                </div>
              )}
              {tab === 'wallet' && (
                <div className="flex flex-wrap gap-2">
                  {['Paytm', 'PhonePe', 'GPay', 'Amazon Pay'].map((w) => (
                    <span key={w} className="px-4 py-2.5 rounded-full border border-gold-200 font-body text-sm text-primary-500">{w}</span>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <h2 className="font-display text-lg text-primary-500 font-bold mb-4">Your Order</h2>
              {items.length === 0 ? (
                <p className="font-body text-sm text-gray-400">Your cart is empty. <Link to="/shop" className="text-gold-600">Shop now</Link></p>
              ) : (
                <ul className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {items.map((it) => (
                    <li key={it.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-primary-500 flex-shrink-0 flex items-center justify-center relative">
                        {it.image ? <img src={it.image} alt={it.name} className="w-full h-full object-cover" /> : <span className="text-gold-400 text-[9px] font-display">GBN</span>}
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold-500 text-primary-500 text-[10px] flex items-center justify-center">{it.quantity}</span>
                      </div>
                      <span className="flex-1 font-body text-xs text-primary-500 line-clamp-2">{it.name}</span>
                      <span className="font-mono text-xs text-primary-500">₹{(unitPrice(it) * it.quantity).toLocaleString('en-IN')}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="border-t border-gold-100 mt-4 pt-4 space-y-2 font-body text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-mono">₹{cartTotal.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="font-mono">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
                <div className="flex justify-between pt-2 border-t border-gold-100"><span className="text-primary-500 font-semibold">Total</span><span className="font-mono text-lg text-gold-600 font-bold">₹{total.toLocaleString('en-IN')}</span></div>
              </div>

              <label className="flex items-start gap-2 mt-4 font-body text-xs text-gray-500">
                <input type="checkbox" className="mt-0.5 accent-gold-500" /> I agree to the Terms and Conditions
              </label>

              <button
                type="button"
                onClick={() => { window.location.href = siteConfig.checkoutUrl }}
                className="w-full bg-gold-500 hover:bg-gold-400 text-primary-500 font-bold py-4 rounded-xl text-lg font-body btn-shimmer mt-4 flex items-center justify-center gap-2"
              >
                <Lock size={18} /> Pay Now — ₹{total.toLocaleString('en-IN')}
              </button>
              <p className="flex items-center justify-center gap-1.5 font-body text-xs text-gray-400 mt-3">
                <ShieldCheck size={14} className="text-green-600" /> Secured by Razorpay · 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
