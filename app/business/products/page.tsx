'use client'

import { useEffect, useState } from 'react'

import { supabase } from '@/lib/supabase'

import { useRouter } from 'next/navigation'

import {
  Plus,
  Package,
  Search,
  Star,
} from 'lucide-react'

export default function ProductsPage() {
  const router = useRouter()

  const [restaurant, setRestaurant] = useState<any>(null)

  const [products, setProducts] = useState<any[]>([])

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push('/auth')
      return
    }

    getRestaurant(user.id)
  }

  async function getRestaurant(userId: string) {
    const { data } = await supabase
      .from('restaurants')
      .select('*')
      .eq('owner_id', userId)
      .single()

    setRestaurant(data)

    if (data) {
      getProducts(data.id)
    }
  }

  async function getProducts(restaurantId: string) {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('created_at', { ascending: false })

    setProducts(data || [])
  }

  async function createProduct() {
    if (!restaurant) {
      alert('Primero crea un negocio')
      return
    }

    const { error } = await supabase
      .from('products')
      .insert({
        restaurant_id: restaurant.id,
        name,
        description,
        price,
      })

    if (error) {
      alert(error.message)
    } else {
      setName('')
      setDescription('')
      setPrice('')

      getProducts(restaurant.id)
    }
  }

  return (
    <main className="min-h-screen bg-[#070707] text-white">

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">

          <div>

            <p className="text-orange-500 uppercase tracking-[4px] text-sm font-medium">

              PRODUCTOS

            </p>

            <h1 className="text-5xl md:text-6xl font-bold tracking-[-4px] mt-4 leading-[0.95]">

              Administra tu
              <br />

              menú premium.

            </h1>

          </div>

          <div className="bg-white/5 border border-white/5 rounded-2xl px-5 h-14 flex items-center gap-3 backdrop-blur-xl max-w-md w-full">

            <Search
              size={18}
              className="text-zinc-500"
            />

            <input
              type="text"
              placeholder="Buscar productos..."
              className="bg-transparent outline-none w-full"
            />

          </div>

        </div>

        <div className="grid xl:grid-cols-[380px_1fr] gap-6">

          <div className="bg-white/5 border border-white/5 rounded-[36px] p-7 backdrop-blur-2xl h-fit">

            <div className="flex items-center gap-3 mb-8">

              <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">

                <Package
                  size={20}
                  className="text-white"
                />

              </div>

              <div>

                <h2 className="text-2xl font-bold tracking-[-1px]">

                  Nuevo producto

                </h2>

                <p className="text-zinc-500 text-sm mt-1">

                  Agrega productos al menú

                </p>

              </div>

            </div>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Nombre del producto"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-14 rounded-2xl bg-black/40 border border-white/5 px-5 outline-none focus:border-orange-500 transition-all"
              />

              <textarea
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-32 rounded-2xl bg-black/40 border border-white/5 px-5 py-4 outline-none resize-none focus:border-orange-500 transition-all"
              />

              <input
                type="number"
                placeholder="Precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full h-14 rounded-2xl bg-black/40 border border-white/5 px-5 outline-none focus:border-orange-500 transition-all"
              />

              <button
                onClick={createProduct}
                className="bg-orange-500 hover:bg-orange-600 h-14 px-8 rounded-2xl font-medium flex items-center gap-3 transition-all shadow-xl shadow-orange-500/20"
              >

                <Plus size={18} />

                Crear producto

              </button>

            </div>

          </div>

          <div>

            {products.length === 0 ? (

              <div className="bg-white/5 border border-white/5 rounded-[36px] p-12 text-center backdrop-blur-2xl">

                <p className="text-zinc-400 text-lg">

                  No hay productos creados todavía.

                </p>

              </div>

            ) : (

              <div className="grid md:grid-cols-2 gap-6">

                {products.map((product) => (

                  <div
                    key={product.id}
                    className="group relative overflow-hidden rounded-[36px] bg-gradient-to-br from-zinc-900 to-black border border-white/5 p-6 hover:border-orange-500/20 transition-all duration-300"
                  >

                    <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    <div className="relative z-10">

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <div className="flex items-center gap-2 mb-4">

                            <Star
                              size={15}
                              className="text-orange-500 fill-orange-500"
                            />

                            <p className="text-orange-400 text-sm">

                              Destacado

                            </p>

                          </div>

                          <h3 className="text-3xl font-bold tracking-[-2px] leading-none">

                            {product.name}

                          </h3>

                        </div>

                        <div className="bg-orange-500 px-5 py-3 rounded-2xl font-bold shadow-xl shadow-orange-500/20">

                          ${product.price}

                        </div>

                      </div>

                      <p className="text-zinc-400 leading-relaxed mt-6">

                        {product.description}

                      </p>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </main>
  )
}