import { useEffect, useRef } from 'react'
import { animateCounter } from '../../hooks/useGSAP'
import { siteConfig } from '../../config/siteConfig'

export default function StatCounter() {
  const refs = useRef([])

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (el) animateCounter(el, siteConfig.stats[i].value, siteConfig.stats[i].suffix)
    })
  }, [])

  return (
    <section className="bg-primary-500 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-y-8">
        {siteConfig.stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`text-center px-2 ${i < siteConfig.stats.length - 1 ? 'md:border-r md:border-gold-500/20' : ''}`}
          >
            <p
              ref={(el) => (refs.current[i] = el)}
              className="font-display text-4xl md:text-5xl text-gold-400 font-bold"
            >
              0{stat.suffix}
            </p>
            <p className="font-body text-white/70 text-sm mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
