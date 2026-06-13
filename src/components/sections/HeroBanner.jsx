import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { gsap, ScrollTrigger } from '../../hooks/useGSAP'
import { siteConfig } from '../../config/siteConfig'

const HeroParticles = lazy(() => import('../three/HeroParticles'))

export default function HeroBanner() {
  const slides = siteConfig.heroSlides
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )
  const [selected, setSelected] = useState(0)
  const [isDesktop] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 768)
  const sectionRef = useRef(null)

  const onSelect = useCallback((api) => setSelected(api.selectedScrollSnap()), [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi, onSelect])

  // Desktop parallax on scroll
  useEffect(() => {
    if (window.innerWidth < 768) return
    const ctx = gsap.context(() => {
      gsap.to('.hero-content', {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  const scrollTo = (i) => emblaApi && emblaApi.scrollTo(i)
  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  const active = slides[selected]

  return (
    <section ref={sectionRef} className="hero-section relative h-[55vh] md:h-[88vh] overflow-hidden bg-primary-500">
      {/* Slides (background images) */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div key={i} className="relative flex-[0_0_100%] h-full">
              <img
                src={slide.image}
                alt={slide.eyebrow}
                className="w-full h-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to right, rgba(20,42,29,0.88) 0%, rgba(20,42,29,0.55) 55%, rgba(20,42,29,0.15) 100%)' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Three.js particles — desktop only */}
      {isDesktop && (
        <Suspense fallback={null}>
          <HeroParticles />
        </Suspense>
      )}

      {/* Content overlay (re-animates per slide) */}
      <div className="hero-content absolute z-10 bottom-8 md:bottom-16 left-6 md:left-24 max-w-xl pr-6">
        <motion.div key={selected}>
          <motion.p
            className="font-body text-gold-400 text-[11px] tracking-[0.3em] uppercase font-semibold mb-3"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          >
            {active.eyebrow}
          </motion.p>
          <motion.h1
            className="font-display text-display-xl text-white font-bold whitespace-pre-line leading-[1.05]"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          >
            {active.headline}
          </motion.h1>
          <motion.div
            className="w-16 h-0.5 bg-gold-500 my-4"
            initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
            style={{ transformOrigin: 'left' }} transition={{ duration: 0.5, delay: 0.15 }}
          />
          <motion.p
            className="font-body text-white/80 text-base md:text-lg leading-relaxed mb-6 max-w-md"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            {active.subheadline}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <Link
              to={active.ctaLink}
              className="inline-flex items-center gap-2 bg-gold-500 text-primary-500 font-body font-bold px-8 py-3.5 rounded-full hover:bg-gold-400 hover:scale-105 transition-all duration-200 btn-shimmer"
            >
              {active.cta} <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
        <motion.div
          key={selected}
          className="h-full bg-gold-500"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear' }}
        />
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20 font-mono text-gold-400 text-[13px]">
        {String(selected + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === selected ? 'w-6 bg-gold-500' : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Arrows — desktop */}
      <button type="button" onClick={scrollPrev} aria-label="Previous slide"
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-[52px] h-[52px] rounded-full bg-white/15 backdrop-blur-sm items-center justify-center text-gold-400 hover:bg-white/25 transition-colors">
        <ChevronLeft size={24} />
      </button>
      <button type="button" onClick={scrollNext} aria-label="Next slide"
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-[52px] h-[52px] rounded-full bg-white/15 backdrop-blur-sm items-center justify-center text-gold-400 hover:bg-white/25 transition-colors">
        <ChevronRight size={24} />
      </button>
    </section>
  )
}
