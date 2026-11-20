/*
  Google Analytics 4. Off unless VITE_GA_ID (e.g. G-XXXXXXXXXX) is set in Vercel.
  Page views (including route changes) come from GA4's enhanced measurement,
  which watches browser history, so we don't send them ourselves.
*/
const GA_ID = import.meta.env.VITE_GA_ID || ''
let started = false

export function startAnalytics() {
  if (!GA_ID || started || typeof window === 'undefined') return
  started = true
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`
  document.head.appendChild(s)
}

/* Key actions recruiters and clients take; show up as events in GA4. */
export function trackEvent(name, params = {}) {
  if (!GA_ID || typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, params)
}
