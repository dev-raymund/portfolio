import { useEffect, useLayoutEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Work from './pages/Work'
import CaseStudy from './pages/CaseStudy'
import { scrollToTarget, ScrollTrigger, startSmoothScroll, stopSmoothScroll } from './lib/motion'
import { startAnalytics, trackEvent, trackPageView } from './lib/analytics'

export default function App() {
  const { pathname, hash } = useLocation()

  // Analytics: page views per route, plus CV downloads (any link to the PDF).
  useEffect(() => {
    startAnalytics()
    const onClick = (e) => {
      const a = e.target.closest?.('a[href$=".pdf"]')
      if (a) trackEvent('cv_download', { link_url: a.href })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => { trackPageView(pathname) }, [pathname])

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
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}
