import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInterval } from '../../hooks/useInterval'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

// Step circle positions as percentages of the square poster, measured from the
// artwork's 3x2 grid. Centre-based — each overlay is translated by -50%.
const STEPS = [
  { n: 1, x: 18.4, y: 39.5, label: 'Hand-Milked at Dawn' },
  { n: 2, x: 50.3, y: 39.5, label: 'Boiled on Firewood' },
  { n: 3, x: 82.5, y: 39.5, label: 'Set as Curd' },
  { n: 4, x: 18.4, y: 68.4, label: 'Hand-Churned Bilona' },
  { n: 5, x: 50.3, y: 68.4, label: 'Slowly Simmered' },
  { n: 6, x: 82.5, y: 68.4, label: 'Pure Gau Ghee. Ready.' },
]

// Diameter of each overlay, as a percentage of the poster's width. Measured off
// the artwork: the illustration circles are ~205px across on the 1024px source.
const SIZE = 20

export default function BilonaProcess({ poster = '/images/process/bilona-process.jpg' }) {
  const [active, setActive] = useState(0)
  const [failed, setFailed] = useState(false)
  const still = prefersReducedMotion()

  // Strict 1 -> 6, then straight back to 1. `null` pauses the timer entirely
  // under reduced motion, which also leaves every step at full brightness.
  useInterval(() => setActive((i) => (i + 1) % STEPS.length), still ? null : 2000)

  return (
    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-primary-500 shadow-[0_0_40px_rgba(201,168,76,0.3)]">
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-4xl text-gold-400 tracking-widest">GBN</span>
        </div>
      ) : (
        <img
          src={poster}
          alt="How Gau Bhoomi ghee is made, the ancient Bilona way — six steps from hand-milking to the finished jar"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}

      {!failed && STEPS.map((step, i) => {
        const isActive = still || i === active
        return (
          <button
            key={step.n}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Step ${step.n}: ${step.label}`}
            aria-current={i === active ? 'step' : undefined}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ left: `${step.x}%`, top: `${step.y}%`, width: `${SIZE}%`, aspectRatio: '1' }}
          >
            {/* Inactive wash. Cream rather than black: the poster sits on a warm
                paper background, so a dark veil would read as a grey smudge
                while cream simply fades the step back into the page. */}
            <motion.span
              className="absolute inset-0 rounded-full bg-cream"
              animate={{ opacity: isActive ? 0 : 0.5 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Gold ring, pulsing only on the active step. Transform and opacity
                only, so it composites and never triggers layout. */}
            {isActive && !still && (
              <motion.span
                className="absolute -inset-[7%] rounded-full border-2 border-gold-500"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: [1, 1.12, 1], opacity: [0.95, 0.4, 0.95] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
