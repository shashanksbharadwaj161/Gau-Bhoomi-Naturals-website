import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import toast from 'react-hot-toast'
import ProductCard from '../components/ui/ProductCard'
import { useWishlist } from '../contexts/WishlistContext'
import { useCart } from '../contexts/CartContext'
import { formatPrice } from '../services/woocommerce'

export default function WishlistPage() {
  const { items } = useWishlist()
  const { addItem } = useCart()

  const addAll = () => {
    let added = 0
    items.forEach((p) => {
      const price = formatPrice(p.price, p.sale_price)
      if (!price.isOnRequest) { addItem(p); added++ }
    })
    if (added === 0) toast('These items are price-on-request', { icon: 'ℹ️' })
  }

  if (items.length === 0) {
    return (
      <div className="bg-cream min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
        <Heart size={80} className="text-gold-300" />
        <h1 className="font-display text-2xl text-primary-500 font-bold mt-4">Your wishlist is empty</h1>
        <p className="font-body text-gray-500 mt-2">Save your favourites and find them here anytime.</p>
        <Link to="/shop" className="mt-6 bg-gold-500 hover:bg-gold-400 text-primary-500 font-body font-bold px-8 py-3.5 rounded-full">
          Discover Products
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <nav className="font-body text-gray-400 text-xs mb-1">
              <Link to="/" className="hover:text-gold-600">Home</Link> / <span className="text-primary-500">Wishlist</span>
            </nav>
            <h1 className="font-display text-display-md text-primary-500 font-bold">My Wishlist ({items.length})</h1>
          </div>
          <button type="button" onClick={addAll} className="bg-primary-500 hover:bg-primary-600 text-white font-body font-semibold px-6 py-3 rounded-full">
            Add All to Cart
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </div>
  )
}
