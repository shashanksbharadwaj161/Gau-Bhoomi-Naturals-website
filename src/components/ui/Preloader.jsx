import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { siteConfig } from '../../config/siteConfig'
import { getLenis } from '../../hooks/useLenis'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

const BRAND = 'GAU BHOOMI NATURALS'
const CARD_IMAGES = [
  '/images/gaushala/gaushala-01.webp',
  '/images/gaushala/gaushala-02.webp',
  '/images/gaushala/gaushala-03.webp',
  '/images/gaushala/gaushala-05.webp',
]
const EXIT_AT = 980
const COMPLETE_AT = 1420

export default function Preloader({ onComplete }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const lenis = getLenis()
    lenis?.stop()

    if (prefersReducedMotion()) {
      try { sessionStorage.setItem('gbn_loaded', '1') } catch { /* ignore */ }
      onComplete?.()
      return () => lenis?.start()
    }

    const exitTimer = window.setTimeout(() => setExiting(true), EXIT_AT)
    const completeTimer = window.setTimeout(() => {
      try { sessionStorage.setItem('gbn_loaded', '1') } catch { /* ignore */ }
      onComplete?.()
    }, COMPLETE_AT)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(completeTimer)
      lenis?.start()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden bg-primary-500"
      initial={{ opacity: 1 }}
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Opening Gau Bhoomi Naturals"
      role="status"
    >
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-primary-600"
        animate={exiting ? { x: '-102%' } : { x: 0 }}
        transition={{ duration: 0.46, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-primary-600"
        animate={exiting ? { x: '102%' } : { x: 0 }}
        transition={{ duration: 0.46, ease: [0.76, 0, 0.24, 1] }}
      />

      <div className="absolute inset-0 flex items-center justify-center px-5">
        <div className="preloader-cards absolute inset-0 flex items-center justify-center gap-2 sm:gap-4 opacity-45">
          {CARD_IMAGES.map((src, index) => (
            <motion.div
              key={src}
              className="w-[22vw] max-w-[190px] min-w-[72px] aspect-[3/4] overflow-hidden rounded-2xl border border-gold-400/25 shadow-2xl"
              initial={{ opacity: 0, y: 70, rotate: index % 2 ? 5 : -5 }}
              animate={exiting
                ? { opacity: 0, y: -36, rotate: 0 }
                : { opacity: 1, y: index % 2 ? 18 : -18, rotate: index % 2 ? 3 : -3 }}
              transition={{ duration: 0.46, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="relative z-10 flex flex-col items-center rounded-[2rem] border border-gold-400/20 bg-primary-800/90 px-8 py-7 shadow-[0_24px_90px_rgba(4,10,6,0.55)] backdrop-blur-md sm:px-12"
          initial={{ opacity: 0, scale: 0.88, y: 14 }}
          animate={exiting ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={siteConfig.logoUrl}
            alt="Gau Bhoomi Naturals"
            className="h-24 w-24 object-contain sm:h-28 sm:w-28"
            onError={(event) => { event.currentTarget.src = '/images/logo.svg' }}
          />
          <div className="mt-4 flex flex-wrap justify-center tracking-[0.22em] text-gold-400 sm:tracking-[0.3em]">
            {Array.from(BRAND).map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                className="inline-block whitespace-pre font-body text-[10px] font-bold sm:text-xs"
                initial={{ opacity: 0, y: 11, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.3, delay: 0.12 + index * 0.018, ease: [0.22, 1, 0.36, 1] }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
          <motion.div
            className="mt-4 h-px bg-gold-500"
            initial={{ width: 0 }}
            animate={{ width: 72 }}
            transition={{ duration: 0.44, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.p
            className="mt-3 text-center font-body text-[10px] tracking-[0.11em] text-cream/65 sm:text-[11px]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: 0.38 }}
          >
            PURE FROM OUR GAUSHALA
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}
