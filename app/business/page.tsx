'use client'

import { useEffect, useState } from 'react'

import { supabase } from '@/lib/supabase'

import { useRouter } from 'next/navigation'

import Link from 'next/link'

import {
  Store,
  Plus,
  LogOut,
  Package,
  ShoppingBag,
  ArrowRight,
  BarChart3,
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
    <main className="min-h-screen bg-[#070707] text-white flex overflow-hidden">

      <aside className="hidden lg:flex w-[280px] border-r border-white/5 bg-black/40 backdrop-blur-2xl p-6 flex-col justify-between">

        <div>

          <Link
            href="/"
            className="flex items-center gap-4 mb-14"
          >

            <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">

              <span className="text-white text-lg font-bold">
                F
              </span>

            </div>

            <div>

              <h1 className="text-2xl font-bold tracking-[-1px]">

                FASTY

              </h1>

              <p className="text-zinc-500 text-xs mt-1">

                Business Platform

              </p>

            </div>

          </Link>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-[28px] p-5 shadow-2xl shadow-orange-500/20">

            <p className="text-white/70 text-sm">

              Ingresos mensuales

            </p>

            <h2 className="text-4xl font-bold tracking-[-2px] mt-3">

              $12.4K

            </h2>

            <div className="flex items-center gap-2 mt-4 text-sm">

              <BarChart3 size={16} />

              +18% este mes

            </div>

          </div>

          <nav className="space-y-3 mt-10">

            <button className="w-full h-14 rounded-2xl bg-white text-black px-5 flex items-center justify-between font-medium">

              <div className="flex items-center gap-3">

                <Store size={18} />

                Mi negocio

              </div>

              <ArrowRight size={16} />

            </button>

            <Link
              href="/products"
              className="w-full h-14 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 px-5 flex items-center justify-between text-zinc-300 transition-all"
            >

              <div className="flex items-center gap-3">

                <Package size={18} />

                Productos

              </div>

              <ArrowRight size={16} />

            </Link>

            <button className="w-full h-14 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 px-5 flex items-center justify-between text-zinc-300 transition-all">

              <div className="flex items-center gap-3">

                <ShoppingBag size={18} />

                Pedidos

              </div>

              <ArrowRight size={16} />

            </button>

          </nav>

        </div>

        <button
          onClick={logout}
          className="w-full h-14 rounded-2xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 transition-all flex items-center justify-center gap-3 font-medium"
        >

          <LogOut size={18} />

          Cerrar sesión

        </button>

      </aside>

      <section className="flex-1 overflow-y-auto">

        <div className="max-w-6xl mx-auto px-5 md:px-10 py-10">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">

            <div>

              <p className="text-orange-500 uppercase tracking-[4px] text-sm font-medium">

                PANEL DE NEGOCIOS

              </p>

              <h1 className="text-5xl md:text-6xl font-bold tracking-[-4px] mt-4 leading-[0.95]">

                Administra tu
                <br />

                restaurante.

              </h1>

            </div>

            <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">

              Gestiona productos, pedidos y estadísticas
              desde una experiencia moderna y premium.

            </p>

          </div>

          <div className="grid xl:grid-cols-[1.1fr_.9fr] gap-6">

            <div className="bg-white/5 border border-white/5 backdrop-blur-2xl rounded-[36px] p-7">

              <h2 className="text-2xl font-bold tracking-[-1px]">

                Crear restaurante

              </h2>

              <p className="text-zinc-400 mt-3 leading-relaxed">

                Configura tu negocio dentro de FASTY
                y empieza a recibir pedidos rápidamente.

              </p>

              <div className="space-y-5 mt-8">

                <input
                  type="text"
                  placeholder="Nombre del negocio"
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
                  type="text"
                  placeholder="Dirección"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full h-14 rounded-2xl bg-black/40 border border-white/5 px-5 outline-none focus:border-orange-500 transition-all"
                />

                <button
                  onClick={createRestaurant}
                  className="bg-orange-500 hover:bg-orange-600 h-14 px-8 rounded-2xl font-medium flex items-center gap-3 transition-all shadow-xl shadow-orange-500/20"
                >

                  <Plus size={18} />

                  Crear negocio

                </button>

              </div>

            </div>

            <div className="space-y-6">

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-[36px] p-7 shadow-2xl shadow-orange-500/20">

                <p className="text-white/70 text-sm">

                  Pedidos hoy

                </p>

                <h2 className="text-6xl font-bold tracking-[-4px] mt-4">

                  128

                </h2>

                <p className="text-white/80 mt-4">

                  +24% respecto ayer

                </p>

              </div>

              <div className="bg-white/5 border border-white/5 rounded-[36px] p-7 backdrop-blur-2xl">

                <p className="text-zinc-500 text-sm">

                  Estado del negocio

                </p>

                <div className="flex items-center gap-3 mt-5">

                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

                  <p className="text-lg font-medium">

                    Negocio activo

                  </p>

                </div>

                <p className="text-zinc-400 mt-5 leading-relaxed">

                  Tu restaurante está visible
                  y listo para recibir pedidos.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}