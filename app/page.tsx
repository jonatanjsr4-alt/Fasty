import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import MarqueeBand from '@/components/MarqueeBand'
import Categories from '@/components/Categories'
import HowItWorks from '@/components/HowItWorks'
import Stats from '@/components/Stats'
import Testimonials from '@/components/Testimonials'
import CtaFinal from '@/components/CtaFinal'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <MarqueeBand />
        <Categories />
        <HowItWorks />
        <Stats />
        <Testimonials />
        <CtaFinal />
      </main>
      <Footer />
    </>
  )
}