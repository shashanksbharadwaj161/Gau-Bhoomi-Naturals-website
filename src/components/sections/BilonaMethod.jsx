import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '../../hooks/useGSAP'
import { siteConfig } from '../../config/siteConfig'

export default function BilonaMethod() {
  const containerRef = useRef(null)
  const trackRef     = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const track     = trackRef.current
    if (!container || !track) return
    if (window.innerWidth < 768) return  // Mobile: vertical stack

    const totalScroll = track.scrollWidth - window.innerWidth

    const ctx = gsap.context(() => {
      const horizontal = gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      siteConfig.bilonaSteps.forEach((_, i) => {
        const panel = track.children[i]
        if (!panel) return
        gsap.fromTo(
          panel.querySelectorAll('.bilona-text'),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontal,
              start: 'left center',
              once: true,
            },
          }
        )
      })
    }, container)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative bg-bark overflow-hidden"
      aria-label="The Bilona Method"
    >
      {/* Section label */}
      <div className="absolute top-8 left-8 z-10 hidden md:block">
        <p className="font-body text-gold-400 text-xs tracking-[0.3em] uppercase">Our Process</p>
        <h2 className="font-display text-display-md text-white mt-1">The Bilona Method</h2>
        <p className="font-body text-white/60 text-sm mt-2">Scroll to discover →</p>
      </div>

      {/* Horizontal track (desktop) */}
      <div
        ref={trackRef}
        className="hidden md:flex md:h-screen"
        style={{ width: `${siteConfig.bilonaSteps.length * 100}vw` }}
      >
        {siteConfig.bilonaSteps.map((step) => (
          <div
            key={step.step}
            className="relative flex-shrink-0 w-screen h-screen flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${step.image})` }} />
            <div className="absolute inset-0 bg-bark/75" />
            <div className="relative z-10 max-w-lg mx-auto px-8 text-center md:text-left">
              <p className="bilona-text font-mono text-gold-500 text-6xl font-bold opacity-20 leading-none">{step.step}</p>
              <h3 className="bilona-text font-display text-display-md text-white mt-2 font-bold">{step.title}</h3>
              <div className="bilona-text w-12 h-0.5 bg-gold-500 my-4 mx-auto md:mx-0" />
              <p className="bilona-text font-body text-white/75 text-base md:text-lg leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: vertical stack */}
      <div className="md:hidden py-12 px-6 space-y-8">
        <div className="text-center mb-6">
          <p className="font-body text-gold-400 text-xs tracking-[0.3em] uppercase">Our Process</p>
          <h2 className="font-display text-2xl text-white mt-1 font-bold">The Bilona Method</h2>
        </div>
        {siteConfig.bilonaSteps.map((step) => (
          <div key={step.step} className="flex gap-4 items-start">
            <span className="font-mono text-gold-500 text-3xl font-bold leading-none mt-1 opacity-50">{step.step}</span>
            <div>
              <h3 className="font-display text-white text-xl font-semibold">{step.title}</h3>
              <p className="font-body text-white/70 text-sm mt-1 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
