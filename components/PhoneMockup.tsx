'use client'

import {
  Star,
  Clock3,
  Search,
} from 'lucide-react'

export default function PhoneMockup() {
  return (
    <div className="relative">

      <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full scale-110" />

      <div className="relative w-[310px] h-[640px] rounded-[48px] bg-black border-[6px] border-zinc-800 shadow-[0_40px_120px_rgba(0,0,0,.45)] overflow-hidden">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-black rounded-b-3xl z-30" />

        <div className="w-full h-full bg-[#f8f6f2] overflow-hidden">

          <div className="px-5 pt-12 pb-5 bg-white border-b border-[#ececec]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-[#888]">

                  Delivery rápido

                </p>

                <h2 className="text-2xl font-black tracking-[-1px] text-[#111111] mt-1">

                  FASTY

                </h2>

              </div>

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-orange">

                <span className="text-white font-black">
                  F
                </span>

              </div>

            </div>

            <div className="mt-5 bg-[#f5f5f5] rounded-2xl h-14 px-4 flex items-center gap-3">

              <Search
                size={18}
                className="text-[#999]"
              />

              <p className="text-[#777] text-sm">

                Buscar restaurantes

              </p>

            </div>

          </div>

          <div className="p-4 space-y-5">

            <div className="relative overflow-hidden rounded-[30px] shadow-lg">

              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop"
                alt="Pizza"
                className="w-full h-44 object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute top-4 left-4">

                <div className="bg-white/90 backdrop-blur-xl rounded-full px-3 py-1.5 flex items-center gap-2">

                  <Star
                    size={13}
                    className="text-orange-500 fill-orange-500"
                  />

                  <span className="text-xs font-semibold">

                    4.9

                  </span>

                </div>

              </div>

              <div className="absolute bottom-4 left-4 right-4">

                <div className="bg-white/85 backdrop-blur-2xl rounded-[24px] p-4 border border-white/20">

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <p className="text-xs text-[#888]">

                        Pizza

                      </p>

                      <h3 className="text-xl font-black tracking-[-1px] text-[#111111] mt-1">

                        Pizza Gold

                      </h3>

                    </div>

                    <div className="w-11 h-11 rounded-2xl bg-orange-500 flex items-center justify-center shadow-orange">

                      <Clock3
                        size={18}
                        className="text-white"
                      />

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-[28px] p-4 border border-[#ececec] shadow-sm">

              <div className="flex items-center gap-4">

                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop"
                  alt="Burger"
                  className="w-20 h-20 rounded-2xl object-cover"
                />

                <div className="flex-1">

                  <p className="text-xs text-[#888]">

                    Hamburguesas

                  </p>

                  <h3 className="text-lg font-black tracking-[-1px] text-[#111111] mt-1">

                    Burger House

                  </h3>

                  <div className="flex items-center gap-2 mt-2">

                    <Star
                      size={14}
                      className="text-orange-500 fill-orange-500"
                    />

                    <span className="text-sm font-medium text-[#666]">

                      4.8

                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}