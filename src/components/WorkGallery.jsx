import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import SectionHead from './SectionHead'
import { featuredProjects, projects } from '../data/projects'
import { techLogo } from '../data/tech'
import { gsap, prefersReducedMotion, standardMotion } from '../lib/motion'

const pad = (n) => String(n).padStart(2, '0')
const aiCount = projects.filter((p) => p.ai).length

export function ProjectMeta({ project }) {
  const logo = project.stack ? techLogo[project.stack.split(',')[0]] : null
  return (
    <p className="pmeta">
      {logo && <img className="plogo" src={logo} alt="" />}
      {project.stack || 'Website'}
    </p>
  )
}

export function AiBadge() {
  return <span className="ai-badge"><Icon name="sparkle" />Built with AI</span>
}

export function CaseStudyTag() {
  return <span className="cs-tag"><Icon name="book" />Case study</span>
}

/* Screenshot link: opens the case study when there is one, otherwise the live site. */
export function MediaLink({ project, className, children }) {
  if (project.caseStudy) {
    return (
      <Link className={className} to={`/work/${project.caseStudy}`} data-view="Read case study" tabIndex={-1} aria-hidden="true">
        {children}
      </Link>
    )
  }
  return (
    <a className={className} href={project.url} target="_blank" rel="noopener" data-view tabIndex={-1} aria-hidden="true">
      {children}
    </a>
  )
}

export function ProjectTitle({ project }) {
  if (!project.caseStudy) return project.title
  return (
    <>
      <Link className="title-link" to={`/work/${project.caseStudy}`}>{project.title}</Link> <CaseStudyTag />
    </>
  )
}

export default function WorkGallery() {
  const root = useRef(null)
  const trackRef = useRef(null)
  const scrollerRef = useRef(null)
  const nowRef = useRef(null)
  const barRef = useRef(null)

  useLayoutEffect(() => {
    const reduce = prefersReducedMotion()
    const ctx = gsap.context(() => {
      if (!reduce) {
        standardMotion(root.current)
        gsap.from('.hw-side', { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 75%' } })
        gsap.from('.panel', { y: 60, opacity: 0, duration: 1.1, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 55%' } })
      }
    }, root)

    // Desktop: pin the section and slide the track sideways while scrolling down.
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px)', () => {
      const track = trackRef.current
      const scroller = scrollerRef.current
      const panels = gsap.utils.toArray('.panel', root.current)
      const dist = () => Math.max(0, track.scrollWidth - scroller.clientWidth)
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current.querySelector('.hwork-pin'),
          pin: true,
          start: 'top top',
          end: () => `+=${dist()}`,
          scrub: reduce ? true : 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`
            if (nowRef.current) {
              const n = Math.min(featuredProjects.length, Math.round(self.progress * (panels.length - 1)) + 1)
              nowRef.current.textContent = pad(n)
            }
          },
        },
      })
      if (!reduce) {
        panels.forEach((p) => {
          const img = p.querySelector('img.shot')
          if (!img) return
          gsap.fromTo(img, { xPercent: -6 }, {
            xPercent: 6, ease: 'none',
            scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
          })
        })
      }
    }, root.current)

    // Phones: the gallery swipes natively; keep the counter in step with it.
    mm.add('(max-width: 899px)', () => {
      const scroller = scrollerRef.current
      const onScroll = () => {
        const panel = scroller.querySelector('.panel')
        if (!panel || !nowRef.current) return
        const step = panel.getBoundingClientRect().width + parseFloat(getComputedStyle(trackRef.current).columnGap || 0)
        const n = Math.min(featuredProjects.length, Math.round(scroller.scrollLeft / step) + 1)
        nowRef.current.textContent = pad(n)
      }
      scroller.addEventListener('scroll', onScroll, { passive: true })
      return () => scroller.removeEventListener('scroll', onScroll)
    })

    return () => { mm.revert(); ctx.revert() }
  }, [])

  return (
    <section className="hwork" id="work" ref={root} aria-labelledby="work-title">
      <div className="hwork-pin">
        <div className="wrap hwork-head">
          <SectionHead icon="grid" label="Selected work" title="Sites built for real businesses" id="work-title" />
          <div className="hw-side">
            <p className="hcount" aria-hidden="true"><b ref={nowRef}>01</b> / {pad(featuredProjects.length)}</p>
            <Link className="text-link" to="/work"><Icon name="globe" />All {projects.length} projects</Link>
          </div>
        </div>
        <div className="hscroll" ref={scrollerRef}>
          <div className="htrack" ref={trackRef}>
            {featuredProjects.map((p, i) => (
              <article className="panel" key={p.url}>
                <MediaLink project={p} className="pmedia">
                  {p.ai && <AiBadge />}
                  <img className="shot" src={p.image} alt="" loading="lazy" decoding="async" style={p.position ? { objectPosition: p.position } : undefined} />
                </MediaLink>
                <div className="pinfo">
                  <span className="pnum">{pad(i + 1)}</span>
                  <h3><ProjectTitle project={p} /></h3>
                  <ProjectMeta project={p} />
                  <a className="plink" href={p.url} target="_blank" rel="noopener" aria-label={`Open ${p.title} in a new tab`}><Icon name="arrowUpRight" /></a>
                </div>
              </article>
            ))}
            <article className="panel panel-all">
              <Link className="pmedia" to="/work">
                <Icon name="grid" className="all-ico" />
                <strong>See all {projects.length} projects</strong>
                <small>WordPress, Shopify, custom builds, and {aiCount} built with AI</small>
                <span className="ring"><Icon name="arrowUpRight" /></span>
              </Link>
            </article>
          </div>
        </div>
        <div className="hprogress" aria-hidden="true"><span ref={barRef} /></div>
      </div>
    </section>
  )
}
