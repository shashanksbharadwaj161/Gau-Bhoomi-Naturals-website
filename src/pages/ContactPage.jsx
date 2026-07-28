import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react'
import toast from 'react-hot-toast'
import { siteConfig } from '../config/siteConfig'
import { revealOnScroll, staggerOnScroll, staggerItem } from '../animations/motion'
import BlurText from '../components/ui/BlurText'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success("Message sent! We'll get back to you within 24 hours.")
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const info = [
    { Icon: Phone, label: 'Call Us', value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, '')}` },
    { Icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { Icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: `https://wa.me/${siteConfig.whatsapp}` },
    { Icon: MapPin, label: 'Location', value: siteConfig.address, href: null },
  ]

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-primary-500 py-12 md:py-16 text-center">
        <BlurText as="h1" text="Get in Touch" className="font-display text-display-lg text-white font-bold" />
        <p className="font-body text-cream/70 mt-2">We’d love to hear from you</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Info */}
        <motion.div className="space-y-4" {...staggerOnScroll(0.07)}>
          {info.map(({ Icon, label, value, href }) => {
            const content = (
              <div className="bg-white rounded-2xl p-5 shadow-card flex items-center gap-4 hover:border-gold-300 border border-transparent transition-colors">
                <div className="w-12 h-12 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center flex-shrink-0">
                  <Icon size={22} />
                </div>
                <div>
                  <p className="font-body text-xs text-gray-400 uppercase tracking-wide">{label}</p>
                  <p className="font-body text-primary-500 font-medium">{value}</p>
                </div>
              </div>
            )
            return href ? (
              <motion.a key={label} variants={staggerItem} href={href} target="_blank" rel="noopener noreferrer" className="block">{content}</motion.a>
            ) : (
              <motion.div key={label} variants={staggerItem}>{content}</motion.div>
            )
          })}

          {/* Map placeholder */}
          <motion.div variants={staggerItem} className="bg-primary-500 rounded-2xl h-40 flex items-center justify-center text-gold-400 font-display text-xl">
            📍 India
          </motion.div>
        </motion.div>

        {/* Form */}
        <motion.form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-card space-y-4" {...revealOnScroll}>
          <h2 className="font-display text-lg text-primary-500 font-bold">Send a Message</h2>
          <input name="name" required value={form.name} onChange={handleChange} placeholder="Your Name"
            className="w-full border border-gold-200 focus:border-gold-500 rounded-lg px-4 py-3 font-body text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.22)]" />
          <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Email Address"
            className="w-full border border-gold-200 focus:border-gold-500 rounded-lg px-4 py-3 font-body text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.22)]" />
          <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject"
            className="w-full border border-gold-200 focus:border-gold-500 rounded-lg px-4 py-3 font-body text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.22)]" />
          <textarea name="message" required rows="5" value={form.message} onChange={handleChange} placeholder="Your Message"
            className="w-full border border-gold-200 focus:border-gold-500 rounded-lg px-4 py-3 font-body text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.22)] resize-none" />
          <button type="submit" className="w-full btn-shimmer bg-gold-500 hover:bg-gold-400 text-primary-500 font-body font-bold py-3.5 rounded-xl">
            Send Message
          </button>
        </motion.form>
      </div>
    </div>
  )
}
