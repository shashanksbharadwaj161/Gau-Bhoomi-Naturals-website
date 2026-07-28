// Meteors — adapted from the Aceternity UI "Meteors" concept.
// Hand-built: the upstream source is unreachable from this environment.
//
// Gold streaks falling on a diagonal. Positions and timings are derived from the
// index rather than Math.random() so the layout is identical on every render —
// random values would shift on each re-render and make the field jump.

const COUNT = 14

export default function Meteors({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {Array.from({ length: COUNT }, (_, i) => (
        <span
          key={i}
          className="meteor"
          style={{
            left: `${(i * 97) % 100}%`,
            animationDelay: `${(i * 0.7) % 5}s`,
            animationDuration: `${3 + ((i * 1.3) % 3)}s`,
          }}
        />
      ))}
    </div>
  )
}
