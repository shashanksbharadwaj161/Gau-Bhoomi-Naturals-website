import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

/**
 * Accessible, character-by-character heading reveal. The complete text remains
 * the accessible name while the animated glyphs are hidden from screen readers.
 */
export default function TextAnimate({
  as: Tag = 'h2',
  children,
  className = '',
  delay = 0,
  once = true,
  variant = 'blurInUp',
}) {
  const text = String(children ?? '')
  const chars = Array.from(text)
  const isWave = variant === 'wave'

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: '0px 0px -12% 0px', amount: 0.18 }}
        variants={{
          hidden: {},
          show: {
            transition: {
              delayChildren: delay + 0.04,
              staggerChildren: Math.max(0.016, Math.min(0.034, 0.72 / Math.max(chars.length, 1))),
            },
          },
        }}
      >
        {chars.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            className="inline-block whitespace-pre"
            variants={{
              hidden: {
                opacity: 0,
                y: isWave ? (index % 2 ? 12 : -10) : 16,
                filter: 'blur(5px)',
                rotateX: isWave ? 0 : -28,
              },
              show: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                rotateX: 0,
                transition: { duration: 0.56, ease },
              },
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  )
}
