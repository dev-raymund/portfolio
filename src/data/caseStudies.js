import alexroseHome from '../assets/work/alexrose.jpg'
import alexroseDesigner from '../assets/work/case/alexrose-designer.jpg'
import alexroseCloth from '../assets/work/case/alexrose-cloth.jpg'
import alexroseHow from '../assets/work/case/alexrose-how.jpg'

/*
  One entry per case study, keyed by the URL slug (/work/<slug>).
  Link a project to its case study with `caseStudy: '<slug>'` in projects.js.
*/
export const caseStudies = {
  'alex-rose': {
    title: 'Alex Rose',
    url: 'https://alexrose.uk/',
    ai: true,
    headline: 'A 3D fitting room and online shop for a Leeds tailor, built with Claude Code',
    summary:
      'A new WordPress and WooCommerce site for a family tailor founded in 1945. Customers design a made-to-measure jacket in 3D, see it change as they choose, and check out online, with prices shown in pounds, euros or dollars.',
    cover: { src: alexroseDesigner, alt: 'The Design Your Jacket page: cloth collections on the left, a 3D jacket preview on the right' },
    meta: [
      { icon: 'building', label: 'Client', value: 'Alex Rose Fine Tailoring, Leeds, through Agility Outsourcing' },
      { icon: 'user', label: 'My role', value: 'Developer for the theme, forms and checkout' },
      { icon: 'briefcase', label: 'Team', value: 'Me on the site; a partner developer on the 3D fitting room' },
      { icon: 'calendar', label: 'Timeline', value: 'June to September 2026' },
      { icon: 'layers', label: 'Stack', value: 'WordPress, WooCommerce, ACF Pro, Brevo' },
      { icon: 'sparkle', label: 'AI', value: 'Claude Code, from a Replit prototype' },
    ],
    brief: [
      'Alex Rose had an older website that wasn’t built to sell online. The new site had to let people anywhere design a made-to-measure jacket, see it before they buy, and pay online, while still feeling like a heritage Yorkshire tailor.',
      'The centrepiece is Design Your Jacket: a virtual fitting room where you pick the cloth, lining, buttons, pockets, vents and a monogram, and the jacket updates in 3D as you go.',
    ],
    aiSteps: [
      { title: 'Prototype', text: 'The design started life as a prototype on Replit.' },
      { title: 'Extract', text: 'I pulled the finished HTML and styles out of the prototype in the browser.' },
      { title: 'Generate', text: 'Claude Code turned it into a complete custom WordPress theme: 27 page templates, the styles, the scripts and the form handlers.' },
      { title: 'Review and test', text: 'I directed it page by page, checked each result against the design, and tested every form, payment and order flow before it went live, across 65 commits in 12 weeks.' },
    ],
    features: [
      { icon: 'globe', title: 'Virtual fitting room', text: 'Choose cloth, lining, buttons, pockets, vents and a monogram, and watch the jacket change in 3D.' },
      { icon: 'send', title: 'Designed jacket to checkout', text: 'The full design and a server-calculated price go into the WooCommerce cart, then straight to checkout.' },
      { icon: 'mail', title: '13 customer forms', text: 'Cloth samples, tape measure, measurements, call bookings, gift vouchers and feedback, each validated and protected from spam.' },
      { icon: 'user', title: 'Details carry through', text: 'Name, email and phone entered in the fitting room fill in later forms and checkout automatically.' },
      { icon: 'layers', title: 'Three currencies', text: 'Prices in GBP, EUR or USD, kept in sync between the site and the fitting room.' },
      { icon: 'grid', title: 'Collections and occasions', text: '8 cloth collections and 4 occasion pages, each managed from WordPress.' },
      { icon: 'arrowUpRight', title: 'Partner referral links', text: 'Short links for partners that track the visit and apply their discount code once something is in the cart.' },
      { icon: 'code', title: 'Search and AI visibility', text: 'Structured data describing the tailor, the master tailor and the jacket, for Google and AI search engines.' },
    ],
    hardest: {
      title: 'Turning the fitting room into a shop',
      paragraphs: [
        'The 3D fitting room was built by a partner developer on the Tailormate platform. My job was to make it part of the shop.',
        'When a customer presses Checkout, the jacket they designed goes into the WooCommerce cart as a single item, with every option attached. The price is worked out on the server from the chosen cloth, so it can’t be changed in the browser, and the full design is copied onto the order so the tailor sees exactly what was ordered.',
        'Their name and email also carry from the fitting room into checkout and the measurement forms, so nobody is asked for the same details twice.',
      ],
    },
    gallery: [
      // position: which part of the screenshot stays in frame (the first two have a thin strip at the top)
      { src: alexroseCloth, position: 'center bottom', alt: 'The Harris Tweed collection page with cloth details and the currency switcher', caption: 'Each cloth collection has its own page, with prices in the visitor’s chosen currency.' },
      { src: alexroseHow, position: 'center bottom', alt: 'The How It Works page showing step one, Choose Your Cloth, with a 3D jacket render', caption: 'How It Works walks through the five steps, from choosing a cloth to the jacket arriving.' },
      { src: alexroseHome, position: 'center top', alt: 'The Alex Rose homepage hero', caption: 'The homepage, rebuilt from the Replit prototype as a custom WordPress theme.' },
    ],
    status:
      'The site is live, with the fitting room and shop open to customers. Next, I’d track how many visitors open the fitting room and where they stop before checkout, so the next round of changes is based on what people actually do.',
    credits: 'Built at Agility Outsourcing. 3D fitting room by a partner developer on the Tailormate platform.',
  },
}
