/* eslint-disable react-refresh/only-export-components */
import { Children, createContext, useContext, useEffect, useMemo, useState } from 'react'

const RouterContext = createContext(null)
const ParamsContext = createContext({})

const currentLocation = () => ({
  pathname: window.location.pathname || '/',
  search: window.location.search,
  hash: window.location.hash,
})

export function BrowserRouter({ children }) {
  const [location, setLocation] = useState(currentLocation)

  useEffect(() => {
    const handlePopState = () => setLocation(currentLocation())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (to, options = {}) => {
    if (typeof to === 'number') {
      window.history.go(to)
      return
    }
    window.history[options.replace ? 'replaceState' : 'pushState']({}, '', to)
    setLocation(currentLocation())
  }

  const value = useMemo(() => ({ location, navigate }), [location])
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useLocation() {
  const context = useContext(RouterContext)
  if (!context) throw new Error('useLocation must be used within BrowserRouter')
  return context.location
}

export function useNavigate() {
  const context = useContext(RouterContext)
  if (!context) throw new Error('useNavigate must be used within BrowserRouter')
  return context.navigate
}

export function useParams() {
  return useContext(ParamsContext)
}

const matchPath = (pattern, pathname) => {
  if (pattern === '*') return { params: {} }
  const patternParts = pattern.split('/').filter(Boolean)
  const pathParts = pathname.split('/').filter(Boolean)
  if (patternParts.length !== pathParts.length) return null

  const params = {}
  for (let index = 0; index < patternParts.length; index += 1) {
    const expected = patternParts[index]
    const actual = pathParts[index]
    if (expected.startsWith(':')) params[expected.slice(1)] = decodeURIComponent(actual)
    else if (expected !== actual) return null
  }
  return { params }
}

export function Route() {
  return null
}

export function Routes({ children }) {
  const { pathname } = useLocation()
  let fallback = null

  for (const child of Children.toArray(children)) {
    if (child.props.path === '*') {
      fallback = child
      continue
    }
    const match = matchPath(child.props.path, pathname)
    if (match) {
      return <ParamsContext.Provider value={match.params}>{child.props.element}</ParamsContext.Provider>
    }
  }

  return fallback
    ? <ParamsContext.Provider value={{}}>{fallback.props.element}</ParamsContext.Provider>
    : null
}

export function Link({ to, onClick, target, children, ...props }) {
  const navigate = useNavigate()
  const handleClick = (event) => {
    onClick?.(event)
    if (
      event.defaultPrevented || target === '_blank' || event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
    ) return
    event.preventDefault()
    navigate(to)
  }

  return <a href={to} target={target} onClick={handleClick} {...props}>{children}</a>
}

export function NavLink({ to, end = false, className, children, ...props }) {
  const { pathname } = useLocation()
  const isActive = end ? pathname === to : pathname === to || pathname.startsWith(`${to}/`)
  const resolvedClassName = typeof className === 'function' ? className({ isActive }) : className
  return <Link to={to} className={resolvedClassName} {...props}>{children}</Link>
}
