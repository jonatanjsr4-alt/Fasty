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

import Link from 'next/link'

import {
  ArrowRight,
  Star,
  Clock3,
} from 'lucide-react'

export default function Home() {
  return (
    <main className="bg-[#f7f7f5] text-[#18181b] min-h-screen overflow-hidden">

      <Navbar />

<section className="relative overflow-hidden">

  <div className="absolute top-[-250px] right-[-250px] w-[500px] h-[500px] bg-orange-200 blur-3xl rounded-full opacity-30" />

  <div className="max-w-7xl mx-auto px-5 md:px-6 pt-16 md:pt-20 pb-12 md:pb-16 relative z-10">

    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

      <div className="max-w-2xl">

        <div className="inline-flex items-center gap-3 bg-white border border-orange-100 shadow-sm px-4 py-2 rounded-full mb-6">

          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

          <p className="text-xs md:text-sm font-medium text-[#444]">

            Delivery rápido en Quibdó

          </p>

        </div>

        <h1 className="text-4xl md:text-5xl xl:text-[72px] font-black leading-[0.92] tracking-[-4px] text-[#18181b]">

          Pide comida,
          <br />

          supermercados
          <br />

          y más con
          <span className="text-orange-500">
            {' '}FASTY
          </span>

        </h1>

        <p className="mt-6 text-base md:text-lg text-[#666] leading-relaxed max-w-xl">

          La nueva forma de pedir en Quibdó.
          Restaurantes, tiendas y domicilios rápidos
          en una experiencia moderna y elegante.

        </p>

        <div className="flex flex-wrap gap-4 mt-8">

          <Link
            href="/auth"
            className="bg-orange-500 hover:bg-orange-600 text-white px-7 h-12 rounded-2xl font-semibold transition-all flex items-center justify-center gap-3 shadow-lg shadow-orange-500/20"
          >

            Pedir ahora

            <ArrowRight size={18} />

          </Link>

          <Link
            href="/business"
            className="bg-white hover:bg-[#f3f3f3] border border-[#e5e5e5] text-[#18181b] px-7 h-12 rounded-2xl font-semibold transition-all flex items-center justify-center"
          >

            Registrar negocio

          </Link>

        </div>

        <div className="flex items-center gap-10 mt-10 flex-wrap">

          <div>

            <h2 className="text-3xl font-black text-[#18181b]">
              +10K
            </h2>

            <p className="text-[#777] text-sm mt-1">
              Pedidos
            </p>

          </div>

          <div>

            <h2 className="text-3xl font-black text-[#18181b]">
              +500
            </h2>

            <p className="text-[#777] text-sm mt-1">
              Negocios
            </p>

          </div>

          <div>

            <h2 className="text-3xl font-black text-[#18181b]">
              24/7
            </h2>

            <p className="text-[#777] text-sm mt-1">
              Soporte
            </p>

          </div>

        </div>

      </div>

      <div className="relative flex justify-center lg:justify-end">

        <div className="scale-[0.82] md:scale-[0.9] lg:scale-100 origin-center">

          <PhoneMockup />

        </div>

      </div>

    </div>

  </div>

</section>

      <div className="max-w-6xl mx-auto px-5 md:px-6 -mt-4 relative z-20">

        <SearchBar />

      </div>

      <div className="space-y-20 md:space-y-24 py-20 md:py-24">

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