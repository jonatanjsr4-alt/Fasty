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
import FadeIn from './FadeIn'
const categories = [
  { name: 'Licores', icon: Wine },
  { name: 'Restaurantes', icon: Utensils },
  { name: 'Heladerías', icon: IceCream },
  { name: 'Educación', icon: GraduationCap },
  { name: 'Cafetería', icon: Coffee },
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
    <FadeIn>
  <section className="py-24 px-6 bg-zinc-950">

      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-extrabold text-white mb-12">
          Categorías
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {categories.map((category) => {
            const Icon = category.icon

            return (
              <div
                key={category.name}
                className="glass-card rounded-3xl p-8 flex flex-col items-center justify-center"
              >

                <Icon className="w-12 h-12 text-orange-500 mb-4" />

                <span className="text-white font-semibold">
                  {category.name}
                </span>

              </div>
            )
          })}

        </div>

      </div>

       </section>
</FadeIn>
  )
}