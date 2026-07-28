import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { staggerOnScroll, staggerItem } from '../../animations/motion'
import Meteors from '../ui/Meteors'

export default function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    toast.success('🎉 Check your inbox for your discount code!')
    setEmail('')
  }

  return (
    <section
      className="relative overflow-hidden py-16 md:py-20"
      style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 100%)' }}
    >
      {/* Deep-green streaks, not gold — gold on gold is invisible, and this is
          the one bright band on the page, so it stays bright. */}
      <Meteors className="text-primary-500/25" />

      <motion.div className="relative z-10 max-w-2xl mx-auto px-4 text-center text-primary-500" {...staggerOnScroll()}>
        <motion.h2 variants={staggerItem} className="font-display text-display-md font-bold">Get 10% Off Your First Order 🌿</motion.h2>
        <motion.p variants={staggerItem} className="font-body text-primary-600 mt-3">
          Join our family for exclusive offers, recipes & first access to fresh batches.
        </motion.p>

        <motion.form variants={staggerItem} onSubmit={handleSubmit} className="mt-7 flex items-center bg-white rounded-full p-1.5 max-w-md mx-auto shadow-gold-md">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 bg-transparent px-5 py-3 font-body text-sm text-primary-500 outline-none min-w-0 min-h-[44px]"
          />
          <button
            type="submit"
            className="bg-primary-500 text-white hover:bg-primary-700 rounded-full px-6 py-3 min-h-[44px] font-body font-semibold text-sm whitespace-nowrap transition-colors"
          >
            Subscribe
          </button>
        </motion.form>
      </motion.div>
    </section>
  )
}
