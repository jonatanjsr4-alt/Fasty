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
    <section className="px-6">

      <div className="max-w-7xl mx-auto">

        <div className="relative overflow-hidden rounded-[42px] bg-[#111111] p-10 md:p-14 shadow-[0_30px_80px_rgba(0,0,0,.12)]">

          <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] bg-orange-500/10 blur-3xl rounded-full" />

          <div className="relative z-10">

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">

              <div>

                <p className="text-orange-500 uppercase tracking-[4px] text-sm font-semibold">

                  FASTY EN NÚMEROS

                </p>

                <h2 className="text-5xl md:text-6xl font-black text-white mt-5 leading-[1] tracking-[-3px]">

                  Delivery moderno
                  <br />

                  para Quibdó

                </h2>

              </div>

              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">

                FASTY conecta miles de usuarios con restaurantes,
                supermercados y negocios locales diariamente.

              </p>

            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

              {stats.map((stat) => {
                const Icon = stat.icon

                return (
                  <div
                    key={stat.title}
                    className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-7 hover:bg-white/[0.08] transition-all duration-500"
                  >

                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 blur-3xl rounded-full`} />

                    <div className="relative z-10">

                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-xl`}>

                        <Icon
                          size={28}
                          className="text-white"
                        />

                      </div>

                      <h3 className="text-5xl font-black text-white mt-8 tracking-[-2px]">

                        {stat.title}

                      </h3>

                      <p className="text-zinc-400 mt-4 text-lg leading-relaxed">

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