import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { siteConfig } from '../../config/siteConfig'
import { getLenis } from '../../hooks/useLenis'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

const BRAND = 'GAU BHOOMI NATURALS'
const TAGLINE = 'Pure from the Gaushala · Delivered to Your Doorstep'

// Timings, in ms. Total ≈ 2.1s — the page is already rendered and fetching
// underneath, so this is a curtain, not a loading gate.
const LOGO_HOLD = 450
const CHAR_STEP = 32
const TAGLINE_HOLD = 420
const EXIT = 550

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState('logo')
  const [charCount, setCharCount] = useState(0)

  // Hold the page still behind the curtain. Same pattern as CartDrawer/SearchOverlay.
  useEffect(() => {
    const lenis = getLenis()
    lenis?.stop()
    return () => lenis?.start()
  }, [])

  // Reduced motion: no curtain at all, straight to the site.
  useEffect(() => {
    if (!prefersReducedMotion()) return
    try { sessionStorage.setItem('gbn_loaded', '1') } catch { /* ignore */ }
    onComplete?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setPhase('text'), LOGO_HOLD)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (phase !== 'text') return
    let i = 0
    const iv = setInterval(() => {
      setCharCount(++i)
      if (i >= BRAND.length) {
        clearInterval(iv)
        setTimeout(() => setPhase('exit'), TAGLINE_HOLD)
      }
    }, CHAR_STEP)
    return () => clearInterval(iv)
  }, [phase])

  useEffect(() => {
    if (phase !== 'exit') return
    const t = setTimeout(() => {
      try { sessionStorage.setItem('gbn_loaded', '1') } catch { /* ignore */ }
      onComplete?.()
    }, EXIT)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-[9999] overflow-hidden"
      style={{ backgroundColor: '#142A1D' }}
      initial={{ opacity: 1 }}
      // Opacity + scale only — both GPU-composited. The previous clipPath
      // circle() wipe is not composited on all browsers and janked on low-end
      // mobile.
      animate={phase === 'exit' ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
      transition={{ duration: EXIT / 1000, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Golden glow behind logo */}
      <div
        className="absolute rounded-full"
        style={{
          width: 260,
          height: 260,
          background: 'radial-gradient(circle, rgba(201,168,76,0.14) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Logo */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 140, damping: 15 }}
      >
        <img
          src={siteConfig.logoUrl}
          alt="Gau Bhoomi Naturals"
          className="w-32 h-32 md:w-40 md:h-40 object-contain"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      </motion.div>

      {/* Gold rule */}
      <motion.div
        className="relative z-10 bg-gold-500 rounded-full mt-6"
        style={{ height: 1.5 }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: phase !== 'logo' ? 80 : 0, opacity: phase !== 'logo' ? 1 : 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />

      {/* Brand name typing */}
      <div
        className="relative z-10 mt-5 tracking-[0.3em] text-[13px] md:text-[14px] font-body font-semibold"
        style={{ color: '#C9A84C', minHeight: '20px', letterSpacing: '0.3em' }}
      >
        {phase !== 'logo' ? BRAND.slice(0, charCount) : ''}
      </div>

      {/* Tagline */}
      <AnimatePresence>
        {charCount >= BRAND.length && (
          <motion.p
            className="relative z-10 text-center font-body italic mt-3 px-8"
            style={{ color: 'rgba(201,168,76,0.65)', fontSize: '11px', letterSpacing: '0.12em', maxWidth: 320 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {TAGLINE}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
