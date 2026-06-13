import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductGrid from '../components/ui/ProductGrid'

export default function ShopPage() {
  const [slug, setSlug] = useState('all')

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="bg-primary-500 py-10 md:py-14 text-center">
        <nav className="font-body text-cream/60 text-xs mb-3">
          <Link to="/" className="hover:text-gold-400">Home</Link> / <span className="text-gold-400">Shop</span>
        </nav>
        <h1 className="font-display text-display-lg text-white font-bold">All Products</h1>
        <p className="font-body text-cream/70 text-sm mt-2">Pure, organic & traditionally made — explore the full range</p>
      </div>

      <ProductGrid slug={slug} onCategoryChange={setSlug} />
    </div>
  )
}
