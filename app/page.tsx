'use client'

import Navbar from '@/components/Navbar'
import Categories from '@/components/Categories'
import FeaturedStores from '@/components/FeaturedStores'
import Footer from '@/components/Footer'
import PhoneMockup from '@/components/PhoneMockup'
import SearchBar from '@/components/SearchBar'
import Stats from '@/components/Stats'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import DownloadApp from '@/components/DownloadApp'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <main className="bg-[#0b0b0c] text-white overflow-hidden min-h-screen">

      <Navbar />

      <section className="relative px-6 pt-36 pb-24">

        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute top-[-300px] left-[-300px] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl" />

          <div className="absolute bottom-[-300px] right-[-300px] w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />

        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          <div>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/70 text-sm text-zinc-300 mb-8">

              <div className="w-2 h-2 rounded-full bg-orange-500" />

              Delivery rápido en Quibdó

            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-[-4px] max-w-2xl">

              Delivery moderno

              <br />

              para una ciudad

              <span className="text-orange-500"> real.</span>

            </h1>

            <p className="mt-8 text-zinc-400 text-lg leading-relaxed max-w-xl">

              Restaurantes, supermercados y domicilios rápidos desde una sola plataforma.

            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <button className="bg-orange-500 hover:bg-orange-600 transition-all px-8 py-4 rounded-2xl font-semibold text-black">
                Pedir ahora
              </button>

              <button className="border border-zinc-700 hover:border-zinc-500 transition-all px-8 py-4 rounded-2xl font-semibold text-white">
                Registrar negocio
              </button>

            </div>

          </div>

          <div className="flex justify-center lg:justify-end">
            <PhoneMockup />
          </div>

        </div>

      </section>

      <div className="relative z-20 max-w-7xl mx-auto px-6 -mt-6">
        <SearchBar />
      </div>

      <div className="space-y-28 mt-28">

        <Categories />

        <FeaturedStores />

        <Stats />

        <HowItWorks />

        <Testimonials />

        <DownloadApp />

        <CTA />

        <Footer />

      </div>

    </main>
  )
}