import soundslikesydney from '../assets/work/soundslikesydney.jpg'
import countiesbadminton from '../assets/work/countiesbadminton.jpg'
import alexrose from '../assets/work/alexrose.jpg'
import proluxpainting from '../assets/work/proluxpainting.jpg'
import mhc from '../assets/work/mhc.jpg'
import missionestate from '../assets/work/missionestate.jpg'
import leaftblade from '../assets/work/leaftblade.jpg'
import bus4x4 from '../assets/work/bus4x4.jpg'
import tgsHub from '../assets/work/tgs-hub.jpg'
import offroute from '../assets/work/offrouteadventures.jpg'
import kalinga from '../assets/work/kalingahouse.jpg'
import ignition from '../assets/work/weareignition.jpg'
import coffs from '../assets/work/coffscitylockmart.jpg'
import stickman from '../assets/work/stickmanwealth.jpg'
import perfectFloors from '../assets/work/perfect_floors.jpg'
import bhSellers from '../assets/work/bh-sellers-advocate.jpg'
import karratha from '../assets/work/karrathalocksmith.jpg'
import fastTrack from '../assets/work/fast_track_home_loans.jpg'
import lisaSherman from '../assets/work/lisasherman.jpg'
import nutracraft from '../assets/work/nutracraft.jpg'
import marci from '../assets/work/real-estate.jpg'
import alexanderRose from '../assets/work/alexanderrose.jpg'
import mpmHouse from '../assets/work/mpmhouse.jpg'
import leaftHydrogen from '../assets/work/lb-hydrogen.jpg'

/*
  platform: 'wordpress' | 'shopify' | 'custom' | '' (unknown)
  featured: shown in the homepage gallery (projects with a case study first, then in this order)
  ai: built with AI help (shows a badge and appears under the "Built with AI" filter)
  caseStudy: slug of an entry in caseStudies.js; cards then open /work/<slug>
  react: built with React (appears under the "React" filter)
  archived: the live site has changed; url points to an archived copy
  position: optional CSS object-position for the screenshot
*/
export const projects = [
  { title: 'Sounds Like Sydney', url: 'https://soundslikesydney.com.au/', platform: 'wordpress', stack: 'WordPress', summary: "News and events for Sydney's community music scene.", image: soundslikesydney, featured: true, ai: true },
  { title: 'Counties Badminton Pro Shop', url: 'https://countiesbadmintonproshop.co.nz/', platform: 'shopify', stack: 'Shopify', summary: 'Badminton gear and a stringing lab for Counties Manukau, New Zealand.', image: countiesbadminton, featured: true, ai: true },
  { title: 'Alex Rose', url: 'https://alexrose.uk/', platform: 'wordpress', stack: 'WordPress', summary: 'Made-to-measure jackets from a Leeds family tailor, since 1945.', image: alexrose, featured: true, ai: true, caseStudy: 'alex-rose' },
  { title: 'ProLux Painting', url: 'https://www.proluxpainting.com.au/', platform: '', stack: '', summary: 'Residential and commercial painters in Sydney.', image: proluxpainting, featured: true, ai: true },
  { title: 'Alexander Rose', url: 'https://www.alexander-rose.net/', platform: 'custom', stack: 'React, Express (Replit Agent)', summary: 'Made-to-measure suits from a tailor in Rodley, Leeds.', image: alexanderRose, ai: true, react: true },
  { title: 'Morgan Property Management', url: 'https://www.mpm.house/', platform: 'custom', stack: 'React, Express (Replit Agent)', summary: 'Two restored holiday cottages in Shropshire.', image: mpmHouse, ai: true, react: true },
  { title: 'Multihull Central', url: 'https://www.multihullcentral.com/', platform: 'wordpress', stack: 'WordPress, custom ACF theme', summary: 'Catamaran sales with search filters, events and a service centre.', image: mhc, position: 'left top', featured: true },
  { title: 'Mission Estate', url: 'https://missionestate.co.nz/', platform: 'shopify', stack: 'Shopify', summary: "New Zealand's oldest winery: wine shop, restaurant and bookings.", image: missionestate, featured: true },
  { title: 'Leaft Blade', url: 'https://www.leaftblade.com/', platform: 'shopify', stack: 'Shopify', summary: 'Storefront for a leaf-protein drink sold in New Zealand.', image: leaftblade },
  { title: 'Leaft Blade, Hydrogen version', url: 'https://web.archive.org/web/20250712191621/https://yourleaftsecret.com/', platform: 'shopify', stack: 'Shopify Hydrogen, React', summary: 'The earlier headless storefront I took over: redesign, subscriptions, cart and custom sections.', image: leaftHydrogen, react: true, archived: true, caseStudy: 'leaft-blade-hydrogen', featured: true },
  { title: 'PPD back office', url: '', platform: 'custom', stack: 'React, Laravel', summary: 'Internal app for doctor survey data: editable tables, filters and reports, 60% faster processing.', illustration: 'backoffice', react: true, caseStudy: 'ppd-back-office', featured: true },
  { title: 'Bus 4x4', url: 'https://www.bus4x4.com.au/', platform: 'wordpress', stack: 'WordPress, Avada with custom code', summary: '4WD bus conversions: specs, project galleries and service requests.', image: bus4x4, featured: true },
  { title: 'Talk Global Study', url: 'https://talkglobalstudy.com', platform: 'wordpress', stack: 'WordPress, REST API', summary: 'Connects students with universities and colleges abroad.', image: tgsHub },
  { title: 'Off Route Adventures', url: 'https://offrouteadventures.com/', platform: 'shopify', stack: 'Shopify', summary: 'Snowmobile tours with a shop alongside.', image: offroute },
  { title: 'Kalinga House', url: 'https://kalingahouse.org/', platform: 'shopify', stack: 'Shopify', summary: 'A home of refuge for vulnerable girls and youth on Siargao Island.', image: kalinga },
  { title: 'Ignition Consulting', url: 'https://weareignition.co.nz/', platform: 'shopify', stack: 'Shopify', summary: 'Sales and marketing consultancy for growing brands.', image: ignition },
  { title: 'Coffs City Lockmart', url: 'https://www.coffscitylockmart.com.au/', platform: 'wordpress', stack: 'WordPress, custom ACF theme', summary: 'Locksmith with 40 years of trade: services, reviews and quotes.', image: coffs },
  { title: 'Stickman Wealth', url: 'https://www.stickmanwealth.com.au/', platform: 'wordpress', stack: 'WordPress, custom ACF theme', summary: 'Wealth management site with lead capture and testimonials.', image: stickman },
  { title: 'Perfect Floors', url: 'https://perfectfloors.com.au/', platform: 'wordpress', stack: 'WordPress, Avada', summary: 'Flooring showroom with product showcase and booking.', image: perfectFloors },
  { title: 'BH Sellers Advocate', url: 'https://bhsellersadvocate.com.au/', platform: 'wordpress', stack: 'WordPress, custom ACF theme', summary: 'Property sales site with listings and lead capture.', image: bhSellers },
  { title: 'Karratha Lock Service', url: 'https://karrathalockservice.com/', platform: 'wordpress', stack: 'WordPress, custom ACF theme', summary: 'Regional locksmith with service areas and mobile-first booking.', image: karratha },
  { title: 'Fast Track Home Loans', url: 'https://fasttrackhomeloans.com.au/', platform: 'wordpress', stack: 'WordPress, custom ACF theme', summary: 'Mortgage broker site with loan calculators and lead forms.', image: fastTrack },
  { title: 'Lisa Sherman, Realtor', url: 'https://lisashermanrealty.com/', platform: 'wordpress', stack: 'WordPress, Elementor', summary: 'Realtor site with property search and lead capture.', image: lisaSherman },
  { title: 'Nutracraft', url: 'https://nutracraft.com', platform: 'shopify', stack: 'Shopify, custom Liquid', summary: 'Supplement store with customised Liquid templates.', image: nutracraft },
  { title: 'Marci Metzger, Real Estate', url: 'https://real-estate-flame-two.vercel.app/', platform: 'custom', stack: 'HTML, CSS and JavaScript', summary: 'Real estate site built without a framework or CMS.', image: marci },
]

export const featuredProjects = [
  ...projects.filter((p) => p.featured && p.caseStudy),
  ...projects.filter((p) => p.featured && !p.caseStudy),
]

export const platformLabel = { wordpress: 'WordPress', shopify: 'Shopify', custom: 'Custom' }

export const domainOf = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
