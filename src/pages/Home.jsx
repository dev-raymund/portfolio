import Hero from '../components/Hero'
import About from '../components/About'
import WorkGallery from '../components/WorkGallery'
import Stack from '../components/Stack'
import Experience from '../components/Experience'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <WorkGallery />
      <Stack />
      <Experience />
      <Contact />
    </main>
  )
}
