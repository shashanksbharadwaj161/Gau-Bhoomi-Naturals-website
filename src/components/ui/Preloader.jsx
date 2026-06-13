import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { siteConfig } from '../../config/siteConfig'

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState('logo')
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const [charCount, setCharCount] = useState(0)
  const [showTagline, setShowTagline] = useState(false)

  const brandText = 'GAU BHOOMI NATURALS'
  const tagline = 'Pure from the Gaushala · Delivered to Your Doorstep'
  const chars = brandText.split('')

  // Phase: logo → text → tagline → bar → exit
  useEffect(() => {
    const t = setTimeout(() => setPhase('text'), 900)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (phase !== 'text') return
    let i = 0
    const iv = setInterval(() => {
      i++
      setCharCount(i)
      if (i >= chars.length) {
        clearInterval(iv)
        setTimeout(() => {
          setShowTagline(true)
          setTimeout(() => setPhase('bar'), 500)
        }, 200)
      }
    }, 45)
    return () => clearInterval(iv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  useEffect(() => {
    if (phase !== 'bar') return
    let p = 0
    const iv = setInterval(() => {
      p += 1.5
      setProgress(Math.min(p, 100))
      if (p >= 100) {
        clearInterval(iv)
        setTimeout(() => setPhase('exit'), 150)
      }
    }, 18)
    return () => clearInterval(iv)
  }, [phase])

  useEffect(() => {
    if (phase !== 'exit') return
    const t = setTimeout(() => {
      setVisible(false)
      try { sessionStorage.setItem('gbn_loaded', '1') } catch { /* ignore */ }
      onComplete?.()
    }, 950)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  if (!visible) return null

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-[9999] overflow-hidden"
      style={{ backgroundColor: '#142A1D' }}
      animate={phase === 'exit'
        ? { clipPath: 'circle(0% at 50% 50%)' }
        : { clipPath: 'circle(150% at 50% 50%)' }
      }
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
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
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 14,
          duration: 0.8,
        }}
      >
        <img
          src={siteConfig.logoUrl}
          alt="Gau Bhoomi Naturals"
          className="w-32 h-32 md:w-40 md:h-40 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      </motion.div>

      {/* Gold rule */}
      <motion.div
        className="relative z-10 bg-gold-500 rounded-full mt-6"
        style={{ height: 1.5 }}
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: phase !== 'logo' ? 80 : 0,
          opacity: phase !== 'logo' ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
      />

      {/* Brand name typing */}
      <div
        className="relative z-10 mt-5 tracking-[0.3em] text-[13px] md:text-[14px] font-body font-semibold"
        style={{ color: '#C9A84C', minHeight: '20px', letterSpacing: '0.3em' }}
      >
        {phase !== 'logo' ? chars.slice(0, charCount).join('') : ''}
      </div>

      {/* Tagline */}
      <AnimatePresence>
        {showTagline && (
          <motion.p
            className="relative z-10 text-center font-body italic mt-3 px-8"
            style={{
              color: 'rgba(201,168,76,0.65)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              maxWidth: 320,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {tagline}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Progress bar at bottom */}
      {(phase === 'bar' || phase === 'exit') && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-700">
          <motion.div
            className="h-full bg-gold-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </motion.div>
  )
}
