'use client'

import {
  Search,
  Star,
  Clock3,
  ShoppingBag,
} from 'lucide-react'

export default function PhoneMockup() {
  return (
    <div className="relative">

      <div className="absolute inset-0 bg-orange-300/30 blur-3xl rounded-full scale-125 opacity-50" />

      <div className="relative w-[320px] h-[650px] rounded-[48px] bg-[#111111] p-3 shadow-[0_35px_100px_rgba(0,0,0,.25)]">

        <div className="w-full h-full bg-[#f8f8f8] rounded-[38px] overflow-hidden relative">

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-[#111111] rounded-b-3xl z-50" />

          <div className="bg-white px-6 pt-12 pb-6 border-b border-[#efefef]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-[#888]">
                  Delivery rápido
                </p>

                <h2 className="text-2xl font-black text-[#18181b] mt-1">
                  FASTY
                </h2>

              </div>

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">

                <span className="text-white font-black text-lg">
                  F
                </span>

              </div>

            </div>

            <div className="mt-6 flex items-center gap-4 bg-[#f7f7f7] border border-[#ececec] rounded-3xl px-5 h-14">

              <Search
                size={18}
                className="text-orange-500"
              />

              <input
                placeholder="Buscar comida..."
                className="bg-transparent outline-none text-sm w-full text-[#18181b] placeholder:text-[#888]"
              />

            </div>

          </div>

          <div className="p-5 space-y-5 overflow-y-auto h-[calc(100%-145px)]">

            <div className="relative rounded-[32px] overflow-hidden shadow-lg">

              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop"
                alt="Pizza"
                className="w-full h-48 object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />

              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xl px-3 py-2 rounded-2xl flex items-center gap-2 shadow-lg">

                <Star
                  size={14}
                  className="text-orange-500 fill-orange-500"
                />

                <span className="text-sm font-semibold text-[#18181b]">
                  4.9
                </span>

              </div>

              <div className="absolute bottom-5 left-5 right-5">

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="text-white text-2xl font-black">

                      Pizza Gold

                    </h3>

                    <div className="flex items-center gap-4 mt-2 text-white/80 text-sm">

                      <div className="flex items-center gap-1">

                        <Clock3 size={14} />

                        20 min

                      </div>

                      <span>
                        Pizza
                      </span>

                    </div>

                  </div>

                  <button className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center shadow-xl shadow-orange-500/30">

                    <ShoppingBag
                      size={22}
                      className="text-white"
                    />

                  </button>

                </div>

              </div>

            </div>

            <div className="bg-white border border-[#ececec] rounded-[30px] p-4 shadow-sm">

              <div className="flex items-center gap-4">

                <img
                  src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop"
                  alt="Burger"
                  className="w-24 h-24 object-cover rounded-2xl"
                />

                <div className="flex-1">

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <h3 className="font-black text-lg text-[#18181b]">

                        Burger House

                      </h3>

                      <p className="text-sm text-[#777] mt-1">

                        Hamburguesas premium

                      </p>

                    </div>

                    <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-xl text-sm font-semibold">

                      4.8

                    </div>

                  </div>

                  <div className="flex items-center justify-between mt-5">

                    <div className="flex items-center gap-2 text-[#777] text-sm">

                      <Clock3 size={14} />

                      15 min

                    </div>

                    <button className="bg-[#18181b] hover:bg-black text-white px-5 h-10 rounded-xl text-sm font-semibold transition-all">

                      Agregar

                    </button>

                  </div>

                </div>

              </div>

            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-[30px] p-5 text-white shadow-xl shadow-orange-500/20">

              <p className="text-sm text-white/80">
                Oferta especial
              </p>

              <h3 className="text-2xl font-black mt-2">
                30% OFF
              </h3>

              <p className="mt-2 text-white/90 text-sm leading-relaxed">

                En restaurantes seleccionados de FASTY.

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}