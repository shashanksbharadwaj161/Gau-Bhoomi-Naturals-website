import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductGrid from '../components/ui/ProductGrid'
import { staggerOnScroll, staggerItem } from '../animations/motion'

export default function ShopPage() {
  const [slug, setSlug] = useState('all')

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <motion.div className="bg-primary-500 py-10 md:py-14 text-center" {...staggerOnScroll(0.07)}>
        <motion.nav variants={staggerItem} className="font-body text-cream/60 text-xs mb-3">
          <Link to="/" className="hover:text-gold-400">Home</Link> / <span className="text-gold-400">Shop</span>
        </motion.nav>
        <motion.h1 variants={staggerItem} className="font-display text-display-lg text-white font-bold">All Products</motion.h1>
        <motion.p variants={staggerItem} className="font-body text-cream/70 text-sm mt-2">Pure, organic & traditionally made — explore the full range</motion.p>
      </motion.div>

      <ProductGrid slug={slug} onCategoryChange={setSlug} />
    </div>
  )
}
