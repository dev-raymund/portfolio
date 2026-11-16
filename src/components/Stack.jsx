import { useLayoutEffect, useRef } from 'react'
import SectionHead from './SectionHead'
import { tech } from '../data/tech'
import { gsap, prefersReducedMotion, ScrollTrigger, standardMotion } from '../lib/motion'

const half = Math.ceil(tech.length / 2)
const ROWS = [tech.slice(0, half), tech.slice(half)]

function Row({ items, rowRef }) {
  const pills = (hidden) => (
    <div className="mq-group" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <span className="tech" key={t.name}>
          <i><img src={t.logo} alt="" loading="lazy" /></i>{t.name}
        </span>
      ))}
    </div>
  )
  return (
    <div className="mq">
      <div className="mq-track" ref={rowRef}>{pills(false)}{pills(true)}</div>
    </div>
  )
}

export default function Stack() {
  const root = useRef(null)
  const row1 = useRef(null)
  const row2 = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      standardMotion(root.current)
      // Two rows drift opposite ways; scrolling speeds them up and flips direction.
      const a = gsap.fromTo(row1.current, { xPercent: 0 }, { xPercent: -50, ease: 'none', duration: 38, repeat: -1 })
      const b = gsap.fromTo(row2.current, { xPercent: -50 }, { xPercent: 0, ease: 'none', duration: 42, repeat: -1 })
      ;[a, b].forEach((tw) => tw.totalTime(tw.duration() * 50))
      ScrollTrigger.create({
        trigger: root.current, start: 'top bottom', end: 'bottom top',
        onUpdate: (self) => {
          const dir = self.direction
          const boost = Math.min(Math.abs(self.getVelocity()) / 250, 6)
          ;[a, b].forEach((tw) => {
            gsap.to(tw, { timeScale: dir * (1 + boost), duration: 0.25, overwrite: true, onComplete: () => gsap.to(tw, { timeScale: dir, duration: 1.2 }) })
          })
        },
      })
      gsap.from('.mq', { y: 30, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 75%' } })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="stack has-ghost" id="stack" ref={root} aria-labelledby="stack-title">
      <div className="ghost" aria-hidden="true">STACK</div>
      <div className="wrap">
        <SectionHead icon="code" label="Stack" title="Tools I build with" id="stack-title" />
      </div>
      <p className="sr-only">{tech.map((t) => t.name).join(', ')}</p>
      <div aria-hidden="true">
        <Row items={ROWS[0]} rowRef={row1} />
        <Row items={ROWS[1]} rowRef={row2} />
      </div>
    </section>
  )
}
