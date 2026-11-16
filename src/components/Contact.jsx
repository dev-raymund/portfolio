import { useLayoutEffect, useRef, useState } from 'react'
import ContactForm from './ContactForm'
import Footer from './Footer'
import Icon from './Icon'
import { SplitChars } from './Split'
import { profile } from '../data/profile'
import { gsap, prefersReducedMotion } from '../lib/motion'

const LINKS = [
  { label: 'Email', icon: 'mail', href: `mailto:${profile.email}` },
  { label: 'LinkedIn', icon: 'linkedin', href: profile.linkedin, external: true },
  { label: 'GitHub', icon: 'github', href: profile.github, external: true },
  { label: 'Download CV', icon: 'file', href: profile.cv, external: true },
]

export default function Contact() {
  const root = useRef(null)
  const [copied, setCopied] = useState(false)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.from('.contact-title .c', { yPercent: 118, duration: 1.2, stagger: 0.022, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 72%' } })
      gsap.from('.contact-sub, .icon-row, .email-line, .form-card', { y: 28, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 62%' } })
    }, root)
    return () => ctx.revert()
  }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section className="contact" id="contact" ref={root} aria-labelledby="contact-title">
      <div className="wrap">
        <div className="contact-grid">
          <div className="contact-intro">
            <span className="sec-label"><Icon name="mail" />Contact</span>
            <h2 className="contact-title" id="contact-title"><SplitChars text="Let's work together" /></h2>
            <p className="contact-sub">Have a project, or a role you’re hiring for? Send a message here, or reach me directly.</p>
            <ul className="icon-row">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a className="icon-link" href={l.href} aria-label={l.label} {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}>
                    <Icon name={l.icon} />
                    <span className="tip" aria-hidden="true">{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="email-line">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button className="copy-btn" type="button" onClick={copy}>
                <Icon name={copied ? 'check' : 'copy'} />{copied ? 'Copied' : 'Copy'}
              </button>
              <span className="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
            </div>
          </div>
          <ContactForm />
        </div>
        <Footer />
      </div>
    </section>
  )
}
