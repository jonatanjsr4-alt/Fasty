'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/components/CartContext'

export default function BusinessPage() {

  const params = useParams()

  const businessId = params.id as string

  const { addToCart } = useCart()

  const [restaurant, setRestaurant] = useState<any>(null)

  const [products, setProducts] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    if (businessId) {

      fetchRestaurant()

      fetchProducts()

    }

  }, [businessId])

  async function fetchRestaurant() {

    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', businessId)
      .single()

    if (!error) {

      setRestaurant(data)

    }

  }

  async function fetchProducts() {

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('restaurant_id', businessId)

    if (!error && data) {

      setProducts(data)

    }

    setLoading(false)

  }

  if (loading) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <h1 className="text-4xl font-black">

          Cargando negocio...

        </h1>

      </main>

    )

  }

  if (!restaurant) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <h1 className="text-4xl font-black">

          Negocio no encontrado

        </h1>

      </main>

    )

  }

  return (

    <main className="min-h-screen bg-black text-white">

      <section className="relative h-[320px] overflow-hidden">

        <img
          src={
            restaurant.banner_url ||
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop'
          }
          alt={restaurant.name}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-10">

          <h1 className="text-7xl font-black tracking-[-5px]">

            {restaurant.name}

          </h1>

          <p className="text-xl text-white/70 mt-4 max-w-2xl">

            {restaurant.description}

          </p>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-5xl font-black tracking-[-3px] mb-12">

          Productos

        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {products.map((product) => (

            <div
              key={product.id}
              className="rounded-[32px] border border-white/10 bg-white/5 overflow-hidden"
            >

              <img
                src={
                  product.image ||
                  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop'
                }
                alt={product.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">

                <h3 className="text-3xl font-black">

                  {product.name}

                </h3>

                <p className="text-white/60 mt-3">

                  {product.description}

                </p>

                <div className="mt-6 flex items-center justify-between">

                  <h4 className="text-4xl font-black text-orange-500">

                    ${product.price}

                  </h4>

                  <button
                    onClick={() => addToCart(product)}
                    className="px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 transition-all font-bold"
                  >

                    Agregar

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>

  )

}