import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext(null)
const STORAGE_KEY = 'gbn_cart_v2'

const parsePrice = (value) => {
  const n = parseFloat(value)
  return isNaN(n) ? 0 : n
}

// Effective unit price: prefer a valid sale price, else regular price.
const unitPrice = (item) => {
  const sale = parsePrice(item.salePrice)
  const price = parsePrice(item.price)
  if (sale > 0 && sale < price) return sale
  return price
}

export function CartProvider({ children }) {
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
      /* storage may be unavailable (private mode) — fail silently */
    }
  }, [items])

  const addItem = (product, quantity = 1) => {
    const id = product.id
    setItems((prev) => {
      const existing = prev.find((it) => it.id === id)
      if (existing) {
        return prev.map((it) =>
          it.id === id ? { ...it, quantity: it.quantity + quantity } : it
        )
      }
      const image = product.images?.[0]?.src || product.image || ''
      return [
        ...prev,
        {
          id,
          name: product.name,
          price: product.price ?? '',
          salePrice: product.sale_price ?? product.salePrice ?? '',
          image,
          quantity,
          slug: product.slug,
          categorySlug: product.categories?.[0]?.slug || product.categorySlug || '',
        },
      ]
    })
    toast.success(`${product.name} added to cart`)
  }

  const removeItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
  }

  const updateQuantity = (id, qty) => {
    const next = Math.max(1, Math.min(99, qty))
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, quantity: next } : it))
    )
  }

  const clearCart = () => setItems([])

  const cartCount = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity, 0),
    [items]
  )

  const cartTotal = useMemo(
    () => items.reduce((sum, it) => sum + unitPrice(it) * it.quantity, 0),
    [items]
  )

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}

export { CartContext }
