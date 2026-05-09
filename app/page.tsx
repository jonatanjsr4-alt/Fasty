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
    <main className="bg-[#0a0a0a] text-white min-h-screen overflow-hidden">

      <Navbar />

      <section className="px-6 pt-36 pb-24">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">

          <div>

            <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-[-4px] max-w-2xl">

              Delivery moderno
              <br />

              para Quibdó

            </h1>

            <p className="mt-8 text-zinc-400 text-lg leading-relaxed max-w-xl">

              Comida, supermercados y domicilios rápidos desde una sola plataforma.

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

      <div className="max-w-7xl mx-auto px-6">

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