import axios from 'axios'

const WC_URL    = import.meta.env.VITE_WC_URL    || 'https://mediumseagreen-salamander-686387.hostingersite.com'
const WC_KEY    = import.meta.env.VITE_WC_KEY    || ''
const WC_SECRET = import.meta.env.VITE_WC_SECRET || ''

const api = axios.create({
  baseURL: `${WC_URL}/wp-json/wc/v3`,
  timeout: 15000,
})

// Query string auth bypasses CORS preflight issues
// with Basic Auth Authorization headers on Hostinger
api.interceptors.request.use((config) => {
  if (WC_KEY && WC_SECRET) {
    config.params = {
      consumer_key: WC_KEY,
      consumer_secret: WC_SECRET,
      ...config.params,
    }
  }
  return config
})

// Inline GBN monogram (dark green + gold) used as the image error fallback so a
// failed product/logo image never shows a broken-image icon.
export const PRODUCT_IMAGE_FALLBACK =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%3E%3Crect%20width='100'%20height='100'%20fill='%23142A1D'/%3E%3Ctext%20x='50'%20y='53'%20text-anchor='middle'%20dominant-baseline='central'%20font-family='Georgia,serif'%20font-size='24'%20letter-spacing='3'%20fill='%23E8C97A'%3EGBN%3C/text%3E%3C/svg%3E"

// ── MOCK DATA ───────────────────────────────────────
const MOCK_CATEGORIES = [
  { id: 15, name: 'Ghee',              slug: 'ghee',       count: 45 },
  { id: 16, name: 'Cold Pressed Oils', slug: 'oils',       count: 30 },
  { id: 17, name: 'Rice & Grains',     slug: 'rice',       count: 25 },
  { id: 18, name: 'Masalas',           slug: 'masalas',    count: 35 },
  { id: 19, name: 'Honey',             slug: 'honey',      count: 20 },
  { id: 20, name: 'Dry Fruits',        slug: 'dry-fruits', count: 30 },
  { id: 21, name: 'Seeds',             slug: 'seeds',      count: 15 },
  { id: 22, name: 'Other',             slug: 'other',      count: 10 },
]

const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1631451095765-2c91616b9d05?w=400&q=80',
  'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
  'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80',
  'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&q=80',
  'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80',
]

const PRODUCT_NAMES = [
  'A2 Gir Cow Ghee Bilona 500ml',   'Cold Pressed Mustard Oil 1L',
  'Organic Basmati Rice 5kg',        'Kashmiri Chilli Powder 200g',
  'Wild Forest Honey 500g',          'Premium Cashews 500g',
  'Organic Flaxseeds 500g',          'A2 Gir Cow Ghee 250ml',
  'Cold Pressed Coconut Oil 500ml',  'Organic Turmeric Powder 200g',
  'Ajwain Seeds 200g',               'Pure Mustard Honey 250g',
  'Organic Almonds 500g',            'Chia Seeds 250g',
  'A2 Gir Cow Ghee 1kg',             'Cold Pressed Sesame Oil 500ml',
  'Organic Brown Rice 2kg',          'Garam Masala Blend 150g',
  'Acacia Honey 250g',               'Premium Walnuts 250g',
  'Sunflower Seeds 250g',            'Organic Ragi Flour 1kg',
  'Jeera Powder 100g',               'Raw Sidr Honey 500g',
]

// Deterministic pseudo-random so mock data is stable across renders/builds.
const seeded = (i, base, range) => base + ((i * 73 + 19) % range)

export const MOCK_PRODUCTS = Array.from({ length: 24 }, (_, i) => ({
  id:                i + 1,
  name:              PRODUCT_NAMES[i % PRODUCT_NAMES.length],
  slug:              `product-${i + 1}`,
  price:             String(seeded(i, 199, 500)),
  regular_price:     String(seeded(i, 299, 700)),
  sale_price:        i % 4 === 0 ? String(seeded(i, 149, 300)) : '',
  categories:        [MOCK_CATEGORIES[i % MOCK_CATEGORIES.length]],
  images:            [{ src: UNSPLASH_IMAGES[i % UNSPLASH_IMAGES.length] }],
  description:       '<p>Premium quality organic product sourced directly from trusted Indian farms. 100% natural, chemical-free, and traditionally prepared.</p>',
  short_description: 'Pure & Natural. Zero Chemicals. Traditionally prepared.',
  stock_status:      'instock',
  average_rating:    '4.8',
  rating_count:      seeded(i, 80, 300),
  featured:          i < 6,
  meta_data:         [],
}))

// ── API CALLS ───────────────────────────────────────
export const getProducts = async (params = {}) => {
  try {
    const res = await api.get('/products', {
      params: { per_page: 20, status: 'publish', ...params }
    })
    if (res.data && res.data.length > 0) return res.data
    return MOCK_PRODUCTS
  } catch (err) {
    console.warn('[WC] getProducts failed:', err.message)
    return MOCK_PRODUCTS
  }
}

export const getProduct = async (slug) => {
  try {
    const res = await api.get('/products', { params: { slug } })
    if (res.data && res.data.length > 0) return res.data[0]
    return MOCK_PRODUCTS[0]
  } catch (err) {
    console.warn('[WC] getProduct failed:', err.message)
    return MOCK_PRODUCTS.find(p => p.slug === slug) || MOCK_PRODUCTS[0]
  }
}

export const getProductById = async (id) => {
  try {
    const res = await api.get(`/products/${id}`)
    return res.data
  } catch {
    return MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0]
  }
}

export const getCategories = async () => {
  try {
    const res = await api.get('/products/categories', {
      params: { per_page: 100, hide_empty: false }
    })
    if (res.data && res.data.length > 0) return res.data
    return MOCK_CATEGORIES
  } catch (err) {
    console.warn('[WC] getCategories failed:', err.message)
    return MOCK_CATEGORIES
  }
}

export const getProductsByCategory = async (slug, perPage = 12) => {
  if (slug === 'all' || !slug) return getProducts({ per_page: perPage })
  try {
    const cats = await getCategories()
    const cat = cats.find(c => c.slug === slug)
    if (!cat) {
      console.warn('[WC] Category not found:', slug)
      return MOCK_PRODUCTS
    }
    const res = await api.get('/products', {
      params: { category: cat.id, per_page: perPage, status: 'publish' }
    })
    if (res.data && res.data.length > 0) return res.data
    return MOCK_PRODUCTS
  } catch (err) {
    console.warn('[WC] getProductsByCategory failed:', err.message)
    return MOCK_PRODUCTS
  }
}

export const searchProducts = async (query) => {
  if (!query || query.length < 2) return []
  try {
    const res = await api.get('/products', {
      params: { search: query, per_page: 10, status: 'publish' }
    })
    return res.data || []
  } catch (err) {
    console.warn('[WC] searchProducts failed:', err.message)
    return MOCK_PRODUCTS
      .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8)
  }
}

export const getRelatedProducts = async (productId, categoryId, perPage = 8) => {
  try {
    const res = await api.get('/products', {
      params: { category: categoryId, per_page: perPage, exclude: productId }
    })
    return res.data.length > 0 ? res.data : MOCK_PRODUCTS.filter(p => p.id !== productId).slice(0, perPage)
  } catch {
    return MOCK_PRODUCTS.filter(p => p.id !== productId).slice(0, perPage)
  }
}

// ── HELPERS ─────────────────────────────────────────
export const formatPrice = (price, salePrice) => {
  const p = parseFloat(price)
  const s = parseFloat(salePrice)
  if (!price || isNaN(p) || p === 0) return { display: 'Price on Request', isOnRequest: true }
  if (salePrice && !isNaN(s) && s > 0 && s < p) {
    return {
      display:   `₹${s.toLocaleString('en-IN')}`,
      original:  `₹${p.toLocaleString('en-IN')}`,
      isOnSale:  true,
      isOnRequest: false,
    }
  }
  return {
    display: `₹${p.toLocaleString('en-IN')}`,
    isOnRequest: false,
  }
}

export const buildAddToCartUrl = (productId) =>
  `${WC_URL}/?add-to-cart=${productId}`

export const buildProductUrl = (slug) =>
  `${WC_URL}/product/${slug}`

export const buildCategoryUrl = (slug) =>
  `${WC_URL}/product-category/${slug}`
