import { Link, useLocation } from 'react-router-dom'
import { Home, ShoppingCart, ShoppingBag, User } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'

const TABS = [
  { to: '/',        label: 'Home',    Icon: Home },
  { to: '/shop',    label: 'Shop',    Icon: ShoppingCart },
  { to: '/cart',    label: 'Cart',    Icon: ShoppingBag, badge: true },
  { to: '/account', label: 'Account', Icon: User },
]

export default function MobileBottomNav() {
  const { pathname } = useLocation()
  const { cartCount } = useCart()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden h-16 bg-white border-t border-gold-200 flex"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {TABS.map(({ to, label, Icon, badge }) => {
        const active = to === '/' ? pathname === '/' : pathname.startsWith(to)
        return (
          <Link
            key={to}
            to={to}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 relative transition-colors ${
              active ? 'text-primary-500 bg-gold-50' : 'text-gray-400'
            }`}
          >
            <span className="relative">
              <Icon size={22} strokeWidth={active ? 2.3 : 1.9} />
              {badge && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-gold-500 text-primary-500 text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </span>
            <span className="text-[10px] font-body font-medium">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
