'use client'

import { useEffect, useState } from 'react'

import { supabase } from '@/lib/supabase'

import { useRouter } from 'next/navigation'

import {
  Plus,
  Package,
} from 'lucide-react'

export default function ProductsPage() {
  const router = useRouter()

  const [user, setUser] = useState<any>(null)

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

    setUser(user)

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
      alert('Producto creado correctamente')

      setName('')
      setDescription('')
      setPrice('')

      getProducts(restaurant.id)
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white p-5 md:p-8">

      <div className="max-w-6xl mx-auto">

        <p className="text-orange-500 uppercase tracking-[4px] text-xs font-semibold">

          PRODUCTOS

        </p>

        <h1 className="text-4xl md:text-5xl font-black mt-3 tracking-[-2px]">

          Agrega productos

        </h1>

        <p className="text-zinc-400 mt-3 text-sm md:text-base">

          Administra el menú de tu negocio.

        </p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-6 md:p-7 mt-8">

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Nombre del producto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 bg-[#151515] border border-zinc-800 rounded-2xl px-4 outline-none text-sm focus:border-orange-500 transition-all"
            />

            <textarea
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-28 bg-[#151515] border border-zinc-800 rounded-2xl px-4 py-4 outline-none resize-none text-sm focus:border-orange-500 transition-all"
            />

            <input
              type="number"
              placeholder="Precio"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-12 bg-[#151515] border border-zinc-800 rounded-2xl px-4 outline-none text-sm focus:border-orange-500 transition-all"
            />

            <button
              onClick={createProduct}
              className="bg-orange-500 hover:bg-orange-600 transition-all px-6 h-12 rounded-2xl font-semibold text-sm flex items-center gap-3 shadow-lg shadow-orange-500/20"
            >

              <Plus size={18} />

              Crear producto

            </button>

          </div>

        </div>

        <div className="mt-12">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-11 h-11 rounded-2xl bg-orange-500/10 flex items-center justify-center">

              <Package
                size={20}
                className="text-orange-500"
              />

            </div>

            <h2 className="text-2xl md:text-3xl font-black">

              Productos creados

            </h2>

          </div>

          {products.length === 0 ? (

            <div className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-8 text-center text-zinc-400 text-sm">

              No hay productos creados todavía.

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {products.map((product) => (

                <div
                  key={product.id}
                  className="group bg-zinc-900 border border-zinc-800 rounded-[28px] p-5 hover:border-orange-500/40 hover:bg-zinc-900/80 transition-all duration-300"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <h3 className="text-xl font-black leading-tight">

                        {product.name}

                      </h3>

                      <p className="text-zinc-400 mt-3 text-sm leading-relaxed">

                        {product.description}

                      </p>

                    </div>

                    <div className="bg-orange-500 px-4 py-2 rounded-2xl font-bold text-sm whitespace-nowrap shadow-lg shadow-orange-500/20">

                      ${product.price}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </main>
  )
}