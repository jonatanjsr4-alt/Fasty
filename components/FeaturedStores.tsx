import {
  Star,
  Clock3,
  Heart,
  ArrowUpRight,
} from 'lucide-react'

const stores = [
  {
    name: 'Pizza Gold',
    category: 'Pizza',
    time: '20 min',
    rating: '4.9',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Burger House',
    category: 'Hamburguesas',
    time: '15 min',
    rating: '4.8',
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Helados Frost',
    category: 'Postres',
    time: '10 min',
    rating: '4.7',
    image:
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1200&auto=format&fit=crop',
  },
]

export default function FeaturedStores() {
  return (
    <section className="px-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">

          <div>

            <p className="text-orange-500 uppercase tracking-[4px] text-sm font-semibold">

              Restaurantes

            </p>

            <h2 className="text-5xl font-black text-[#18181b] mt-4">

              Negocios destacados

            </h2>

            <p className="text-[#666] mt-4 text-lg max-w-2xl leading-relaxed">

              Descubre los restaurantes y tiendas más populares dentro de FASTY.

            </p>

          </div>

          <button className="bg-white border border-[#ececec] hover:border-orange-300 transition-all px-7 h-14 rounded-2xl font-semibold flex items-center gap-3 shadow-sm">

            Ver todos

            <ArrowUpRight size={18} />

          </button>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {stores.map((store) => (

            <div
              key={store.name}
              className="group bg-white border border-[#ececec] rounded-[34px] overflow-hidden hover:shadow-[0_25px_60px_rgba(0,0,0,.08)] hover:-translate-y-1 transition-all duration-500"
            >

              <div className="relative overflow-hidden">

                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-all duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />

                <button className="absolute top-5 right-5 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-xl flex items-center justify-center shadow-lg">

                  <Heart
                    size={20}
                    className="text-[#18181b]"
                  />

                </button>

                <div className="absolute bottom-5 left-5 flex items-center gap-2 bg-white/95 backdrop-blur-xl px-4 py-2 rounded-2xl shadow-lg">

                  <Star
                    size={16}
                    className="text-orange-500 fill-orange-500"
                  />

                  <span className="font-semibold text-sm text-[#18181b]">

                    {store.rating}

                  </span>

                </div>

              </div>

              <div className="p-6">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <h3 className="text-2xl font-black text-[#18181b]">

                      {store.name}

                    </h3>

                    <p className="text-[#777] mt-2 text-lg">

                      {store.category}

                    </p>

                  </div>

                  <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-2xl text-sm font-semibold">

                    Popular

                  </div>

                </div>

                <div className="flex items-center justify-between mt-8">

                  <div className="flex items-center gap-3 text-[#666]">

                    <div className="w-11 h-11 rounded-2xl bg-[#f5f5f5] flex items-center justify-center">

                      <Clock3
                        size={18}
                        className="text-orange-500"
                      />

                    </div>

                    <div>

                      <p className="text-sm text-[#999]">
                        Delivery
                      </p>

                      <p className="font-semibold text-[#18181b]">
                        {store.time}
                      </p>

                    </div>

                  </div>

                  <button className="bg-[#18181b] hover:bg-black text-white w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg">

                    <ArrowUpRight size={22} />

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}