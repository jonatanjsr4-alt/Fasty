'use client'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#efefef]">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-2xl bg-orange-500 flex items-center justify-center">

            <span className="text-white font-bold">
              F
            </span>

          </div>

          <h1 className="text-2xl font-black text-[#18181b]">
            FASTY
          </h1>

        </div>

        <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-[#666]">

          <a href="#">
            Inicio
          </a>

          <a href="#">
            Negocios
          </a>

          <a href="#">
            Categorías
          </a>

          <a href="#">
            Contacto
          </a>

        </nav>

        <button className="bg-[#18181b] hover:bg-black text-white px-6 py-3 rounded-xl font-medium transition-all">

          Ingresar

        </button>

      </div>

    </header>
  )
}