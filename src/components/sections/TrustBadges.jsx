import { Leaf, Award, Truck, RotateCcw, FlaskConical } from 'lucide-react'

const badges = [
  { Icon: Leaf,        title: '100% Organic',    subtitle: 'Certified Natural' },
  { Icon: Award,       title: 'Premium Quality', subtitle: 'Lab Tested' },
  { Icon: Truck,       title: 'Fast Delivery',   subtitle: 'Pan-India Shipping' },
  { Icon: RotateCcw,   title: 'Easy Returns',    subtitle: '7-Day Policy' },
  { Icon: FlaskConical,title: 'Zero Chemicals',  subtitle: 'No Additives' },
]

function Badge({ Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 px-8 shrink-0">
      <Icon size={30} className="text-gold-400 shrink-0" strokeWidth={1.6} />
      <div className="text-left whitespace-nowrap">
        <p className="font-body font-bold text-white text-sm leading-tight">{title}</p>
        <p className="font-body text-white/55 text-xs leading-tight mt-0.5">{subtitle}</p>
      </div>
      <span className="w-1 h-1 rounded-full bg-gold-500/40 ml-5" />
    </div>
  )
}

export default function TrustBadges() {
  return (
    <section className="bg-primary-500 py-7 border-y border-gold-500/15 overflow-hidden">
      {/* Infinite marquee: the list is rendered twice and the track translates
          exactly -50%, so the seam lands on an identical frame. CSS-only — no
          rAF loop — and it pauses on hover. */}
      <div className="marquee-mask">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex" aria-hidden={copy === 1}>
              {badges.map((b) => <Badge key={b.title} {...b} />)}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
