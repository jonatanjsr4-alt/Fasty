'use client'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#f5efe6]/80 backdrop-blur-xl border-b border-[#e7ded4]">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center shadow-sm">

            <span className="text-white font-black text-sm">
              F
            </span>

          </div>

          <h1 className="text-xl font-bold tracking-tight text-[#18181b]">
            FASTY
          </h1>

        </div>

        <nav className="hidden md:flex items-center gap-10 text-sm text-[#7c6f64]">

          <a href="#" className="hover:text-[#18181b] transition-all">
            Inicio
          </a>

          <a href="#" className="hover:text-[#18181b] transition-all">
            Negocios
          </a>

          <a href="#" className="hover:text-[#18181b] transition-all">
            Categorías
          </a>

          <a href="#" className="hover:text-[#18181b] transition-all">
            Contacto
          </a>

        </nav>

        <button className="bg-[#18181b] text-white hover:bg-black transition-all px-5 py-2.5 rounded-xl text-sm font-semibold">
          Ingresar
        </button>

      </div>

    </header>
  )
}