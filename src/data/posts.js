/*
  Blog posts, newest first. Each body is a list of blocks:
    { p: 'text' }            paragraph (wrap code in `backticks`)
    { h: 'text' }            subheading
    { list: ['a', 'b'] }     bullet list
  image is the featured image: a screenshot of the project the post is about.
  Add a post here and it gets its own page, sitemap entry and structured data.
*/
import proluxImg from '../assets/work/proluxpainting.jpg'
import alexroseImg from '../assets/work/case/alexrose-designer.jpg'
import leaftImg from '../assets/work/case/leaft-hydrogen-home.jpg'

export const posts = [
  {
    slug: 'vibe-coded-html-to-working-website',
    title: 'Taking a vibe-coded website live: what AI-generated HTML still needs',
    description: 'A client built 25 pages with an AI tool and asked me to make them work. Here’s what was missing, and the checklist I use now.',
    date: '2026-11-25',
    tags: ['PHP', 'AI', 'Web development'],
    project: { title: 'ProLux Painting', url: 'https://www.proluxpainting.com.au/' },
    image: { src: proluxImg, alt: 'The ProLux Painting homepage', caption: 'ProLux Painting, proluxpainting.com.au' },
    body: [
      { p: 'ProLux Painting, a painting company in Sydney, came to me with a finished-looking website. The client had built it themselves with an AI tool: 25 pages of HTML covering their services, projects and the suburbs they work in. It looked ready. My job was to make it actually work.' },
      { p: 'This is becoming a common kind of project. More business owners are “vibe coding” a site from a prompt, and the result often looks good in a browser preview. Here’s what was missing underneath, and what I changed.' },
      { h: 'The forms didn’t send anything' },
      { p: 'The quote form had every field you’d expect: name, phone, email, suburb, project details. When you pressed submit, the form disappeared and a thank-you message appeared. The generated code even had a comment saying it was a front-end demo, to be connected to a CRM or email handler later.' },
      { p: 'So every quote request would have looked successful to the visitor and gone nowhere. For a trade business that lives on enquiries, that’s the most expensive bug a website can have, and nothing on the page shows it.' },
      { p: 'The client asked for their own external form to be embedded instead, so I replaced the demo forms with that embed. Enquiries now go wherever their form service sends them, the client can change the fields without a developer, and there’s no form code on the site to maintain. I checked the embed on every page it appears on, on desktop and mobile.' },
      { h: 'Every page had its own copy of the header and footer' },
      { p: 'Each HTML file carried a full copy of the navigation and footer. That works until the business adds a service or changes a phone number, and then someone has to edit 25 files and hope they don’t miss one.' },
      { p: 'I moved the pages to PHP and pulled the header and footer into shared files, included on every page. Now a menu change is one edit, and every page stays in step.' },
      { h: 'The navigation needed to work everywhere' },
      { p: 'Generated sites tend to be built page by page, so menus drift: a link that works on the homepage points to the wrong place from a suburb page, or the mobile menu behaves differently from the desktop one. With one shared header, I could fix the navigation once and check it from every page.' },
      { h: 'URLs ending in .html and .php' },
      { p: 'Links like `/contact.html` or `/about.php` look unfinished, and switching from HTML to PHP would have changed every address. I set up the server so pages load without the extension, like `/contact`, which keeps URLs clean and stable no matter what the page is built with.' },
      { h: 'The checklist I use now' },
      { p: 'When someone hands me an AI-built site, these are the first things I check, because they’re the ones a browser preview hides:' },
      { list: [
        'Do the forms actually deliver, to the right place, with spam protection? If the business already uses a form service, embedding it is often simpler than building one.',
        'Are the header, footer and menus shared, or copied into every page?',
        'Does every link work from every page, on desktop and mobile?',
        'Are the URLs clean, and will they survive a change of technology?',
        'Is any of the content placeholder text, stock photos or made-up figures (reviews, years in business) that need confirming before launch?',
        'Does each page have its own title and description for search engines?',
      ] },
      { h: 'AI got them most of the way' },
      { p: 'I don’t think the client did anything wrong. The AI tool produced a solid design and a lot of useful content quickly, far faster than starting from nothing. What it couldn’t do was know which parts were only for show. That gap between “looks done” and “works” is where a developer still earns their keep.' },
    ],
  },
  {
    slug: 'building-wordpress-themes-with-claude-code',
    title: 'How I build custom WordPress themes with Claude Code, and what I still check by hand',
    description: 'My workflow for turning a design into a custom WordPress theme with Claude Code, from two real client sites, and where I don’t trust the AI.',
    date: '2026-11-25',
    tags: ['WordPress', 'AI', 'Claude Code'],
    project: { title: 'Alex Rose', url: 'https://alexrose.uk/', caseStudy: 'alex-rose' },
    image: { src: alexroseImg, alt: 'The Alex Rose Design Your Jacket page: cloth collections on the left, a 3D jacket preview on the right', caption: 'Design Your Jacket on alexrose.uk, a custom WordPress theme built with Claude Code' },
    body: [
      { p: 'Several of my recent WordPress themes were built with Claude Code, an AI coding assistant that works directly in the project. Two examples are on my portfolio: Sounds Like Sydney, a music news and events site, and Alex Rose, a made-to-measure tailor with a 3D fitting room and online checkout.' },
      { p: 'People tend to imagine either “the AI built it” or “the AI is a toy”. Neither matches how it actually goes. Here’s the workflow.' },
      { h: 'Start from a real design, not a prompt' },
      { p: 'The AI does its best work when it has something concrete to match. For Sounds Like Sydney, the client gave me design inspiration and I had Claude Code build a theme from those references. For Alex Rose, the design started as a prototype on Replit. I pulled the finished HTML and styles out of the prototype and handed them to Claude Code to turn into a complete custom theme.' },
      { p: 'A vague prompt gets you a generic site. A specific design gets you that design, in WordPress.' },
      { h: 'Let it do the volume' },
      { p: 'The part AI is genuinely good at is volume. On Alex Rose that meant 27 page templates, the styles, the scripts and the form handlers. Writing all of that by hand is days of careful, repetitive work. With Claude Code, I spend that time directing and reviewing instead of typing.' },
      { h: 'Review it page by page' },
      { p: 'I never accept a theme in one piece. I go page by page: compare the result with the design, read the code it wrote, and ask for changes where it drifted. Alex Rose took 65 commits over 12 weeks, and most of those were this loop: generate, check, correct.' },
      { h: 'What I always test by hand' },
      { p: 'There are things I never leave to the AI to confirm, because a mistake there costs the client money or customers:' },
      { list: [
        'Every form: does it validate, block spam, and arrive in the right inbox? Alex Rose has 13 of them.',
        'Payments and checkout: does the right item go into the cart at the right price, and does the order come through complete?',
        'Prices: on Alex Rose the jacket price is calculated on the server from the chosen cloth, so it can’t be changed in the browser. I check that rule myself.',
        'Anything a customer types that’s reused later, like details carried from the fitting room into checkout.',
      ] },
      { h: 'Where the AI needed me' },
      { p: 'The hardest part of Alex Rose wasn’t generating pages. It was connecting the 3D fitting room, built by a partner developer, to the WooCommerce shop, so a designed jacket arrives in the cart as one item with every option attached. That took understanding two systems and how they should talk to each other. The AI helped write the code, but the decisions were mine.' },
      { h: 'Is it worth it?' },
      { p: 'For custom themes, yes. I ship faster, and I spend more of my time on the parts that matter to the client: how the site sells, how the forms behave, what happens when something goes wrong. The rule I keep is simple: the AI writes, I’m responsible.' },
    ],
  },
  {
    slug: 'shopify-hydrogen-vs-theme',
    title: 'Shopify Hydrogen or a theme? What I learned taking over a headless store',
    description: 'I took over a Shopify Hydrogen storefront as its only developer. It worked well, and then it moved back to a theme. Here’s why, and how to choose.',
    date: '2026-11-25',
    tags: ['Shopify', 'Hydrogen', 'React'],
    project: { title: 'Leaft Blade', caseStudy: 'leaft-blade-hydrogen' },
    image: { src: leaftImg, alt: 'Homepage of the Leaft Blade Hydrogen storefront', caption: 'The Leaft Blade Hydrogen storefront, from the Internet Archive’s July 2025 copy' },
    body: [
      { p: 'Leaft Blade sells a leaf-protein drink for athletes. When I joined, its store was a custom Shopify Hydrogen storefront, built in React, and I took it over as the only developer. I redesigned it, added subscriptions, rebuilt the cart and built custom sections. Later, the store moved to a standard Shopify theme. Both were the right call at the time.' },
      { h: 'What Hydrogen is' },
      { p: 'Hydrogen is Shopify’s framework for headless storefronts. Instead of a theme, the whole store is a React app that talks to Shopify through the Storefront API. Nothing comes from a theme or an app plug-in: the product page, the cart, the subscription picker are all code you write.' },
      { h: 'What that made possible' },
      { list: [
        'A design with no theme limits, built as React components.',
        'A buy box where customers choose between a one-time purchase and Subscribe & Save, using Shopify’s selling plans.',
        'A cart that handles one-off and subscription items together.',
        'Reusable sections for the homepage and product story.',
      ] },
      { p: 'Full control over design and speed is the real advantage of headless.' },
      { h: 'What it cost' },
      { p: 'The same thing that gave us control also took it away from the client. Page sections lived in React code, so changing content meant changing code. In a theme, the store owner can rearrange sections and edit text in the Shopify editor. In Hydrogen, every change goes through a developer.' },
      { p: 'The client wanted to manage their own content in sections. That’s a reasonable thing for a growing brand to want, and the honest answer was that a theme does it better. So the store moved to a Shopify theme, which is the current leaftblade.com.' },
      { h: 'How I’d choose now' },
      { p: 'Hydrogen makes sense when:' },
      { list: [
        'there are developers on hand to keep building the store,',
        'the design or the shopping experience needs things a theme can’t do,',
        'performance and custom logic matter more than editing convenience.',
      ] },
      { p: 'A theme makes sense when:' },
      { list: [
        'the people running the store need to edit pages themselves,',
        'apps from the Shopify App Store will cover most of the features,',
        'there isn’t a developer budget for ongoing work.',
      ] },
      { h: 'The takeaway' },
      { p: 'Moving off Hydrogen wasn’t a failure of the technology. It was matching the tool to how the business actually works. Knowing when not to use the more impressive option is part of the job.' },
    ],
  },
]

export const postBySlug = Object.fromEntries(posts.map((p) => [p.slug, p]))
