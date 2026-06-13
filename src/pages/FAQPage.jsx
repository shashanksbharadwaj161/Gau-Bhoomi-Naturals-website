import { useMemo, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'

const FAQS = [
  { category: 'Orders', q: 'How do I place an order?', a: 'Browse our shop, add items to your cart, and proceed to checkout. You can pay securely via card, UPI, net banking or wallet.' },
  { category: 'Orders', q: 'Can I modify or cancel my order?', a: 'Orders can be modified or cancelled within 2 hours of placing them. Contact us on WhatsApp and we’ll help right away.' },
  { category: 'Orders', q: 'Do you offer cash on delivery?', a: 'COD is available on select pin codes. Availability is shown at checkout based on your delivery address.' },
  { category: 'Products', q: 'Is your ghee really A2 Gir cow ghee?', a: 'Yes. Our ghee is made exclusively from the A2 milk of indigenous Gir cows, hand-churned using the traditional Bilona method.' },
  { category: 'Products', q: 'Are your products chemical-free?', a: 'Absolutely. We use zero preservatives, artificial colours or additives across our entire range.' },
  { category: 'Products', q: 'How should I store the products?', a: 'Store in a cool, dry place away from direct sunlight. Ghee does not require refrigeration; honey may crystallise naturally, which is a sign of purity.' },
  { category: 'Products', q: 'What is the shelf life?', a: 'Most products stay fresh for 6–12 months when stored correctly. Check the label on each product for exact details.' },
  { category: 'Shipping', q: 'Do you offer free shipping?', a: 'Yes — free shipping on all orders above ₹999. Below that, a flat ₹99 shipping fee applies.' },
  { category: 'Shipping', q: 'How long does delivery take?', a: 'Orders are dispatched within 2–3 days and typically delivered within 4–7 days depending on your location.' },
  { category: 'Shipping', q: 'Do you ship across India?', a: 'Yes, we ship pan-India. International shipping is currently not available.' },
  { category: 'Returns', q: 'What is your return policy?', a: 'We offer an easy 7-day return policy on unopened items. Reach out to us and we’ll arrange a pickup or replacement.' },
  { category: 'Returns', q: 'How do refunds work?', a: 'Approved refunds are processed to your original payment method within 5–7 business days.' },
  { category: 'Returns', q: 'What if I receive a damaged product?', a: 'We’re sorry! Share a photo with us on WhatsApp within 48 hours of delivery and we’ll send a free replacement.' },
  { category: 'About Gau Bhoomi', q: 'Where are your products made?', a: 'Everything comes directly from our own gaushala and a network of trusted organic farms across India.' },
  { category: 'About Gau Bhoomi', q: 'What makes Gau Bhoomi different?', a: 'We never compromise on purity. Small batches, traditional methods and complete transparency — from farm to your doorstep.' },
  { category: 'About Gau Bhoomi', q: 'How can I contact you?', a: 'Reach us via the Contact page, email or WhatsApp. We respond within 24 hours.' },
]

const CATEGORIES = ['Orders', 'Products', 'Shipping', 'Returns', 'About Gau Bhoomi']

function FaqItem({ q, a }) {
  return (
    <Disclosure>
      {({ open }) => (
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <Disclosure.Button className="flex w-full items-center justify-between px-5 py-4 text-left font-body font-medium text-primary-500">
            {q}
            <ChevronDown size={18} className={`flex-shrink-0 ml-3 text-gold-600 transition-transform ${open ? 'rotate-180' : ''}`} />
          </Disclosure.Button>
          <AnimatePresence initial={false}>
            {open && (
              <Disclosure.Panel static as={motion.div}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-4 font-body text-sm text-gray-600 leading-relaxed">{a}</p>
              </Disclosure.Panel>
            )}
          </AnimatePresence>
        </div>
      )}
    </Disclosure>
  )
}

export default function FAQPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return FAQS
    return FAQS.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
  }, [query])

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-primary-500 py-12 md:py-16 text-center px-4">
        <h1 className="font-display text-display-lg text-white font-bold">Frequently Asked Questions</h1>
        <p className="font-body text-cream/70 mt-2">Everything you need to know about Gau Bhoomi Naturals</p>
        <div className="relative max-w-md mx-auto mt-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full bg-white rounded-full pl-11 pr-4 py-3 font-body text-sm text-primary-500 outline-none focus:ring-2 focus:ring-gold-400"
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 space-y-10">
        {query.trim() ? (
          <div className="space-y-3">
            {filtered.length === 0
              ? <p className="text-center font-body text-gray-400 py-8">No questions matched “{query}”.</p>
              : filtered.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
        ) : (
          CATEGORIES.map((cat) => {
            const items = FAQS.filter((f) => f.category === cat)
            if (items.length === 0) return null
            return (
              <div key={cat}>
                <h2 className="font-display text-xl text-primary-500 font-bold mb-3">{cat}</h2>
                <div className="space-y-3">
                  {items.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
