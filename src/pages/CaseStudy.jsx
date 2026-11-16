import { useEffect, useLayoutEffect, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import { SplitChars, SplitWords } from '../components/Split'
import { AiBadge } from '../components/WorkGallery'
import { caseStudies } from '../data/caseStudies'
import { domainOf } from '../data/projects'
import { gsap, prefersReducedMotion, standardMotion } from '../lib/motion'

function Section({ icon, label, children, id }) {
  return (
    <section className="cs-sec" aria-labelledby={id}>
      <div className="wrap split">
        <h2 className="sec-label cs-label" id={id}><Icon name={icon} />{label}</h2>
        <div className="cs-body">{children}</div>
      </div>
    </section>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const cs = caseStudies[slug]
  const root = useRef(null)

  useEffect(() => {
    if (!cs) return undefined
    document.title = `${cs.title} case study | Raymund Hermoso`
    return () => { document.title = 'Raymund Hermoso | WordPress & Shopify Developer' }
  }, [cs])

  useLayoutEffect(() => {
    if (!cs || prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.crumb', { y: 16, opacity: 0, duration: 0.8 }, 0)
        .from('.cs-title .c', { yPercent: 118, duration: 1.2, stagger: 0.03 }, 0.1)
        .from('.cs-headline, .cs-actions', { y: 20, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, 0.5)
        .from('.cs-meta li', { y: 20, opacity: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out' }, 0.7)
      gsap.fromTo('.cs-cover', { scale: 0.88, borderRadius: '48px' }, {
        scale: 1, borderRadius: '24px', ease: 'none',
        scrollTrigger: { trigger: '.cs-cover', start: 'top bottom', end: 'top 25%', scrub: true },
      })
      standardMotion(root.current)
      gsap.utils.toArray('.cs-step, .cs-feature, .cs-shot').forEach((el) => {
        gsap.from(el, { y: 36, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
      })
    }, root)
    return () => ctx.revert()
  }, [cs])

  if (!cs) return <Navigate to="/work" replace />

  return (
    <main id="main" ref={root} className="case-page">
      <header className="page-head cs-head">
        <div className="wrap">
          <p className="crumb">
            <Link to="/"><Icon name="arrowLeft" />Home</Link><span aria-hidden="true">/</span>
            <Link to="/work">Work</Link><span aria-hidden="true">/</span>Case study
          </p>
          <div className="cs-title-row">
            <h1 className="page-title cs-title"><SplitChars text={cs.title} /></h1>
            {cs.ai && <span className="cs-ai"><AiBadge /></span>}
          </div>
          <p className="cs-headline">{cs.headline}</p>
          <div className="actions cs-actions">
            <a className="pill" href={cs.url} target="_blank" rel="noopener"><Icon name="globe" />Visit {domainOf(cs.url)}</a>
            <Link className="text-link" to="/work"><Icon name="grid" />All projects</Link>
          </div>
          <ul className="cs-meta">
            {cs.meta.map((m) => (
              <li key={m.label}>
                <span className="cs-meta-ico"><Icon name={m.icon} /></span>
                <span className="cs-meta-label">{m.label}</span>
                <strong>{m.value}</strong>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <div className="wrap">
        <figure className="cs-figure">
          <div className="cs-cover"><img src={cs.cover.src} alt={cs.cover.alt} /></div>
        </figure>
      </div>

      <Section icon="file" label="The brief" id="cs-brief">
        <p className="cs-lead" data-scrub-words><SplitWords text={cs.summary} /></p>
        {cs.brief.map((p) => <p key={p} data-reveal>{p}</p>)}
      </Section>

      <Section icon="sparkle" label="How I used AI" id="cs-ai">
        <ol className="cs-steps">
          {cs.aiSteps.map((s, i) => (
            <li className="cs-step" key={s.title}>
              <span className="cs-step-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section icon="grid" label="What shipped" id="cs-shipped">
        <ul className="cs-features">
          {cs.features.map((f) => (
            <li className="cs-feature" key={f.title}>
              <span className="fact-ico"><Icon name={f.icon} /></span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section icon="code" label="The hardest part" id="cs-hard">
        <h3 className="cs-subtitle">{cs.hardest.title}</h3>
        {cs.hardest.paragraphs.map((p) => <p key={p} data-reveal>{p}</p>)}
      </Section>

      <Section icon="globe" label="On the live site" id="cs-gallery">
        <div className="cs-gallery">
          {cs.gallery.map((g) => (
            <figure className="cs-shot" key={g.caption}>
              <div className="cs-shot-img"><img src={g.src} alt={g.alt} loading="lazy" decoding="async" style={{ objectPosition: g.position || 'center top' }} /></div>
              <figcaption>{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section icon="signal" label="Where it stands" id="cs-status">
        <p data-reveal>{cs.status}</p>
        <p className="cs-credits" data-reveal>{cs.credits}</p>
        <div className="actions" data-reveal>
          <a className="pill" href={cs.url} target="_blank" rel="noopener"><Icon name="globe" />Visit {domainOf(cs.url)}</a>
          <Link className="pill ghost-pill" to="/#contact"><Icon name="message" />Start a project</Link>
        </div>
      </Section>

      <div className="wrap"><Footer /></div>
    </main>
  )
}
