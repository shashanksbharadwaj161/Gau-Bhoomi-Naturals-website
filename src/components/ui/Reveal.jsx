import { useLayoutEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

const observed = new Map()
let observer

function getObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return observer

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const callback = observed.get(entry.target)
      callback?.()
      observed.delete(entry.target)
      observer.unobserve(entry.target)
    })
  }, {
    rootMargin: '0px 0px -12% 0px',
    threshold: 0.14,
  })

  return observer
}

/**
 * Progressive scroll reveal powered by one shared IntersectionObserver.
 * Content stays visible without JavaScript; the prepared class is applied only
 * after the component mounts. If IntersectionObserver is unavailable the
 * element is revealed immediately instead of being withheld.
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'rise',
  delay = 0,
  className = '',
  style,
  children,
  ...props
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const reveal = () => element.classList.add('is-revealed')
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      reveal()
      return
    }

    element.classList.add('is-reveal-ready')
    observed.set(element, reveal)
    getObserver()?.observe(element)

    return () => {
      observed.delete(element)
      observer?.unobserve(element)
    }
  }, [])

  return (
    <Tag
      ref={ref}
      {...props}
      className={`scroll-reveal scroll-reveal--${variant} ${className}`}
      style={{ '--reveal-delay': `${Math.min(delay, 360)}ms`, ...style }}
    >
      {children}
    </Tag>
  )
}
