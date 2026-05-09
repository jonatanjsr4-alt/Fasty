import {
  Search,
  ShoppingCart,
  Bike
} from 'lucide-react'

const steps = [
  {
    title: 'Busca',
    description: 'Encuentra restaurantes, tiendas y servicios cerca de ti.',
    icon: Search,
  },
  {
    title: 'Ordena',
    description: 'Realiza pedidos rápidos y seguros desde FASTY.',
    icon: ShoppingCart,
  },
  {
    title: 'Recibe',
    description: 'Tu pedido llega rápido y en tiempo real.',
    icon: Bike,
  },
]

export default function HowItWorks() {
  return (
    <section className="py-28 px-6 bg-black">

      <div className="max-w-7xl mx-auto text-center">

        <h2 className="text-5xl font-extrabold text-white">
          ¿Cómo funciona?
        </h2>

        <p className="text-gray-400 mt-6 text-xl max-w-3xl mx-auto">
          FASTY conecta usuarios, negocios y domiciliarios en una sola plataforma.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">

          {steps.map((step) => {
            const Icon = step.icon

            return (
              <div
                key={step.title}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 hover:border-orange-500 transition-all"
              >

                <div className="w-20 h-20 bg-orange-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8">

                  <Icon className="w-10 h-10 text-orange-500" />

                </div>

                <h3 className="text-3xl font-bold text-white">
                  {step.title}
                </h3>

                <p className="text-gray-400 mt-5 text-lg">
                  {step.description}
                </p>

              </div>
            )
          })}

        </div>

      </div>

    </section>
  )
}