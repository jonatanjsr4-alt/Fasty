'use client'

import { Star, Clock, Plus } from 'lucide-react'

const stores = [
  {
    id: 1,
    name: 'Burger House',
    category: 'Hamburguesas',
    time: '20-30 min',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop',
  },

  {
    id: 2,
    name: 'Pizza Master',
    category: 'Pizza artesanal',
    time: '25-35 min',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
  },

  {
    id: 3,
    name: 'Sushi Go',
    category: 'Sushi premium',
    time: '30-40 min',
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1200&auto=format&fit=crop',
  },

  {
    id: 4,
    name: 'Healthy Bowl',
    category: 'Comida saludable',
    time: '15-25 min',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop',
  },
]

export default function FeaturedStores() {

  return (

    <section
      id="restaurantes"
      className="px-6 py-28"
    >

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">

          <div>

            <span className="text-orange-500 font-bold uppercase tracking-[4px]">

              Restaurantes destacados

            </span>

            <h2 className="text-6xl font-black mt-4 leading-[0.95]">

              Los más pedidos en FASTY

            </h2>

          </div>

          <p className="max-w-lg text-zinc-400 text-lg leading-relaxed">

            Descubre los restaurantes favoritos de la ciudad
            con entregas rápidas y una experiencia moderna.

          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-7">

          {stores.map((store) => (

            <div
              key={store.id}
              className="
                glass
                rounded-[32px]
                overflow-hidden
                card-hover
                group
              "
            >

              <div className="relative overflow-hidden">

                <img
                  src={store.image}
                  alt={store.name}
                  className="
                    w-full
                    h-[260px]
                    object-cover
                    transition-all
                    duration-500
                    group-hover:scale-110
                  "
                />

                <div className="absolute top-5 left-5">

                  <div className="glass rounded-full px-4 py-2 flex items-center gap-2">

                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />

                    <span className="font-bold">

                      {store.rating}

                    </span>

                  </div>

                </div>

                <button
                  className="
                    absolute
                    bottom-5
                    right-5
                    w-14
                    h-14
                    rounded-2xl
                    orange-gradient
                    flex
                    items-center
                    justify-center
                    glow-orange
                  "
                >

                  <Plus />

                </button>

              </div>

              <div className="p-6">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <h3 className="text-3xl font-black leading-none">

                      {store.name}

                    </h3>

                    <p className="text-zinc-400 mt-3">

                      {store.category}

                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3 mt-6 text-zinc-400">

                  <Clock size={18} />

                  <span>

                    {store.time}

                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  )
}