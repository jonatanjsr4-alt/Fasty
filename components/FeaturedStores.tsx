import {
  Clock3,
  Star,
  ArrowRight,
  Heart,
} from 'lucide-react'

import FloatingCard from './FloatingCard'
import Reveal from './Reveal'

const stores = [
  {
    name: 'Pizza Gold',
    category: 'Pizza',
    time: '20 min',
    rating: '4.9',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1400&auto=format&fit=crop',
  },
  {
    name: 'Burger House',
    category: 'Hamburguesas',
    time: '15 min',
    rating: '4.8',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1400&auto=format&fit=crop',
  },
  {
    name: 'Helados Frost',
    category: 'Postres',
    time: '10 min',
    rating: '4.7',
    image:
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1400&auto=format&fit=crop',
  },
]

export default function FeaturedStores() {
  return (
    <section className="px-5 md:px-6">

      <div className="max-w-7xl mx-auto">

        <Reveal>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">

            <div>

              <p className="text-orange-500 uppercase tracking-[4px] text-xs font-semibold">

                Negocios destacados

              </p>

              <h2 className="text-4xl md:text-5xl xl:text-6xl font-black text-[#111111] mt-4 leading-[0.95] tracking-[-3px]">

                Descubre los
                <br />

                mejores sabores

              </h2>

            </div>

            <p className="text-[#666] text-sm md:text-base leading-relaxed max-w-xl">

              Restaurantes y negocios locales conectados
              dentro de la experiencia premium FASTY.

            </p>

          </div>

        </Reveal>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {stores.map((store) => (

            <FloatingCard key={store.name}>

              <div className="group relative overflow-hidden rounded-[32px] h-[420px] shadow-[0_20px_60px_rgba(0,0,0,.08)] bg-black">

                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <button className="absolute top-5 right-5 w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 flex items-center justify-center hover:bg-white transition-all">

                  <Heart
                    size={20}
                    className="text-[#18181b]"
                  />

                </button>

                <div className="absolute top-5 left-5">

                  <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">

                    <Star
                      size={14}
                      className="text-orange-500 fill-orange-500"
                    />

                    <span className="text-sm font-semibold text-[#111111]">

                      {store.rating}

                    </span>

                  </div>

                </div>

                <div className="absolute bottom-5 left-5 right-5">

                  <div className="bg-white/85 backdrop-blur-2xl border border-white/30 rounded-[28px] p-5 shadow-2xl">

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <p className="text-sm text-[#777] font-medium">

                          {store.category}

                        </p>

                        <h3 className="text-2xl md:text-3xl font-black tracking-[-2px] text-[#111111] mt-1">

                          {store.name}

                        </h3>

                      </div>

                      <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-all">

                        <ArrowRight
                          size={18}
                          className="text-white"
                        />

                      </div>

                    </div>

                    <div className="flex items-center gap-3 mt-5 text-[#666]">

                      <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">

                        <Clock3
                          size={16}
                          className="text-orange-500"
                        />

                      </div>

                      <div>

                        <p className="text-xs text-[#999]">

                          Delivery

                        </p>

                        <span className="text-sm font-semibold text-[#111111]">

                          {store.time}

                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </FloatingCard>

          ))}

        </div>

      </div>

    </section>
  )
}