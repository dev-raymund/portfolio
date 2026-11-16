import { useLayoutEffect, useRef } from 'react'
import Icon from './Icon'
import SectionHead from './SectionHead'
import { experience } from '../data/experience'
import { techLogo } from '../data/tech'
import { gsap, prefersReducedMotion, ScrollTrigger, standardMotion } from '../lib/motion'

export default function Experience() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      standardMotion(root.current)
      gsap.to('.tl-fill', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.tl', start: 'top 60%', end: 'bottom 60%', scrub: true } })
      gsap.utils.toArray('.tl-item').forEach((item) => {
        gsap.from(item.querySelectorAll('.tl-when, h3, .tl-role, .tl-desc, .tags'), {
          x: -24, opacity: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 85%' },
        })
        ScrollTrigger.create({ trigger: item, start: 'top 60%', toggleClass: { targets: item, className: 'on' } })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="sec" id="experience" ref={root} aria-labelledby="exp-title">
      <div className="wrap">
        <SectionHead icon="briefcase" label="Experience" title="Where I've worked" id="exp-title" />
        <div className="split">
          <span aria-hidden="true" />
          <div className="tl">
            <div className="tl-line" aria-hidden="true"><div className="tl-fill" /></div>
            <ol className="tl-list">
              {experience.map((job) => (
                <li className="tl-item" key={job.company}>
                  <span className="tl-dot" aria-hidden="true" />
                  <p className="tl-when"><Icon name="calendar" />{job.when}</p>
                  <h3>{job.company}</h3>
                  <p className="tl-role">{job.role}</p>
                  <p className="tl-desc">{job.summary}</p>
                  <ul className="tags" aria-label="Tools used">
                    {job.tags.map((tag) => (
                      <li key={tag}>{techLogo[tag] && <img src={techLogo[tag]} alt="" loading="lazy" />}{tag}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
