import Hero from '@/components/Hero'
import About from '@/components/About'
import Timeline from '@/components/Timeline'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'
import Navbar from '@/components/Navbar'
import ScrollProgress from '@/components/ScrollProgress'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Skills />
        <Projects />
        <Gallery />
        <Contact />
      </main>
    </>
  )
}
