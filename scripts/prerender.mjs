/*
  Pre-builds every page as real HTML after `vite build`, so search engines and
  link previews (LinkedIn, Slack, etc.) see full content and page-specific
  titles, descriptions, images and structured data.

  Also writes sitemap.xml. Optional env var:
    GOOGLE_SITE_VERIFICATION  value of Search Console's HTML-tag verification
*/
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Animation hooks don't run in a server render; that's expected here, since the
// browser renders the app again. Hide React's warning about it.
const consoleError = console.error
console.error = (msg, ...rest) => {
  if (typeof msg === 'string' && msg.includes('useLayoutEffect does nothing on the server')) return
  consoleError(msg, ...rest)
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const { render, getRoutes, SITE } = await import(path.join(root, 'dist-ssr', 'entry-server.js'))

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const verification = process.env.GOOGLE_SITE_VERIFICATION?.trim()

function head(route) {
  const url = route.path === '/' ? `${SITE}/` : `${SITE}${route.path}`
  return [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${route.type || 'website'}" />`,
    `<meta property="og:site_name" content="Raymund Hermoso" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${esc(route.image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
    `<meta name="twitter:image" content="${esc(route.image)}" />`,
    verification ? `<meta name="google-site-verification" content="${esc(verification)}" />` : '',
    `<script type="application/ld+json">${JSON.stringify(route.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ].filter(Boolean).join('\n    ')
}

const START = '<!--seo:start-->'
const END = '<!--seo:end-->'
if (!template.includes(START) || !template.includes(END)) throw new Error('index.html is missing the <!--seo:start--> / <!--seo:end--> markers')

const routes = getRoutes()
for (const route of routes) {
  const body = render(route.path)
  const html = template
    .replace(new RegExp(`${START}[\\s\\S]*?${END}`), `${START}\n    ${head(route)}\n    ${END}`)
    .replace('<div id="root"></div>', `<div id="root"><div data-prerender>${body}</div></div>`)
  const file = route.path === '/' ? path.join(dist, 'index.html') : path.join(dist, route.path, 'index.html')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html)
  console.log(`prerendered ${route.path} (${Math.round(html.length / 1024)} kB)`)
}

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${r.path === '/' ? `${SITE}/` : `${SITE}${r.path}`}</loc><lastmod>${today}</lastmod><priority>${r.path === '/' ? '1.0' : r.path === '/work' ? '0.8' : '0.7'}</priority></url>`).join('\n')}
</urlset>
`
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)
console.log(`sitemap.xml with ${routes.length} URLs${verification ? ', Search Console verification tag added' : ''}`)
