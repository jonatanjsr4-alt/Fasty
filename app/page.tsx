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
import PhoneMockup from '@/components/PhoneMockup'
import Loader from '@/components/Loader'
import Cursor from '@/components/Cursor'
import {
  ArrowRight,
} from 'lucide-react'

export default function Home() {
  return (
    <main className="bg-[#f6f3ee] min-h-screen overflow-hidden">
      <Cursor />
      <Loader />
      <Navbar />

<section className="relative overflow-hidden pt-6">

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#fb923c20,transparent_35%)]" />

  <div className="max-w-7xl mx-auto px-5 md:px-6">

    <div className="relative overflow-hidden rounded-[48px] bg-[#0f0f11] border border-white/5 min-h-[780px] flex items-center">

      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-orange-500/10 blur-3xl rounded-full" />

      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-orange-400/10 blur-3xl rounded-full" />

      <div className="grid lg:grid-cols-2 gap-14 items-center w-full px-8 md:px-14 py-20 relative z-10">

        <div className="max-w-2xl">

          <div className="inline-flex items-center gap-3 glass px-5 py-3 rounded-full mb-8">

            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />

            <p className="text-sm font-medium text-white/80">

              FASTY disponible en Quibdó

            </p>

          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-[-5px] text-white">

            Todo lo que
            <br />

            necesitas,
            <br />

            entregado
            <span className="text-gradient">
              {' '}rápido
            </span>

          </h1>

          <p className="mt-8 text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl">

            Restaurantes, supermercados, farmacias y negocios locales en una sola plataforma moderna.

          </p>

          <div className="flex flex-wrap gap-4 mt-10">

            <Link
              href="/auth"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 h-14 rounded-2xl font-semibold transition-all flex items-center justify-center gap-3 shadow-orange"
            >

              Pedir ahora

              <ArrowRight size={18} />

            </Link>

            <Link
              href="/business"
              className="glass text-white px-8 h-14 rounded-2xl font-semibold flex items-center justify-center gap-3"
            >

              Registrar negocio

            </Link>

          </div>

          <div className="flex items-center gap-12 mt-14 flex-wrap">

            <div>

              <h2 className="text-5xl font-black text-white">
                +10K
              </h2>

              <p className="text-zinc-500 text-lg mt-2">
                Pedidos
              </p>

            </div>

            <div>

              <h2 className="text-5xl font-black text-white">
                +500
              </h2>

              <p className="text-zinc-500 text-lg mt-2">
                Negocios
              </p>

            </div>

            <div>

              <h2 className="text-5xl font-black text-white">
                24/7
              </h2>

              <p className="text-zinc-500 text-lg mt-2">
                Soporte
              </p>

            </div>

          </div>

        </div>

        <div className="relative flex justify-center lg:justify-end">

          <div className="relative scale-[0.88] md:scale-[0.95] lg:scale-100 origin-center">

            <PhoneMockup />

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