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
    <main className="min-h-screen bg-[#0b0b0c] text-white flex">

      <aside className="hidden lg:flex w-[250px] bg-[#111111] border-r border-zinc-800 p-6 flex-col justify-between">

        <div>

          <div className="flex items-center gap-3 mb-12">

            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-lg font-black shadow-lg shadow-orange-500/20">

              F

            </div>

            <div>

              <h1 className="text-xl font-black">
                FASTY
              </h1>

              <p className="text-zinc-500 text-xs mt-1">
                Business Panel
              </p>

            </div>

          </div>

          <nav className="space-y-2">

            <button className="w-full flex items-center gap-3 bg-orange-500 text-white px-4 h-12 rounded-2xl font-semibold text-sm shadow-lg shadow-orange-500/20">

              <Store size={18} />

              Mi negocio

            </button>

            <button className="w-full flex items-center gap-3 hover:bg-zinc-900 text-zinc-300 px-4 h-12 rounded-2xl transition-all text-sm">

              <Package size={18} />

              Productos

            </button>

            <button className="w-full flex items-center gap-3 hover:bg-zinc-900 text-zinc-300 px-4 h-12 rounded-2xl transition-all text-sm">

              <ShoppingBag size={18} />

              Pedidos

            </button>

          </nav>

        </div>

        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 transition-all h-12 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2"
        >

          <LogOut size={18} />

          Cerrar sesión

        </button>

      </aside>

      <section className="flex-1 p-5 md:p-8 overflow-y-auto">

        <div className="max-w-4xl">

          <p className="text-orange-500 uppercase tracking-[4px] text-xs font-semibold">

            PANEL DE NEGOCIOS

          </p>

          <h1 className="text-4xl md:text-5xl font-black mt-3 tracking-[-2px]">

            Crea tu restaurante

          </h1>

          <p className="text-zinc-400 mt-3 text-sm md:text-base">

            Administra tu negocio dentro de FASTY.

          </p>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-6 md:p-7 mt-8">

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Nombre del negocio"
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
                type="text"
                placeholder="Dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full h-12 bg-[#151515] border border-zinc-800 rounded-2xl px-4 outline-none text-sm focus:border-orange-500 transition-all"
              />

              <button
                onClick={createRestaurant}
                className="bg-orange-500 hover:bg-orange-600 transition-all px-6 h-12 rounded-2xl font-semibold text-sm flex items-center gap-3 shadow-lg shadow-orange-500/20"
              >

                <Plus size={18} />

                Crear negocio

              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}