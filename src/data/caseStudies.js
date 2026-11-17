import alexroseHome from '../assets/work/alexrose.jpg'
import alexroseDesigner from '../assets/work/case/alexrose-designer.jpg'
import alexroseCloth from '../assets/work/case/alexrose-cloth.jpg'
import alexroseHow from '../assets/work/case/alexrose-how.jpg'
import leaftHome from '../assets/work/case/leaft-hydrogen-home.jpg'
import leaftBuy from '../assets/work/case/leaft-hydrogen-buy.jpg'

/*
  One entry per case study, keyed by the URL slug (/work/<slug>).
  Link a project to its case study with `caseStudy: '<slug>'` in projects.js.

  cover:    { src, alt } for a screenshot, or { illustration: 'backoffice', caption }
  sections: rendered in order. Types:
    text      { icon, label, title?, lead?, paragraphs }
    steps     { icon, label, steps: [{ title, text }] }
    features  { icon, label, items: [{ icon, title, text }] }
    gallery   { icon, label, items: [{ src, alt, caption, position?, natural? }] }  natural: show the whole image, uncropped
    diagram   { icon, label, nodes: [{ icon, title, text }], extras: [{ icon, text }], caption? }
*/
export const caseStudies = {
  'alex-rose': {
    title: 'Alex Rose',
    url: 'https://alexrose.uk/',
    ai: true,
    headline: 'A 3D fitting room and online shop for a Leeds tailor, built with Claude Code',
    cover: { src: alexroseDesigner, alt: 'The Design Your Jacket page: cloth collections on the left, a 3D jacket preview on the right' },
    meta: [
      { icon: 'building', label: 'Client', value: 'Alex Rose Fine Tailoring, Leeds, through Agility Outsourcing' },
      { icon: 'user', label: 'My role', value: 'Developer for the theme, forms and checkout' },
      { icon: 'briefcase', label: 'Team', value: 'Me on the site; a partner developer on the 3D fitting room' },
      { icon: 'calendar', label: 'Timeline', value: 'June to September 2026' },
      { icon: 'layers', label: 'Stack', value: 'WordPress, WooCommerce, ACF Pro, Brevo' },
      { icon: 'sparkle', label: 'AI', value: 'Claude Code, from a Replit prototype' },
    ],
    sections: [
      {
        type: 'text', icon: 'file', label: 'The brief',
        lead: 'A new WordPress and WooCommerce site for a family tailor founded in 1945. Customers design a made-to-measure jacket in 3D, see it change as they choose, and check out online, with prices shown in pounds, euros or dollars.',
        paragraphs: [
          'Alex Rose had an older website that wasn’t built to sell online. The new site had to let people anywhere design a made-to-measure jacket, see it before they buy, and pay online, while still feeling like a heritage Yorkshire tailor.',
          'The centrepiece is Design Your Jacket: a virtual fitting room where you pick the cloth, lining, buttons, pockets, vents and a monogram, and the jacket updates in 3D as you go.',
        ],
      },
      {
        type: 'steps', icon: 'sparkle', label: 'How I used AI',
        steps: [
          { title: 'Prototype', text: 'The design started life as a prototype on Replit.' },
          { title: 'Extract', text: 'I pulled the finished HTML and styles out of the prototype in the browser.' },
          { title: 'Generate', text: 'Claude Code turned it into a complete custom WordPress theme: 27 page templates, the styles, the scripts and the form handlers.' },
          { title: 'Review and test', text: 'I directed it page by page, checked each result against the design, and tested every form, payment and order flow before it went live, across 65 commits in 12 weeks.' },
        ],
      },
      {
        type: 'features', icon: 'grid', label: 'What shipped',
        items: [
          { icon: 'globe', title: 'Virtual fitting room', text: 'Choose cloth, lining, buttons, pockets, vents and a monogram, and watch the jacket change in 3D.' },
          { icon: 'send', title: 'Designed jacket to checkout', text: 'The full design and a server-calculated price go into the WooCommerce cart, then straight to checkout.' },
          { icon: 'mail', title: '13 customer forms', text: 'Cloth samples, tape measure, measurements, call bookings, gift vouchers and feedback, each validated and protected from spam.' },
          { icon: 'user', title: 'Details carry through', text: 'Name, email and phone entered in the fitting room fill in later forms and checkout automatically.' },
          { icon: 'layers', title: 'Three currencies', text: 'Prices in GBP, EUR or USD, kept in sync between the site and the fitting room.' },
          { icon: 'grid', title: 'Collections and occasions', text: '8 cloth collections and 4 occasion pages, each managed from WordPress.' },
          { icon: 'arrowUpRight', title: 'Partner referral links', text: 'Short links for partners that track the visit and apply their discount code once something is in the cart.' },
          { icon: 'code', title: 'Search and AI visibility', text: 'Structured data describing the tailor, the master tailor and the jacket, for Google and AI search engines.' },
        ],
      },
      {
        type: 'text', icon: 'code', label: 'The hardest part', title: 'Turning the fitting room into a shop',
        paragraphs: [
          'The 3D fitting room was built by a partner developer on the Tailormate platform. My job was to make it part of the shop.',
          'When a customer presses Checkout, the jacket they designed goes into the WooCommerce cart as a single item, with every option attached. The price is worked out on the server from the chosen cloth, so it can’t be changed in the browser, and the full design is copied onto the order so the tailor sees exactly what was ordered.',
          'Their name and email also carry from the fitting room into checkout and the measurement forms, so nobody is asked for the same details twice.',
        ],
      },
      {
        type: 'gallery', icon: 'globe', label: 'On the live site',
        items: [
          // position: which part of the screenshot stays in frame (the first two have a thin strip at the top)
          { src: alexroseCloth, position: 'center bottom', alt: 'The Harris Tweed collection page with cloth details and the currency switcher', caption: 'Each cloth collection has its own page, with prices in the visitor’s chosen currency.' },
          { src: alexroseHow, position: 'center bottom', alt: 'The How It Works page showing step one, Choose Your Cloth, with a 3D jacket render', caption: 'How It Works walks through the five steps, from choosing a cloth to the jacket arriving.' },
          { src: alexroseHome, position: 'center top', alt: 'The Alex Rose homepage hero', caption: 'The homepage, rebuilt from the Replit prototype as a custom WordPress theme.' },
        ],
      },
      {
        type: 'text', icon: 'signal', label: 'Where it stands',
        paragraphs: ['The site is live, with the fitting room and shop open to customers. Next, I’d track how many visitors open the fitting room and where they stop before checkout, so the next round of changes is based on what people actually do.'],
      },
    ],
    credits: 'Built at Agility Outsourcing. 3D fitting room by a partner developer on the Tailormate platform.',
  },

  'leaft-blade-hydrogen': {
    title: 'Leaft Blade',
    url: 'https://web.archive.org/web/20250712191621/https://yourleaftsecret.com/',
    urlLabel: 'View the archived Hydrogen site',
    react: true,
    headline: 'Taking over a Shopify Hydrogen storefront, and knowing when to move on from it',
    cover: { src: leaftHome, alt: 'Homepage of the Leaft Blade Hydrogen storefront, as archived in July 2025' },
    meta: [
      { icon: 'building', label: 'Client', value: 'Leaft Blade (Leaft Foods), New Zealand' },
      { icon: 'user', label: 'My role', value: 'Took over the storefront and developed it on my own' },
      { icon: 'calendar', label: 'Timeline', value: '2025' },
      { icon: 'layers', label: 'Stack', value: 'Shopify Hydrogen (React, Remix), Storefront API, Oxygen hosting' },
      { icon: 'code', label: 'Type', value: 'Headless e-commerce' },
    ],
    sections: [
      {
        type: 'text', icon: 'file', label: 'The brief',
        lead: 'Leaft Blade sells a leaf-protein drink for athletes. Its store was a custom Shopify Hydrogen storefront, built in React, and I took it over as the only developer.',
        paragraphs: [
          'The work was to redesign the store, let people buy as a subscription as well as a one-off purchase, make the cart handle both, and build custom sections for the pages.',
          'In Hydrogen nothing comes from a theme or an app plug-in: every part of the store, from the product page to the cart, is React code talking to Shopify’s Storefront API.',
        ],
      },
      {
        type: 'features', icon: 'grid', label: 'What I built',
        items: [
          { icon: 'layers', title: 'Redesign', text: 'A new look across the store, built as React components.' },
          { icon: 'clock', title: 'Subscriptions', text: 'A choice between one-time purchase and Subscribe & Save, using Shopify’s subscription selling plans.' },
          { icon: 'send', title: 'Cart', text: 'Cart behaviour built in React on the Storefront API, for one-off and subscription items.' },
          { icon: 'grid', title: 'Custom sections', text: 'Reusable sections for the homepage and product story, such as the science and team blocks.' },
        ],
      },
      {
        type: 'gallery', icon: 'globe', label: 'On the Hydrogen site',
        items: [
          { src: leaftBuy, natural: true, alt: 'The buy box: 7 Sample Pack, one-time purchase or Subscribe & Save, and Add to Cart', caption: 'The buy box: pick one-time purchase or Subscribe & Save, then add to cart.' },
        ],
      },
      {
        type: 'text', icon: 'signal', label: 'Why it moved', title: 'Knowing when headless isn’t worth it',
        paragraphs: [
          'Hydrogen gave full control over design and speed, but the page sections lived in React code, so changing content meant changing code.',
          'The client wanted to manage their own content in sections, the way a Shopify theme allows, so the store moved to a standard Shopify theme. That’s the current leaftblade.com.',
          'What I took from it: a headless storefront pays off when there are developers on hand to keep building it. When the people running the store need to edit pages themselves, a theme is the better fit.',
        ],
      },
    ],
    credits: 'The code stays private to the client. Screenshots are from the Internet Archive’s July 2025 copy of the Hydrogen store.',
  },

  'ppd-back-office': {
    title: 'PPD back office',
    react: true,
    headline: 'Making a React and Laravel back office faster to work in',
    cover: { illustration: 'backoffice', caption: 'Illustration with made-up data. The real app is internal, so there are no screenshots.' },
    meta: [
      { icon: 'building', label: 'Company', value: 'PPD, part of Thermo Fisher Scientific' },
      { icon: 'user', label: 'Used by', value: 'Internal teams' },
      { icon: 'briefcase', label: 'My role', value: 'Took over the app and extended it' },
      { icon: 'calendar', label: 'Timeline', value: '2023 to 2025' },
      { icon: 'layers', label: 'Stack', value: 'React, Laravel, PHPUnit, Cypress' },
    ],
    sections: [
      {
        type: 'text', icon: 'file', label: 'The brief',
        lead: 'An internal web app where teams manage survey responses from doctors and turn them into reports and insights for the business.',
        paragraphs: [
          'I took the app over and extended it. The goal was to make the data quicker to correct, easier to narrow down, and faster to turn into reports.',
        ],
      },
      {
        type: 'features', icon: 'grid', label: 'What I built',
        items: [
          { icon: 'grid', title: 'Editable table cells', text: 'People fix a value right in the table instead of opening each record.' },
          { icon: 'layers', title: 'Filters that work', text: 'Fixed the filters so large sets of responses narrow down reliably.' },
          { icon: 'file', title: 'Report generation', text: 'Reports produced from the filtered data, ready to share.' },
          { icon: 'clock', title: 'Speed', text: 'Performance work that cut processing time by 60%.' },
        ],
      },
      {
        type: 'diagram', icon: 'code', label: 'How it fits together',
        nodes: [
          { icon: 'grid', title: 'React front end', text: 'Tables, filters and reports' },
          { icon: 'code', title: 'Laravel API', text: 'Data and report generation' },
          { icon: 'layers', title: 'Survey data', text: 'Responses from doctors' },
        ],
        extras: [
          { icon: 'check', text: 'PHPUnit tests on the Laravel side' },
          { icon: 'check', text: 'Cypress tests that click through the app like a user' },
        ],
      },
      {
        type: 'text', icon: 'check', label: 'Testing', title: 'Changing it safely',
        paragraphs: [
          'I covered the changes with PHPUnit tests on the Laravel side and Cypress tests that use the app the way a person would, so new table and filter work didn’t break the reports people relied on.',
        ],
      },
      {
        type: 'text', icon: 'signal', label: 'The result',
        paragraphs: ['Processing time dropped by 60% for the teams using it.'],
      },
    ],
    credits: 'Everything shown is a recreation with made-up data. No internal screenshots, data or code are shared.',
  },
}
