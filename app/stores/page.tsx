'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function StoresPage() {

  const [restaurants, setRestaurants] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')

  useEffect(() => {

    fetchRestaurants()

  }, [])

  async function fetchRestaurants() {

    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {

      setRestaurants(data)

    }

    setLoading(false)

  }

  const filteredRestaurants = restaurants.filter((restaurant) =>

    restaurant.name
      ?.toLowerCase()
      .includes(search.toLowerCase())

  )

  if (loading) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <h1 className="text-4xl font-black">

          Cargando tiendas...

        </h1>

      </main>

    )

  }

  return (

    <main className="min-h-screen bg-black text-white">

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">

          <div>

            <p className="text-orange-500 uppercase tracking-[4px] font-bold">

              FASTY MARKETPLACE

            </p>

            <h1 className="text-7xl font-black tracking-[-5px] mt-4">

              Tiendas

            </h1>

          </div>

          <input
            type="text"
            placeholder="Buscar restaurante..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              h-16
              w-full
              md:w-[340px]
              rounded-2xl
              bg-white/5
              border
              border-white/10
              px-5
              text-white
              outline-none
            "
          />

        </div>

        {filteredRestaurants.length === 0 ? (

          <div className="text-center py-32">

            <h2 className="text-5xl font-black">

              No hay restaurantes

            </h2>

            <p className="text-white/60 mt-4">

              Agrega restaurantes desde el panel admin

            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredRestaurants.map((restaurant) => (

              <Link
                key={restaurant.id}
                href={`/business/${restaurant.id}`}
                className="
                  rounded-[32px]
                  overflow-hidden
                  border
                  border-white/10
                  bg-white/5
                  hover:bg-white/10
                  transition-all
                "
              >

                <img
                  src={
                    restaurant.banner_url ||
                    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop'
                  }
                  alt={restaurant.name}
                  className="w-full h-64 object-cover"
                />

                <div className="p-6">

                  <h2 className="text-4xl font-black">

                    {restaurant.name}

                  </h2>

                  <p className="text-white/60 mt-4">

                    {restaurant.description}

                  </p>

                  <div className="mt-6 flex items-center justify-between">

                    <span className="text-orange-500 font-bold">

                      {restaurant.category || 'Restaurante'}

                    </span>

                    <span className="text-white/40">

                      Ver →

                    </span>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        )}

      </section>

    </main>

  )

}