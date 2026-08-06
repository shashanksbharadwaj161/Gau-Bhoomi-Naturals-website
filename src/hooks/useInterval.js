import { useEffect, useRef } from 'react'

// Declarative setInterval. The callback lives in a ref so the timer is not torn
// down and recreated every render — passing `delay: null` pauses it.
export function useInterval(callback, delay) {
  const saved = useRef(callback)

  useEffect(() => {
    saved.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return undefined
    const id = setInterval(() => saved.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}
