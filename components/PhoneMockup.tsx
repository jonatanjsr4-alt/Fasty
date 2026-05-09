'use client'

export default function PhoneMockup() {
  return (
    <div className="relative">

      <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full scale-125" />

      <div className="relative w-[290px] h-[580px] rounded-[48px] border border-white/10 bg-[#1a1a1a] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,.45)]">

        <div className="absolute top-0 left-0 right-0 h-20 bg-[#202020]" />

        <div className="relative pt-20 px-4">

          <div className="flex items-center justify-between mb-5">

            <div>

              <p className="text-zinc-400 text-sm">
                Delivery
              </p>

              <h2 className="text-white text-2xl font-bold">
                FASTY
              </h2>

            </div>

            <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center">

              <span className="text-white font-bold">
                F
              </span>

            </div>

          </div>

          <div className="space-y-4">

            <div className="bg-[#232323] border border-white/5 rounded-[26px] overflow-hidden">

              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop"
                alt="Pizza"
                className="w-full h-28 object-cover"
              />

              <div className="p-4">

                <div className="flex items-center justify-between">

                  <h3 className="text-white font-semibold text-base">
                    Pizza Gold
                  </h3>

                  <span className="text-orange-400 text-sm">
                    ★ 4.9
                  </span>

                </div>

                <p className="text-zinc-400 text-sm mt-2">
                  Pizza • 20 min
                </p>

              </div>

            </div>

            <div className="bg-[#232323] border border-white/5 rounded-[26px] overflow-hidden">

              <img
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop"
                alt="Burger"
                className="w-full h-28 object-cover"
              />

              <div className="p-4">

                <div className="flex items-center justify-between">

                  <h3 className="text-white font-semibold text-base">
                    Burger House
                  </h3>

                  <span className="text-orange-400 text-sm">
                    ★ 4.8
                  </span>

                </div>

                <p className="text-zinc-400 text-sm mt-2">
                  Hamburguesas • 15 min
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}