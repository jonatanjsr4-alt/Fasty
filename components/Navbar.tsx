'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-zinc-800'
          : 'bg-transparent'
      }`}
    >

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <h1 className="text-3xl font-extrabold text-orange-500">
          FASTY
        </h1>

        <nav className="hidden md:flex gap-8 text-gray-300">

          <a href="#" className="hover:text-orange-500 transition-all">
            Inicio
          </a>

          <a href="#" className="hover:text-orange-500 transition-all">
            Categorías
          </a>

          <a href="#" className="hover:text-orange-500 transition-all">
            Negocios
          </a>

          <a href="#" className="hover:text-orange-500 transition-all">
            Contacto
          </a>

        </nav>

        <div className="hidden md:block">
          <button className="bg-orange-500 hover:bg-orange-600 transition-all px-7 py-3 rounded-2xl font-bold">
            Ingresar
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>

      </div>

      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-zinc-800 px-6 py-8">

          <div className="flex flex-col gap-6 text-xl text-gray-300">

            <a href="#" className="hover:text-orange-500 transition-all">
              Inicio
            </a>

            <a href="#" className="hover:text-orange-500 transition-all">
              Categorías
            </a>

            <a href="#" className="hover:text-orange-500 transition-all">
              Negocios
            </a>

            <a href="#" className="hover:text-orange-500 transition-all">
              Contacto
            </a>

            <button className="bg-orange-500 hover:bg-orange-600 transition-all px-7 py-4 rounded-2xl font-bold mt-4">
              Ingresar
            </button>

          </div>

        </div>
      )}

    </header>
  )
}