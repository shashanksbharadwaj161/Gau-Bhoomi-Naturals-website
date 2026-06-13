import { motion } from 'framer-motion'
import { siteConfig } from '../../config/siteConfig'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const card = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

export default function WhyChooseUs() {
  return (
    <section className="relative bg-cream grain py-16 md:py-24">
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="font-display text-display-md text-primary-500 font-bold text-center mb-12">
          Why Thousands Choose Gau Bhoomi?
        </h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {siteConfig.whyChooseUs.map((item) => (
            <motion.div
              key={item.title}
              variants={card}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 shadow-card border border-transparent hover:border-gold-300 transition-colors text-center"
            >
              <div className="text-4xl">{item.emoji}</div>
              <div className="w-8 h-0.5 bg-gold-500 my-3 mx-auto" />
              <h3 className="font-display text-primary-500 font-bold text-lg">{item.title}</h3>
              <p className="font-body text-gray-500 text-sm leading-relaxed mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
