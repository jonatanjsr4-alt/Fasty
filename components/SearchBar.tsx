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

      <div className="relative bg-white/90 backdrop-blur-2xl border border-[#ececec] rounded-[30px] p-4 shadow-[0_15px_40px_rgba(0,0,0,.05)]">

        <div className="grid lg:grid-cols-[1.1fr_1fr_auto] gap-3">

          <div className="group flex items-center gap-3 bg-[#f8f8f8] hover:bg-white border border-transparent hover:border-orange-200 rounded-2xl px-4 h-[62px] transition-all">

            <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center flex-shrink-0">

              <Search
                className="w-4 h-4 text-orange-500"
              />

            </div>

            <div className="flex-1 min-w-0">

              <p className="text-[11px] text-[#999] mb-0.5">

                Buscar productos

              </p>

              <input
                type="text"
                placeholder="¿Qué deseas pedir hoy?"
                className="bg-transparent outline-none w-full text-sm text-[#18181b] placeholder:text-[#777] font-medium"
              />

            </div>

          </div>

          <div className="group flex items-center gap-3 bg-[#f8f8f8] hover:bg-white border border-transparent hover:border-orange-200 rounded-2xl px-4 h-[62px] transition-all">

            <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center flex-shrink-0">

              <MapPin
                className="w-4 h-4 text-orange-500"
              />

            </div>

            <div className="flex-1 min-w-0">

              <p className="text-[11px] text-[#999] mb-0.5">

                Dirección

              </p>

              <input
                type="text"
                placeholder="Ingresa tu ubicación"
                className="bg-transparent outline-none w-full text-sm text-[#18181b] placeholder:text-[#777] font-medium"
              />

            </div>

          </div>

          <button className="group bg-orange-500 hover:bg-orange-600 text-white rounded-2xl px-7 h-[62px] font-semibold text-sm transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2">

            Buscar

            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-all"
            />

          </button>

        </div>

      </div>

    </section>
  )
}