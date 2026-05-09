export default function CTA() {
  return (
    <section className="px-6 py-24">

      <div className="max-w-7xl mx-auto">

        <div className="relative overflow-hidden rounded-[50px] bg-[#18181b] px-10 md:px-20 py-24">

          <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">

            <div>

              <p className="text-orange-400 uppercase tracking-[4px] text-sm font-semibold">

                FASTY PREMIUM DELIVERY

              </p>

              <h2 className="text-white text-5xl md:text-7xl leading-[0.95] tracking-[-4px] font-black mt-8">

                Todo lo que necesitas,
                <br />

                entregado
                <br />

                rápidamente.

              </h2>

              <p className="text-zinc-400 text-xl leading-relaxed mt-10 max-w-xl">

                Desde restaurantes hasta supermercados y negocios locales.

              </p>

              <div className="flex flex-col sm:flex-row gap-5 mt-14">

                <button className="bg-orange-500 hover:bg-orange-600 transition-all text-white px-9 py-5 rounded-2xl font-semibold text-lg">

                  Pedir ahora

                </button>

                <button className="border border-zinc-700 hover:border-zinc-500 transition-all text-white px-9 py-5 rounded-2xl font-semibold text-lg">

                  Conocer más

                </button>

              </div>

            </div>

            <div className="relative">

              <img
                src="https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1400&auto=format&fit=crop"
                alt="Delivery"
                className="rounded-[40px] h-[500px] w-full object-cover"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}