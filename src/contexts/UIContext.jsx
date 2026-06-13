import { createContext, useContext, useState } from 'react'

const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [announcementVisible, setAnnouncementVisible] = useState(
    () => {
      try { return sessionStorage.getItem('gbn_announce_dismissed') !== '1' }
      catch { return true }
    }
  )

  const openSearch  = () => setSearchOpen(true)
  const closeSearch = () => setSearchOpen(false)
  const openCart    = () => setCartOpen(true)
  const closeCart   = () => setCartOpen(false)

  const dismissAnnouncement = () => {
    try { sessionStorage.setItem('gbn_announce_dismissed', '1') } catch { /* ignore */ }
    setAnnouncementVisible(false)
  }

  const value = {
    searchOpen, cartOpen, announcementVisible,
    openSearch, closeSearch, openCart, closeCart, dismissAnnouncement,
  }

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used within a UIProvider')
  return ctx
}
