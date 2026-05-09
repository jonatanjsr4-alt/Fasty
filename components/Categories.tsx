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

        <div className="mb-12">

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Categorías
          </h2>

          <p className="text-zinc-500 mt-3">
            Encuentra lo que necesitas rápidamente.
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">

          {categories.map((category) => {
            const Icon = category.icon

            return (
              <div
                key={category.name}
                className="bg-[#111111] border border-zinc-900 hover:border-zinc-700 transition-all rounded-3xl p-6"
              >

                <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center mb-5">

                  <Icon className="w-6 h-6 text-orange-400" />

                </div>

                <h3 className="text-white font-medium text-sm leading-snug">
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