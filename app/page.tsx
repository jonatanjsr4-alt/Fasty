import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import FeaturedStores from '@/components/FeaturedStores'
import CtaFinal from '@/components/CtaFinal'
import Footer from '@/components/Footer'

export default function HomePage() {

  return (

    <main className="overflow-hidden">

      <Navbar />

      <Hero />

      <Categories />

      <FeaturedStores />

      <CtaFinal />

      <Footer />

    </main>

  )
}