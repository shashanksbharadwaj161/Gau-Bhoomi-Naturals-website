import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

const WishlistContext = createContext(null)
const STORAGE_KEY = 'gbn_wishlist_v2'

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* fail silently */
    }
  }, [items])

  const toggleWishlist = (product) => {
    const exists = items.some((it) => it.id === product.id)
    setItems((prev) =>
      exists ? prev.filter((it) => it.id !== product.id) : [...prev, product]
    )
    if (exists) toast('Removed from wishlist', { icon: '💔' })
    else toast.success('Added to wishlist')
  }

  const isWishlisted = (id) => items.some((it) => it.id === id)

  const wishlistCount = useMemo(() => items.length, [items])

  const value = { items, toggleWishlist, isWishlisted, wishlistCount }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider')
  return ctx
}

export { WishlistContext }
