import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// Utility: animate elements into view when they enter viewport
export function animateInView(selector, options = {}) {
  // Safe to skip entirely: the fromTo start state is what hides these, so not
  // running leaves them in their natural visible state.
  if (prefersReducedMotion()) return
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
  // Unlike animateInView this can't just be skipped — the final value is only
  // ever written by onUpdate, so write it directly.
  if (prefersReducedMotion()) {
    el.textContent = target.toLocaleString('en-IN') + suffix
    return
  }
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
