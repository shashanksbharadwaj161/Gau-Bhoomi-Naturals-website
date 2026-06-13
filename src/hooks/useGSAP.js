import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis } from './useLenis'

gsap.registerPlugin(ScrollTrigger)

// Connect Lenis to GSAP ScrollTrigger.
// Lenis already drives its own requestAnimationFrame loop (see useLenis), so we
// only sync ScrollTrigger to Lenis scroll events here — adding a second
// gsap.ticker raf driver would advance Lenis twice per frame (double scroll speed).
export function initGSAPLenis() {
  const lenis = getLenis()
  if (!lenis) return
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.lagSmoothing(0)
  ScrollTrigger.refresh()
}

// Utility: animate elements into view when they enter viewport
export function animateInView(selector, options = {}) {
  const elements = document.querySelectorAll(selector)
  elements.forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: options.y ?? 40 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration ?? 0.8,
        delay: (options.stagger ?? 0.12) * i,
        ease: options.ease ?? 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        }
      }
    )
  })
}

// Utility: count-up animation
export function animateCounter(el, target, suffix = '') {
  const obj = { value: 0 }
  gsap.to(obj, {
    value: target,
    duration: 2.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      once: true,
    },
    onUpdate: () => {
      el.textContent = Math.round(obj.value).toLocaleString('en-IN') + suffix
    }
  })
}

export { gsap, ScrollTrigger }
