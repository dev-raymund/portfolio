import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import { SplitChars } from '../components/Split'
import { ProjectMedia, ProjectMeta, ProjectTitle } from '../components/WorkGallery'
import { domainOf, projects } from '../data/projects'
import { techLogo } from '../data/tech'
import { Flip, gsap, prefersReducedMotion, ScrollTrigger } from '../lib/motion'

const FILTERS = [
  { id: 'all', label: 'All', icon: 'grid', test: () => true },
  { id: 'wordpress', label: 'WordPress', logo: techLogo.WordPress, test: (p) => p.platform === 'wordpress' },
  { id: 'shopify', label: 'Shopify', logo: techLogo.Shopify, test: (p) => p.platform === 'shopify' },
  { id: 'custom', label: 'Custom', icon: 'code', test: (p) => p.platform === 'custom' },
  { id: 'ai', label: 'Built with AI', icon: 'sparkle', test: (p) => p.ai },
]
const RESET = 'transform,translate,rotate,scale,opacity,position,top,left,width,height,margin'

export default function Work() {
  const root = useRef(null)
  const gridRef = useRef(null)
  const flipState = useRef(null)
  const flipTl = useRef(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    document.title = 'All projects | Raymund Hermoso'
    return () => { document.title = 'Raymund Hermoso | WordPress & Shopify Developer' }
  }, [])

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.crumb', { y: 16, opacity: 0, duration: 0.8 }, 0)
        .from('.page-title .c', { yPercent: 118, duration: 1.2, stagger: 0.03 }, 0.1)
        .from('.lede, .filter-bar', { y: 20, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, 0.5)
      const cards = gsap.utils.toArray('.card')
      gsap.set(cards, { y: 50, opacity: 0 })
      ScrollTrigger.batch(cards, { start: 'top 94%', once: true, onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out' }) })
    }, root)
    return () => ctx.revert()
  }, [])

  // Animate cards from where they were to where the new filter puts them.
  useLayoutEffect(() => {
    const state = flipState.current
    if (!state) return
    flipState.current = null
    const cards = gsap.utils.toArray('.card', gridRef.current)
    flipTl.current = Flip.from(state, {
      targets: cards,
      duration: 0.7, ease: 'power3.inOut', scale: true, absolute: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.6 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.7, duration: 0.5 }),
      onComplete: () => { flipTl.current = null; gsap.set(cards, { clearProps: RESET }); ScrollTrigger.refresh() },
    })
  }, [filter])

  const choose = (id) => {
    if (id === filter) return
    if (!prefersReducedMotion()) {
      const running = flipTl.current
      flipTl.current = null
      if (running) { running.progress(1); running.kill() }
      const cards = gsap.utils.toArray('.card', gridRef.current)
      gsap.killTweensOf(cards)
      gsap.set(cards, { clearProps: RESET })
      flipState.current = Flip.getState(cards)
    }
    setFilter(id)
  }

  const test = FILTERS.find((f) => f.id === filter).test

  return (
    <main id="main" ref={root} className="work-page">
      <section className="page-head">
        <div className="wrap">
          <p className="crumb"><Link to="/"><Icon name="arrowLeft" />Home</Link><span aria-hidden="true">/</span>Work</p>
          <h1 className="page-title"><SplitChars text="All projects" /></h1>
          <p className="lede">Every site I’ve shipped for clients. Filter by platform, or see the ones I built with AI.</p>
        </div>
      </section>

      <div className="filter-bar">
        <div className="wrap filters" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button key={f.id} type="button" className="chip" aria-pressed={filter === f.id} onClick={() => choose(f.id)}>
              {f.logo ? <img className="chip-logo" src={f.logo} alt="" /> : <Icon name={f.icon} />}
              {f.label}
              <span className="n">{projects.filter(f.test).length}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="wrap">
        <p className="sr-only" aria-live="polite">{projects.filter(test).length} projects shown</p>
        <div className="grid" ref={gridRef}>
          {projects.map((p) => (
            <article className="card" key={p.url} style={test(p) ? undefined : { display: 'none' }}>
              <ProjectMedia project={p} className="media" />
              <h2><ProjectTitle project={p} /></h2>
              <p className="summary">{p.summary}</p>
              <div className="card-meta">
                <ProjectMeta project={p} />
                <a className="ext" href={p.url} target="_blank" rel="noopener">{domainOf(p.url)}<Icon name="arrowUpRight" /></a>
              </div>
            </article>
          ))}
        </div>
        <Footer />
      </div>
    </main>
  )
}
