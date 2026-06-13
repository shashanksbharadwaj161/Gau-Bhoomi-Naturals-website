import { motion } from 'framer-motion'
import { Leaf, Award, Truck, RotateCcw, FlaskConical } from 'lucide-react'

const badges = [
  { Icon: Leaf,        title: '100% Organic',    subtitle: 'Certified Natural' },
  { Icon: Award,       title: 'Premium Quality', subtitle: 'Lab Tested' },
  { Icon: Truck,       title: 'Fast Delivery',   subtitle: 'Pan-India Shipping' },
  { Icon: RotateCcw,   title: 'Easy Returns',    subtitle: '7-Day Policy' },
  { Icon: FlaskConical,title: 'Zero Chemicals',  subtitle: 'No Additives' },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function TrustBadges() {
  return (
    <section className="bg-primary-500 py-8">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-4 md:px-8 flex gap-4 md:gap-0 overflow-x-auto hide-scrollbar md:grid md:grid-cols-5"
      >
        {badges.map(({ Icon, title, subtitle }, i) => (
          <motion.div
            key={title}
            variants={item}
            className={`flex flex-col items-center text-center gap-2 min-w-[140px] md:min-w-0 px-4 ${
              i < badges.length - 1 ? 'md:border-r md:border-gold-500/20' : ''
            }`}
          >
            <Icon size={36} className="text-gold-400" strokeWidth={1.6} />
            <p className="font-body font-bold text-white text-sm">{title}</p>
            <p className="font-body text-white/60 text-xs">{subtitle}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
