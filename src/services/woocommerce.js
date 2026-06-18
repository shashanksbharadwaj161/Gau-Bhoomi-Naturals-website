import axios from 'axios'

const WC_URL = import.meta.env.VITE_WC_URL || 'https://mediumseagreen-salamander-686387.hostingersite.com'

// ── WooCommerce Store API (public, no authentication required) ──────────────
// The Store API (wc/store/v1) is the customer-facing, read-only API used by
// WooCommerce Blocks. Unlike wc/v3 it needs no consumer key/secret, so there
// are no exposed credentials and no auth/CORS failures. Same-origin in prod.
const api = axios.create({
  baseURL: `${WC_URL}/wp-json/wc/store/v1`,
  timeout: 15000,
})

// ── Response mapping (Store API shape → the shape our components expect) ─────
// Store API prices are strings in the currency's minor units (e.g. "16800"
// with currency_minor_unit 2 = ₹168.00). Convert to plain major-unit strings.
const toMajor = (value, minorUnit = 2) => {
  if (value === null || value === undefined || value === '') return ''
  const n = Number(value)
  if (Number.isNaN(n)) return ''
  const major = n / 10 ** minorUnit
  return String(Number.isInteger(major) ? major : major.toFixed(2))
}

const mapStoreProduct = (p) => {
  const unit = p?.prices?.currency_minor_unit ?? 2
  const regular = toMajor(p?.prices?.regular_price, unit) || toMajor(p?.prices?.price, unit)
  const sale = p?.on_sale ? toMajor(p?.prices?.sale_price, unit) : ''
  return {
    id:                p.id,
    name:              p.name,
    slug:              p.slug,
    price:             regular,
    regular_price:     regular,
    sale_price:        sale && sale !== regular ? sale : '',
    images:            (p.images || []).map((im) => ({ src: im.src })),
    categories:        (p.categories || []).map((c) => ({ id: c.id, name: c.name, slug: c.slug })),
    description:       p.description || '',
    short_description: p.short_description || '',
    average_rating:    p.average_rating || '0',
    rating_count:      p.review_count ?? 0,
    featured:          !!p.featured,
    stock_status:      p.is_in_stock === false ? 'outofstock' : 'instock',
  }
}

const mapList = (data) => (Array.isArray(data) ? data.map(mapStoreProduct) : [])

// ── MOCK DATA (fallback only — used if the Store API is unreachable) ─────────
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
  description:       '<p>Premium quality organic product sourced directly from trusted Indian farms.</p>',
  short_description: 'Pure & Natural. Zero Chemicals. Traditionally prepared.',
  stock_status:      'instock',
  average_rating:    '4.8',
  rating_count:      seeded(i, 80, 300),
  featured:          i < 6,
  meta_data:         [],
}))

// Match a UI category slug to a real WooCommerce category (slug may differ,
// e.g. "oils" → "cold-pressed-oils"), so filtering still works.
const CATEGORY_KEYWORDS = {
  ghee:        ['ghee'],
  oils:        ['oil'],
  rice:        ['rice', 'grain'],
  masalas:     ['masala', 'spice'],
  honey:       ['honey'],
  'dry-fruits':['dry fruit', 'dryfruit', 'nut', 'cashew', 'almond', 'walnut'],
  seeds:       ['seed'],
  other:       [],
}

const findCategory = (cats, slug) => {
  if (!Array.isArray(cats)) return null
  const exact = cats.find((c) => c.slug === slug)
  if (exact) return exact
  const keywords = CATEGORY_KEYWORDS[slug] || [slug]
  return cats.find((c) => {
    const hay = `${c.slug} ${c.name}`.toLowerCase()
    return keywords.some((k) => hay.includes(k))
  }) || null
}

// ── API CALLS ───────────────────────────────────────────────────────────────
export const getProducts = async (params = {}) => {
  try {
    const res = await api.get('/products', { params: { per_page: 20, ...params } })
    // Return the real list (even if empty) on success — mock is only a
    // fallback for hard failures, never substituted for genuine WC data.
    return mapList(res.data)
  } catch (err) {
    console.warn('[WC] getProducts failed:', err?.response?.status || '', err.message)
    return MOCK_PRODUCTS
  }
}

export const getCategories = async () => {
  try {
    const res = await api.get('/products/categories', { params: { per_page: 100 } })
    return Array.isArray(res.data) && res.data.length > 0 ? res.data : MOCK_CATEGORIES
  } catch (err) {
    console.warn('[WC] getCategories failed:', err?.response?.status || '', err.message)
    return MOCK_CATEGORIES
  }
}

export const getProductsByCategory = async (slug, perPage = 12) => {
  if (slug === 'all' || !slug) return getProducts({ per_page: perPage })
  try {
    const cats = await getCategories()
    const cat = findCategory(cats, slug)
    if (!cat) {
      console.warn('[WC] Category not found for slug:', slug)
      return []
    }
    const res = await api.get('/products', { params: { category: cat.id, per_page: perPage } })
    return mapList(res.data)
  } catch (err) {
    console.warn('[WC] getProductsByCategory failed:', err?.response?.status || '', err.message)
    return MOCK_PRODUCTS.filter((p) => p.categories.some((c) => c.slug === slug))
  }
}

export const getProduct = async (slug) => {
  try {
    const res = await api.get('/products', { params: { slug } })
    const list = mapList(res.data)
    if (list.length > 0) return list[0]
    return MOCK_PRODUCTS.find((p) => p.slug === slug) || MOCK_PRODUCTS[0]
  } catch (err) {
    console.warn('[WC] getProduct failed:', err?.response?.status || '', err.message)
    return MOCK_PRODUCTS.find((p) => p.slug === slug) || MOCK_PRODUCTS[0]
  }
}

export const getProductById = async (id) => {
  try {
    const res = await api.get(`/products/${id}`)
    return mapStoreProduct(res.data)
  } catch (err) {
    console.warn('[WC] getProductById failed:', err?.response?.status || '', err.message)
    return MOCK_PRODUCTS.find((p) => p.id === id) || MOCK_PRODUCTS[0]
  }
}

export const searchProducts = async (query) => {
  if (!query || query.length < 2) return []
  try {
    const res = await api.get('/products', { params: { search: query, per_page: 10 } })
    return mapList(res.data)
  } catch (err) {
    console.warn('[WC] searchProducts failed:', err?.response?.status || '', err.message)
    return MOCK_PRODUCTS
      .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8)
  }
}

export const getRelatedProducts = async (productId, categoryId, perPage = 8) => {
  try {
    const params = { per_page: perPage, exclude: productId }
    if (categoryId) params.category = categoryId
    const res = await api.get('/products', { params })
    return mapList(res.data)
  } catch (err) {
    console.warn('[WC] getRelatedProducts failed:', err?.response?.status || '', err.message)
    return MOCK_PRODUCTS.filter((p) => p.id !== productId).slice(0, perPage)
  }
}

// Inline GBN monogram fallback so a failed product image never shows a broken icon.
export const PRODUCT_IMAGE_FALLBACK =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%3E%3Crect%20width='100'%20height='100'%20fill='%23142A1D'/%3E%3Ctext%20x='50'%20y='53'%20text-anchor='middle'%20dominant-baseline='central'%20font-family='Georgia,serif'%20font-size='24'%20letter-spacing='3'%20fill='%23E8C97A'%3EGBN%3C/text%3E%3C/svg%3E"

// ── HELPERS ─────────────────────────────────────────────────────────────────
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
  return { display: `₹${p.toLocaleString('en-IN')}`, isOnRequest: false }
}

export const buildAddToCartUrl = (productId) => `${WC_URL}/?add-to-cart=${productId}`
export const buildProductUrl = (slug) => `${WC_URL}/product/${slug}`
export const buildCategoryUrl = (slug) => `${WC_URL}/product-category/${slug}`
