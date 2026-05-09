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

      <section className="relative min-h-screen px-6 pt-40 pb-24 overflow-hidden">

        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-3xl animate-pulse" />

          <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl animate-pulse" />

        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-32 items-center relative z-10">

          <div>

            <div className="flex flex-wrap gap-4 mb-8">

              <div className="glass-card px-5 py-3 rounded-full text-sm text-orange-400 font-semibold">
                ⚡ Entregas rápidas
              </div>

              <div className="glass-card px-5 py-3 rounded-full text-sm text-orange-400 font-semibold">
                🛵 Domicilios en tiempo real
              </div>

              <div className="glass-card px-5 py-3 rounded-full text-sm text-orange-400 font-semibold">
                🏪 +500 negocios
              </div>

            </div>

            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] max-w-3xl"
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
              className="mt-10 text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed"
            >
              Pide comida, compra productos y recibe entregas rápidas con FASTY.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-5 mt-12">

              <button className="premium-button bg-orange-500 hover:bg-orange-600 transition-all px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/40">
                Pedir Ahora
              </button>

              <button className="premium-button border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all px-10 py-5 rounded-2xl font-bold text-lg">
                Registrar Negocio
              </button>

            </div>

          </div>

          <div className="flex justify-center lg:justify-center mt-20 lg:mt-0">

            <PhoneMockup />

          </div>

        </div>

      </section>

      <div className="relative z-20 -mt-10">
        <SearchBar />
      </div>

      <div className="space-y-20">

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