import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const promises = [
  { emoji: '🌱', title: 'Rooted in Tradition', desc: 'Every product honours time-tested Indian methods passed down through generations.' },
  { emoji: '🤝', title: 'Honest Sourcing', desc: 'Direct from our gaushala and trusted farms — no middlemen, no compromises.' },
  { emoji: '💛', title: 'Made with Care', desc: 'Small batches, crafted slowly, so quality and purity are never sacrificed.' },
]

export default function AboutPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="bg-primary-500 py-16 md:py-24 text-center px-4">
        <p className="font-body text-gold-400 text-[11px] tracking-[0.3em] uppercase font-semibold mb-3">Gau Bhoomi Naturals</p>
        <h1 className="font-display text-display-lg text-white font-bold">Our Story</h1>
        <p className="font-body text-cream/75 max-w-2xl mx-auto mt-4 leading-relaxed">
          Born from a simple belief — that pure, chemical-free food is a birthright, not a luxury. We bring the wisdom of
          the gaushala straight to your kitchen.
        </p>
      </section>

      {/* Who we are */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-display text-display-md text-primary-500 font-bold">Who We Are</h2>
          <div className="w-16 h-0.5 bg-gold-500 my-4" />
          <p className="font-body text-gray-600 leading-relaxed">
            Gau Bhoomi Naturals began on a family gaushala with a handful of indigenous Gir cows and a promise to never
            cut corners. Today we offer A2 ghee, cold pressed oils, organic grains, masalas, honey and superfoods — each
            one made the way nature intended.
          </p>
          <p className="font-body text-gray-600 leading-relaxed mt-4">
            No preservatives. No shortcuts. Just real food you can trust to feed your family.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden shadow-card">
          <img src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=900&q=80" alt="Our gaushala" className="w-full h-72 md:h-96 object-cover" />
        </motion.div>
      </section>

      {/* Our gaushala — full width */}
      <section className="relative h-80 md:h-96 flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=80" alt="Farm" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-bark/70" />
        <div className="relative z-10 text-center px-6 max-w-2xl">
          <h2 className="font-display text-display-md text-white font-bold">Our Gaushala</h2>
          <p className="font-body text-cream/80 mt-3 leading-relaxed">
            Free-roaming, stress-free cows grazing on natural pastures. Healthy, happy animals are the foundation of
            everything we make.
          </p>
        </div>
      </section>

      {/* Our promise */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <h2 className="font-display text-display-md text-primary-500 font-bold text-center mb-10">Our Promise</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promises.map((p) => (
            <div key={p.title} className="bg-white rounded-2xl p-6 shadow-card text-center">
              <div className="text-4xl">{p.emoji}</div>
              <h3 className="font-display text-primary-500 font-bold text-lg mt-3">{p.title}</h3>
              <p className="font-body text-gray-500 text-sm leading-relaxed mt-2">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission quote */}
      <section className="bg-primary-500 py-16 text-center px-4">
        <p className="font-display text-2xl md:text-3xl text-white italic max-w-3xl mx-auto leading-relaxed">
          “To bring back the purity of traditional Indian food — one honest jar at a time.”
        </p>
        <Link to="/shop" className="inline-flex items-center gap-2 bg-gold-500 text-primary-500 font-body font-bold px-8 py-3.5 rounded-full hover:bg-gold-400 transition-colors mt-8">
          Shop Our Products <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  )
}
