import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, Heart, ShoppingBag, MessageCircle } from 'lucide-react'
import { Instagram, Facebook, Youtube } from '../ui/SocialIcons'
import { useUI } from '../../contexts/UIContext'
import { useCart } from '../../contexts/CartContext'
import { useWishlist } from '../../contexts/WishlistContext'
import { siteConfig } from '../../config/siteConfig'
import { scrollToTop, getLenis } from '../../hooks/useLenis'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Ghee', to: '/shop/ghee' },
  { label: 'Oils', to: '/shop/oils' },
  { label: 'Rice & Grains', to: '/shop/rice' },
  { label: 'Masalas', to: '/shop/masalas' },
  { label: 'Honey', to: '/shop/honey' },
  { label: 'Dry Fruits', to: '/shop/dry-fruits' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const mobileLinks = [...navLinks, { label: 'FAQs', to: '/faq' }]

function LogoMark({ logoError, onError, className }) {
  if (logoError) {
    return <span className="font-display text-gold-400 text-lg font-bold whitespace-nowrap">Gau Bhoomi Naturals</span>
  }
  return (
    <img src={siteConfig.logoUrl} alt={siteConfig.brandName} className={className} onError={onError} />
  )
}

export default function Navbar() {
  const { openSearch, openCart, announcementVisible } = useUI()
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock scroll while mobile menu open
  useEffect(() => {
    const lenis = getLenis()
    if (menuOpen) lenis?.stop()
    else lenis?.start()
    return () => lenis?.start()
  }, [menuOpen])

  const handleLogo = () => {
    if (pathname === '/') scrollToTop()
    else navigate('/')
  }

  const linkClass = ({ isActive }) =>
    `relative font-body text-sm font-medium transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-gold-400 after:transition-all after:duration-300 ${
      isActive
        ? 'text-gold-400 font-semibold after:w-full'
        : 'text-cream/90 hover:text-gold-400 after:w-0 hover:after:w-full'
    }`

  const logoProps = { logoError, onError: () => setLogoError(true) }

  return (
    <header
      className={`sticky z-50 ${announcementVisible ? 'top-11' : 'top-0'} bg-primary-500 transition-shadow duration-300 ${
        scrolled ? 'backdrop-blur-md shadow-md' : ''
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 lg:h-[72px] flex items-center justify-between">
        {/* Left — hamburger (mobile) / logo (desktop) */}
        <button
          type="button"
          className="lg:hidden text-cream p-2 -ml-2"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={26} />
        </button>

        <button type="button" onClick={handleLogo} className="hidden lg:block" aria-label="Gau Bhoomi Naturals home">
          <LogoMark {...logoProps} className="h-16 object-contain" />
        </button>

        {/* Center logo (mobile) */}
        <button
          type="button"
          onClick={handleLogo}
          aria-label="Gau Bhoomi Naturals home"
          className="lg:hidden absolute left-1/2 -translate-x-1/2"
        >
          <LogoMark {...logoProps} className="h-14 object-contain" />
        </button>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Right — icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button type="button" onClick={openSearch} aria-label="Search"
            className="p-2 text-cream hover:text-gold-400 transition-colors">
            <Search size={22} />
          </button>

          <button type="button" onClick={() => navigate('/wishlist')} aria-label="Wishlist"
            className="hidden lg:flex p-2 text-cream hover:text-gold-400 transition-colors relative">
            <Heart size={22} className={wishlistCount > 0 ? 'fill-gold-400 text-gold-400' : ''} />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-gold-500 text-primary-500 text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button type="button" onClick={openCart} aria-label="Cart"
            className="p-2 text-cream hover:text-gold-400 transition-colors relative">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-gold-500 text-primary-500 text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-primary-500 lg:hidden flex flex-col"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-gold-500/20">
              <LogoMark {...logoProps} className="h-12 object-contain" />
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" className="text-cream p-2">
                <X size={26} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <ul className="space-y-1">
                {mobileLinks.map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      end
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `block font-body text-xl py-3 min-h-[48px] ${isActive ? 'text-gold-400 font-semibold' : 'text-cream/90'}`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-6 py-6 border-t border-gold-500/20">
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-gold-400 font-body font-semibold mb-4">
                <MessageCircle size={18} /> {siteConfig.phone}
              </a>
              <div className="flex gap-4">
                {[
                  { href: siteConfig.social.instagram, Icon: Instagram },
                  { href: siteConfig.social.facebook, Icon: Facebook },
                  { href: siteConfig.social.youtube, Icon: Youtube },
                ].map(({ href, Icon }, i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center text-cream/80 hover:text-gold-400">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
