'use client'

import Link from 'next/link'

import {
  ArrowRight,
} from 'lucide-react'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">

      <div className="max-w-7xl mx-auto px-5 md:px-6 pt-5">

        <div className="bg-white/70 backdrop-blur-2xl border border-white/40 shadow-[0_10px_40px_rgba(0,0,0,.04)] rounded-[24px] px-5 md:px-7 h-16 flex items-center justify-between">

          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="w-10 h-10 rounded-2xl bg-[#111111] flex items-center justify-center">

              <span className="text-white text-sm font-bold">
                F
              </span>

            </div>

            <div>

              <h1 className="text-lg font-bold text-[#111111] tracking-[-1px]">

                FASTY

              </h1>

              <p className="text-[10px] text-[#999]">

                Delivery Platform

              </p>

            </div>

          </Link>

          <nav className="hidden lg:flex items-center gap-10">

            <a
              href="#"
              className="text-sm text-[#666] hover:text-black transition-all"
            >
              Inicio
            </a>

            <a
              href="#"
              className="text-sm text-[#666] hover:text-black transition-all"
            >
              Restaurantes
            </a>

            <a
              href="#"
              className="text-sm text-[#666] hover:text-black transition-all"
            >
              Categorías
            </a>

          </nav>

          <div className="flex items-center gap-3">

            <Link
              href="/auth"
              className="hidden md:flex text-sm font-medium text-[#111111]"
            >

              Ingresar

            </Link>

            <Link
              href="/business"
              className="bg-[#111111] hover:bg-black text-white h-11 px-5 rounded-2xl text-sm font-medium flex items-center gap-2 transition-all"
            >

              Registrar negocio

              <ArrowRight size={15} />

            </Link>

          </div>

        </div>

      </div>

    </header>
  )
}