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

        <div className="absolute top-[-250px] right-[-250px] w-[600px] h-[600px] bg-orange-200 blur-3xl rounded-full opacity-30" />

        <div className="absolute bottom-[-250px] left-[-250px] w-[500px] h-[500px] bg-orange-100 blur-3xl rounded-full opacity-40" />

        <div className="max-w-7xl mx-auto px-5 md:px-6 pt-24 md:pt-28 pb-16 md:pb-20 relative z-10">

          <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">

            <div>

              <div className="inline-flex items-center gap-3 bg-white border border-orange-100 shadow-sm px-4 py-2 rounded-full mb-7">

                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

                <p className="text-xs md:text-sm font-medium text-[#444]">

                  Delivery rápido en Quibdó

                </p>

              </div>

              <h1 className="text-5xl md:text-6xl xl:text-[76px] font-black leading-[0.92] tracking-[-4px] text-[#18181b] max-w-3xl">

                Pide comida,
                <br />

                supermercados
                <br />

                y más con
                <span className="text-orange-500">
                  {' '}FASTY
                </span>

              </h1>

              <p className="mt-7 text-base md:text-lg text-[#666] leading-relaxed max-w-2xl">

                La nueva forma de pedir en Quibdó.
                Restaurantes, tiendas y domicilios rápidos
                en una experiencia moderna y elegante.

              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-9">

                <Link
                  href="/auth"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 h-14 rounded-2xl font-semibold transition-all flex items-center justify-center gap-3 shadow-lg shadow-orange-500/20"
                >

                  Pedir ahora

                  <ArrowRight size={18} />

                </Link>

                <Link
                  href="/business"
                  className="bg-white hover:bg-[#f3f3f3] border border-[#e5e5e5] text-[#18181b] px-8 h-14 rounded-2xl font-semibold transition-all flex items-center justify-center"
                >

                  Registrar negocio

                </Link>

              </div>

              <div className="flex flex-wrap items-center gap-8 mt-12">

                <div>

                  <h2 className="text-3xl md:text-4xl font-black text-[#18181b]">
                    +10K
                  </h2>

                  <p className="text-[#777] mt-1 text-sm">
                    Pedidos
                  </p>

                </div>

                <div>

                  <h2 className="text-3xl md:text-4xl font-black text-[#18181b]">
                    +500
                  </h2>

                  <p className="text-[#777] mt-1 text-sm">
                    Negocios
                  </p>

                </div>

                <div>

                  <h2 className="text-3xl md:text-4xl font-black text-[#18181b]">
                    24/7
                  </h2>

                  <p className="text-[#777] mt-1 text-sm">
                    Soporte
                  </p>

                </div>

              </div>

            </div>

            <div className="relative flex justify-center lg:justify-end">

              <div className="absolute inset-0 bg-orange-300/20 blur-3xl rounded-full scale-125" />

              <div className="relative scale-95 md:scale-100">

                <PhoneMockup />

                <div className="absolute -left-6 top-10 bg-white border border-[#ececec] shadow-lg rounded-2xl px-4 py-3 hidden xl:flex items-center gap-3">

                  <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">

                    <Star
                      className="text-orange-500 fill-orange-500"
                      size={20}
                    />

                  </div>

                  <div>

                    <h3 className="font-bold text-sm text-[#18181b]">
                      4.9 Rating
                    </h3>

                    <p className="text-[#777] text-xs mt-1">
                      Restaurantes premium
                    </p>

                  </div>

                </div>

                <div className="absolute -right-6 bottom-10 bg-white border border-[#ececec] shadow-lg rounded-2xl px-4 py-3 hidden xl:flex items-center gap-3">

                  <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">

                    <Clock3
                      className="text-orange-500"
                      size={20}
                    />

                  </div>

                  <div>

                    <h3 className="font-bold text-sm text-[#18181b]">
                      15 Min
                    </h3>

                    <p className="text-[#777] text-xs mt-1">
                      Delivery rápido
                    </p>

                  </div>

                </div>

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