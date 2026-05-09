'use client'

import { Search, MapPin } from 'lucide-react'

export default function SearchBar() {
  return (
    <section>

      <div className="bg-white border border-[#efefef] rounded-[28px] p-4 shadow-[0_10px_30px_rgba(0,0,0,.04)]">

        <div className="grid lg:grid-cols-[1fr_1fr_auto] gap-4">

          <div className="flex items-center gap-4 bg-[#f7f7f5] rounded-2xl px-5 h-16">

            <Search className="w-5 h-5 text-[#666]" />

            <input
              type="text"
              placeholder="¿Qué deseas pedir hoy?"
              className="bg-transparent outline-none w-full text-[#18181b] placeholder:text-[#888]"
            />

          </div>

          <div className="flex items-center gap-4 bg-[#f7f7f5] rounded-2xl px-5 h-16">

            <MapPin className="w-5 h-5 text-[#666]" />

            <input
              type="text"
              placeholder="Ingresa tu dirección"
              className="bg-transparent outline-none w-full text-[#18181b] placeholder:text-[#888]"
            />

          </div>

          <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl px-8 h-16 font-semibold transition-all">

            Buscar

          </button>

        </div>

      </div>

    </section>
  )
}