import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useUI } from '../../contexts/UIContext'
import { siteConfig } from '../../config/siteConfig'

export default function AnnouncementBar() {
  const { announcementVisible, dismissAnnouncement } = useUI()
  const [index, setIndex] = useState(0)
  const messages = siteConfig.announcements

  // Desktop crossfade
  useEffect(() => {
    if (!announcementVisible) return
    const t = setInterval(() => setIndex((i) => (i + 1) % messages.length), 4000)
    return () => clearInterval(t)
  }, [announcementVisible, messages.length])

  if (!announcementVisible) return null

  return (
    <div className="sticky top-0 z-[60] h-11 bg-gold-500 text-primary-500 flex items-center overflow-hidden">
      {/* Mobile: marquee */}
      <div className="md:hidden flex-1 overflow-hidden">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex" aria-hidden={dup === 1}>
              {messages.map((msg, i) => (
                <span key={i} className="font-body font-bold text-[13px] px-6">{msg}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: crossfade */}
      <div className="hidden md:flex flex-1 items-center justify-center relative h-full">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            className="font-body font-bold text-[13px] absolute"
          >
            {messages[index]}
          </motion.span>
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={dismissAnnouncement}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center hover:bg-primary-500/10 rounded-full"
      >
        <X size={16} />
      </button>
    </div>
  )
}
