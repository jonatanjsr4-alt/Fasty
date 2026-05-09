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

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">

        <div>

          <p className="text-orange-500 uppercase tracking-[4px] text-sm font-medium">

            Categorías

          </p>

          <h2 className="text-5xl md:text-6xl font-black text-[#111111] mt-5 leading-[0.95] tracking-[-4px]">

            Explora FASTY

          </h2>

          <p className="text-[#666] mt-5 text-lg leading-relaxed max-w-2xl">

            Descubre restaurantes, tiendas y servicios
            disponibles dentro de FASTY.

          </p>

        </div>

        <button className="glass border border-white/10 hover:border-orange-500/30 transition-all px-7 h-14 rounded-2xl font-semibold flex items-center gap-3 text-white bg-[#111111]">

          Ver categorías

          <ArrowUpRight size={18} />

        </button>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">

        {categories.map((category) => {
          const Icon = category.icon

          return (
            <div
              key={category.name}
              className="group relative overflow-hidden bg-white rounded-[32px] p-6 border border-[#ececec] hover:border-orange-200 hover:shadow-[0_20px_50px_rgba(249,115,22,.12)] transition-all duration-500 hover:-translate-y-2"
            >

              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="relative z-10">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-6 shadow-orange">

                  <Icon className="w-7 h-7 text-white" />

                </div>

                <div className="flex items-start justify-between gap-3">

                  <div>

                    <h3 className="text-[#111111] font-black text-lg leading-snug">

                      {category.name}

                    </h3>

                    <p className="text-[#888] text-sm mt-2">

                      FASTY

                    </p>

                  </div>

                  <div className="w-11 h-11 rounded-2xl bg-[#f5f5f5] group-hover:bg-orange-500 transition-all flex items-center justify-center">

                    <ArrowUpRight
                      size={18}
                      className="text-[#111111] group-hover:text-white transition-all"
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