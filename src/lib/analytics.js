/*
  Google Analytics 4. Off unless VITE_GA_ID (e.g. G-XXXXXXXXXX) is set in Vercel.
  Page views are sent on every route change, since this is a single-page app.
*/
const GA_ID = import.meta.env.VITE_GA_ID || ''
let started = false

export function startAnalytics() {
  if (!GA_ID || started || typeof window === 'undefined') return
  started = true
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) } // eslint-disable-line prefer-rest-params
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { send_page_view: false })
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`
  document.head.appendChild(s)
}

export function trackPageView(path) {
  if (!GA_ID || typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'page_view', { page_path: path, page_location: window.location.href, page_title: document.title })
}

/* Key actions recruiters and clients take; show up as events in GA4. */
export function trackEvent(name, params = {}) {
  if (!GA_ID || typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, params)
}
