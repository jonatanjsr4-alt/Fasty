'use client'

import {
  Search,
  MapPin,
  ArrowRight,
} from 'lucide-react'

export default function SearchBar() {
  return (
  <section className="relative">

    <div className="absolute inset-0 bg-orange-200/30 blur-3xl rounded-full scale-110 opacity-30" />

    <div className="relative glass rounded-[36px] p-5 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,.12)] bg-white">

      <div className="grid lg:grid-cols-[1.2fr_1fr_auto] gap-4">

        <div className="group flex items-center gap-4 bg-[#f8f8f8] hover:bg-white border border-transparent hover:border-orange-200 rounded-3xl px-6 h-[76px] transition-all">

          <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">

            <Search
              className="w-5 h-5 text-orange-500"
            />

          </div>

          <div className="flex-1">

            <p className="text-xs text-[#999] mb-1">

              Buscar productos

            </p>

            <input
              type="text"
              placeholder="¿Qué deseas pedir hoy?"
              className="bg-transparent outline-none w-full text-[#111111] placeholder:text-[#777] font-medium"
            />

          </div>

        </div>

        <div className="group flex items-center gap-4 bg-[#f8f8f8] hover:bg-white border border-transparent hover:border-orange-200 rounded-3xl px-6 h-[76px] transition-all">

          <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">

            <MapPin
              className="w-5 h-5 text-orange-500"
            />

          </div>

          <div className="flex-1">

            <p className="text-xs text-[#999] mb-1">

              Dirección

            </p>

            <input
              type="text"
              placeholder="Ingresa tu ubicación"
              className="bg-transparent outline-none w-full text-[#111111] placeholder:text-[#777] font-medium"
            />

          </div>

        </div>

        <button className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:scale-[1.02] text-white rounded-3xl px-10 h-[76px] font-semibold transition-all shadow-orange flex items-center justify-center gap-3">

          Buscar

          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-all"
          />

        </button>

      </div>

    </div>

  </section>
)
  
}