'use client'

import { Search, MapPin } from 'lucide-react'

export default function SearchBar() {
  return (
    <section className="relative z-20">

      <div className="bg-[#fffaf4] border border-[#e7ded4] rounded-[32px] p-5 shadow-[0_10px_40px_rgba(0,0,0,.04)]">

        <div className="flex flex-col lg:flex-row gap-4">

          <div className="flex items-center gap-4 flex-1 bg-[#f5efe6] rounded-2xl px-5 h-16">

            <Search className="w-5 h-5 text-[#7c6f64]" />

            <input
              type="text"
              placeholder="¿Qué deseas pedir hoy?"
              className="bg-transparent outline-none w-full text-[#18181b] placeholder:text-[#7c6f64]"
            />

          </div>

          <div className="flex items-center gap-4 flex-1 bg-[#f5efe6] rounded-2xl px-5 h-16">

            <MapPin className="w-5 h-5 text-[#7c6f64]" />

            <input
              type="text"
              placeholder="Ingresa tu dirección"
              className="bg-transparent outline-none w-full text-[#18181b] placeholder:text-[#7c6f64]"
            />

          </div>

          <button className="bg-orange-500 hover:bg-orange-600 transition-all rounded-2xl px-8 h-16 text-white font-semibold">

            Buscar

          </button>

        </div>

      </div>

    </section>
  )
}