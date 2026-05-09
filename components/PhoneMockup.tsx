'use client'

export default function PhoneMockup() {
  return (
    <div className="relative">

      <div className="absolute inset-0 bg-orange-500/10 blur-3xl rounded-full scale-125" />

      <div className="relative w-[290px] h-[620px] rounded-[48px] border border-zinc-800 bg-[#111111] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,.6)]">

        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-orange-500 to-orange-400" />

        <div className="relative pt-28 px-5 space-y-5">

          <div className="rounded-[28px] overflow-hidden bg-zinc-900 border border-zinc-800">

            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop"
              alt="Pizza"
              className="w-full h-40 object-cover"
            />

            <div className="p-4">

              <div className="flex items-center justify-between">

                <h3 className="font-semibold text-lg text-white">
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

          <div className="rounded-[28px] overflow-hidden bg-zinc-900 border border-zinc-800">

            <img
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop"
              alt="Burger"
              className="w-full h-40 object-cover"
            />

            <div className="p-4">

              <div className="flex items-center justify-between">

                <h3 className="font-semibold text-lg text-white">
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
  )
}