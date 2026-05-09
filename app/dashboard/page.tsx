'use client'

import {
  Store,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Bell,
  Search,
} from 'lucide-react'

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0f0f11] text-white flex">

      <aside className="w-[280px] dark-section luxury-border border-r p-8 hidden lg:flex flex-col">

        <div>

          <div className="flex items-center gap-4 mb-14">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center glow-orange">

              <span className="text-white text-xl font-black">

                F

              </span>

            </div>

            <div>

              <h1 className="text-2xl font-black tracking-[-1px]">

                FASTY

              </h1>

              <p className="text-zinc-500 text-sm">

                Dashboard

              </p>

            </div>

          </div>

          <div className="space-y-3">

            {[
              'Resumen',
              'Pedidos',
              'Productos',
              'Clientes',
              'Configuración',
            ].map((item, index) => (

              <button
                key={item}
                className={`w-full h-14 rounded-2xl px-5 flex items-center transition-all font-medium
                ${index === 0
                  ? 'bg-orange-500 text-white glow-orange'
                  : 'text-zinc-400 hover:bg-white/5'
                }`}
              >

                {item}

              </button>

            ))}

          </div>

        </div>

        <div className="mt-auto">

          <div className="dark-section luxury-border rounded-[28px] p-5">

            <p className="text-sm text-zinc-400 leading-relaxed">

              FASTY Business Premium Dashboard.

            </p>

          </div>

        </div>

      </aside>

      <section className="flex-1 p-6 md:p-10">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">

          <div>

            <p className="text-orange-500 uppercase tracking-[4px] text-xs font-semibold">

              PANEL ADMINISTRATIVO

            </p>

            <h1 className="text-4xl md:text-5xl font-black tracking-[-3px] mt-3">

              Bienvenido de nuevo

            </h1>

          </div>

          <div className="flex items-center gap-4">

            <div className="glass rounded-2xl h-12 px-5 flex items-center gap-3">

              <Search
                size={18}
                className="text-zinc-400"
              />

              <input
                type="text"
                placeholder="Buscar..."
                className="bg-transparent outline-none text-sm text-white placeholder:text-zinc-500"
              />

            </div>

            <button className="w-12 h-12 rounded-2xl glass flex items-center justify-center">

              <Bell
                size={18}
                className="text-white"
              />

            </button>

          </div>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          {[
            {
              title: '$12.4K',
              subtitle: 'Ingresos',
              icon: DollarSign,
            },
            {
              title: '1,248',
              subtitle: 'Pedidos',
              icon: ShoppingBag,
            },
            {
              title: '324',
              subtitle: 'Clientes',
              icon: Store,
            },
            {
              title: '+18%',
              subtitle: 'Crecimiento',
              icon: TrendingUp,
            },
          ].map((item) => {
            const Icon = item.icon

            return (

              <div
                key={item.title}
                className="dark-section luxury-border rounded-[32px] p-6 glow-orange"
              >

                <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center mb-6">

                  <Icon
                    size={24}
                    className="text-white"
                  />

                </div>

                <h2 className="text-4xl font-black tracking-[-2px]">

                  {item.title}

                </h2>

                <p className="text-zinc-400 mt-3">

                  {item.subtitle}

                </p>

              </div>

            )
          })}

        </div>

        <div className="grid xl:grid-cols-[1.3fr_.7fr] gap-6">

          <div className="dark-section luxury-border rounded-[36px] p-8">

            <div className="flex items-center justify-between mb-8">

              <div>

                <h2 className="text-2xl font-black">

                  Pedidos recientes

                </h2>

                <p className="text-zinc-500 mt-2">

                  Últimos movimientos dentro de FASTY.

                </p>

              </div>

            </div>

            <div className="space-y-4">

              {[1,2,3,4].map((item) => (

                <div
                  key={item}
                  className="bg-white/5 rounded-2xl p-5 flex items-center justify-between"
                >

                  <div>

                    <h3 className="font-semibold">

                      Pedido #{item}245

                    </h3>

                    <p className="text-sm text-zinc-500 mt-1">

                      Pizza Gold • Quibdó

                    </p>

                  </div>

                  <span className="text-orange-500 font-semibold">

                    En camino

                  </span>

                </div>

              ))}

            </div>

          </div>

          <div className="dark-section luxury-border rounded-[36px] p-8">

            <h2 className="text-2xl font-black">

              Rendimiento

            </h2>

            <p className="text-zinc-500 mt-2">

              Estadísticas generales.

            </p>

            <div className="mt-10 space-y-6">

              {[
                'Ventas',
                'Clientes',
                'Retención',
              ].map((item) => (

                <div key={item}>

                  <div className="flex items-center justify-between mb-2">

                    <span className="text-sm text-zinc-400">

                      {item}

                    </span>

                    <span className="text-sm font-semibold text-white">

                      85%

                    </span>

                  </div>

                  <div className="h-3 rounded-full bg-white/5 overflow-hidden">

                    <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-orange-500 to-orange-600" />

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}