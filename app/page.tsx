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

     <section className="relative bg-[#111111] overflow-hidden">

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.25),transparent_35%)]" />

  <div className="max-w-7xl mx-auto px-6 pt-36 pb-24 relative z-10">

    <div className="grid lg:grid-cols-2 gap-16 items-center">

      <div>

        <span className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm text-orange-300 mb-8">

          ⚡ Delivery rápido en Quibdó

        </span>

        <h1 className="text-5xl md:text-7xl leading-[0.95] tracking-[-4px] font-black text-white max-w-2xl">

          Delivery moderno
          <br />

          para una ciudad
          <br />

          que se mueve rápido.

        </h1>

        <p className="mt-8 text-lg text-zinc-400 leading-relaxed max-w-xl">

          Restaurantes, supermercados y negocios locales en una experiencia moderna y rápida.

        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10">

          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold">

            Pedir ahora

          </button>

          <button className="border border-zinc-700 hover:border-zinc-500 text-white px-8 py-4 rounded-2xl font-semibold">

            Registrar negocio

          </button>

        </div>

      </div>

      <div className="flex justify-center lg:justify-end">

        <PhoneMockup />

      </div>

    </div>

  </div>

</section>

      <div className="max-w-7xl mx-auto px-6">

        <SearchBar />

      </div>

      <div className="space-y-40 mt-40">

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