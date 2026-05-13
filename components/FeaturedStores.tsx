'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Star, Clock, ShoppingBag, ArrowRight } from 'lucide-react'

type Restaurant = {
  id: string
  name: string
  category: string
  image_url: string
  rating: number
  delivery_time: string
  delivery_fee: number
}

const PLACEHOLDER_IMAGES: Record<string, string> = {
  Restaurantes: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop',
  Supermercados: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop',
  Farmacias: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop',
  Licores: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&auto=format&fit=crop',
  Heladerías: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&auto=format&fit=crop',
  Cafeterías: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop',
  default: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop',
}

export default function FeaturedStores() {
  const [stores, setStores] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('restaurants')
      .select('id, name, category, image_url, rating, delivery_time, delivery_fee')
      .eq('approved', true)
      .order('rating', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        setStores(data || [])
        setLoading(false)
      })
  }, [])

  return (
    <section id="tiendas" className="px-6 py-28">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="text-orange-500 font-bold uppercase tracking-[4px]">
              Restaurantes
            </span>
            <h2 className="text-6xl font-black mt-4 leading-none">
              Los más pedidos
            </h2>
          </div>
          <Link
            href="/stores"
            className="hidden md:flex h-14 px-8 rounded-full bg-orange-500 text-white font-bold items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
          >
            Ver todos <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-[36px] overflow-hidden bg-white/5 border border-white/10 animate-pulse">
                <div className="h-[280px] bg-white/10" />
                <div className="p-7 space-y-3">
                  <div className="h-6 bg-white/10 rounded-xl w-2/3" />
                  <div className="h-4 bg-white/10 rounded-xl w-1/3" />
                  <div className="h-14 bg-white/10 rounded-2xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : stores.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-zinc-500 text-lg">Pronto habrá negocios disponibles en Quibdó.</p>
            <Link href="/business/create" className="inline-flex mt-6 h-12 px-7 rounded-2xl bg-orange-500 text-white font-bold items-center gap-2 hover:bg-orange-600 transition-colors">
              Registra tu negocio
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center md:hidden">
          <Link href="/stores" className="flex h-12 px-7 rounded-full bg-orange-500 text-white font-bold items-center gap-2 hover:bg-orange-600 transition-colors">
            Ver todos los negocios <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

function StoreCard({ store }: { store: Restaurant }) {
  const img = store.image_url || PLACEHOLDER_IMAGES[store.category] || PLACEHOLDER_IMAGES.default

  return (
    <Link
      href={`/business/${store.id}`}
      className="glass rounded-[36px] overflow-hidden card-hover group cursor-pointer block"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="relative overflow-hidden">
        <img
          src={img}
          alt={store.name}
          className="w-full h-[280px] object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute top-5 left-5 px-4 h-10 rounded-full bg-black/70 backdrop-blur-md flex items-center gap-1.5 text-sm font-bold">
          <Star size={13} fill="#C8F135" color="#C8F135" />
          <span style={{ color: '#C8F135' }}>{store.rating?.toFixed(1) || '4.5'}</span>
        </div>

        <div className="absolute top-5 right-5 px-3 h-8 rounded-full bg-black/70 backdrop-blur-md flex items-center text-xs text-zinc-300">
          {store.category}
        </div>
      </div>

      <div className="p-7">
        <h3 className="text-3xl font-black">{store.name}</h3>

        <div className="flex items-center gap-4 mt-3 text-sm text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Clock size={13} />
            {store.delivery_time || '20-35 min'}
          </span>
          <span className="flex items-center gap-1.5">
            <ShoppingBag size={13} />
            {store.delivery_fee === 0
              ? <span style={{ color: '#C8F135' }}>Gratis</span>
              : `$${store.delivery_fee?.toLocaleString()}`
            }
          </span>
        </div>

        <div className="mt-7 w-full h-14 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-2 group-hover:bg-orange-500 group-hover:text-white transition-all">
          Ver tienda <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  )
}
