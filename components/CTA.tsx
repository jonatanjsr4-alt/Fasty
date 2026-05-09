export default function CTA() {
  return (
    <section className="px-6">

      <div className="max-w-7xl mx-auto">

        <div className="bg-orange-500 rounded-[40px] px-8 md:px-16 py-16 overflow-hidden">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>

              <h2 className="text-white text-4xl md:text-5xl font-black leading-tight max-w-xl">

                Todo lo que necesitas,
                entregado rápidamente.

              </h2>

              <p className="text-orange-100 text-lg mt-6 max-w-lg leading-relaxed">

                Restaurantes, supermercados y negocios locales en una sola plataforma.

              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">

                <button className="bg-white text-[#18181b] px-7 py-4 rounded-2xl font-semibold">

                  Pedir ahora

                </button>

                <button className="border border-white/30 text-white px-7 py-4 rounded-2xl font-semibold">

                  Conocer más

                </button>

              </div>

            </div>

            <div>

              <img
                src="https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1200&auto=format&fit=crop"
                alt="Delivery"
                className="w-full h-[420px] object-cover rounded-[32px]"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}