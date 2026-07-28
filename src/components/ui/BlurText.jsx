import { motion } from 'framer-motion'
import { DURATION, EASE, viewport } from '../../animations/motion'

// BlurText — adapted from the React Bits "Blur Text" concept.
// Hand-built: the upstream source is unreachable from this environment.
//
// Words rise out of a blur one after another. Splitting on words rather than
// characters is deliberate — per-character animation on a headline this size
// creates dozens of layers and reads as gimmicky at display sizes.
//
// The text stays real text in the DOM: each word is a span inside the heading,
// so it is still selectable and still crawlable.

export default function BlurText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.075,
}) {
  const MotionTag = motion[Tag] ?? motion.span

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {/* Split keeping the separators, so newlines in the source survive. The
          hero headline is "Pure.\nNatural.\nDesi." — splitting on ' ' alone
          would treat all three lines as one token and nothing would stagger. */}
      {text.split(/(\s+)/).map((token, i) =>
        /^\s+$/.test(token) ? (
          <span key={i} aria-hidden="true" className="whitespace-pre">{token}</span>
        ) : (
          <motion.span
            key={i}
            aria-hidden="true"
            // inline-block so the transform applies — inline elements ignore it.
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: '0.4em', filter: 'blur(10px)' },
              show: {
                opacity: 1,
                y: '0em',
                filter: 'blur(0px)',
                transition: { duration: DURATION.slow, ease: EASE },
              },
            }}
          >
            {token}
          </motion.span>
        )
      )}
    </MotionTag>
  )
}
