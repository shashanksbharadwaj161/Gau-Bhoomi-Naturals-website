import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="relative bg-primary-500 min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Floating particles (CSS) */}
      {[
        { top: '15%', left: '12%', delay: '0s' },
        { top: '25%', left: '80%', delay: '1s' },
        { top: '65%', left: '18%', delay: '0.5s' },
        { top: '70%', left: '75%', delay: '1.5s' },
        { top: '40%', left: '50%', delay: '0.8s' },
      ].map((p, i) => (
        <span
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gold-500/50 animate-float"
          style={{ top: p.top, left: p.left, animationDelay: p.delay }}
        />
      ))}

      <div className="relative z-10">
        <h1 className="font-display text-[6rem] md:text-[9rem] text-gold-400 font-bold leading-none">404</h1>
        <p className="font-display text-2xl text-white mt-2">Oops! Page not found.</p>
        <p className="font-body text-cream/70 mt-2 max-w-sm mx-auto">
          The page you’re looking for has wandered off the farm. Let’s get you back home.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gold-500 text-primary-500 font-body font-bold px-8 py-3.5 rounded-full hover:bg-gold-400 transition-colors mt-8"
        >
          <Home size={18} /> Back to Home
        </Link>
      </div>
    </div>
  )
}
