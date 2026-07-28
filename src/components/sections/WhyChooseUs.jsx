import { motion } from 'framer-motion'
import { siteConfig } from '../../config/siteConfig'
import { revealOnScroll, staggerOnScroll, staggerItem } from '../../animations/motion'
import GoldRule from '../ui/GoldRule'

export default function WhyChooseUs() {
  return (
    <section className="relative bg-cream grain py-16 md:py-24">
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <motion.h2
          className="font-display text-display-md text-primary-500 font-bold text-center mb-12"
          {...revealOnScroll}
        >
          Why Thousands Choose Gau Bhoomi?
        </motion.h2>
        <motion.div
          {...staggerOnScroll(0.08)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {siteConfig.whyChooseUs.map((item) => (
            <motion.div
              key={item.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 shadow-card border border-transparent hover:border-gold-300 transition-colors text-center"
            >
              <div className="text-4xl">{item.emoji}</div>
              <GoldRule from="center" width="w-8" className="my-3 mx-auto" />
              <h3 className="font-display text-primary-500 font-bold text-lg">{item.title}</h3>
              <p className="font-body text-gray-500 text-sm leading-relaxed mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
