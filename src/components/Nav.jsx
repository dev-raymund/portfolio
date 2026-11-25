import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Icon from './Icon'
import Logo from './Logo'
import { profile } from '../data/profile'
import { getLenis, scrollToTarget } from '../lib/motion'

const LINKS = [
  { id: 'about', label: 'About', icon: 'user' },
  { id: 'work', label: 'Work', icon: 'grid' },
  { id: 'stack', label: 'Stack', icon: 'layers' },
  { id: 'experience', label: 'Experience', icon: 'briefcase' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
]

const THEME_COLOR = { light: '#D2D5DC', dark: '#141518' }

export default function Nav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState('')
  const [theme, setTheme] = useState(() => (typeof document !== 'undefined' && document.documentElement.dataset.theme) || 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('rh-theme', theme) } catch { /* storage unavailable */ }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
  }, [theme])

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > 40)
      if (y > last + 4 && y > 400) setHidden(true)
      else if (y < last - 4) setHidden(false)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (pathname !== '/') {
      setActive(pathname.startsWith('/work') ? 'work' : '')
      return undefined
    }
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-50% 0px -50% 0px' })
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [pathname])

  useEffect(() => {
    const lenis = getLenis()
    if (open) { lenis?.stop(); document.body.style.overflow = 'hidden' }
    else { lenis?.start(); document.body.style.overflow = '' }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (e, id) => {
    e.preventDefault()
    const wasOpen = open
    setOpen(false)
    if (pathname === '/') {
      // Let the menu release the page before measuring where to scroll.
      setTimeout(() => scrollToTarget(`#${id}`), wasOpen ? 60 : 0)
      window.history.replaceState(null, '', `#${id}`)
    } else {
      navigate(`/#${id}`)
    }
  }

  const toTop = (e) => {
    if (pathname === '/') {
      e.preventDefault()
      setOpen(false)
      scrollToTarget(0)
      window.history.replaceState(null, '', '/')
    }
  }

  const cls = ['nav', solid && 'solid', hidden && !open && 'hide', open && 'menu-open'].filter(Boolean).join(' ')

  return (
    <>
      <header className={cls}>
        <Link className="brand" to="/" onClick={toTop} aria-label={`${profile.name}, home`}>
          <Logo />
          <span className="brand-name">{profile.name}</span>
        </Link>
        <nav className="links" aria-label="Main">
          {LINKS.map((l) => (
            <a key={l.id} href={`/#${l.id}`} className={active === l.id ? 'active' : undefined} onClick={(e) => go(e, l.id)}>{l.label}</a>
          ))}
          <Link to="/blog" className={pathname.startsWith('/blog') ? 'active' : undefined}>Blog</Link>
        </nav>
        <div className="tools">
          <button
            className="icon-btn"
            type="button"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          <a className="pill nav-cv" href={profile.cv} target="_blank" rel="noopener">
            <Icon name="download" /><span className="long">Download CV</span><span className="short">CV</span>
          </a>
          <button
            className="icon-btn menu-btn"
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </header>

      <div className={`menu${open ? ' open' : ''}`} id="site-menu" aria-hidden={!open} inert={!open ? '' : undefined}>
        <nav aria-label="Menu">
          {LINKS.map((l, i) => (
            <a key={l.id} href={`/#${l.id}`} className="menu-link" style={{ '--i': i }} onClick={(e) => go(e, l.id)}>
              <Icon name={l.icon} />{l.label}
            </a>
          ))}
          <Link to="/work" className="menu-link" style={{ '--i': LINKS.length }} onClick={() => setOpen(false)}>
            <Icon name="globe" />All projects
          </Link>
          <Link to="/blog" className="menu-link" style={{ '--i': LINKS.length + 1 }} onClick={() => setOpen(false)}>
            <Icon name="book" />Blog
          </Link>
        </nav>
        <div className="menu-foot">
          <a className="pill" href={profile.cv} target="_blank" rel="noopener"><Icon name="download" />Download CV</a>
          <a className="pill ghost-pill" href={`mailto:${profile.email}`}><Icon name="mail" />Email me</a>
        </div>
      </div>
    </>
  )
}
