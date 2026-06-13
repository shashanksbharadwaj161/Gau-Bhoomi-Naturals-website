import { useEffect, useRef, useState } from 'react'
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
import { getProducts, getProductsByCategory } from '../services/woocommerce'
import { siteConfig } from '../config/siteConfig'
import { getLenis } from '../hooks/useLenis'

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
  const [activeSlug, setActiveSlug] = useState('all')
  const [bestsellers, setBestsellers] = useState([])
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
      const [best, ghee, rice, hny] = await Promise.all([
        getProducts({ orderby: 'popularity', per_page: 16 }),
        getProductsByCategory('ghee', 12),
        getProductsByCategory('masalas', 12),
        getProductsByCategory('honey', 12),
      ])
      if (!active) return
      setBestsellers(best); setExplore(best); setExploreLoading(false)
      setGheeOils(ghee); setLoadingGhee(false)
      setRiceMasalas(rice); setLoadingRice(false)
      setHoney(hny); setLoadingHoney(false)
    })()
    return () => { active = false }
  }, [])

  const handleCategoryChange = async (slug) => {
    setActiveSlug(slug)
    setExploreLoading(true)
    // Scroll to the explore carousel
    const el = exploreRef.current
    if (el) {
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(el, { offset: -120 })
      else el.scrollIntoView({ behavior: 'smooth' })
    }
    if (slug === 'all') {
      setExplore(bestsellers); setExploreLoading(false)
    } else {
      const data = await getProductsByCategory(slug, 16)
      setExplore(data); setExploreLoading(false)
    }
  }

  const activeCategory = siteConfig.categories.find((c) => c.slug === activeSlug)
  const exploreTitle = activeSlug === 'all' ? 'Our Bestsellers' : activeCategory?.name || 'Products'

  return (
    <>
      <HeroBanner />
      <GoldDivider />
      <TrustBadges />

      {/* Category explorer */}
      <div className="py-8 md:py-12 px-4 md:px-8 bg-cream">
        <h2 className="font-display text-display-md text-primary-500 font-bold text-center mb-6">Explore Our Range</h2>
        <div className="max-w-5xl mx-auto">
          <CategoryPills activeSlug={activeSlug} onCategoryChange={handleCategoryChange} />
        </div>
      </div>

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
