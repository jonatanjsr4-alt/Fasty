import {
  Search,
  ShoppingBag,
  Bike,
  ArrowRight,
} from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Explora negocios',
    text: 'Encuentra restaurantes, supermercados y tiendas locales fácilmente.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Haz tu pedido',
    text: 'Ordena rápidamente desde una experiencia moderna y simple.',
    icon: ShoppingBag,
  },
  {
    number: '03',
    title: 'Recibe en minutos',
    text: 'FASTY conecta entregas rápidas y seguras en tu ciudad.',
    icon: Bike,
  },
]

export default function HowItWorks() {
  return (
    <section className="px-5 md:px-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">

          <div>

            <p className="text-orange-500 uppercase tracking-[4px] text-xs font-semibold">

              Cómo funciona

            </p>

            <h2 className="text-4xl md:text-5xl font-black text-[#18181b] mt-3 leading-none tracking-[-2px]">

              Delivery simple,
              <br />

              rápido y moderno

            </h2>

          </div>

          <p className="text-[#666] text-base md:text-lg leading-relaxed max-w-xl">

            FASTY simplifica la forma de pedir comida,
            supermercados y productos locales en Quibdó.

          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-5">

          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <div
                key={step.number}
                className="group relative overflow-hidden bg-white border border-[#ececec] rounded-[30px] p-6 hover:shadow-[0_15px_40px_rgba(0,0,0,.06)] hover:-translate-y-1 transition-all duration-300"
              >

                <div className="absolute top-0 right-0 w-28 h-28 bg-orange-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

                <div className="relative z-10">

                  <div className="flex items-center justify-between mb-7">

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">

                      <Icon
                        size={24}
                        className="text-white"
                      />

                    </div>

                    <span className="text-5xl font-black text-[#f3f3f3] leading-none tracking-[-3px]">

                      {step.number}

                    </span>

                  </div>

                  <h3 className="text-2xl font-black text-[#18181b] leading-tight">

                    {step.title}

                  </h3>

                  <p className="text-[#666] leading-relaxed mt-4 text-sm md:text-base">

                    {step.text}

                  </p>

                  <div className="flex items-center gap-2 mt-7 text-orange-500 text-sm font-semibold">

                    Continuar

                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-all"
                    />

                  </div>

                </div>

                {index !== steps.length - 1 && (

                  <div className="hidden lg:block absolute top-1/2 -right-3 z-20">

                    <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">

                      <ArrowRight
                        size={14}
                        className="text-white"
                      />

                    </div>

                  </div>

                )}

              </div>
            )
          })}

        </div>

      </div>

    </section>
  )
}