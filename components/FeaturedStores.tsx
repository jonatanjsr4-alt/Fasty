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
    <section className="px-5 md:px-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-10">

          <div>

            <p className="text-orange-500 uppercase tracking-[4px] text-xs font-semibold">

              Restaurantes

            </p>

            <h2 className="text-4xl md:text-5xl font-black text-[#18181b] mt-3 leading-none">

              Negocios destacados

            </h2>

            <p className="text-[#666] mt-4 text-base md:text-lg max-w-2xl leading-relaxed">

              Descubre los restaurantes y tiendas más populares dentro de FASTY.

            </p>

          </div>

          <button className="bg-white border border-[#ececec] hover:border-orange-300 hover:shadow-md transition-all px-6 h-12 rounded-2xl font-semibold flex items-center gap-3 text-sm">

            Ver todos

            <ArrowUpRight size={16} />

          </button>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

          {stores.map((store) => (

            <div
              key={store.name}
              className="group bg-white border border-[#ececec] rounded-[28px] overflow-hidden hover:shadow-[0_15px_40px_rgba(0,0,0,.06)] hover:-translate-y-1 transition-all duration-300"
            >

              <div className="relative overflow-hidden">

                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-all duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />

                <button className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-xl flex items-center justify-center shadow-lg">

                  <Heart
                    size={18}
                    className="text-[#18181b]"
                  />

                </button>

                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-xl px-3 py-2 rounded-2xl shadow-lg">

                  <Star
                    size={14}
                    className="text-orange-500 fill-orange-500"
                  />

                  <span className="font-semibold text-xs text-[#18181b]">

                    {store.rating}

                  </span>

                </div>

              </div>

              <div className="p-5">

                <div className="flex items-start justify-between gap-3">

                  <div>

                    <h3 className="text-xl font-black text-[#18181b] leading-tight">

                      {store.name}

                    </h3>

                    <p className="text-[#777] mt-1 text-sm">

                      {store.category}

                    </p>

                  </div>

                  <div className="bg-orange-100 text-orange-600 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap">

                    Popular

                  </div>

                </div>

                <div className="flex items-center justify-between mt-6">

                  <div className="flex items-center gap-3 text-[#666]">

                    <div className="w-10 h-10 rounded-xl bg-[#f5f5f5] flex items-center justify-center">

                      <Clock3
                        size={16}
                        className="text-orange-500"
                      />

                    </div>

                    <div>

                      <p className="text-xs text-[#999]">
                        Delivery
                      </p>

                      <p className="font-semibold text-sm text-[#18181b]">
                        {store.time}
                      </p>

                    </div>

                  </div>

                  <button className="bg-[#18181b] hover:bg-black text-white w-11 h-11 rounded-2xl flex items-center justify-center transition-all shadow-md">

                    <ArrowUpRight size={18} />

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