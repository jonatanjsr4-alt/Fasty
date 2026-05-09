import {
  ShoppingBag,
  Store,
  Users,
  Headphones,
} from 'lucide-react'

const stats = [
  {
    title: '+10K',
    subtitle: 'Pedidos entregados',
    icon: ShoppingBag,
    gradient: 'from-orange-500 to-orange-600',
  },
  {
    title: '+500',
    subtitle: 'Negocios activos',
    icon: Store,
    gradient: 'from-[#18181b] to-[#2a2a2a]',
  },
  {
    title: '+20K',
    subtitle: 'Usuarios registrados',
    icon: Users,
    gradient: 'from-orange-400 to-orange-500',
  },
  {
    title: '24/7',
    subtitle: 'Soporte disponible',
    icon: Headphones,
    gradient: 'from-[#18181b] to-[#2a2a2a]',
  },
]

export default function Stats() {
  return (
    <section className="px-5 md:px-6">

      <div className="max-w-7xl mx-auto">

        <div className="relative overflow-hidden rounded-[34px] dark-section p-7 md:p-10 glow-orange-[0_20px_60px_rgba(0,0,0,.10)]">

          <div className="absolute top-[-180px] right-[-180px] w-[380px] h-[380px] bg-orange-500/10 blur-3xl rounded-full" />

          <div className="relative z-10">

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">

              <div>

                <p className="text-orange-500 uppercase tracking-[4px] text-xs font-semibold">

                  FASTY EN NÚMEROS

                </p>

                <h2 className="text-4xl md:text-5xl font-black text-white mt-3 leading-none tracking-[-2px]">

                  Delivery moderno
                  <br />

                  para Quibdó

                </h2>

              </div>

              <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl">

                FASTY conecta miles de usuarios con restaurantes,
                supermercados y negocios locales diariamente.

              </p>

            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">

              {stats.map((stat) => {
                const Icon = stat.icon

                return (
                  <div
                    key={stat.title}
                    className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-[26px] p-5 hover:bg-white/[0.08] transition-all duration-300"
                  >

                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 blur-3xl rounded-full`} />

                    <div className="relative z-10">

                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>

                        <Icon
                          size={24}
                          className="text-white"
                        />

                      </div>

                      <h3 className="text-4xl font-black text-white mt-6 tracking-[-2px]">

                        {stat.title}

                      </h3>

                      <p className="text-zinc-400 mt-3 text-sm md:text-base leading-relaxed">

                        {stat.subtitle}

                      </p>

                    </div>

                  </div>
                )
              })}

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}