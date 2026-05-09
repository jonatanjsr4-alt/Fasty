'use client'

export default function PhoneMockup() {
  return (
    <div className="relative">

      <div className="absolute inset-0 bg-orange-200 blur-3xl opacity-40 rounded-full scale-125" />

      <div className="relative w-[280px] h-[560px] rounded-[42px] bg-[#1c1c1e] p-3 shadow-[0_25px_60px_rgba(0,0,0,.25)]">

        <div className="w-full h-full bg-[#f7f7f5] rounded-[34px] overflow-hidden">

          <div className="bg-white px-5 pt-5 pb-4 border-b border-[#efefef]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-[#666]">
                  Delivery rápido
                </p>

                <h2 className="text-xl font-bold text-[#18181b]">
                  FASTY
                </h2>

              </div>

              <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center">

                <span className="text-white font-bold">
                  F
                </span>

              </div>

            </div>

          </div>

          <div className="p-4 space-y-4">

            <div className="bg-white rounded-3xl overflow-hidden border border-[#efefef]">

              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop"
                alt="Pizza"
                className="w-full h-32 object-cover"
              />

              <div className="p-4">

                <div className="flex items-center justify-between">

                  <h3 className="font-semibold text-[#18181b]">
                    Pizza Gold
                  </h3>

                  <span className="text-orange-500 text-sm font-semibold">
                    ★ 4.9
                  </span>

                </div>

                <p className="text-sm text-[#666] mt-2">
                  Pizza • 20 min
                </p>

              </div>

            </div>

            <div className="bg-white rounded-3xl overflow-hidden border border-[#efefef]">

              <img
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop"
                alt="Burger"
                className="w-full h-32 object-cover"
              />

              <div className="p-4">

                <div className="flex items-center justify-between">

                  <h3 className="font-semibold text-[#18181b]">
                    Burger House
                  </h3>

                  <span className="text-orange-500 text-sm font-semibold">
                    ★ 4.8
                  </span>

                </div>

                <p className="text-sm text-[#666] mt-2">
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