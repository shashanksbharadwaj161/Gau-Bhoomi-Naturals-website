import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './useGSAP'
import { prefersReducedMotion } from './useReducedMotion'

let lenisInstance = null

export function useLenis() {
  const ref = useRef(null)

  useEffect(() => {
    // Reduced motion: no Lenis at all. A zero-duration instance would still
    // hijack wheel/touch and write scroll position every frame.
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    })

    lenisInstance = lenis
    ref.current = lenis

    // One unified rAF loop: gsap.ticker drives Lenis, Lenis pushes ScrollTrigger.
    // Previously Lenis ran its own loop that registered *after* gsap's, so
    // scrubbed and pinned triggers rendered against a scroll position one frame
    // stale. gsap.ticker time is seconds; lenis.raf expects milliseconds.
    const drive = (time) => lenis.raf(time * 1000)
    const unsubscribe = lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(drive)
    gsap.ticker.lagSmoothing(0)

    return () => {
      // gsap.ticker is a global registry with no automatic teardown — without
      // this remove, StrictMode's double-mount leaves a callback driving a
      // destroyed instance and the two fight over scroll position.
      gsap.ticker.remove(drive)
      unsubscribe()
      lenis.destroy()
      ref.current = null
      if (lenisInstance === lenis) lenisInstance = null
    }
  }, [])

  return ref
}

export function getLenis() { return lenisInstance }

export function scrollToTop(immediate = false) {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate })
  } else {
    // No Lenis (reduced motion, or before mount) — an explicit behavior arg
    // overrides CSS scroll-behavior, so decide it here.
    const smooth = !immediate && !prefersReducedMotion()
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
  }
}
