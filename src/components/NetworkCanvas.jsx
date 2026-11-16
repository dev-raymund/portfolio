import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/motion'

const readColor = () => getComputedStyle(document.documentElement).getPropertyValue('--net').trim() || '20, 21, 25'

/* Drifting connected dots that reach toward the pointer. */
export default function NetworkCanvas({ hostRef }) {
  const ref = useRef(null)

  useEffect(() => {
    const cv = ref.current
    const host = hostRef.current
    if (!cv || !host) return undefined
    const ctx = cv.getContext('2d')
    const reduce = prefersReducedMotion()
    const mouse = { x: -9999, y: -9999 }
    let W = 0
    let H = 0
    let pts = []
    let raf = 0
    let visible = true
    let alive = true
    let rgb = readColor()

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = cv.clientWidth
      H = cv.clientHeight
      cv.width = W * dpr
      cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.min(110, Math.round((W * H) / 13500))
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.3 + 0.7,
      }))
    }

    const draw = (move) => {
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < pts.length; i += 1) {
        const a = pts[i]
        if (move) {
          a.x += a.vx
          a.y += a.vy
          if (a.x < 0 || a.x > W) a.vx *= -1
          if (a.y < 0 || a.y > H) a.vy *= -1
          const mx = mouse.x - a.x
          const my = mouse.y - a.y
          if (mx * mx + my * my < 30000) { a.x += mx * 0.003; a.y += my * 0.003 }
        }
        for (let j = i + 1; j < pts.length; j += 1) {
          const b = pts[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = dx * dx + dy * dy
          if (d < 13000) {
            ctx.strokeStyle = `rgba(${rgb},${((1 - d / 13000) * 0.16).toFixed(3)})`
            ctx.lineWidth = 1
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
        const ex = a.x - mouse.x
        const ey = a.y - mouse.y
        const e2 = ex * ex + ey * ey
        if (e2 < 26000) {
          ctx.strokeStyle = `rgba(${rgb},${((1 - e2 / 26000) * 0.45).toFixed(3)})`
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
        }
        ctx.fillStyle = `rgba(${rgb},.4)`
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill()
      }
    }

    const loop = () => {
      if (!alive) return
      draw(true)
      raf = visible ? requestAnimationFrame(loop) : 0
    }

    const onMove = (e) => {
      const r = cv.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    size()
    const ro = new ResizeObserver(() => { size(); if (reduce) draw(false) })
    ro.observe(cv)
    const mo = new MutationObserver(() => { rgb = readColor(); if (reduce) draw(false) })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)

    let io = null
    if (reduce) {
      draw(false)
    } else {
      io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
        if (visible && !raf) loop()
      })
      io.observe(host)
      loop()
    }

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      mo.disconnect()
      io?.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [hostRef])

  return <canvas ref={ref} className="net" aria-hidden="true" />
}
