import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'

const benefits = [
  'Hand-churned using the ancient wooden Bilona',
  'From grass-fed, free-roaming A2 Gir cows',
  'Rich in nutrients, vitamins & healthy fats',
  'No preservatives, colours or additives — ever',
]

export default function GheeSpotlight() {
  return (
    <section className="bg-primary-500 py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Image (top on mobile) */}
        <motion.div
          className="order-1 md:order-2"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative rounded-2xl overflow-hidden animate-float" style={{ boxShadow: '0 0 40px rgba(201,168,76,0.3)' }}>
            <img
              src="https://images.unsplash.com/photo-1631451095765-2c91616b9d05?w=900&q=80"
              alt="A2 Gir Cow Ghee"
              className="w-full h-72 md:h-[28rem] object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          className="order-2 md:order-1"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-body text-gold-400 text-[11px] tracking-[0.3em] uppercase font-semibold mb-3">Our Signature Product</p>
          <h2 className="font-display text-display-lg text-white font-bold leading-tight">A2 Gir Cow Ghee — The Bilona Way</h2>
          <div className="w-16 h-0.5 bg-gold-500 my-5" />
          <p className="font-body text-cream/80 text-base leading-relaxed mb-6">
            Liquid gold in every jar. Our flagship ghee is crafted with patience and tradition, simmered slowly to preserve
            its golden grain, heavenly aroma and time-honoured purity.
          </p>
          <ul className="space-y-3 mb-8">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 font-body text-cream/90 text-sm">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-gold-500 text-primary-500 flex items-center justify-center flex-shrink-0">
                  <Check size={13} strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <Link
            to="/shop/ghee"
            className="inline-flex items-center gap-2 bg-gold-500 text-primary-500 font-body font-bold px-8 py-3.5 rounded-full hover:bg-gold-400 hover:scale-105 transition-all duration-200 btn-shimmer"
          >
            Shop Ghee <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
