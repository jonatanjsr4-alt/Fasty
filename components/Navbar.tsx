'use client'

import Link from 'next/link'
import {
  Menu,
  ShoppingBag,
} from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50">

      <div className="absolute inset-0 bg-white/70 backdrop-blur-2xl border-b border-[#ececec]" />

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="h-24 flex items-center justify-between">

          <Link
            href="/"
            className="flex items-center gap-4 group"
          >

            <div className="relative">

              <div className="absolute inset-0 bg-orange-500 blur-xl opacity-20 rounded-2xl group-hover:opacity-40 transition-all" />

              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">

                <span className="text-white text-xl font-black">
                  F
                </span>

              </div>

            </div>

            <div>

              <h1 className="text-2xl font-black tracking-[-1px] text-[#18181b]">

                FASTY

              </h1>

              <p className="text-xs text-[#888] mt-0.5">

                Delivery Platform

              </p>

            </div>

          </Link>

          <nav className="hidden lg:flex items-center gap-10">

            <a
              href="#"
              className="text-[#666] hover:text-[#18181b] transition-all font-medium"
            >
              Inicio
            </a>

            <a
              href="#"
              className="text-[#666] hover:text-[#18181b] transition-all font-medium"
            >
              Restaurantes
            </a>

            <a
              href="#"
              className="text-[#666] hover:text-[#18181b] transition-all font-medium"
            >
              Categorías
            </a>

            <a
              href="#"
              className="text-[#666] hover:text-[#18181b] transition-all font-medium"
            >
              Contacto
            </a>

          </nav>

          <div className="flex items-center gap-4">

            <button className="hidden md:flex w-12 h-12 rounded-2xl bg-white border border-[#ececec] items-center justify-center hover:border-orange-300 transition-all shadow-sm">

              <ShoppingBag
                size={20}
                className="text-[#18181b]"
              />

            </button>

            <Link
              href="/auth"
              className="hidden md:flex bg-[#18181b] hover:bg-black text-white px-7 h-12 rounded-2xl font-semibold items-center transition-all shadow-lg"
            >

              Ingresar

            </Link>

            <button className="lg:hidden w-12 h-12 rounded-2xl bg-white border border-[#ececec] flex items-center justify-center shadow-sm">

              <Menu
                size={22}
                className="text-[#18181b]"
              />

            </button>

          </div>

        </div>

      </div>

    </header>
  )
}