import Navbar from '@/components/Navbar'

export default function HomePage() {

  return (

    <main className="min-h-screen bg-black text-white overflow-hidden">

      <Navbar />

      <section
        id="inicio"
        className="relative min-h-screen flex items-center px-6 pt-40"
      >

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center">

          <div>

            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full glass mb-8">

              <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />

              <span className="text-sm text-zinc-300">

                FASTY disponible en Quibdó

              </span>

            </div>

            <h1 className="text-[70px] md:text-[110px] leading-[0.9] font-black tracking-[-6px]">

              Todo lo que necesitas,

              <span className="text-orange-500">
                {' '}entregado rápido
              </span>

            </h1>

            <p className="mt-8 text-xl text-zinc-400 max-w-xl leading-relaxed">

              Restaurantes, supermercados, farmacias
              y negocios locales en una sola plataforma moderna.

            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <button className="h-16 px-8 rounded-2xl orange-gradient font-bold text-lg">

                Pedir ahora

              </button>

              <button className="h-16 px-8 rounded-2xl glass font-bold text-lg">

                Registrar negocio

              </button>

            </div>

            <div className="flex gap-14 mt-16">

              <div>

                <h3 className="text-6xl font-black">
                  +10K
                </h3>

                <p className="text-zinc-500 mt-2">
                  Pedidos
                </p>

              </div>

              <div>

                <h3 className="text-6xl font-black">
                  +500
                </h3>

                <p className="text-zinc-500 mt-2">
                  Negocios
                </p>

              </div>

              <div>

                <h3 className="text-6xl font-black">
                  24/7
                </h3>

                <p className="text-zinc-500 mt-2">
                  Soporte
                </p>

              </div>

            </div>

          </div>

          <div className="relative flex justify-center">

            <div className="absolute w-[600px] h-[600px] bg-orange-500/20 blur-[140px] rounded-full" />

            <div className="relative w-[360px] h-[720px] rounded-[50px] glass border border-white/10 overflow-hidden animate-[floatPhone_5s_ease-in-out_infinite]">

              <div className="h-16 flex items-center justify-center">

                <div className="w-40 h-8 rounded-full bg-black" />

              </div>

              <div className="p-6">

                <div className="w-full h-16 rounded-2xl bg-white text-black flex items-center px-5 font-medium">

                  Buscar restaurantes

                </div>

                <div className="mt-6 space-y-5">

                  {[1,2,3].map((item) => (

                    <div
                      key={item}
                      className="glass rounded-3xl overflow-hidden"
                    >

                      <div className="h-40 bg-zinc-800" />

                      <div className="p-5">

                        <div className="flex items-center justify-between">

                          <h3 className="text-2xl font-bold">
                            Burger House
                          </h3>

                          <span className="text-orange-500 font-bold">
                            4.9
                          </span>

                        </div>

                        <p className="text-zinc-400 mt-2">

                          Hamburguesas • 20 min

                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}