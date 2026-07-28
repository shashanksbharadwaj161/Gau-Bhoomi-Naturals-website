// MovingBorder — adapted from the Aceternity UI "Moving Border" concept.
// Hand-built: the upstream source is unreachable from this environment.
//
// A gold highlight travelling continuously around the button's edge. Upstream
// drives this by sampling an SVG path with getPointAtLength() on every frame;
// this uses a rotating conic gradient behind the content instead — same read,
// no per-frame JS, and it composites on the GPU.
//
// The rotating layer is inset by 1px behind an opaque inner surface, so only
// the rim shows. `overflow-hidden` on the wrapper keeps the spinning square
// from poking out past the rounded corners.
export default function MovingBorder({ children, className = '', rounded = 'rounded-full' }) {
  return (
    <span className={`moving-border relative inline-flex overflow-hidden p-[1.5px] ${rounded} ${className}`}>
      <span aria-hidden="true" className="moving-border-ring" />
      <span className={`relative z-10 inline-flex w-full items-center justify-center bg-primary-500 ${rounded}`}>
        {children}
      </span>
    </span>
  )
}
