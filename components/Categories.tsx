import {
  Wine,
  Utensils,
  IceCream,
  GraduationCap,
  Coffee,
  ShoppingCart,
  Shirt,
  Sparkles,
  HeartPulse,
  Home,
  Smartphone,
  Wrench,
  Dumbbell,
  ArrowUpRight,
} from 'lucide-react'

const categories = [
  { name: 'Licores', icon: Wine },
  { name: 'Restaurantes', icon: Utensils },
  { name: 'Heladerías', icon: IceCream },
  { name: 'Educación', icon: GraduationCap },
  { name: 'Cafeterías', icon: Coffee },
  { name: 'Supermercados', icon: ShoppingCart },
  { name: 'Moda', icon: Shirt },
  { name: 'Belleza', icon: Sparkles },
  { name: 'Salud', icon: HeartPulse },
  { name: 'Hogar', icon: Home },
  { name: 'Tecnología', icon: Smartphone },
  { name: 'Mantenimiento', icon: Wrench },
  { name: 'Deporte', icon: Dumbbell },
]

export default function Categories() {
  return (
    <section className="px-5 md:px-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-10">

          <div>

            <p className="text-orange-500 uppercase tracking-[4px] text-xs font-semibold">

              Categorías

            </p>

            <h2 className="text-4xl md:text-5xl font-black text-[#18181b] mt-3 leading-none">

              Explora FASTY

            </h2>

            <p className="text-[#666] mt-4 text-base md:text-lg leading-relaxed max-w-2xl">

              Descubre restaurantes, tiendas y servicios
              disponibles dentro de FASTY.

            </p>

          </div>

          <button className="bg-white border border-[#ececec] hover:border-orange-300 hover:shadow-md transition-all px-6 h-12 rounded-2xl font-semibold flex items-center gap-3 text-sm">

            Ver categorías

            <ArrowUpRight size={16} />

          </button>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">

          {categories.map((category) => {
            const Icon = category.icon

            return (
              <div
                key={category.name}
                className="group relative overflow-hidden bg-white border border-[#ececec] rounded-[26px] p-5 hover:shadow-[0_15px_40px_rgba(0,0,0,.06)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >

                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

                <div className="relative z-10">

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center mb-5 group-hover:scale-105 transition-all duration-300 shadow-sm">

                    <Icon className="w-6 h-6 text-orange-500" />

                  </div>

                  <div className="flex items-start justify-between gap-2">

                    <div>

                      <h3 className="text-[#18181b] font-bold text-[15px] leading-snug">

                        {category.name}

                      </h3>

                      <p className="text-[#888] text-xs mt-1">

                        FASTY

                      </p>

                    </div>

                    <div className="w-9 h-9 rounded-xl bg-[#f7f7f7] group-hover:bg-orange-500 transition-all flex items-center justify-center flex-shrink-0">

                      <ArrowUpRight
                        size={16}
                        className="text-[#18181b] group-hover:text-white transition-all"
                      />

                    </div>

                  </div>

                </div>

              </div>
            )
          })}

        </div>

      </div>

    </section>
  )
}