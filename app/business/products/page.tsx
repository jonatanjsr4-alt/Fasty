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
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-10">

      <div className="max-w-4xl mx-auto">

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

      </div>

    </main>
  )
}