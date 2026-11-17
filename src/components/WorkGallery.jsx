import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import SectionHead from './SectionHead'
import { featuredProjects, platformLabel, projects } from '../data/projects'
import { techLogo } from '../data/tech'
import { gsap, prefersReducedMotion, standardMotion } from '../lib/motion'

const pad = (n) => String(n).padStart(2, '0')
const aiCount = projects.filter((p) => p.ai).length

export function ProjectMeta({ project }) {
  const first = project.stack ? project.stack.split(',')[0].trim() : ''
  const logo = techLogo[first] || techLogo[platformLabel[project.platform]] || null
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

const caseStudyPath = (project) => `/work/${project.caseStudy}`

/*
  Project screenshot with two actions that appear on hover or keyboard focus
  (and stay visible on touch screens): Open site, and Read case study when one
  exists. Clicking elsewhere on the image does the main action.
*/
export function ProjectMedia({ project, className, imgClassName }) {
  const cover = project.caseStudy
    ? <Link className="media-cover" to={caseStudyPath(project)} tabIndex={-1} aria-hidden="true" />
    : <a className="media-cover" href={project.url} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true" />
  return (
    <div className={`${className} has-actions`}>
      {project.ai && <AiBadge />}
      <img
        className={imgClassName}
        src={project.image}
        alt=""
        loading="lazy"
        decoding="async"
        style={project.position ? { objectPosition: project.position } : undefined}
      />
      {cover}
      <div className="media-actions">
        <a className="media-btn" href={project.url} target="_blank" rel="noopener">
          <Icon name="arrowUpRight" />{project.archived ? 'View archived site' : 'Open site'}<span className="sr-only">: {project.title}, opens in a new tab</span>
        </a>
        {project.caseStudy && (
          <Link className="media-btn media-btn-dark" to={caseStudyPath(project)}>
            <Icon name="book" />Read case study<span className="sr-only">: {project.title}</span>
          </Link>
        )}
      </div>
    </div>
  )
}

export function ProjectTitle({ project }) {
  if (!project.caseStudy) return project.title
  return (
    <>
      <Link className="title-link" to={caseStudyPath(project)}>{project.title}</Link>{' '}
      <Link className="cs-tag" to={caseStudyPath(project)} tabIndex={-1} aria-hidden="true"><Icon name="book" />Case study</Link>
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
                <ProjectMedia project={p} className="pmedia" imgClassName="shot" />
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
