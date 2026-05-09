'use client'

import Navbar from '@/components/Navbar'
import Categories from '@/components/Categories'
import { motion } from 'framer-motion'
import FeaturedStores from '@/components/FeaturedStores'
import Footer from '@/components/Footer'
import PhoneMockup from '@/components/PhoneMockup'
import SearchBar from '@/components/SearchBar'
import Stats from '@/components/Stats'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import DownloadApp from '@/components/DownloadApp'
import CTA from '@/components/CTA'
import Loader from '@/components/Loader'
import CursorGlow from '@/components/CursorGlow'
import ScrollTop from '@/components/ScrollTop'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      <ScrollTop />
      <CursorGlow />
      <Loader />

      <Navbar />

      <section className="relative min-h-screen px-6 pt-36 pb-20 overflow-hidden">

        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute top-[-250px] left-[-250px] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl" />

          <div className="absolute bottom-[-250px] right-[-250px] w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl" />

        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_.85fr] gap-24 items-center relative z-10">

          <div>

            <div className="flex flex-wrap gap-3 mb-6">

              <div className="glass-card px-4 py-2 rounded-full text-xs text-orange-300 font-medium">
                ⚡ Entregas rápidas
              </div>

              <div className="glass-card px-4 py-2 rounded-full text-xs text-orange-300 font-medium">
                🛵 Tracking en vivo
              </div>

              <div className="glass-card px-4 py-2 rounded-full text-xs text-orange-300 font-medium">
                🏪 +500 negocios
              </div>

            </div>

            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold text-white leading-[1.02] tracking-[-2px] max-w-2xl"
            >
              Tus pedidos
              <span className="text-orange-500"> rápidos</span>
              <br />
              en Quibdó
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-base md:text-lg text-zinc-400 max-w-lg leading-relaxed"
            >
              Comida, supermercados y domicilios rápidos desde una sola plataforma moderna.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <button className="premium-button bg-orange-500 hover:bg-orange-600 transition-all px-8 py-4 rounded-2xl font-semibold text-base shadow-lg shadow-orange-500/20">
                Pedir ahora
              </button>

              <button className="premium-button border border-zinc-700 text-white hover:border-orange-500 hover:text-orange-400 transition-all px-8 py-4 rounded-2xl font-semibold text-base">
                Registrar negocio
              </button>

            </div>

          </div>

          <div className="flex justify-center lg:justify-end">

            <PhoneMockup />

          </div>

        </div>

      </section>

      <div className="relative z-20 -mt-2">
        <SearchBar />
      </div>

      <div className="space-y-16">

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