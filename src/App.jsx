import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense, useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

import { CartProvider } from './contexts/CartContext'
import { WishlistProvider } from './contexts/WishlistContext'
import { UIProvider } from './contexts/UIContext'
import { useLenis, scrollToTop } from './hooks/useLenis'
import { initGSAPLenis } from './hooks/useGSAP'
import { siteConfig } from './config/siteConfig'

import AnnouncementBar from './components/layout/AnnouncementBar'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import MobileBottomNav from './components/layout/MobileBottomNav'
import Preloader from './components/ui/Preloader'
import RouteProgress from './components/ui/RouteProgress'
import ScrollToTop from './components/ui/ScrollToTop'
import SearchOverlay from './components/ui/SearchOverlay'
import CartDrawer from './components/ui/CartDrawer'

// Lazy-loaded pages (code splitting)
const HomePage          = lazy(() => import('./pages/HomePage'))
const ShopPage          = lazy(() => import('./pages/ShopPage'))
const CategoryPage      = lazy(() => import('./pages/CategoryPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const CartPage          = lazy(() => import('./pages/CartPage'))
const CheckoutPage      = lazy(() => import('./pages/CheckoutPage'))
const WishlistPage      = lazy(() => import('./pages/WishlistPage'))
const AccountPage       = lazy(() => import('./pages/AccountPage'))
const AboutPage         = lazy(() => import('./pages/AboutPage'))
const ContactPage       = lazy(() => import('./pages/ContactPage'))
const FAQPage           = lazy(() => import('./pages/FAQPage'))
const NotFoundPage      = lazy(() => import('./pages/NotFoundPage'))

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
}
const pageTransition = { duration: 0.3, ease: [0.22, 1, 0.36, 1] }

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="page-content"
    >
      {children}
    </motion.div>
  )
}

function PageLoading() {
  return (
    <div className="min-h-[60vh] bg-cream flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-gold-200 border-t-gold-500 rounded-full animate-spin" />
    </div>
  )
}

function WhatsAppFAB() {
  return (
    <motion.div
      className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.5, type: 'spring', stiffness: 200 }}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
        <a
          href={`https://wa.me/${siteConfig.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </motion.div>
  )
}

function AppInner() {
  const location = useLocation()

  useEffect(() => {
    scrollToTop(true)
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <RouteProgress />
      <AnnouncementBar />
      <Navbar />

      <main>
        <Suspense fallback={<PageLoading />}>
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/"               element={<PageWrapper><HomePage /></PageWrapper>} />
              <Route path="/shop"           element={<PageWrapper><ShopPage /></PageWrapper>} />
              <Route path="/shop/:category" element={<PageWrapper><CategoryPage /></PageWrapper>} />
              <Route path="/product/:slug"  element={<PageWrapper><ProductDetailPage /></PageWrapper>} />
              <Route path="/cart"           element={<PageWrapper><CartPage /></PageWrapper>} />
              <Route path="/checkout"       element={<PageWrapper><CheckoutPage /></PageWrapper>} />
              <Route path="/wishlist"       element={<PageWrapper><WishlistPage /></PageWrapper>} />
              <Route path="/account"        element={<PageWrapper><AccountPage /></PageWrapper>} />
              <Route path="/about"          element={<PageWrapper><AboutPage /></PageWrapper>} />
              <Route path="/contact"        element={<PageWrapper><ContactPage /></PageWrapper>} />
              <Route path="/faq"            element={<PageWrapper><FAQPage /></PageWrapper>} />
              <Route path="*"               element={<PageWrapper><NotFoundPage /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      <Footer />
      <MobileBottomNav />

      {/* Global overlays */}
      <SearchOverlay />
      <CartDrawer />
      <ScrollToTop />
      <WhatsAppFAB />

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#142A1D',
            color: '#FBF7EF',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            borderRadius: '12px',
            padding: '12px 16px',
            boxShadow: '0 8px 32px rgba(20,42,29,0.3)',
          },
          success: { iconTheme: { primary: '#C9A84C', secondary: '#142A1D' } },
        }}
      />
    </>
  )
}

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(() => {
    try { return sessionStorage.getItem('gbn_loaded') === '1' } catch { return false }
  })
  useLenis()

  useEffect(() => {
    if (preloaderDone) initGSAPLenis()
  }, [preloaderDone])

  return (
    <CartProvider>
      <WishlistProvider>
        <UIProvider>
          <BrowserRouter>
            {!preloaderDone && (
              <Preloader onComplete={() => {
                setPreloaderDone(true)
                setTimeout(initGSAPLenis, 100)
              }} />
            )}
            {preloaderDone && <AppInner />}
          </BrowserRouter>
        </UIProvider>
      </WishlistProvider>
    </CartProvider>
  )
}
