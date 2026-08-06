// Gaushala photos. To use our own shots, drop the files into
// public/images/gaushala/ and swap `src` for '/images/gaushala/<name>.webp'.
// Nothing else in this file needs to change.
const photos = [
  { src: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80', caption: 'Open pasture at first light' },
  { src: 'https://images.unsplash.com/photo-1631451095765-2c91616b9d05?w=800&q=80', caption: 'Our Gir herd' },
  { src: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80', caption: 'Hand-milked at dawn' },
  { src: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80', caption: 'Bilona churning' },
  { src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80', caption: 'Grazing grounds' },
  { src: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80', caption: 'Where the goodness begins' },
]

export default function FarmGallery() {
  return (
    <section className="relative bg-cream grain py-14 md:py-20 overflow-hidden">
      <div className="relative z-10 text-center mb-10 px-4">
        <h2 className="font-display text-display-md text-primary-500 font-bold">From Our Gaushala to Your Home</h2>
        <p className="font-body text-gray-500 text-sm mt-2">A glimpse into where the goodness begins</p>
      </div>

      {/*
        data-lenis-prevent-touch: Lenis calls preventDefault on touchmove to drive
        its own scroll, which stops a nested rail from panning on a phone. Scoping
        the opt-out to touch leaves vertical page scroll over the gallery native,
        so a finger swiping up still moves the page.
      */}
      <div
        data-lenis-prevent-touch
        className="relative z-10 hide-scrollbar flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory px-5 md:px-8 scroll-px-5 md:scroll-px-8"
      >
        {photos.map((photo) => (
          <figure
            key={photo.src}
            className="relative snap-start flex-shrink-0 w-72 h-48 md:w-80 md:h-56 rounded-2xl overflow-hidden shadow-card bg-primary-500"
          >
            <img
              src={photo.src}
              alt={photo.caption}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-900/85 to-transparent px-4 pt-8 pb-3 font-body text-xs text-cream">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
