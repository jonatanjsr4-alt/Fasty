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
    <section className="px-6">

      <div className="max-w-7xl mx-auto">

        <div className="mb-14">

          <h2 className="text-3xl md:text-4xl font-bold text-[#18181b]">
            Categorías
          </h2>

          <p className="text-[#7c6f64] mt-3 text-lg">
            Encuentra lo que necesitas rápidamente.
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">

          {categories.map((category) => {
            const Icon = category.icon

            return (
              <div
                key={category.name}
                className="bg-[#fffaf4] border border-[#e7ded4] rounded-[28px] p-6 hover:shadow-[0_10px_30px_rgba(0,0,0,.05)] transition-all duration-300"
              >

                <div className="w-14 h-14 rounded-2xl bg-[#f5efe6] flex items-center justify-center mb-5">

                  <Icon className="w-6 h-6 text-orange-500" />

                </div>

                <h3 className="text-[#18181b] font-semibold text-sm leading-snug">
                  {category.name}
                </h3>

              </div>
            )
          })}

        </div>

      </div>

    </section>
  )
}