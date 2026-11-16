import wordpress from '../assets/svg/wordpress.svg'
import shopify from '../assets/svg/shopify.svg'
import php from '../assets/svg/php.svg'
import laravel from '../assets/svg/laravel.svg'
import react from '../assets/svg/react.svg'
import vue from '../assets/svg/vue.svg'
import javascript from '../assets/svg/javascript.svg'
import node from '../assets/svg/node.svg'
import tailwind from '../assets/svg/tailwind.svg'
import bootstrap from '../assets/svg/bootstrap.svg'
import jquery from '../assets/svg/jquery.svg'
import mysql from '../assets/svg/mysql.svg'
import mongodb from '../assets/svg/mongodb.svg'
import redis from '../assets/svg/redis.svg'
import docker from '../assets/svg/docker.svg'
import github from '../assets/svg/github.svg'
import postman from '../assets/svg/postman.svg'
import figma from '../assets/svg/figma.svg'
import adobe from '../assets/svg/adobe.svg'
import html from '../assets/svg/html-5.svg'
import css from '../assets/svg/css-3.svg'

// Order matters: the first row of the scrolling strip takes the first half.
// logo: null shows a generic code icon until a logo file is added.
export const tech = [
  { name: 'WordPress', logo: wordpress },
  { name: 'Shopify', logo: shopify },
  { name: 'PHP', logo: php },
  { name: 'Laravel', logo: laravel },
  { name: 'Statamic', logo: null },
  { name: 'Replit', logo: null },
  { name: 'React', logo: react },
  { name: 'Vue', logo: vue },
  { name: 'JavaScript', logo: javascript },
  { name: 'Node.js', logo: node },
  { name: 'Tailwind CSS', logo: tailwind },
  { name: 'Bootstrap', logo: bootstrap },
  { name: 'jQuery', logo: jquery },
  { name: 'MySQL', logo: mysql },
  { name: 'MongoDB', logo: mongodb },
  { name: 'Redis', logo: redis },
  { name: 'Docker', logo: docker },
  { name: 'GitHub', logo: github },
  { name: 'Postman', logo: postman },
  { name: 'Figma', logo: figma },
  { name: 'Adobe', logo: adobe },
  { name: 'HTML', logo: html },
  { name: 'CSS', logo: css },
]

export const techLogo = Object.fromEntries(tech.map((t) => [t.name, t.logo]))
