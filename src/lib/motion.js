import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, Flip)

export { gsap, ScrollTrigger, Flip }

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

let lenis = null
let tick = null

export function startSmoothScroll() {
  if (lenis || prefersReducedMotion()) return lenis
  lenis = new Lenis({ lerp: 0.09 })
  lenis.on('scroll', ScrollTrigger.update)
  tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function stopSmoothScroll() {
  if (!lenis) return
  gsap.ticker.remove(tick)
  lenis.destroy()
  lenis = null
  tick = null
}

export const getLenis = () => lenis

/* Scroll to 0, a selector or an element, smoothly unless motion is reduced. */
export function scrollToTarget(target, { offset = -10, immediate = false } = {}) {
  const toTop = target === 0
  const el = toTop ? null : typeof target === 'string' ? document.querySelector(target) : target
  if (!toTop && !el) return false
  const instant = immediate || prefersReducedMotion()
  if (lenis) {
    if (lenis.isStopped) lenis.start()
    // Measure from the real scroll position so a stale smooth-scroll value can't skew the target.
    const top = toTop ? 0 : Math.max(0, el.getBoundingClientRect().top + window.scrollY + offset)
    lenis.scrollTo(top, { duration: 1.5, immediate: instant, force: true })
  } else if (toTop) {
    window.scrollTo({ top: 0, behavior: instant ? 'auto' : 'smooth' })
  } else {
    el.scrollIntoView({ behavior: instant ? 'auto' : 'smooth' })
  }
  return true
}

/*
  Shared scroll effects. Call inside gsap.context() with a section root.
  [data-scrub-chars]  letters fill in as you scroll (needs SplitChars plain)
  [data-scrub-words]  words fill in as you scroll (needs SplitWords)
  [data-reveal]       rises in once
  .ghost              big outlined word drifts sideways
*/
export function standardMotion(root) {
  root.querySelectorAll('[data-scrub-chars]').forEach((el) => {
    gsap.fromTo(el.querySelectorAll('.sc'), { opacity: 0.12 }, {
      opacity: 1, stagger: 0.05, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 55%', scrub: true },
    })
  })
  root.querySelectorAll('[data-scrub-words]').forEach((el) => {
    gsap.fromTo(el.querySelectorAll('.sw'), { opacity: 0.15 }, {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 86%', end: 'bottom 58%', scrub: true },
    })
  })
  root.querySelectorAll('[data-reveal]').forEach((el) => {
    gsap.from(el, { y: 28, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
  })
  root.querySelectorAll('.ghost').forEach((g) => {
    gsap.fromTo(g, { xPercent: 6 }, {
      xPercent: -24, ease: 'none',
      scrollTrigger: { trigger: g.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    })
  })
}
