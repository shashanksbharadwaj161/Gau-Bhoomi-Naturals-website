import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeroBanner from '../components/sections/HeroBanner'
import TrustBadges from '../components/sections/TrustBadges'
import GheeSpotlight from '../components/sections/GheeSpotlight'
import BilonaMethod from '../components/sections/BilonaMethod'
import FarmGallery from '../components/sections/FarmGallery'
import StatCounter from '../components/sections/StatCounter'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import Testimonials from '../components/sections/Testimonials'
import InstagramSection from '../components/sections/InstagramSection'
import Newsletter from '../components/sections/Newsletter'
import ProductCarousel from '../components/ui/ProductCarousel'
import CategoryPills from '../components/ui/CategoryPills'
import CategoryBoxes from '../components/sections/CategoryBoxes'
import { getProductsByCategory } from '../services/woocommerce'
import { siteConfig } from '../config/siteConfig'
import { getLenis } from '../hooks/useLenis'
import GoldRule from '../components/ui/GoldRule'
import LampHeading from '../components/ui/LampHeading'

const GoldDivider = () => (
  <div className="relative bg-cream overflow-hidden h-12">
    <svg viewBox="0 0 1440 48" className="absolute bottom-0 w-full" preserveAspectRatio="none">
      <path d="M0,48 C360,0 1080,48 1440,0 L1440,48 Z" fill="#142A1D" />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="w-16 h-px bg-gold-500" />
      <span className="mx-3 text-gold-500 text-sm">🌿</span>
      <div className="w-16 h-px bg-gold-500" />
    </div>
  </div>
)

export default function HomePage() {
  const navigate = useNavigate()
  const [activeSlug, setActiveSlug] = useState('all')
  const [explore, setExplore] = useState([])
  const [exploreLoading, setExploreLoading] = useState(true)
  const [gheeOils, setGheeOils] = useState([])
  const [loadingGhee, setLoadingGhee] = useState(true)
  const [riceMasalas, setRiceMasalas] = useState([])
  const [loadingRice, setLoadingRice] = useState(true)
  const [honey, setHoney] = useState([])
  const [loadingHoney, setLoadingHoney] = useState(true)

  const exploreRef = useRef(null)

  useEffect(() => {
    let active = true
    ;(async () => {
      const [ghee, rice, hny, oils] = await Promise.all([
        getProductsByCategory('ghee', 12),
        getProductsByCategory('masalas', 12),
        getProductsByCategory('honey', 12),
        getProductsByCategory('oils', 12),
      ])
      if (!active) return
      // Best Sellers ordering: Ghee first, then Oils — do not reorder.
      setExplore([...ghee, ...oils]); setExploreLoading(false)
      setGheeOils(ghee); setLoadingGhee(false)
      setRiceMasalas(rice); setLoadingRice(false)
      setHoney(hny); setLoadingHoney(false)
    })()
    return () => { active = false }
  }, [])

  const handleCategoryChange = async (slug) => {
    // "All" leaves the homepage for the full catalogue rather than resetting
    // the carousel in place. Every other pill still filters the carousel here.
    if (slug === 'all') {
      navigate('/shop')
      return
    }

    setActiveSlug(slug)
    setExploreLoading(true)
    // Scroll to the explore carousel
    const el = exploreRef.current
    if (el) {
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(el, { offset: -120 })
      else el.scrollIntoView({ behavior: 'smooth' })
    }
    const data = await getProductsByCategory(slug, 16)
    setExplore(data); setExploreLoading(false)
  }

  const activeCategory = siteConfig.categories.find((c) => c.slug === activeSlug)
  const exploreTitle = activeSlug === 'all' ? 'Our Bestsellers' : activeCategory?.name || 'Products'

  return (
    <>
      <HeroBanner />
      <GoldDivider />
      <TrustBadges />

      {/* Shop by Category */}
      <section className="py-10 md:py-14 bg-cream overflow-hidden">
        <div className="text-center mb-8 px-4">
          <LampHeading>
            <h2 className="font-display text-3xl md:text-4xl text-primary-500 font-bold">
              Shop by Category
            </h2>
          </LampHeading>
          <GoldRule from="center" className="mx-auto mt-3 mb-4" />
          <p className="font-body text-gray-500 text-sm md:text-base">
            Tap a category to explore pure, traceable organic goodness.
          </p>
        </div>
        <CategoryPills
          activeSlug={activeSlug}
          onCategoryChange={handleCategoryChange}
        />
      </section>

      <div ref={exploreRef}>
        <ProductCarousel
          title={exploreTitle}
          subtitle="Most-loved organic essentials from our farm"
          products={explore}
          loading={exploreLoading}
          viewAllLink={activeSlug === 'all' ? '/shop' : `/shop/${activeSlug}`}
          bgClass="bg-white"
        />
      </div>

      <CategoryBoxes />

      <ProductCarousel
        title="Pure Desi Ghee & Oils"
        products={gheeOils}
        loading={loadingGhee}
        viewAllLink="/shop/ghee"
        bgClass="bg-cream"
      />

      <GheeSpotlight />
      <BilonaMethod />

      <ProductCarousel
        title="Rice, Grains & Masalas"
        products={riceMasalas}
        loading={loadingRice}
        viewAllLink="/shop/rice"
        bgClass="bg-white"
      />

      <FarmGallery />
      <StatCounter />

      <ProductCarousel
        title="Wild Honey & Superfoods"
        products={honey}
        loading={loadingHoney}
        viewAllLink="/shop/honey"
        bgClass="bg-cream"
      />

      <WhyChooseUs />
      <Testimonials />
      <InstagramSection />
      <Newsletter />
    </>
  )
}
