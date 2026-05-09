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

     <section className="relative px-6 pt-44 pb-36 overflow-hidden">

  <div className="absolute top-0 right-[-200px] w-[700px] h-[700px] bg-orange-200 rounded-full blur-3xl opacity-40" />

  <div className="max-w-7xl mx-auto relative z-10">

    <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-24 items-center">

      <div>

        <div className="mb-8">

          <span className="text-sm uppercase tracking-[4px] text-[#9b8773] font-semibold">
            FAST DELIVERY PLATFORM
          </span>

        </div>

        <h1 className="text-[4.5rem] md:text-[7rem] leading-[0.9] tracking-[-6px] font-black text-[#18181b]">

          Delivery
          <br />

          diseñado
          <br />

          para
          <span className="text-orange-500">
            {' '}Quibdó.
          </span>

        </h1>

        <p className="mt-10 text-xl leading-relaxed text-[#7c6f64] max-w-xl">

          FASTY conecta restaurantes, supermercados y negocios locales en una experiencia moderna, rápida y elegante.

        </p>

        <div className="flex flex-col sm:flex-row gap-5 mt-14">

          <button className="bg-[#18181b] text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-black transition-all shadow-sm">

            Pedir ahora

          </button>

          <button className="bg-white border border-[#e7ded4] px-10 py-5 rounded-2xl text-lg font-semibold text-[#18181b] hover:border-[#d6c8b8] transition-all">

            Registrar negocio

          </button>

        </div>

        <div className="flex items-center gap-10 mt-16">

          <div>

            <h3 className="text-3xl font-black text-[#18181b]">
              +10K
            </h3>

            <p className="text-[#7c6f64] mt-1">
              Pedidos
            </p>

          </div>

          <div>

            <h3 className="text-3xl font-black text-[#18181b]">
              +500
            </h3>

            <p className="text-[#7c6f64] mt-1">
              Negocios
            </p>

          </div>

          <div>

            <h3 className="text-3xl font-black text-[#18181b]">
              24/7
            </h3>

            <p className="text-[#7c6f64] mt-1">
              Soporte
            </p>

          </div>

        </div>

      </div>

      <div className="relative flex justify-center lg:justify-end">

        <div className="absolute w-[500px] h-[500px] bg-orange-300/40 rounded-full blur-3xl" />

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