import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MessageCircle } from 'lucide-react'
import { Instagram, Facebook, Youtube } from '../ui/SocialIcons'
import { siteConfig } from '../../config/siteConfig'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop All', to: '/shop' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
]

const footerCategories = [
  { name: 'Ghee', slug: 'ghee' },
  { name: 'Cold Pressed Oils', slug: 'oils' },
  { name: 'Rice & Grains', slug: 'rice' },
  { name: 'Masalas', slug: 'masalas' },
  { name: 'Honey', slug: 'honey' },
  { name: 'Dry Fruits', slug: 'dry-fruits' },
  { name: 'Seeds', slug: 'seeds' },
]

const PayBadge = ({ children }) => (
  <span className="px-2 py-1 rounded border border-cream/20 text-cream/70 text-[10px] font-body font-semibold tracking-wide">
    {children}
  </span>
)

export default function Footer() {
  const [logoError, setLogoError] = useState(false)
  return (
    <footer className="bg-bark text-cream pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          {logoError ? (
            <span className="font-display text-gold-400 text-xl font-bold">{siteConfig.brandName}</span>
          ) : (
            <img
              src={siteConfig.logoUrl}
              alt={siteConfig.brandName}
              className="h-20 w-20 object-contain"
              crossOrigin="anonymous"
              onError={() => setLogoError(true)}
            />
          )}
          <h3 className="font-display text-gold-400 text-xl font-bold mt-3">{siteConfig.brandName}</h3>
          <p className="font-body text-cream/70 text-sm mt-2 leading-relaxed max-w-xs">{siteConfig.tagline}</p>
          <div className="flex gap-3 mt-4">
            {[
              { href: siteConfig.social.instagram, Icon: Instagram, label: 'Instagram' },
              { href: siteConfig.social.facebook, Icon: Facebook, label: 'Facebook' },
              { href: siteConfig.social.youtube, Icon: Youtube, label: 'YouTube' },
              { href: `https://wa.me/${siteConfig.whatsapp}`, Icon: MessageCircle, label: 'WhatsApp' },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center text-cream/70 hover:text-gold-400 hover:border-gold-400 transition-colors">
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-cream font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="font-body text-cream/70 text-sm hover:text-gold-400 transition-colors">{l.label}</Link>
              </li>
            ))}
            <li>
              <a href={`${siteConfig.wcUrl}/my-account/orders`} target="_blank" rel="noopener noreferrer"
                className="font-body text-cream/70 text-sm hover:text-gold-400 transition-colors">Track Order</a>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-display text-cream font-semibold text-lg mb-4">Categories</h4>
          <ul className="space-y-2.5">
            {footerCategories.map((c) => (
              <li key={c.slug}>
                <Link to={`/shop/${c.slug}`} className="font-body text-cream/70 text-sm hover:text-gold-400 transition-colors">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-cream font-semibold text-lg mb-4">Get in Touch</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2.5 font-body text-cream/70 text-sm">
              <Phone size={15} className="text-gold-400" /> {siteConfig.phone}
            </li>
            <li className="flex items-center gap-2.5 font-body text-cream/70 text-sm">
              <Mail size={15} className="text-gold-400" /> {siteConfig.email}
            </li>
          </ul>
          <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-primary-500 font-body font-semibold text-sm px-5 py-2.5 rounded-full transition-colors">
            <MessageCircle size={16} /> Chat on WhatsApp
          </a>
          <div className="flex flex-wrap gap-2 mt-5">
            <PayBadge>UPI</PayBadge>
            <PayBadge>VISA</PayBadge>
            <PayBadge>Mastercard</PayBadge>
            <PayBadge>Razorpay</PayBadge>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 pt-6 border-t border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-body text-cream/60 text-xs text-center">© 2026 {siteConfig.brandName}. All rights reserved.</p>
        <div className="flex gap-5">
          <Link to="/faq" className="font-body text-cream/60 text-xs hover:text-gold-400">Privacy Policy</Link>
          <Link to="/faq" className="font-body text-cream/60 text-xs hover:text-gold-400">Terms</Link>
        </div>
      </div>
    </footer>
  )
}
