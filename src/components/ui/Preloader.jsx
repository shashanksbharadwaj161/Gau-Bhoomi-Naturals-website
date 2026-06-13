import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { siteConfig } from '../../config/siteConfig'

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState('logo') // logo → text → bar → exit
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const brandChars = siteConfig.brandName.split('')
  const [charCount, setCharCount] = useState(0)

  // Logo phase → text phase at 600ms
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 600)
    return () => clearTimeout(t1)
  }, [])

  // Type in brand characters one at a time
  useEffect(() => {
    if (phase !== 'text') return
    let i = 0
    const interval = setInterval(() => {
      i++
      setCharCount(i)
      if (i >= brandChars.length) {
        clearInterval(interval)
        setTimeout(() => setPhase('bar'), 200)
      }
    }, 45)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  // Fill progress bar 0 → 100
  useEffect(() => {
    if (phase !== 'bar') return
    let p = 0
    const interval = setInterval(() => {
      p += 2
      setProgress(p)
      if (p >= 100) {
        clearInterval(interval)
        setTimeout(() => setPhase('exit'), 200)
      }
    }, 20)
    return () => clearInterval(interval)
  }, [phase])

  // Exit → reveal page
  useEffect(() => {
    if (phase !== 'exit') return
    const t = setTimeout(() => {
      setVisible(false)
      try { sessionStorage.setItem('gbn_loaded', '1') } catch { /* ignore */ }
      onComplete?.()
    }, 900)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  if (!visible) return null

  return (
    <motion.div
      className="fixed inset-0 bg-primary-500 flex flex-col items-center justify-center z-[9999]"
      animate={phase === 'exit'
        ? { clipPath: 'circle(0% at 50% 50%)' }
        : { clipPath: 'circle(150% at 50% 50%)' }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Logo */}
      <motion.img
        src={siteConfig.logoUrl}
        alt={siteConfig.brandName}
        className="w-24 h-24 object-contain"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        onError={(e) => { e.target.style.display = 'none' }}
      />

      {/* Gold rule */}
      <motion.div
        className="h-px bg-gold-500 mt-6"
        initial={{ width: 0 }}
        animate={{ width: phase !== 'logo' ? 80 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
      />

      {/* Brand name typing */}
      <div className="mt-4 font-body text-gold-400 text-sm tracking-[0.25em] uppercase h-5">
        {phase !== 'logo' && brandChars.slice(0, charCount).join('')}
      </div>

      {/* Progress bar at bottom */}
      {(phase === 'bar' || phase === 'exit') && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-700">
          <div className="h-full bg-gold-500" style={{ width: `${progress}%` }} />
        </div>
      )}
    </motion.div>
  )
}
