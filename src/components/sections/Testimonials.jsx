import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Star } from 'lucide-react'
import { siteConfig } from '../../config/siteConfig'

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  )
  const [snaps, setSnaps] = useState([])
  const [selected, setSelected] = useState(0)

  const onSelect = useCallback((api) => setSelected(api.selectedScrollSnap()), [])

  useEffect(() => {
    if (!emblaApi) return
    setSnaps(emblaApi.scrollSnapList())
    onSelect(emblaApi)
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', () => { setSnaps(emblaApi.scrollSnapList()); onSelect(emblaApi) })
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className="bg-primary-500 py-16 md:py-20">
      <h2 className="font-display text-display-md text-gold-400 font-bold text-center mb-10 px-4">
        What Our Customers Say
      </h2>

      <div className="max-w-7xl mx-auto px-4 md:px-8 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {siteConfig.testimonials.map((t, i) => (
            <div key={i} className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]">
              <div className="bg-cream rounded-2xl p-6 h-full flex flex-col">
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
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {snaps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
            className={`h-2 rounded-full transition-all ${i === selected ? 'w-6 bg-gold-500' : 'w-2 bg-white/30'}`}
          />
        ))}
      </div>
    </section>
  )
}
