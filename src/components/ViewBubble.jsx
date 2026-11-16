import { useEffect, useRef } from 'react'
import { gsap, hasFinePointer, prefersReducedMotion } from '../lib/motion'

/* "Open site" bubble that follows the pointer over anything marked data-view. */
export default function ViewBubble() {
  const ref = useRef(null)

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return undefined
    const el = ref.current
    gsap.set(el, { scale: 0, opacity: 0 })
    const x = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3' })
    const y = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3' })
    let on = false
    const move = (e) => {
      x(e.clientX)
      y(e.clientY)
      const over = Boolean(e.target.closest?.('[data-view]'))
      if (over !== on) {
        on = over
        gsap.to(el, over ? { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)' } : { scale: 0, opacity: 0, duration: 0.3 })
      }
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return <div className="view" ref={ref} aria-hidden="true">Open site</div>
}
