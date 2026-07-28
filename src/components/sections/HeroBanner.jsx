import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { gsap, ScrollTrigger } from '../../hooks/useGSAP'
import { siteConfig } from '../../config/siteConfig'
import HeroParticles from '../ui/HeroParticles'
import Spotlight from '../ui/Spotlight'
import BlurText from '../ui/BlurText'
import Magnet from '../ui/Magnet'

// Premium branded gradient behind each slide — always renders, so the hero
// looks designed even if a slide's photo is slow or unavailable.
const SLIDE_BG = [
  'radial-gradient(circle at 72% 30%, rgba(201,168,76,0.28) 0%, transparent 55%), linear-gradient(135deg, #1e3d2c 0%, #142A1D 68%, #0D1F14 100%)',
  'radial-gradient(circle at 28% 68%, rgba(201,168,76,0.20) 0%, transparent 55%), linear-gradient(135deg, #244a34 0%, #142A1D 75%)',
  'radial-gradient(circle at 75% 35%, rgba(232,201,122,0.30) 0%, transparent 55%), linear-gradient(135deg, #3a2f14 0%, #1a3322 55%, #142A1D 100%)',
  'radial-gradient(circle at 50% 28%, rgba(201,168,76,0.22) 0%, transparent 60%), linear-gradient(135deg, #1e3d2c 0%, #0D1F14 100%)',
]

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

  // Desktop parallax on scroll. Two layers at different rates — the photo drifts
  // at roughly 0.4x the text — which is what reads as depth. A single moving
  // layer just looks like lag.
  useEffect(() => {
    if (window.innerWidth < 768) return
    const ctx = gsap.context(() => {
      const scrollTrigger = {
        // The element itself, not a selector: gsap.context scopes selector
        // strings to descendants of sectionRef, and .hero-section IS that
        // element — so the string never resolved.
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }

      // Overscale the photo first so 34px of travel never exposes an edge.
      // GSAP owns the whole transform here — setting scale via a Tailwind class
      // would be overwritten the moment GSAP writes `y`.
      gsap.set('.hero-img', { scale: 1.08 })
      gsap.to('.hero-img', { y: 34, ease: 'none', scrollTrigger })
      gsap.to('.hero-content', { y: 80, ease: 'none', scrollTrigger })
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
            <div
              key={i}
              className="relative flex-[0_0_100%] h-full"
              style={{ background: SLIDE_BG[i % SLIDE_BG.length] }}
            >
              <img
                src={slide.image}
                alt={slide.eyebrow}
                className="hero-img w-full h-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to right, rgba(20,42,29,0.88) 0%, rgba(20,42,29,0.55) 55%, rgba(20,42,29,0.15) 100%)' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Two-tone spotlight for depth, plus the woven texture. The earlier
          single gold bloom is gone — Spotlight supersedes it, and running both
          stacked two glows in one viewport. */}
      <Spotlight className="z-[1]" />
      <div className="hero-texture" />

      {/* Gold particle field — desktop only */}
      {isDesktop && <HeroParticles />}

      {/* Content overlay (re-animates per slide) */}
      <div className="hero-content absolute z-10 bottom-8 md:bottom-16 left-6 md:left-24 max-w-2xl pr-6">
        <motion.div key={selected}>
          {/* Eyebrow sits against a drawn vertical rule for a firmer left edge */}
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          >
            <span className="hero-rule block w-px h-8 bg-gold-500" />
            <p className="font-body text-gold-400 text-[11px] tracking-[0.34em] uppercase font-semibold">
              {active.eyebrow}
            </p>
          </motion.div>

          <BlurText
            as="h1"
            text={active.headline}
            className="font-display text-display-xl text-white font-bold whitespace-pre-line leading-[0.95] tracking-[-0.02em] [text-shadow:0_2px_28px_rgba(0,0,0,0.35)]"
          />

          <motion.p
            className="font-body text-white/85 text-base md:text-lg leading-relaxed mt-5 mb-7 max-w-md"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            {active.subheadline}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38 }}
          >
            {/* Primary: gold fill, arrow slides on hover, leans toward cursor */}
            <Magnet strength={7}>
              <Link
                to={active.ctaLink}
                className="group inline-flex items-center gap-2.5 bg-gold-500 text-primary-500 font-body font-bold px-8 py-4 rounded-full hover:bg-gold-400 hover:shadow-gold-lg transition-[background-color,box-shadow] duration-200 btn-shimmer"
              >
                {active.cta}
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Magnet>
            {/* Secondary: outline, per the brief's two-CTA hero */}
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border border-white/35 text-white font-body font-semibold px-7 py-4 rounded-full backdrop-blur-sm hover:border-gold-400 hover:text-gold-400 transition-colors duration-200"
            >
              Shop All
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
            className={`relative after:absolute after:content-[''] after:-inset-3 h-2 rounded-full transition-all duration-300 ${
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
