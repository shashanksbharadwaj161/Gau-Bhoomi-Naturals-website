import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { siteConfig } from '../../config/siteConfig'
import { revealOnScroll } from '../../animations/motion'

// Infinite moving cards — adapted from the Aceternity UI concept, reusing the
// marquee mechanism already written for TrustBadges: the list renders twice and
// the track translates exactly -50%, so the seam lands on an identical frame.
//
// This replaces a snapping Embla carousel. Continuous drift reads calmer and
// more premium than discrete jumps, and it removes the autoplay/drag/dot
// machinery entirely. The trade-off is losing drag and the dot control; the
// track pauses on hover so a quote can still be read at leisure.

function Card({ t }) {
  return (
    <div className="w-[86vw] sm:w-[380px] shrink-0 px-3">
      <div className="bg-cream rounded-2xl p-6 h-full flex flex-col border border-gold-500/25">
        <span className="font-display text-6xl text-gold-400 leading-none">“</span>
        <p className="font-body text-primary-500 text-sm leading-relaxed -mt-4 flex-1">{t.text}</p>
        <div className="flex gap-0.5 mt-4">
          {Array.from({ length: t.rating }).map((_, s) => (
            <Star key={s} size={15} className="fill-gold-400 text-gold-400" />
          ))}
        </div>
        <div className="mt-3">
          <p className="font-display text-primary-500 font-semibold">{t.name}</p>
          <p className="font-body text-gray-400 text-xs">{t.city}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="bg-primary-500 py-16 md:py-20 overflow-hidden">
      <motion.h2
        className="font-display text-display-md text-gold-400 font-bold text-center mb-10 px-4"
        {...revealOnScroll}
      >
        What Our Customers Say
      </motion.h2>

      <div className="marquee-mask">
        <div className="flex w-max animate-marquee-slow hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex" aria-hidden={copy === 1}>
              {siteConfig.testimonials.map((t, i) => <Card key={i} t={t} />)}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
