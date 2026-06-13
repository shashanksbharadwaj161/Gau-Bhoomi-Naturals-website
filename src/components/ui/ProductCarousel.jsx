import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import ProductCard from './ProductCard'
import SkeletonCard from './SkeletonCard'
import { useInView } from '../../hooks/useInView'

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
  const [headRef, headVisible] = useInView({ threshold: 0.4 })

  const onSelect = useCallback((api) => {
    if (!api) return
    setCanPrev(api.canScrollPrev())
    setCanNext(api.canScrollNext())
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

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <section className={`py-12 md:py-16 ${bgClass}`}>
      {/* Header */}
      <div ref={headRef} className="flex items-end justify-between mb-8 px-4 md:px-8 max-w-7xl mx-auto">
        <div>
          <h2 className="font-display text-display-md text-primary-500 font-bold">{title}</h2>
          <motion.div
            className="h-0.5 bg-gold-500 mt-2"
            initial={{ width: 0 }}
            animate={{ width: headVisible ? 64 : 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
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
        <div className="overflow-hidden px-4 md:px-8" ref={emblaRef}>
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
