import { Instagram } from '../ui/SocialIcons'
import { siteConfig } from '../../config/siteConfig'

const tiles = [
  'https://images.unsplash.com/photo-1631451095765-2c91616b9d05?w=500&q=80',
  'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&q=80',
  'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80',
  'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=500&q=80',
  'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&q=80',
  'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=500&q=80',
]

export default function InstagramSection() {
  return (
    <section className="bg-cream py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
          <h2 className="font-display text-display-md text-primary-500 font-bold">Follow Our Journey</h2>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-gold-600 font-semibold text-sm mt-2 inline-block hover:text-gold-500"
          >
            @gaubhoominaturals
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {tiles.map((src, i) => (
            <a
              key={i}
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-primary-500"
            >
              <img src={src} alt="Instagram post" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/70 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-1 text-gold-400">
                  <Instagram size={26} />
                  <span className="font-body text-xs font-semibold">Follow on Instagram</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
