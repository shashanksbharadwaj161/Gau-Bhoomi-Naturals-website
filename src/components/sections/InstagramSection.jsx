import { motion } from 'framer-motion'
import { Instagram } from '../ui/SocialIcons'
import { siteConfig } from '../../config/siteConfig'
import { revealOnScroll, staggerOnScroll, staggerItem } from '../../animations/motion'

// Manually mirrored from @gaubhoominaturals. To refresh: drop new 800x800
// webp squares into public/images/instagram/ under a NEW filename (bump the
// -vN suffix) and update the paths here. Overwriting the same filename
// leaves browsers and Hostinger's edge serving the stale copy.
// Order here is display order, top-left to bottom-right.
const tiles = [
  '/images/instagram/instagram-01-v2.webp',
  '/images/instagram/instagram-02-v2.webp',
  '/images/instagram/instagram-03-v2.webp',
  '/images/instagram/instagram-04-v2.webp',
  '/images/instagram/instagram-05-v2.webp',
  '/images/instagram/instagram-06-v2.webp',
]

export default function InstagramSection() {
  return (
    <section className="bg-cream py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div className="text-center mb-8" {...revealOnScroll}>
          <h2 className="font-display text-display-md text-primary-500 font-bold">Follow Our Journey</h2>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-gold-600 font-semibold text-sm mt-2 inline-block hover:text-gold-500"
          >
            @gaubhoominaturals
          </a>
        </motion.div>

        <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4" {...staggerOnScroll(0.06)}>
          {tiles.map((src, i) => (
            <motion.a
              key={i}
              variants={staggerItem}
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-primary-500"
            >
              <img src={src} alt={`@gaubhoominaturals post ${i + 1}`} width={800} height={800} loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/70 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-1 text-gold-400">
                  <Instagram size={26} />
                  <span className="font-body text-xs font-semibold">Follow on Instagram</span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
