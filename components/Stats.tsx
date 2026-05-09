export default function Stats() {
  return (
    <section className="px-6">

      <div className="max-w-7xl mx-auto">

        <div className="bg-[#fffaf4] border border-[#e7ded4] rounded-[40px] px-10 py-14 shadow-[0_10px_40px_rgba(0,0,0,.04)]">

          <div className="grid md:grid-cols-3 gap-10 items-center">

            <div>

              <p className="text-[#9b8773] uppercase tracking-[3px] text-sm font-semibold">
                FASTY EN NÚMEROS
              </p>

              <h2 className="text-4xl md:text-5xl font-black text-[#18181b] leading-tight mt-5">

                La nueva forma
                <br />

                de pedir en Quibdó.

              </h2>

            </div>

            <div className="flex flex-col gap-8">

              <div>

                <h3 className="text-5xl font-black text-orange-500">
                  +10K
                </h3>

                <p className="text-[#7c6f64] mt-2">
                  Pedidos entregados
                </p>

              </div>

              <div>

                <h3 className="text-5xl font-black text-[#18181b]">
                  +500
                </h3>

                <p className="text-[#7c6f64] mt-2">
                  Negocios activos
                </p>

              </div>

            </div>

            <div className="flex flex-col gap-8">

              <div>

                <h3 className="text-5xl font-black text-[#18181b]">
                  +20K
                </h3>

                <p className="text-[#7c6f64] mt-2">
                  Usuarios registrados
                </p>

              </div>

              <div>

                <h3 className="text-5xl font-black text-orange-500">
                  24/7
                </h3>

                <p className="text-[#7c6f64] mt-2">
                  Soporte disponible
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}