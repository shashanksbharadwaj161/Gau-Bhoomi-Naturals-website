import { Link } from '../../lib/router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { siteConfig } from '../../config/siteConfig'
import { staggerOnScroll, staggerItem } from '../../animations/motion'

export default function CategoryBoxes() {
  return (
    <section className="bg-white pb-12 md:pb-16">
      <motion.div
        className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        {...staggerOnScroll(0.1)}
      >
        {siteConfig.categoryBoxes.map((box) => (
          <motion.div key={box.slug} variants={staggerItem}>
            <Link
              to={`/shop/${box.slug}`}
              className="group block h-full rounded-2xl border border-gold-500 bg-white overflow-hidden shadow-card hover:shadow-card-hover hover:border-gold-600 transition-[box-shadow,border-color] duration-300"
            >
              {/* Deep-green panel, matching the product-image treatment. The GBN
                  monogram sits behind, so an absent photo still reads as
                  deliberate. */}
              {/* 1:1 — the posters are 1024x1024, so a square box shows them
                  whole with no crop at any width. */}
              <div className="relative w-full aspect-square overflow-hidden bg-primary-500">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-4xl text-gold-400 tracking-widest">GBN</span>
                </div>
                {box.image && (
                  <img
                    src={box.image}
                    alt={box.name}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                )}
              </div>

              <div className="p-5 md:p-6">
                <h3 className="font-display text-xl md:text-2xl text-primary-500 font-bold group-hover:text-gold-600 transition-colors">
                  {box.name}
                </h3>
                <p className="font-body text-gray-500 text-sm mt-2">{box.blurb}</p>
                <span className="inline-flex items-center gap-1 text-gold-600 font-body font-semibold text-sm mt-4">
                  Shop {box.name}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
