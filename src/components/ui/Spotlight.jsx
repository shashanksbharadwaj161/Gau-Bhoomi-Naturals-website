// Spotlight — adapted from the Aceternity UI "Spotlight" concept.
// Hand-built: the upstream source is unreachable from this environment, and a
// pair of blurred radial cones needs no library.
//
// Two large, heavily-blurred ellipses drifting on long offset cycles. Because
// they are pure CSS gradients they cost one composited layer each and no JS.

export default function Spotlight({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="spotlight spotlight-gold" />
      <div className="spotlight spotlight-green" />
    </div>
  )
}
