'use client'

import Navbar from '@/components/Navbar'
import Categories from '@/components/Categories'
import FeaturedStores from '@/components/FeaturedStores'
import Footer from '@/components/Footer'
import SearchBar from '@/components/SearchBar'
import Stats from '@/components/Stats'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import DownloadApp from '@/components/DownloadApp'
import CTA from '@/components/CTA'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import {
  ArrowRight,
} from 'lucide-react'

export default function Home() {
  return (
    <main className="bg-[#f6f3ee] min-h-screen overflow-hidden">

      <Navbar />

      <section className="relative pt-36 md:pt-44 pb-20 md:pb-28 px-5 md:px-6 overflow-hidden">

        <div className="absolute top-[-300px] right-[-300px] w-[700px] h-[700px] bg-orange-200/40 blur-3xl rounded-full" />

        <div className="max-w-7xl mx-auto">

          <div className="grid lg:grid-cols-[1fr_.9fr] gap-16 items-center">

            <div className="max-w-2xl">

              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-white/50 shadow-sm px-4 py-2 rounded-full mb-8">

                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

                <p className="text-sm text-[#444] font-medium">

                  Delivery moderno en Quibdó

                </p>

              </div>

              <h1 className="text-[58px] md:text-[84px] xl:text-[96px] font-bold leading-[0.88] tracking-[-6px] text-[#111111]">

                Todo lo que
                <br />

                necesitas,
                <br />

                entregado
                <span className="text-orange-500">
                  {' '}rápido.
                </span>

              </h1>

              <p className="text-[#666] text-lg md:text-xl leading-relaxed mt-8 max-w-xl">

                FASTY conecta restaurantes, supermercados
                y negocios locales en una experiencia moderna,
                rápida y premium.

              </p>

              <div className="flex flex-wrap gap-4 mt-10">

                <Link
                  href="/auth"
                  className="bg-[#111111] hover:bg-black text-white h-14 px-8 rounded-2xl font-medium flex items-center gap-3 transition-all shadow-xl"
                >

                  Pedir ahora

                  <ArrowRight size={18} />

                </Link>

                <Link
                  href="/business"
                  className="bg-white/80 backdrop-blur-xl border border-white/50 h-14 px-8 rounded-2xl font-medium text-[#111111] flex items-center transition-all shadow-sm"
                >

                  Registrar negocio

                </Link>

              </div>

              <div className="flex items-center gap-12 mt-14 flex-wrap">

                <div>

                  <h2 className="text-4xl md:text-5xl font-bold tracking-[-2px] text-[#111111]">

                    +10K

                  </h2>

                  <p className="text-sm text-[#777] mt-1">

                    Pedidos entregados

                  </p>

                </div>

                <div>

                  <h2 className="text-4xl md:text-5xl font-bold tracking-[-2px] text-[#111111]">

                    +500

                  </h2>

                  <p className="text-sm text-[#777] mt-1">

                    Negocios activos

                  </p>

                </div>

              </div>

            </div>

            <div className="relative">

              <div className="relative overflow-hidden rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,.12)]">

                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1400&auto=format&fit=crop"
                  alt="FASTY"
                  className="w-full h-[620px] object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">

                  <div className="bg-white/80 backdrop-blur-2xl border border-white/40 rounded-[28px] p-5 shadow-xl">

                    <div className="flex items-center justify-between gap-4">

                      <div>

                        <p className="text-sm text-[#777]">

                          Delivery promedio

                        </p>

                        <h3 className="text-3xl font-bold tracking-[-2px] text-[#111111] mt-1">

                          15 min

                        </h3>

                      </div>

                      <div className="bg-orange-500 text-white px-5 py-3 rounded-2xl text-sm font-medium shadow-lg shadow-orange-500/20">

                        En vivo

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <div className="max-w-6xl mx-auto px-5 md:px-6 -mt-10 relative z-20">

        <SearchBar />

      </div>

      <div className="space-y-20 md:space-y-24 py-20 md:py-24">

        <Reveal>
  <Categories />
</Reveal>

        <Reveal delay={0.1}>
  <FeaturedStores />
</Reveal>

        <Reveal delay={0.15}>
  <Stats />
</Reveal>

        <Reveal delay={0.2}>
  <HowItWorks />
</Reveal>

        <Reveal delay={0.25}>
  <Testimonials />
</Reveal>

        <Reveal delay={0.3}>
  <DownloadApp />
</Reveal>

        <Reveal delay={0.35}>
  <CTA />
</Reveal>

        <Footer />

      </div>

    </main>
  )
}