// Shot at our own gaushala. All six are pre-cropped to 3:2 at 1200x800 so the
// strip keeps one card ratio at every breakpoint and nothing re-crops in CSS.
const photos = [
  { src: '/images/gaushala/gaushala-01.webp', caption: 'Inside our gaushala' },
  { src: '/images/gaushala/gaushala-02.webp', caption: 'A calf with its mother' },
  { src: '/images/gaushala/gaushala-03.webp', caption: 'Feeding time' },
  { src: '/images/gaushala/gaushala-04.webp', caption: 'Our Gir herd at rest' },
  { src: '/images/gaushala/gaushala-05.webp', caption: 'Pure Gir lineage' },
  { src: '/images/gaushala/gaushala-06.webp', caption: 'Out in the open fields' },
]

export default function FarmGallery() {
  return (
    <section className="relative bg-cream grain py-14 md:py-20 overflow-hidden">
      <div className="relative z-10 text-center mb-10 px-4">
        <h2 className="font-display text-display-md text-primary-500 font-bold">From Our Gaushala to Your Home</h2>
        <p className="font-body text-gray-500 text-sm mt-2">A glimpse into where the goodness begins</p>
      </div>

      {/*
        The list is rendered twice and the track travels -50%, so the second copy
        is exactly under the first when the loop restarts and the drift is seamless.
        The duplicate is aria-hidden so a screen reader hears each photo once.
        motion-reduce:animate-none matches the testimonials marquee: the global
        reduced-motion rule in index.css shortens animations rather than removing
        them, which would snap this track to -50% and strand it there.
      */}
      <div className="relative z-10 marquee-mask overflow-hidden">
        <div className="farm-marquee flex gap-4 md:gap-6 w-max animate-marquee-slow motion-reduce:animate-none hover:[animation-play-state:paused]">
          {[...photos, ...photos].map((photo, i) => (
            <figure
              key={i}
              aria-hidden={i >= photos.length}
              className="relative flex-shrink-0 w-72 md:w-[380px] aspect-[3/2] rounded-2xl overflow-hidden shadow-card bg-primary-500"
            >
              <img
                src={photo.src}
                alt={i >= photos.length ? '' : photo.caption}
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
      </div>
    </section>
  )
}
