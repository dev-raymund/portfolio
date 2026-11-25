import { Fragment, useEffect, useLayoutEffect, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import { SplitChars } from '../components/Split'
import { DEFAULT_TITLE } from '../data/seo'
import { postBySlug, posts } from '../data/posts'
import { gsap, prefersReducedMotion, standardMotion } from '../lib/motion'

const fmtDate = (iso) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
const words = (post) => post.body.reduce((n, b) => n + [b.p, b.h, ...(b.list || [])].filter(Boolean).join(' ').split(/\s+/).length, 0)
const readMins = (post) => Math.max(1, Math.round(words(post) / 220))

/* Paragraph text with `code` spans. */
function Rich({ text }) {
  return text.split(/(`[^`]+`)/).map((part, i) => (
    part.startsWith('`') ? <code key={i}>{part.slice(1, -1)}</code> : <Fragment key={i}>{part}</Fragment>
  ))
}

function useIntro(root, dep) {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.crumb', { y: 16, opacity: 0, duration: 0.8 }, 0)
        .from('.page-title .c', { yPercent: 118, duration: 1.2, stagger: 0.02 }, 0.1)
        .from('.lede, .post-meta, .post-card', { y: 20, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' }, 0.45)
      standardMotion(root.current)
    }, root)
    return () => ctx.revert()
  }, [root, dep])
}

export function BlogIndex() {
  const root = useRef(null)
  useEffect(() => {
    document.title = 'Blog | Raymund Hermoso, Web Developer'
    return () => { document.title = DEFAULT_TITLE }
  }, [])
  useIntro(root, 'index')

  return (
    <main id="main" ref={root} className="blog-page">
      <section className="page-head">
        <div className="wrap">
          <p className="crumb"><Link to="/"><Icon name="arrowLeft" />Home</Link><span aria-hidden="true">/</span>Blog</p>
          <h1 className="page-title"><SplitChars text="Notes from the work" /></h1>
          <p className="lede">What I learn building WordPress, Shopify and React sites, and building them with AI.</p>
        </div>
      </section>
      <div className="wrap">
        <ul className="post-list">
          {posts.map((p) => (
            <li className="post-card" key={p.slug}>
              <Link to={`/blog/${p.slug}`}>
                <p className="post-card-meta"><time dateTime={p.date}>{fmtDate(p.date)}</time><span aria-hidden="true">·</span>{readMins(p)} min read</p>
                <h2>{p.title}</h2>
                <p className="post-card-desc">{p.description}</p>
                <span className="post-card-more">Read the post<Icon name="arrowRight" /></span>
              </Link>
            </li>
          ))}
        </ul>
        <Footer />
      </div>
    </main>
  )
}

export function BlogPost() {
  const { slug } = useParams()
  const post = postBySlug[slug]
  const root = useRef(null)

  useEffect(() => {
    if (!post) return undefined
    document.title = `${post.title} | Raymund Hermoso`
    return () => { document.title = DEFAULT_TITLE }
  }, [post])
  useIntro(root, slug)

  if (!post) return <Navigate to="/blog" replace />
  const others = posts.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <main id="main" ref={root} className="blog-page">
      <article>
        <header className="page-head post-head">
          <div className="wrap">
            <p className="crumb">
              <Link to="/"><Icon name="arrowLeft" />Home</Link><span aria-hidden="true">/</span>
              <Link to="/blog">Blog</Link>
            </p>
            <h1 className="page-title post-title"><SplitChars text={post.title} /></h1>
            <p className="post-meta">
              <span><Icon name="calendar" /><time dateTime={post.date}>{fmtDate(post.date)}</time></span>
              <span><Icon name="clock" />{readMins(post)} min read</span>
              <span><Icon name="user" />{'Raymund Hermoso'}</span>
            </p>
          </div>
        </header>

        <div className="wrap">
          <div className="post-body">
            {post.body.map((b, i) => {
              if (b.h) return <h2 key={i} data-reveal>{b.h}</h2>
              if (b.list) return <ul key={i} data-reveal>{b.list.map((li) => <li key={li}><Rich text={li} /></li>)}</ul>
              return <p key={i} data-reveal><Rich text={b.p} /></p>
            })}

            {post.project && (
              <aside className="post-project" data-reveal>
                <span className="fact-ico"><Icon name="book" /></span>
                <div>
                  <p>This post is about <strong>{post.project.title}</strong>.</p>
                  <div className="actions">
                    {post.project.caseStudy && <Link className="pill" to={`/work/${post.project.caseStudy}`}><Icon name="file" />Read the case study</Link>}
                    {post.project.url && <a className={post.project.caseStudy ? 'pill ghost-pill' : 'pill'} href={post.project.url} target="_blank" rel="noopener"><Icon name="globe" />Visit the site</a>}
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </article>

      <div className="wrap">
        {others.length > 0 && (
          <section className="post-more" aria-labelledby="more-posts">
            <h2 className="sec-label" id="more-posts"><Icon name="book" />More posts</h2>
            <ul className="post-list">
              {others.map((p) => (
                <li className="post-card" key={p.slug}>
                  <Link to={`/blog/${p.slug}`}>
                    <h3>{p.title}</h3>
                    <p className="post-card-desc">{p.description}</p>
                    <span className="post-card-more">Read the post<Icon name="arrowRight" /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        <Footer />
      </div>
    </main>
  )
}
