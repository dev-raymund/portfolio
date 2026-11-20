import { caseStudies } from './caseStudies'
import { profile } from './profile'
import { projects } from './projects'
import { tech } from './tech'

export const SITE = 'https://raymund-hermoso.vercel.app'
export const DEFAULT_TITLE = 'Raymund Hermoso | WordPress, Shopify & React Developer in the Philippines'
const abs = (path) => (path.startsWith('http') ? path : `${SITE}${path}`)

const person = {
  '@type': 'Person',
  '@id': `${SITE}/#person`,
  name: profile.name,
  jobTitle: 'Web Developer',
  description: 'Web developer specialising in WordPress, Shopify and React, with 6+ years of experience building sites for businesses in Australia, New Zealand and the UK.',
  url: `${SITE}/`,
  image: `${SITE}/og.jpg`,
  email: `mailto:${profile.email}`,
  sameAs: [profile.linkedin, profile.github],
  address: { '@type': 'PostalAddress', addressCountry: 'PH' },
  knowsAbout: ['WordPress', 'WooCommerce', 'Shopify', 'Shopify Hydrogen', 'React', 'Laravel', 'Statamic', 'PHP', 'JavaScript', 'SEO', 'AI-assisted development'],
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'State University of Northern Negros' },
}

const website = { '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: profile.name, inLanguage: 'en' }

/*
  Every page that gets pre-built as HTML, with its own title, description,
  social preview image and structured data (JSON-LD).
*/
export function getRoutes() {
  const home = {
    path: '/',
    title: DEFAULT_TITLE,
    description: 'Raymund Hermoso is a web developer in the Philippines with 6+ years building WordPress, Shopify and React sites for businesses in Australia, New Zealand and the UK. Open to remote roles.',
    image: `${SITE}/og.jpg`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        website,
        { '@type': 'ProfilePage', '@id': `${SITE}/#profile`, url: `${SITE}/`, name: DEFAULT_TITLE, isPartOf: { '@id': website['@id'] }, mainEntity: person },
      ],
    },
  }

  const work = {
    path: '/work',
    title: 'Projects | Raymund Hermoso, WordPress, Shopify & React Developer',
    description: `${projects.length} WordPress, Shopify and React projects by Raymund Hermoso, including case studies and sites built with AI.`,
    image: `${SITE}/og.jpg`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      url: `${SITE}/work`,
      name: 'Projects by Raymund Hermoso',
      isPartOf: { '@id': website['@id'] },
      author: { '@id': person['@id'] },
      hasPart: Object.keys(caseStudies).map((slug) => ({ '@type': 'Article', url: `${SITE}/work/${slug}`, headline: caseStudies[slug].headline })),
    },
  }

  const cases = Object.entries(caseStudies).map(([slug, cs]) => {
    const image = cs.cover?.src ? abs(cs.cover.src) : `${SITE}/og.jpg`
    return {
      path: `/work/${slug}`,
      title: `${cs.title} case study | Raymund Hermoso`,
      description: cs.headline,
      image,
      type: 'article',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: cs.headline,
        name: `${cs.title} case study`,
        url: `${SITE}/work/${slug}`,
        image,
        author: person,
        publisher: { '@id': person['@id'] },
        about: cs.meta.find((m) => m.label === 'Stack')?.value,
        isPartOf: { '@id': website['@id'] },
      },
    }
  })

  return [home, work, ...cases]
}

export const techNames = tech.map((t) => t.name)
