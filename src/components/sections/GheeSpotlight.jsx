import { motion } from 'framer-motion'
import { Link } from '../../lib/router'
import { Check, ArrowRight } from 'lucide-react'
import Parallax from '../ui/Parallax'
import GoldRule from '../ui/GoldRule'
import BilonaProcess from '../ui/BilonaProcess'

const benefits = [
  'Hand-churned using the ancient wooden Bilona',
  'From grass-fed, free-roaming A2 Gir cows',
  'Rich in nutrients, vitamins & healthy fats',
  'No preservatives, colours or additives — ever',
]

export default function GheeSpotlight() {
  return (
    // `grain` reuses the existing noise overlay (already on WhyChooseUs and
    // FarmGallery) for the artisanal tooth the brief asks for. It needs
    // `relative` on the section and `z-10` on the content, since the overlay is
    // an absolutely positioned ::before at z-index 0.
    <section className="relative bg-primary-500 grain py-16 md:py-24 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Image (top on mobile) */}
        <motion.div
          className="order-1 md:order-2"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          {/* Scroll-linked drift replaces the old `animate-float` bob. A loop
              that ignores scroll reads as decoration; tying it to scroll reads
              as depth. */}
          <Parallax distance={28}>
            <BilonaProcess />
          </Parallax>
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
          <GoldRule className="my-5" />
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
