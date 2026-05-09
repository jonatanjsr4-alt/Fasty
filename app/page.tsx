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
    <main className="bg-[#f7f7f5] text-[#18181b] min-h-screen overflow-hidden">

      <Navbar />

      <section className="relative">

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-8">

                ⚡ Delivery rápido en Quibdó

              </span>

              <h1 className="text-5xl md:text-6xl font-black leading-[1] tracking-[-3px] text-[#18181b] max-w-2xl">

                Pide comida,
                supermercados
                y más.

              </h1>

              <p className="mt-8 text-lg text-[#666] leading-relaxed max-w-xl">

                FASTY conecta restaurantes, tiendas y negocios locales en una experiencia rápida y moderna.

              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">

                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all">

                  Pedir ahora

                </button>

                <button className="bg-white hover:bg-[#f3f3f3] border border-[#e5e5e5] text-[#18181b] px-8 py-4 rounded-2xl font-semibold transition-all">

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

      <div className="max-w-6xl mx-auto px-6 -mt-4 relative z-20">

        <SearchBar />

      </div>

      <div className="space-y-24 py-24">

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