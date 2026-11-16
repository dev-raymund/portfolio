import { useLayoutEffect, useRef } from 'react'
import Icon from './Icon'
import Mosaic from './Mosaic'
import NetworkCanvas from './NetworkCanvas'
import { SplitChars } from './Split'
import { profile } from '../data/profile'
import { useScramble } from '../lib/useScramble'
import { gsap, hasFinePointer, prefersReducedMotion, scrollToTarget } from '../lib/motion'

export default function Hero() {
  const root = useRef(null)
  const roleRef = useRef(null)
  useScramble(roleRef, profile.roles)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    let onMove = null
    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray('.tile')
      const intro = gsap.timeline({ defaults: { ease: 'expo.out' } })
      intro.from('.net', { opacity: 0, duration: 2 }, 0)
      tiles.forEach((t, i) => {
        intro.from(t, {
          x: gsap.utils.random(-150, 150), y: gsap.utils.random(-190, 190), rotation: gsap.utils.random(-14, 14),
          scale: 0.6, opacity: 0, duration: 1.6,
        }, 0.15 + i * 0.07)
      })
      intro
        .from('.hello', { y: 16, opacity: 0, duration: 0.8 }, 0.3)
        .from('.name .c', { yPercent: 118, duration: 1.2, stagger: 0.025 }, 0.4)
        .from('.role, .intro, .actions', { y: 24, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, 0.9)
        .from('.badge-open', { scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(2.2)' }, 1.4)
        .add(() => {
          if (!hasFinePointer()) return
          const q = tiles.map((t) => ({
            x: gsap.quickTo(t, 'x', { duration: 1, ease: 'power3.out' }),
            y: gsap.quickTo(t, 'y', { duration: 1, ease: 'power3.out' }),
            d: gsap.utils.random(0.3, 1.2),
          }))
          onMove = (e) => {
            const nx = e.clientX / window.innerWidth - 0.5
            const ny = e.clientY / window.innerHeight - 0.5
            q.forEach((o) => { o.x(nx * o.d * 20); o.y(ny * o.d * 20) })
          }
          window.addEventListener('pointermove', onMove)
        })

      // Scrolling away: tiles drift apart and the text eases up.
      const away = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      tiles.forEach((t) => gsap.to(t, { yPercent: gsap.utils.random(-45, 25), ease: 'none', scrollTrigger: away }))
      gsap.to('.hero-copy', { yPercent: -16, opacity: 0.2, ease: 'none', scrollTrigger: away })
    }, root)

    return () => {
      if (onMove) window.removeEventListener('pointermove', onMove)
      ctx.revert()
    }
  }, [])

  const jump = (e, id) => {
    e.preventDefault()
    scrollToTarget(`#${id}`)
  }

  return (
    <section className="hero" id="top" ref={root}>
      <NetworkCanvas hostRef={root} />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hello">Hi, I’m</p>
          <h1 className="name"><SplitChars text={profile.name} /></h1>
          <p className="role">
            <span className="sr-only">{profile.roles.join(', ')}</span>
            <span ref={roleRef} aria-hidden="true" />
          </p>
          <p className="intro">{profile.intro}</p>
          <div className="actions">
            <a className="pill" href="#work" onClick={(e) => jump(e, 'work')}><Icon name="grid" />See my work</a>
            <a className="text-link" href="#contact" onClick={(e) => jump(e, 'contact')}><Icon name="message" />Get in touch</a>
          </div>
        </div>
        <Mosaic src={profile.photo} alt={`Photo of ${profile.name}`}>
          <div className="badge-open"><span className="pulse" aria-hidden="true" />Open to new work</div>
        </Mosaic>
      </div>
    </section>
  )
}
