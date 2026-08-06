// Shot at our own gaushala. All five are pre-cropped to 3:2 at 1200x800 so the
// rail keeps one card ratio at every breakpoint and nothing re-crops in CSS.
const photos = [
  { src: '/images/gaushala/gaushala-01.webp', caption: 'Inside our gaushala' },
  { src: '/images/gaushala/gaushala-02.webp', caption: 'A calf with its mother' },
  { src: '/images/gaushala/gaushala-03.webp', caption: 'Feeding time' },
  { src: '/images/gaushala/gaushala-04.webp', caption: 'Our Gir herd at rest' },
  { src: '/images/gaushala/gaushala-05.webp', caption: 'Pure Gir lineage' },
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
            className="relative snap-start flex-shrink-0 w-[85vw] max-w-[420px] md:w-[420px] aspect-[3/2] rounded-2xl overflow-hidden shadow-card bg-primary-500"
          >
            <img
              src={photo.src}
              alt={photo.caption}
              width={1200}
              height={800}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-900/85 to-transparent px-4 pt-8 pb-3 font-body text-xs md:text-sm text-cream">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
