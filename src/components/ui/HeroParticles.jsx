import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

// Drifting gold particle field behind the hero. Previously three.js, which cost
// 125kB gzip — the largest chunk in the app, roughly twice React — to draw 280
// dots. Canvas 2D does the same job with nothing shipped.
const COUNT = 280
const GOLD = '#C9A84C'

export default function HeroParticles() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || window.innerWidth < 768) return

    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio, 1.5)
    let w = 0, h = 0, raf = 0, last = 0, onScreen = false

    // Setting canvas.width resets all context state, so re-apply it here.
    const resize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = GOLD
    }
    resize()

    // Radius and alpha stand in for the depth three.js got from sizeAttenuation.
    // Velocities are matched to the old world-space drift at fov 60 / z 4.
    const parts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 1.6,
      a: 0.25 + Math.random() * 0.4,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(0.3 + Math.random() * 1.4),
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        ctx.globalAlpha = p.a
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const onResize = () => { resize(); draw() }
    window.addEventListener('resize', onResize)
    draw()

    // Reduced motion: keep the static field, never start a loop.
    if (prefersReducedMotion()) {
      return () => window.removeEventListener('resize', onResize)
    }

    const tick = (now) => {
      const dt = Math.min((now - last) / 16.67, 3)  // frame-rate independent
      last = now
      for (const p of parts) {
        p.x += p.vx * dt
        p.y += p.vy * dt
        if (p.y < -p.r) { p.y = h + p.r; p.x = Math.random() * w }
        if (p.x < -p.r) p.x = w + p.r
        else if (p.x > w + p.r) p.x = -p.r
      }
      draw()
      raf = requestAnimationFrame(tick)
    }

    // One gate for both off-screen and tab-hidden. The three.js version ran
    // forever, including scrolled past and in a background tab.
    const sync = () => {
      cancelAnimationFrame(raf)
      if (!onScreen || document.hidden) return
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync() })
    io.observe(canvas)
    document.addEventListener('visibilitychange', sync)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />
}
