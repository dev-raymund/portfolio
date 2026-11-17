import { Fragment, useEffect, useLayoutEffect, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import BackOfficeIllustration from '../components/BackOfficeIllustration'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import { SplitChars, SplitWords } from '../components/Split'
import { AiBadge } from '../components/WorkGallery'
import { caseStudies } from '../data/caseStudies'
import { domainOf } from '../data/projects'
import { techLogo } from '../data/tech'
import { gsap, prefersReducedMotion, standardMotion } from '../lib/motion'

const ILLUSTRATIONS = { backoffice: BackOfficeIllustration }

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

function SectionContent({ s }) {
  switch (s.type) {
    case 'text':
      return (
        <>
          {s.title && <h3 className="cs-subtitle">{s.title}</h3>}
          {s.lead && <p className="cs-lead" data-scrub-words><SplitWords text={s.lead} /></p>}
          {s.paragraphs.map((p) => <p key={p} data-reveal>{p}</p>)}
        </>
      )
    case 'steps':
      return (
        <ol className="cs-steps">
          {s.steps.map((step, i) => (
            <li className="cs-step" key={step.title}>
              <span className="cs-step-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      )
    case 'features':
      return (
        <ul className="cs-features">
          {s.items.map((f) => (
            <li className="cs-feature" key={f.title}>
              <span className="fact-ico"><Icon name={f.icon} /></span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </li>
          ))}
        </ul>
      )
    case 'gallery':
      return (
        <div className="cs-gallery">
          {s.items.map((g) => (
            <figure className="cs-shot" key={g.caption}>
              <div className={g.natural ? 'cs-shot-img natural' : 'cs-shot-img'}><img src={g.src} alt={g.alt} loading="lazy" decoding="async" style={{ objectPosition: g.position || 'center top' }} /></div>
              <figcaption>{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      )
    case 'diagram':
      return (
        <figure className="cs-diagram">
          <ol className="cs-flow">
            {s.nodes.map((n, i) => (
              <Fragment key={n.title}>
                {i > 0 && <li className="cs-flow-arrow" aria-hidden="true"><Icon name="arrowRight" /></li>}
                <li className="cs-node">
                  <span className="fact-ico"><Icon name={n.icon} /></span>
                  <strong>{n.title}</strong>
                  <span>{n.text}</span>
                </li>
              </Fragment>
            ))}
          </ol>
          {s.extras && (
            <ul className="cs-extras">
              {s.extras.map((e) => <li key={e.text}><Icon name={e.icon} />{e.text}</li>)}
            </ul>
          )}
        </figure>
      )
    default:
      return null
  }
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
      gsap.utils.toArray('.cs-step, .cs-feature, .cs-shot, .cs-node, .cs-extras li').forEach((el) => {
        gsap.from(el, { y: 36, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
      })
    }, root)
    return () => ctx.revert()
  }, [cs])

  if (!cs) return <Navigate to="/work" replace />

  const Illustration = cs.cover?.illustration ? ILLUSTRATIONS[cs.cover.illustration] : null
  const visit = cs.url && (
    <a className="pill" href={cs.url} target="_blank" rel="noopener"><Icon name="globe" />{cs.urlLabel || `Visit ${domainOf(cs.url)}`}</a>
  )

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
            {cs.react && <span className="cs-ai"><span className="ai-badge"><img className="badge-logo" src={techLogo.React} alt="" />React</span></span>}
          </div>
          <p className="cs-headline">{cs.headline}</p>
          <div className="actions cs-actions">
            {visit}
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

      {cs.cover && (
        <div className="wrap">
          <figure className="cs-figure">
            <div className="cs-cover">
              {Illustration ? <Illustration /> : <img src={cs.cover.src} alt={cs.cover.alt} />}
            </div>
            {cs.cover.caption && <figcaption className="cs-cover-cap">{cs.cover.caption}</figcaption>}
          </figure>
        </div>
      )}

      {cs.sections.map((s, i) => (
        <Section key={s.label} icon={s.icon} label={s.label} id={`cs-sec-${i}`}>
          <SectionContent s={s} />
        </Section>
      ))}

      <section className="cs-sec cs-end">
        <div className="wrap split">
          <span aria-hidden="true" />
          <div className="cs-body">
            <p className="cs-credits" data-reveal>{cs.credits}</p>
            <div className="actions" data-reveal>
              {visit}
              <Link className={cs.url ? 'pill ghost-pill' : 'pill'} to="/#contact"><Icon name="message" />Start a project</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap"><Footer /></div>
    </main>
  )
}
