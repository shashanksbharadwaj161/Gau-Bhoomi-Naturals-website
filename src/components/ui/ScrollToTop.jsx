import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { scrollToTop } from '../../hooks/useLenis'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => scrollToTop()}
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-40 right-4 md:bottom-24 md:right-8 z-30 w-12 h-12 rounded-full bg-gold-500 text-primary-500 flex items-center justify-center shadow-gold-md hover:bg-gold-400 hover:scale-110 transition-all duration-200"
        >
          <ChevronUp size={24} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
