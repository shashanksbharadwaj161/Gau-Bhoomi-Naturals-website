export const siteConfig = {
  brandName:   'Gau Bhoomi Naturals',
  tagline:     'Pure from the Gaushala, Delivered to your Doorstep',
  description: 'Premium A2 Gir Cow Ghee, cold pressed oils, organic rice, masalas, honey and dry fruits — straight from our gaushala to your home.',

  phone:    '+91 98765 43210',
  email:    'info@gaubhoominaturals.com',
  whatsapp: '919876543210',
  address:  'India',

  social: {
    instagram: 'https://instagram.com/gaubhoominaturals',
    facebook:  'https://facebook.com/gaubhoominaturals',
    youtube:   'https://youtube.com/@gaubhoominaturals',
  },

  wcUrl:       import.meta.env.VITE_WC_URL || 'https://mediumseagreen-salamander-686387.hostingersite.com',
  get checkoutUrl() { return `${this.wcUrl}/checkout` },
  get shopUrl()     { return `${this.wcUrl}/shop` },

  logoUrl: '/images/logo.svg',

  announcements: [
    '🌿 Free Shipping on Orders Above ₹999 — Shop Now',
    '🐄 100% Pure A2 Gir Cow Ghee — Bilona Method',
    '✨ Launching Offer: 15% Off Your First Order | Use: WELCOME15',
    '🍯 Fresh Batch of Wild Forest Honey Now Available',
    '🌾 New Stock: Organic Basmati Rice & Cold Pressed Oils',
  ],

  heroSlides: [
    {
      image:       'https://images.unsplash.com/photo-1631451095765-2c91616b9d05?w=1600&q=80',
      eyebrow:     'A2 GIR COW GHEE',
      headline:    'Pure.\nNatural.\nDesi.',
      subheadline: 'Crafted the ancient Bilona way — no shortcuts, no additives',
      cta:         'Shop Ghee',
      ctaLink:     '/shop/ghee',
      align:       'left',
    },
    {
      image:       'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=80',
      eyebrow:     'FROM OUR GAUSHALA',
      headline:    'Farm Fresh.\nChemical Free.\nDelivered.',
      subheadline: '100% organic goodness, grown with love and ancient wisdom',
      cta:         'Explore All',
      ctaLink:     '/shop',
      align:       'left',
    },
    {
      image:       'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1600&q=80',
      eyebrow:     'WILD FOREST HONEY',
      headline:    "Nature's\nSweetest\nGift",
      subheadline: 'Harvested from pristine Indian forests, raw and unprocessed',
      cta:         'Shop Honey',
      ctaLink:     '/shop/honey',
      align:       'center',
    },
    {
      image:       'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1600&q=80',
      eyebrow:     'SUPERFOODS & SEEDS',
      headline:    'The Goodness\nof Gau\nBhoomi',
      subheadline: 'Premium dry fruits, seeds & superfoods for a healthier you',
      cta:         'Shop Now',
      ctaLink:     '/shop',
      align:       'right',
    },
  ],

  categories: [
    { name: 'All',             slug: 'all',        emoji: '🌿', icon: 'LayoutGrid'   },
    { name: 'Ghee',            slug: 'ghee',       emoji: '🫙', icon: 'Cylinder'     },
    { name: 'Cold Pressed Oils', slug: 'oils',     emoji: '🫒', icon: 'Droplets'     },
    { name: 'Rice & Grains',   slug: 'rice',       emoji: '🌾', icon: 'Wheat'        },
    { name: 'Masalas',         slug: 'masalas',    emoji: '🌶️', icon: 'Flame'        },
    { name: 'Honey',           slug: 'honey',      emoji: '🍯', icon: 'Star'         },
    { name: 'Dry Fruits',      slug: 'dry-fruits', emoji: '🌰', icon: 'Circle'       },
    { name: 'Seeds',           slug: 'seeds',      emoji: '🌱', icon: 'Leaf'         },
    { name: 'Other',           slug: 'other',      emoji: '✨', icon: 'Sparkles'     },
  ],

  freeShippingThreshold: 999,
  shippingCost: 99,

  bilonaSteps: [
    {
      step: '01',
      title: 'Milk Collection',
      description: 'Fresh A2 milk collected every morning from our free-roaming Gir cows in the gaushala.',
      image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80',
    },
    {
      step: '02',
      title: 'Curd Setting',
      description: 'Milk is gently curdled overnight using natural cultures — no chemicals, no shortcuts.',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80',
    },
    {
      step: '03',
      title: 'Bilona Churning',
      description: 'Curd is hand-churned using the ancient wooden Bilona. Slow, methodical, traditional.',
      image: 'https://images.unsplash.com/photo-1631451095765-2c91616b9d05?w=800&q=80',
    },
    {
      step: '04',
      title: 'Golden Ghee',
      description: 'Butter is slowly simmered on low flame until it transforms into liquid gold. Pure. Fragrant. Healing.',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80',
    },
  ],

  testimonials: [
    { text: 'The A2 Ghee is absolutely divine! You can taste the difference from commercial ghee immediately. Will never go back!', name: 'Priya S.', city: 'Bengaluru', rating: 5 },
    { text: 'Finally found honest organic products. The cold pressed mustard oil is exactly what my grandmother used to use.', name: 'Rajesh M.', city: 'Mumbai', rating: 5 },
    { text: 'Ordered Kashmiri Honey and Dry Fruits. Premium quality, arrived well packed. Highly recommended!', name: 'Anita K.', city: 'Delhi', rating: 5 },
    { text: 'The Bilona ghee fragrance alone is worth it. Pure gold in a jar! Gau Bhoomi is now a household staple.', name: 'Suresh P.', city: 'Hyderabad', rating: 5 },
    { text: 'Best organic masalas I have ever tasted. You can feel they are freshly ground. 10/10 quality.', name: 'Meena R.', city: 'Chennai', rating: 5 },
    { text: 'Switched to Gau Bhoomi cold pressed oils 3 months ago. The difference in cooking quality is remarkable.', name: 'Kavya T.', city: 'Pune', rating: 5 },
  ],

  stats: [
    { value: 10000, suffix: '+', label: 'Happy Customers' },
    { value: 200, suffix: '+', label: 'Organic Products' },
    { value: 5, suffix: '', label: 'Years of Excellence' },
    { value: 100, suffix: '%', label: 'Chemical Free' },
  ],

  whyChooseUs: [
    { emoji: '🐄', title: 'A2 Gir Cow Certified', desc: 'Sourced exclusively from indigenous Gir cows raised in a natural, stress-free gaushala environment.' },
    { emoji: '🫙', title: 'Ancient Bilona Method', desc: 'Our ghee is hand-churned using the traditional Bilona process — preserving all nutrients and authentic flavour.' },
    { emoji: '🌿', title: 'Zero Chemicals', desc: 'No preservatives, no artificial colours, no additives. Ever. What you get is pure as nature intended.' },
    { emoji: '🚚', title: 'Farm to Doorstep', desc: 'We ship directly from our farm. No middlemen, no storage delays. Freshness guaranteed in every order.' },
  ],
}
