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
import { ArrowRight, Star, Clock3 } from 'lucide-react'

export default function Home() {
  return (
    <main className="bg-[#f7f7f5] text-[#18181b] min-h-screen overflow-hidden">

      <Navbar />

      <section className="relative overflow-hidden">

        <div className="absolute top-[-250px] right-[-250px] w-[700px] h-[700px] bg-orange-200 blur-3xl rounded-full opacity-40" />

        <div className="absolute bottom-[-300px] left-[-300px] w-[600px] h-[600px] bg-orange-100 blur-3xl rounded-full opacity-50" />

        <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">

          <div className="grid lg:grid-cols-2 gap-24 items-center">

            <div>

              <div className="inline-flex items-center gap-3 bg-white border border-orange-100 shadow-sm px-5 py-3 rounded-full mb-10">

                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />

                <p className="text-sm font-medium text-[#444]">

                  Delivery rápido en Quibdó

                </p>

              </div>

              <h1 className="text-6xl md:text-7xl xl:text-[88px] font-black leading-[0.92] tracking-[-5px] text-[#18181b] max-w-3xl">

                Pide comida,
                <br />

                supermercados
                <br />

                y más con
                <span className="text-orange-500">
                  {' '}FASTY
                </span>

              </h1>

              <p className="mt-10 text-xl text-[#666] leading-relaxed max-w-2xl">

                La nueva forma de pedir en Quibdó.
                Restaurantes, tiendas y domicilios rápidos
                en una experiencia moderna y elegante.

              </p>

              <div className="flex flex-col sm:flex-row gap-5 mt-12">

                <Link
                  href="/auth"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-9 h-16 rounded-2xl font-semibold transition-all flex items-center justify-center gap-3 shadow-lg shadow-orange-500/20"
                >

                  Pedir ahora

                  <ArrowRight size={20} />

                </Link>

                <Link
                  href="/business"
                  className="bg-white hover:bg-[#f3f3f3] border border-[#e5e5e5] text-[#18181b] px-9 h-16 rounded-2xl font-semibold transition-all flex items-center justify-center"
                >

                  Registrar negocio

                </Link>

              </div>

              <div className="flex flex-wrap items-center gap-10 mt-16">

                <div>

                  <h2 className="text-4xl font-black text-[#18181b]">
                    +10K
                  </h2>

                  <p className="text-[#777] mt-2">
                    Pedidos
                  </p>

                </div>

                <div>

                  <h2 className="text-4xl font-black text-[#18181b]">
                    +500
                  </h2>

                  <p className="text-[#777] mt-2">
                    Negocios
                  </p>

                </div>

                <div>

                  <h2 className="text-4xl font-black text-[#18181b]">
                    24/7
                  </h2>

                  <p className="text-[#777] mt-2">
                    Soporte
                  </p>

                </div>

              </div>

            </div>

            <div className="relative flex justify-center lg:justify-end">

              <div className="absolute inset-0 bg-orange-300/20 blur-3xl rounded-full scale-125" />

              <div className="relative">

                <PhoneMockup />

                <div className="absolute -left-10 top-10 bg-white border border-[#ececec] shadow-xl rounded-3xl px-5 py-4 hidden lg:flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">

                    <Star
                      className="text-orange-500 fill-orange-500"
                      size={24}
                    />

                  </div>

                  <div>

                    <h3 className="font-bold text-[#18181b]">
                      4.9 Rating
                    </h3>

                    <p className="text-[#777] text-sm mt-1">
                      Restaurantes premium
                    </p>

                  </div>

                </div>

                <div className="absolute -right-10 bottom-10 bg-white border border-[#ececec] shadow-xl rounded-3xl px-5 py-4 hidden lg:flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">

                    <Clock3
                      className="text-orange-500"
                      size={24}
                    />

                  </div>

                  <div>

                    <h3 className="font-bold text-[#18181b]">
                      15 Min
                    </h3>

                    <p className="text-[#777] text-sm mt-1">
                      Delivery rápido
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <div className="max-w-6xl mx-auto px-6 -mt-6 relative z-20">

        <SearchBar />

      </div>

      <div className="space-y-28 py-28">

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