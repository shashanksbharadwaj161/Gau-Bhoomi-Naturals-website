import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Package, LogOut, ArrowRight } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'

const EMAIL_KEY = 'gbn_account_email'

export default function AccountPage() {
  const [email, setEmail] = useState(() => {
    try { return localStorage.getItem(EMAIL_KEY) || '' } catch { return '' }
  })
  const [input, setInput] = useState('')

  const signIn = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    try { localStorage.setItem(EMAIL_KEY, input.trim()) } catch { /* ignore */ }
    setEmail(input.trim())
    setInput('')
  }

  const signOut = () => {
    try { localStorage.removeItem(EMAIL_KEY) } catch { /* ignore */ }
    setEmail('')
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-xl mx-auto px-4 py-12 md:py-20">
        <div className="bg-white rounded-3xl p-8 shadow-card text-center">
          <div className="w-16 h-16 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center mx-auto">
            <User size={30} />
          </div>

          {!email ? (
            <>
              <h1 className="font-display text-2xl text-primary-500 font-bold mt-4">My Account</h1>
              <p className="font-body text-gray-500 text-sm mt-2">Enter your email to track orders and manage your account.</p>
              <form onSubmit={signIn} className="mt-6 space-y-3">
                <input
                  type="email"
                  required
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-gold-200 focus:border-gold-500 rounded-xl px-4 py-3 font-body text-sm outline-none"
                />
                <button type="submit" className="w-full bg-gold-500 hover:bg-gold-400 text-primary-500 font-body font-bold py-3 rounded-xl">
                  Continue
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="font-display text-2xl text-primary-500 font-bold mt-4">Welcome back</h1>
              <p className="font-body text-gold-600 font-medium mt-1 break-all">{email}</p>

              <a
                href={`${siteConfig.wcUrl}/my-account`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full bg-primary-500 hover:bg-primary-600 text-white font-body font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <Package size={18} /> View Your Orders <ArrowRight size={16} />
              </a>

              <div className="mt-6 bg-gold-50 rounded-xl p-4 text-left">
                <p className="font-body text-sm text-primary-500 font-semibold">Recent Orders</p>
                <p className="font-body text-xs text-gray-500 mt-1">Your order history will appear here after your first purchase.</p>
              </div>

              <button type="button" onClick={signOut} className="mt-6 inline-flex items-center gap-2 font-body text-sm text-gray-500 hover:text-red-500">
                <LogOut size={16} /> Sign Out
              </button>
            </>
          )}
        </div>

        <p className="text-center font-body text-xs text-gray-400 mt-6">
          Prefer to keep shopping? <Link to="/shop" className="text-gold-600 font-semibold">Browse products</Link>
        </p>
      </div>
    </div>
  )
}
