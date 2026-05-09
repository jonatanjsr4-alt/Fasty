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

        <div className="flex items-center justify-between mb-10">

          <div>

            <h2 className="text-3xl font-bold text-[#18181b]">
              Categorías
            </h2>

            <p className="text-[#666] mt-2">
              Explora negocios y servicios.
            </p>

          </div>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

          {categories.map((category) => {
            const Icon = category.icon

            return (
              <div
                key={category.name}
                className="bg-white hover:bg-[#fafafa] border border-[#efefef] rounded-2xl p-5 transition-all duration-300 hover:shadow-lg"
              >

                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4">

                  <Icon className="w-5 h-5 text-orange-500" />

                </div>

                <h3 className="text-[#18181b] font-medium text-sm">
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