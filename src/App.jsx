import { useEffect, useLayoutEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import ViewBubble from './components/ViewBubble'
import Home from './pages/Home'
import Work from './pages/Work'
import { scrollToTarget, ScrollTrigger, startSmoothScroll, stopSmoothScroll } from './lib/motion'

export default function App() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    startSmoothScroll()
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    return () => {
      window.removeEventListener('load', refresh)
      stopSmoothScroll()
    }
  }, [])

  // New page: start at the top, or at the section named in the URL.
  useLayoutEffect(() => {
    if (!hash) scrollToTarget(0, { immediate: true })
  }, [pathname, hash])

  useEffect(() => {
    if (!hash) return undefined
    const id = setTimeout(() => scrollToTarget(hash, { immediate: false }), 150)
    return () => clearTimeout(id)
  }, [pathname, hash])

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <ViewBubble />
    </>
  )
}
