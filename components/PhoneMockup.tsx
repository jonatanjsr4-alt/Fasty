'use client'

export default function PhoneMockup() {
  return (
    <div className="relative">

      <div className="absolute inset-0 bg-orange-500/10 blur-3xl rounded-full scale-125" />

      <div className="relative w-[300px] h-[640px] rounded-[52px] border border-[#e7ded4] bg-[#fffaf4] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,.08)]">

        <div className="absolute top-0 left-0 right-0 h-24 bg-[#f5efe6]" />

        <div className="relative pt-28 px-5">

          <div className="flex items-center justify-between mb-6">

            <div>

              <p className="text-[#7c6f64] text-sm">
                Delivery
              </p>

              <h2 className="text-[#18181b] text-2xl font-bold">
                FASTY
              </h2>

            </div>

            <div className="w-11 h-11 rounded-2xl bg-orange-500 flex items-center justify-center">

              <span className="text-white font-bold">
                F
              </span>

            </div>

          </div>

          <div className="space-y-5">

            <div className="bg-white border border-[#e7ded4] rounded-[28px] overflow-hidden shadow-sm">

              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop"
                alt="Pizza"
                className="w-full h-40 object-cover"
              />

              <div className="p-4">

                <div className="flex items-center justify-between">

                  <h3 className="text-[#18181b] font-semibold text-lg">
                    Pizza Gold
                  </h3>

                  <span className="text-orange-500 text-sm">
                    ★ 4.9
                  </span>

                </div>

                <p className="text-[#7c6f64] text-sm mt-2">
                  Pizza • 20 min
                </p>

              </div>

            </div>

            <div className="bg-white border border-[#e7ded4] rounded-[28px] overflow-hidden shadow-sm">

              <img
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop"
                alt="Burger"
                className="w-full h-40 object-cover"
              />

              <div className="p-4">

                <div className="flex items-center justify-between">

                  <h3 className="text-[#18181b] font-semibold text-lg">
                    Burger House
                  </h3>

                  <span className="text-orange-500 text-sm">
                    ★ 4.8
                  </span>

                </div>

                <p className="text-[#7c6f64] text-sm mt-2">
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