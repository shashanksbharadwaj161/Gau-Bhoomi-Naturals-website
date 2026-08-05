import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { prefersReducedMotion as getPrefersReducedMotion } from '../../hooks/useReducedMotion'
import { siteConfig } from '../../config/siteConfig'
import BlurText from '../ui/BlurText'
import Magnet from '../ui/Magnet'

const SLIDE_BG = [
  'radial-gradient(circle at 72% 30%, rgba(201,168,76,0.28) 0%, transparent 55%), linear-gradient(135deg, #1e3d2c 0%, #142A1D 68%, #0D1F14 100%)',
  'radial-gradient(circle at 28% 68%, rgba(201,168,76,0.20) 0%, transparent 55%), linear-gradient(135deg, #244a34 0%, #142A1D 75%)',
  'radial-gradient(circle at 75% 35%, rgba(232,201,122,0.30) 0%, transparent 55%), linear-gradient(135deg, #3a2f14 0%, #1a3322 55%, #142A1D 100%)',
  'radial-gradient(circle at 50% 28%, rgba(201,168,76,0.22) 0%, transparent 60%), linear-gradient(135deg, #1e3d2c 0%, #0D1F14 100%)',
]

export default function HeroBanner() {
  const slides = siteConfig.heroSlides
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selected, setSelected] = useState(0)
  const [progress, setProgress] = useState(0)
  const [failedSlides, setFailedSlides] = useState(() => new Set())
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [isPageVisible, setIsPageVisible] = useState(
    () => typeof document === 'undefined' || document.visibilityState === 'visible',
  )
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && getPrefersReducedMotion(),
  )
  // Live, not a one-shot innerWidth read: a phone rotated after mount, or a
  // desktop window dragged narrow, has to resolve to the right video source.
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  )
  const sectionRef = useRef(null)
  const videoRefs = useRef([])
  const fallbackTimerRef = useRef(null)

  const onSelect = useCallback((api) => setSelected(api.selectedScrollSnap()), [])
  const scrollTo = useCallback((index) => emblaApi?.scrollTo(index), [emblaApi])
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return undefined

    onSelect(emblaApi)
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi, onSelect])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { threshold: 0.15 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onVisibilityChange = () => setIsPageVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const onChange = (event) => setIsMobile(event.matches)
    setIsMobile(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    window.clearTimeout(fallbackTimerRef.current)
    setProgress(0)

    videoRefs.current.forEach((video, index) => {
      if (!video || index === selected) return
      video.pause()
      if (video.readyState > 0) video.currentTime = 0
    })

    if (reducedMotion || !isHeroVisible || !isPageVisible) return undefined

    const activeSlide = slides[selected]
    const scheduleFallbackAdvance = () => {
      window.clearTimeout(fallbackTimerRef.current)
      fallbackTimerRef.current = window.setTimeout(
        scrollNext,
        (activeSlide.duration || 8) * 1000,
      )
    }

    if (failedSlides.has(selected)) {
      scheduleFallbackAdvance()
      return () => window.clearTimeout(fallbackTimerRef.current)
    }

    const video = videoRefs.current[selected]
    if (!video) return undefined

    const playVideo = () => {
      const playPromise = video.play()
      if (playPromise) {
        playPromise.catch((error) => {
          if (error?.name === 'AbortError') return
          setFailedSlides((current) => new Set(current).add(selected))
        })
      }
    }

    if (video.readyState >= 2) {
      playVideo()
    } else {
      video.load()
      video.addEventListener('canplay', playVideo, { once: true })
    }

    return () => {
      video.removeEventListener('canplay', playVideo)
      video.pause()
      window.clearTimeout(fallbackTimerRef.current)
    }
  }, [failedSlides, isHeroVisible, isMobile, isPageVisible, reducedMotion, scrollNext, selected, slides])

  const markVideoFailed = useCallback((index) => {
    setFailedSlides((current) => new Set(current).add(index))
  }, [])

  const active = slides[selected]
  // On mobile the footage is a finished ad — logo, eyebrow and headline are
  // burned in — so the overlay keeps only the CTA, pointed at the category the
  // video is actually selling.
  const activeMobile = isMobile && active.mobile ? active.mobile : null

  return (
    <section
      ref={sectionRef}
      // Mobile matches the footage's own 720x1128 ratio, so object-cover has
      // nothing to trim. The previous fixed clamp bottomed out at 35rem, which
      // is shorter than the video needs at any width past ~358px — that cropped
      // 28px off the top at 393px wide and 42px at 412px, cutting through the
      // logo burned into the top of every clip. max-h is only a safety rail for
      // wide/short viewports; if it ever engages, object-position pins the top
      // so the logo still survives. Desktop keeps its own height untouched.
      className="hero-section relative h-[min(calc(100vw*47/30),calc(100svh-7.5rem))] md:h-[calc(100svh-8rem)] md:min-h-[40rem] md:max-h-[60rem] overflow-hidden bg-primary-500"
    >
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => {
            const showPoster = reducedMotion || failedSlides.has(index)
            // Mobile runs its own vertical cut when one exists; desktop always
            // falls through to the original fields.
            const media = isMobile && slide.mobile ? slide.mobile : slide
            const focalPoint = {
              // Top-anchored for the mobile cuts: the logo sits at the very top
              // of the frame, so if anything ever has to be trimmed it comes off
              // the bottom. The per-slide focal nudges were tuned for desktop.
              '--hero-position-mobile': slide.mobile ? '50% 0%' : (slide.focalPoint?.mobile || '50% 50%'),
              '--hero-position-desktop': slide.focalPoint?.desktop || '50% 50%',
              '--hero-brightness': slide.brightness || 1,
            }

            return (
              <div
                key={slide.video}
                className="relative flex-[0_0_100%] h-full"
                style={{ background: SLIDE_BG[index % SLIDE_BG.length] }}
              >
                {showPoster ? (
                  <img
                    src={media.poster}
                    alt=""
                    className="hero-media w-full h-full object-cover"
                    style={focalPoint}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    aria-hidden="true"
                  />
                ) : (
                  <video
                    ref={(element) => { videoRefs.current[index] = element }}
                    src={index === selected ? media.video : undefined}
                    className="hero-media w-full h-full object-cover"
                    style={focalPoint}
                    poster={media.poster}
                    muted
                    playsInline
                    preload={index === selected ? 'auto' : 'none'}
                    onTimeUpdate={(event) => {
                      if (index !== selected || !event.currentTarget.duration) return
                      setProgress((event.currentTarget.currentTime / event.currentTarget.duration) * 100)
                    }}
                    onEnded={scrollNext}
                    onError={() => markVideoFailed(index)}
                    aria-hidden="true"
                  />
                )}
                <div className="hero-scrim absolute inset-0" />
              </div>
            )
          })}
        </div>
      </div>


      <div className="hero-content absolute z-10 bottom-[4.75rem] md:bottom-16 left-6 md:left-[clamp(4.5rem,7vw,7rem)] max-w-[calc(100%-3rem)] md:max-w-[36rem] md:pr-6">
        <motion.div key={selected}>
          <div className={activeMobile ? 'hidden' : undefined}>
            <motion.div
              className="flex items-center gap-3 mb-3 md:mb-4"
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
              className="font-display text-[clamp(2.5rem,11.5vw,3.15rem)] md:text-[clamp(3.75rem,5vw,5rem)] text-white font-bold whitespace-pre-line leading-[0.94] tracking-normal [text-shadow:0_2px_24px_rgba(0,0,0,0.5)]"
            />

            <motion.p
              className="font-body text-white/90 text-[15px] md:text-lg leading-relaxed mt-4 md:mt-5 mb-6 md:mb-7 max-w-[29rem] [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            >
              {active.subheadline}
            </motion.p>
          </div>

          <motion.div
            className="flex flex-nowrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38 }}
          >
            <Magnet strength={7}>
              <Link
                to={activeMobile ? activeMobile.ctaLink : active.ctaLink}
                className="group inline-flex min-h-14 items-center justify-center gap-2.5 bg-gold-500 text-primary-500 font-body font-bold px-7 md:px-8 py-3.5 rounded-full hover:bg-gold-400 hover:shadow-gold-lg transition-[background-color,box-shadow] duration-200 btn-shimmer whitespace-nowrap"
              >
                {activeMobile ? activeMobile.cta : active.cta}
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Magnet>
            <Link
              to="/shop"
              className="inline-flex min-h-14 items-center justify-center gap-2 border border-white/50 bg-black/10 text-white font-body font-semibold px-6 md:px-7 py-3.5 rounded-full backdrop-blur-[2px] hover:border-gold-400 hover:text-gold-400 transition-colors duration-200 whitespace-nowrap"
            >
              Shop All
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
        <motion.div
          className="h-full bg-gold-500"
          animate={{ width: progress + '%' }}
          transition={{ duration: 0.15, ease: 'linear' }}
        />
      </div>

      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20 font-mono text-gold-400 text-[13px]">
        {String(selected + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.video}
            type="button"
            aria-label={'Go to slide ' + (index + 1)}
            onClick={() => scrollTo(index)}
            className={'relative after:absolute after:content-[\'\'] after:-inset-3 h-2 rounded-full transition-all duration-300 ' + (
              index === selected ? 'w-6 bg-gold-500' : 'w-2 bg-white/40'
            )}
          />
        ))}
      </div>

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
