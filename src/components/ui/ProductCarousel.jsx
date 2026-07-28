import { useCallback, useEffect, useMemo, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import ProductCard from './ProductCard'
import SkeletonCard from './SkeletonCard'
import GoldRule from './GoldRule'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

// Side-scroll falloff. Slides recede only inside the outer band of the viewport,
// so the middle of the rail is always untouched — and only on a side that has
// more content to reach, which is what keeps the first and last cards at full
// weight when the rail is parked at either end.
const FADE_ZONE = 0.28
const MIN_SCALE = 0.92
const MIN_OPACITY = 0.5

export default function ProductCarousel({
  title,
  subtitle,
  products = [],
  loading = false,
  viewAllLink,
  bgClass = 'bg-white',
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    loop: false,
    containScroll: 'trimSnaps',
  })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const onSelect = useCallback((api) => {
    if (!api) return
    setCanPrev(api.canScrollPrev())
    setCanNext(api.canScrollNext())
  }, [])

  // Scale and fade each slide by how far into the outer band of the rail it has
  // travelled. All rects are read before any style is written, so the pass costs
  // one layout rather than one per slide.
  const tween = useCallback((api) => {
    const root = api.rootNode().getBoundingClientRect()
    if (!root.width) return
    const slides = api.slideNodes()
    const nearPrev = api.canScrollPrev()
    const nearNext = api.canScrollNext()

    const amounts = slides.map((slide) => {
      const rect = slide.getBoundingClientRect()
      const centre = (rect.left + rect.width / 2 - root.left) / root.width
      if (centre < FADE_ZONE) return nearPrev ? (FADE_ZONE - centre) / FADE_ZONE : 0
      if (centre > 1 - FADE_ZONE) return nearNext ? (centre - (1 - FADE_ZONE)) / FADE_ZONE : 0
      return 0
    })

    slides.forEach((slide, i) => {
      const t = Math.min(Math.max(amounts[i], 0), 1)
      slide.style.transform = `scale(${1 - t * (1 - MIN_SCALE)})`
      slide.style.opacity = `${1 - t * (1 - MIN_OPACITY)}`
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!emblaApi || prefersReducedMotion()) return
    const run = () => tween(emblaApi)
    run()
    emblaApi.on('scroll', run)
    emblaApi.on('reInit', run)
    emblaApi.on('resize', run)
    emblaApi.on('settle', run)
    return () => {
      emblaApi.off('scroll', run)
      emblaApi.off('reInit', run)
      emblaApi.off('resize', run)
      emblaApi.off('settle', run)
      // Hand the slides back untouched, so a re-render without the tween does
      // not inherit a half-faded card.
      emblaApi.slideNodes().forEach((slide) => {
        slide.style.transform = ''
        slide.style.opacity = ''
      })
    }
  }, [emblaApi, tween, products.length, loading])

  // Fade the rail only on a side that still has cards behind it — a permanent
  // gradient would clip the first and last card for no reason.
  const maskImage = useMemo(() => {
    const start = canPrev ? 'transparent 0%, black 7%' : 'black 0%'
    const end = canNext ? 'black 93%, transparent 100%' : 'black 100%'
    return `linear-gradient(to right, ${start}, ${end})`
  }, [canPrev, canNext])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <section className={`py-12 md:py-16 ${bgClass}`}>
      {/* Header */}
      <div className="flex items-end justify-between mb-8 px-4 md:px-8 max-w-7xl mx-auto">
        <div>
          <h2 className="font-display text-display-md text-primary-500 font-bold">{title}</h2>
          <GoldRule className="mt-2" />
          {subtitle && <p className="font-body text-gray-500 text-sm mt-2">{subtitle}</p>}
        </div>
        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="hidden sm:inline-flex items-center gap-1 text-gold-600 hover:text-gold-500 font-body font-semibold text-sm whitespace-nowrap"
          >
            View All <ArrowRight size={16} />
          </Link>
        )}
      </div>

      {/* Carousel */}
      <div className="relative max-w-7xl mx-auto">
        <div
          className="overflow-hidden px-4 md:px-8"
          ref={emblaRef}
          style={{ WebkitMaskImage: maskImage, maskImage }}
        >
          <div className="flex gap-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex-shrink-0 min-w-[78%] sm:min-w-[340px] md:min-w-[280px] max-w-[320px]">
                    <SkeletonCard />
                  </div>
                ))
              : products.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 min-w-[78%] sm:min-w-[340px] md:min-w-[280px] max-w-[320px]"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
          </div>
        </div>

        {/* Arrows — desktop only */}
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canPrev}
          aria-label="Previous"
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-2 w-[52px] h-[52px] rounded-full bg-white border border-gold-200 shadow-card items-center justify-center text-primary-500 hover:bg-gold-50 disabled:opacity-0 transition-all z-10"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={!canNext}
          aria-label="Next"
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-2 w-[52px] h-[52px] rounded-full bg-white border border-gold-200 shadow-card items-center justify-center text-primary-500 hover:bg-gold-50 disabled:opacity-0 transition-all z-10"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Mobile View All */}
      {viewAllLink && (
        <div className="sm:hidden mt-6 px-4">
          <Link
            to={viewAllLink}
            className="flex items-center justify-center gap-1 text-gold-600 font-body font-semibold text-sm border border-gold-200 rounded-xl py-3"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </section>
  )
}
