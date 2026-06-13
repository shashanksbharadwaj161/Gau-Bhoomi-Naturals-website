const photos = [
  'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80',
  'https://images.unsplash.com/photo-1631451095765-2c91616b9d05?w=600&q=80',
  'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80',
  'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80',
  'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80',
  'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&q=80',
]

export default function FarmGallery() {
  return (
    <section className="relative bg-cream grain py-14 md:py-20 overflow-hidden">
      <div className="relative z-10 text-center mb-10 px-4">
        <h2 className="font-display text-display-md text-primary-500 font-bold">From Our Gaushala to Your Home</h2>
        <p className="font-body text-gray-500 text-sm mt-2">A glimpse into where the goodness begins</p>
      </div>

      <div className="relative z-10 marquee-mask overflow-hidden">
        <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
          {[...photos, ...photos].map((src, i) => (
            <div key={i} className="w-72 h-48 md:w-80 md:h-56 rounded-2xl overflow-hidden flex-shrink-0 shadow-card bg-primary-500">
              <img src={src} alt="Gau Bhoomi farm" className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
