import { useParams, useNavigate, Link } from 'react-router-dom'
import ProductGrid from '../components/ui/ProductGrid'
import { siteConfig } from '../config/siteConfig'

const DESCRIPTIONS = {
  ghee:        'Golden A2 Gir cow ghee, hand-churned the ancient Bilona way.',
  oils:        'Cold pressed oils that retain every drop of natural goodness.',
  rice:        'Aromatic, wholesome rice & grains grown without chemicals.',
  masalas:     'Freshly ground masalas bursting with authentic Indian flavour.',
  honey:       'Raw, unprocessed honey harvested from pristine forests.',
  'dry-fruits':'Premium, hand-picked dry fruits for everyday nourishment.',
  seeds:       'Nutrient-dense seeds & superfoods for a healthier you.',
  other:       'More pure & natural goodness from our gaushala.',
  all:         'Pure, organic & traditionally made — explore the full range.',
}

export default function CategoryPage() {
  const { category } = useParams()
  const navigate = useNavigate()
  const cat = siteConfig.categories.find((c) => c.slug === category)
  const name = cat?.name || 'Products'
  const description = DESCRIPTIONS[category] || siteConfig.description

  const handleChange = (slug) => {
    navigate(slug === 'all' ? '/shop' : `/shop/${slug}`)
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Category hero */}
      <div className="bg-primary-500 py-10 md:py-14 text-center px-4">
        <nav className="font-body text-cream/60 text-xs mb-3">
          <Link to="/" className="hover:text-gold-400">Home</Link> /{' '}
          <Link to="/shop" className="hover:text-gold-400">Shop</Link> /{' '}
          <span className="text-gold-400">{name}</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl text-white font-bold">
          {cat?.emoji} {name}
        </h1>
        <p className="font-body text-cream/70 text-sm mt-3 max-w-xl mx-auto">{description}</p>
      </div>

      <ProductGrid key={category} slug={category} onCategoryChange={handleChange} />
    </div>
  )
}
