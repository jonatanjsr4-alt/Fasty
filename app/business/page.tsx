'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import {
  Store,
  Plus,
  LogOut,
  Package,
  ShoppingBag,
} from 'lucide-react'

export default function BusinessPage() {
  const router = useRouter()

  const [user, setUser] = useState<any>(null)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')

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
  }

  async function logout() {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  async function createRestaurant() {
    if (!name) {
      alert('Ingresa el nombre del negocio')
      return
    }

    const { error } = await supabase
      .from('restaurants')
      .insert({
        owner_id: user.id,
        name,
        description,
        address,
      })

    if (error) {
      alert(error.message)
    } else {
      alert('Negocio creado correctamente')

      setName('')
      setDescription('')
      setAddress('')
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex">

      <aside className="w-[270px] bg-[#111111] border-r border-zinc-800 p-8 flex flex-col justify-between">

        <div>

          <div className="flex items-center gap-3 mb-14">

            <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-xl font-black">
              F
            </div>

            <div>

              <h1 className="text-2xl font-black">
                FASTY
              </h1>

              <p className="text-zinc-500 text-sm">
                Business Panel
              </p>

            </div>

          </div>

          <nav className="space-y-3">

            <button className="w-full flex items-center gap-4 bg-orange-500 text-white px-5 py-4 rounded-2xl font-semibold">

              <Store size={20} />

              Mi negocio

            </button>

            <button className="w-full flex items-center gap-4 hover:bg-zinc-900 text-zinc-300 px-5 py-4 rounded-2xl transition-all">

              <Package size={20} />

              Productos

            </button>

            <button className="w-full flex items-center gap-4 hover:bg-zinc-900 text-zinc-300 px-5 py-4 rounded-2xl transition-all">

              <ShoppingBag size={20} />

              Pedidos

            </button>

          </nav>

        </div>

        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 transition-all py-4 rounded-2xl font-semibold"
        >

          Cerrar sesión

        </button>

      </aside>

      <section className="flex-1 p-10">

        <div className="max-w-4xl">

          <p className="text-orange-500 uppercase tracking-[4px] text-sm font-semibold">

            PANEL DE NEGOCIOS

          </p>

          <h1 className="text-5xl font-black mt-4">

            Crea tu restaurante

          </h1>

          <p className="text-zinc-400 mt-4 text-lg">

            Administra tu negocio dentro de FASTY.

          </p>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8 mt-10">

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Nombre del negocio"
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
                type="text"
                placeholder="Dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full h-14 bg-[#151515] border border-zinc-800 rounded-2xl px-5 outline-none"
              />

              <button
                onClick={createRestaurant}
                className="bg-orange-500 hover:bg-orange-600 transition-all px-8 h-14 rounded-2xl font-semibold flex items-center gap-3"
              >

                <Plus size={20} />

                Crear negocio

              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}