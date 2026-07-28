import { useRef, useState } from 'react'

// GlowingBorder — adapted from the Aceternity UI "Glowing Effect" concept.
// Hand-built: the upstream source is unreachable from this environment.
//
// A gold pool of light that follows the pointer around the card's border. The
// glow is a radial gradient positioned at the pointer, masked so only the 1px
// ring shows: two stacked backgrounds with `mask-composite: exclude` cut the
// interior away, leaving light on the edge only.
//
// Position is written to a CSS custom property rather than React state — this
// fires on every pointer move, and re-rendering a product card at that rate is
// the difference between smooth and janky. Only `visible` is state, and it
// flips at most twice per hover.
//
// Pointer-only by design: `@media (hover: hover)` in the stylesheet keeps the
// ring hidden on touch, where there is no pointer to follow and the glow would
// otherwise stick after a tap.
export default function GlowingBorder({ children, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  const onPointerMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--gx', `${e.clientX - r.left}px`)
    el.style.setProperty('--gy', `${e.clientY - r.top}px`)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerEnter={() => setVisible(true)}
      onPointerLeave={() => setVisible(false)}
      className={`glow-border relative ${visible ? 'glow-border-on' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
