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
    <main className="min-h-screen bg-[#0a0a0a] text-white p-10">

      <div className="max-w-6xl mx-auto">

        <p className="text-orange-500 uppercase tracking-[4px] text-sm font-semibold">

          PRODUCTOS

        </p>

        <h1 className="text-5xl font-black mt-4">

          Agrega productos

        </h1>

        <p className="text-zinc-400 mt-4 text-lg">

          Administra el menú de tu negocio.

        </p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8 mt-10">

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Nombre del producto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-14 bg-[#151515] border border-zinc-800 rounded-2xl px-5 outline-none"
            />

            <textarea
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-32 bg-[#151515] border border-zinc-800 rounded-2xl px-5 py-4 outline-none resize-none"
            />

            <input
              type="number"
              placeholder="Precio"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-14 bg-[#151515] border border-zinc-800 rounded-2xl px-5 outline-none"
            />

            <button
              onClick={createProduct}
              className="bg-orange-500 hover:bg-orange-600 transition-all px-8 h-14 rounded-2xl font-semibold flex items-center gap-3"
            >

              <Plus size={20} />

              Crear producto

            </button>

          </div>

        </div>

        <div className="mt-14">

          <div className="flex items-center gap-3 mb-8">

            <Package size={28} />

            <h2 className="text-3xl font-black">

              Productos creados

            </h2>

          </div>

          {products.length === 0 ? (

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center text-zinc-400">

              No hay productos creados todavía.

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {products.map((product) => (

                <div
                  key={product.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-orange-500 transition-all"
                >

                  <div className="flex items-center justify-between">

                    <h3 className="text-2xl font-bold">

                      {product.name}

                    </h3>

                    <div className="bg-orange-500 px-4 py-2 rounded-xl font-bold">

                      ${product.price}

                    </div>

                  </div>

                  <p className="text-zinc-400 mt-4">

                    {product.description}

                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </main>
  )
}