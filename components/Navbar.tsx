'use client'

import Link from 'next/link'
import { ShoppingBag, Menu } from 'lucide-react'

export default function Navbar() {

  return (

    <header className="fixed top-0 left-0 w-full z-50 px-6 py-5">

      <div className="max-w-7xl mx-auto">

        <div className="glass rounded-[28px] px-6 py-4 flex items-center justify-between">

          <Link
            href="/"
            className="flex items-center gap-4"
          >

            <div className="w-14 h-14 rounded-2xl orange-gradient flex items-center justify-center text-2xl font-black">

              F

            </div>

            <div>

              <h1 className="text-2xl font-black leading-none">
                FASTY
              </h1>

              <p className="text-sm text-zinc-400">
                Delivery Platform
              </p>

            </div>

          </Link>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium">

            <a
              href="#inicio"
              className="hover:text-orange-500"
            >
              Inicio
            </a>

            <a
              href="#restaurantes"
              className="hover:text-orange-500"
            >
              Restaurantes
            </a>

            <a
              href="#categorias"
              className="hover:text-orange-500"
            >
              Categorías
            </a>

            <a
              href="#app"
              className="hover:text-orange-500"
            >
              App
            </a>

          </div>

          <div className="flex items-center gap-3">

            <button className="w-14 h-14 rounded-2xl glass flex items-center justify-center">

              <ShoppingBag />

            </button>

            <button className="md:hidden w-14 h-14 rounded-2xl glass flex items-center justify-center">

              <Menu />

            </button>

            <button className="hidden md:flex h-14 px-7 rounded-2xl orange-gradient font-bold items-center">

              Ingresar

            </button>

          </div>

        </div>

      </div>

    </header>
  )
}