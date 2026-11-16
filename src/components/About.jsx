import { useLayoutEffect, useRef } from 'react'
import Icon from './Icon'
import SectionHead from './SectionHead'
import { SplitWords } from './Split'
import { profile } from '../data/profile'
import { gsap, prefersReducedMotion, standardMotion } from '../lib/motion'

export default function About() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      standardMotion(root.current)
      gsap.from('.fact', { y: 36, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.facts', start: 'top 85%' } })
    }, root)
    return () => ctx.revert()
  }, [])

  const glow = (e) => {
    const card = e.currentTarget
    const r = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - r.left}px`)
    card.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const [lead, ...rest] = profile.about

  return (
    <section className="sec has-ghost" id="about" ref={root} aria-labelledby="about-title">
      <div className="ghost" aria-hidden="true">ABOUT ME</div>
      <div className="wrap">
        <SectionHead icon="user" label="About me" title={profile.aboutTitle} id="about-title" />
        <div className="split">
          <span aria-hidden="true" />
          <div className="about-grid">
            <div className="about-text">
              <p className="about-lead" data-scrub-words><SplitWords text={lead} /></p>
              {rest.map((text) => <p key={text} data-scrub-words><SplitWords text={text} /></p>)}
            </div>
            <ul className="facts">
              {profile.facts.map((f) => (
                <li className="fact" key={f.label} onPointerMove={glow}>
                  <span className="fact-ico"><Icon name={f.icon} /></span>
                  <span className="fact-label">{f.label}</span>
                  <strong>{f.value}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
