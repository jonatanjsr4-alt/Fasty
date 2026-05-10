'use client'

import Link from 'next/link'

export default function Navbar() {

  return (

    <header
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        px-6
        pt-6
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          glass
          rounded-[28px]
          px-7
          h-20
          flex
          items-center
          justify-between
        "
      >

        <Link href="/">

          <div className="flex items-center gap-3">

            <div
              className="
                w-11
                h-11
                rounded-2xl
                orange-gradient
                flex
                items-center
                justify-center
                font-black
                text-xl
              "
            >

              F

            </div>

            <div>

              <h1 className="text-2xl font-black leading-none">

                FASTY

              </h1>

              <p className="text-xs text-zinc-400">

                Delivery premium

              </p>

            </div>

          </div>

        </Link>

        <nav className="hidden lg:flex items-center gap-10 text-zinc-300 font-medium">

          <a
            href="#restaurantes"
            className="hover:text-white transition-all"
          >

            Restaurantes

          </a>

          <a
            href="#categorias"
            className="hover:text-white transition-all"
          >

            Categorías

          </a>

          <a
            href="#negocios"
            className="hover:text-white transition-all"
          >

            Negocios

          </a>

          <a
            href="#contacto"
            className="hover:text-white transition-all"
          >

            Contacto

          </a>

        </nav>

        <div className="flex items-center gap-4">

          <button
            className="
              hidden
              md:flex
              h-12
              px-6
              rounded-2xl
              glass
              items-center
              justify-center
              font-semibold
            "
          >

            Ingresar

          </button>

          <button
            className="
              h-12
              px-6
              rounded-2xl
              orange-gradient
              glow-orange
              font-bold
            "
          >

            Descargar app

          </button>

        </div>

      </div>

    </header>

  )
}