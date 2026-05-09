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
    <section className="px-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">

          <div>

            <p className="text-orange-500 uppercase tracking-[4px] text-sm font-semibold">

              Cómo funciona

            </p>

            <h2 className="text-5xl md:text-6xl font-black text-[#18181b] mt-5 leading-[1] tracking-[-3px]">

              Delivery simple,
              <br />

              rápido y moderno

            </h2>

          </div>

          <p className="text-[#666] text-lg leading-relaxed max-w-xl">

            FASTY simplifica la forma de pedir comida,
            supermercados y productos locales en Quibdó.

          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <div
                key={step.number}
                className="group relative overflow-hidden bg-white border border-[#ececec] rounded-[36px] p-8 hover:shadow-[0_25px_60px_rgba(0,0,0,.08)] hover:-translate-y-1 transition-all duration-500"
              >

                <div className="absolute top-0 right-0 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

                <div className="relative z-10">

                  <div className="flex items-center justify-between mb-10">

                    <div className="w-18 h-18 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-xl shadow-orange-500/20">

                      <Icon
                        size={30}
                        className="text-white"
                      />

                    </div>

                    <span className="text-6xl font-black text-[#f3f3f3] leading-none tracking-[-4px]">

                      {step.number}

                    </span>

                  </div>

                  <h3 className="text-3xl font-black text-[#18181b] leading-tight">

                    {step.title}

                  </h3>

                  <p className="text-[#666] leading-relaxed mt-6 text-lg">

                    {step.text}

                  </p>

                  <div className="flex items-center gap-3 mt-10 text-orange-500 font-semibold">

                    Continuar

                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-all"
                    />

                  </div>

                </div>

                {index !== steps.length - 1 && (

                  <div className="hidden lg:block absolute top-1/2 -right-4 z-20">

                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center shadow-xl shadow-orange-500/20">

                      <ArrowRight
                        size={16}
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