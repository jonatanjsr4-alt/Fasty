'use client'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-zinc-900">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-2xl bg-orange-500 flex items-center justify-center">

            <span className="text-black font-black text-sm">
              F
            </span>

          </div>

          <h1 className="text-xl font-bold tracking-tight text-white">
            FASTY
          </h1>

        </div>

        <nav className="hidden md:flex items-center gap-10 text-sm text-zinc-400">

          <a href="#" className="hover:text-white transition-all">
            Inicio
          </a>

          <a href="#" className="hover:text-white transition-all">
            Negocios
          </a>

          <a href="#" className="hover:text-white transition-all">
            Categorías
          </a>

          <a href="#" className="hover:text-white transition-all">
            Contacto
          </a>

        </nav>

        <button className="bg-white text-black hover:bg-zinc-200 transition-all px-5 py-2.5 rounded-xl text-sm font-semibold">
          Ingresar
        </button>

      </div>

    </header>
  )
}