'use client'

import {
  Search,
  Star,
  Clock3,
  ShoppingBag,
} from 'lucide-react'

export default function PhoneMockup() {
  return (
    <div className="relative flex justify-center">

      <div className="absolute inset-0 bg-orange-300/20 blur-3xl rounded-full scale-125 opacity-40" />

      <div className="relative w-[280px] h-[570px] rounded-[42px] bg-[#111111] p-2.5 shadow-[0_25px_70px_rgba(0,0,0,.2)]">

        <div className="w-full h-full bg-[#f8f8f8] rounded-[34px] overflow-hidden relative">

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#111111] rounded-b-3xl z-50" />

          <div className="bg-white px-5 pt-10 pb-5 border-b border-[#efefef]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[11px] text-[#888]">
                  Delivery rápido
                </p>

                <h2 className="text-xl font-black text-[#18181b] mt-1">
                  FASTY
                </h2>

              </div>

              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">

                <span className="text-white font-black text-base">
                  F
                </span>

              </div>

            </div>

            <div className="mt-5 flex items-center gap-3 bg-[#f7f7f7] border border-[#ececec] rounded-2xl px-4 h-12">

              <Search
                size={16}
                className="text-orange-500"
              />

              <input
                placeholder="Buscar comida..."
                className="bg-transparent outline-none text-sm w-full text-[#18181b] placeholder:text-[#888]"
              />

            </div>

          </div>

          <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-125px)]">

            <div className="relative rounded-[26px] overflow-hidden shadow-md">

              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop"
                alt="Pizza"
                className="w-full h-40 object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />

              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xl px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-md">

                <Star
                  size={12}
                  className="text-orange-500 fill-orange-500"
                />

                <span className="text-xs font-semibold text-[#18181b]">
                  4.9
                </span>

              </div>

              <div className="absolute bottom-4 left-4 right-4">

                <div className="flex items-end justify-between">

                  <div>

                    <h3 className="text-white text-xl font-black">

                      Pizza Gold

                    </h3>

                    <div className="flex items-center gap-3 mt-1 text-white/80 text-xs">

                      <div className="flex items-center gap-1">

                        <Clock3 size={12} />

                        20 min

                      </div>

                      <span>
                        Pizza
                      </span>

                    </div>

                  </div>

                  <button className="w-11 h-11 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">

                    <ShoppingBag
                      size={18}
                      className="text-white"
                    />

                  </button>

                </div>

              </div>

            </div>

            <div className="bg-white border border-[#ececec] rounded-[24px] p-3 shadow-sm">

              <div className="flex items-center gap-3">

                <img
                  src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop"
                  alt="Burger"
                  className="w-20 h-20 object-cover rounded-2xl"
                />

                <div className="flex-1">

                  <div className="flex items-start justify-between gap-2">

                    <div>

                      <h3 className="font-black text-base text-[#18181b]">

                        Burger House

                      </h3>

                      <p className="text-xs text-[#777] mt-1">

                        Hamburguesas premium

                      </p>

                    </div>

                    <div className="bg-orange-100 text-orange-600 px-2.5 py-1 rounded-xl text-xs font-semibold">

                      4.8

                    </div>

                  </div>

                  <div className="flex items-center justify-between mt-4">

                    <div className="flex items-center gap-2 text-[#777] text-xs">

                      <Clock3 size={12} />

                      15 min

                    </div>

                    <button className="bg-[#18181b] hover:bg-black text-white px-4 h-8 rounded-xl text-xs font-semibold transition-all">

                      Agregar

                    </button>

                  </div>

                </div>

              </div>

            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-[24px] p-4 text-white shadow-lg shadow-orange-500/20">

              <p className="text-xs text-white/80">
                Oferta especial
              </p>

              <h3 className="text-xl font-black mt-1">
                30% OFF
              </h3>

              <p className="mt-2 text-white/90 text-xs leading-relaxed">

                En restaurantes seleccionados de FASTY.

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}