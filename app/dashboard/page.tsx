'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

import {
  LayoutDashboard,
  ShoppingBag,
  Store,
  LogOut,
  User,
  Clock3,
} from 'lucide-react'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)

  const router = useRouter()

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
                Delivery Platform
              </p>

            </div>

          </div>

          <nav className="space-y-2">

            <button className="w-full flex items-center gap-3 bg-orange-500 text-white px-4 h-12 rounded-2xl font-semibold text-sm shadow-lg shadow-orange-500/20">

              <LayoutDashboard size={18} />

              Dashboard

            </button>

            <button className="w-full flex items-center gap-3 hover:bg-zinc-900 text-zinc-300 px-4 h-12 rounded-2xl transition-all text-sm">

              <ShoppingBag size={18} />

              Pedidos

            </button>

            <button className="w-full flex items-center gap-3 hover:bg-zinc-900 text-zinc-300 px-4 h-12 rounded-2xl transition-all text-sm">

              <Store size={18} />

              Restaurantes

            </button>

            <button className="w-full flex items-center gap-3 hover:bg-zinc-900 text-zinc-300 px-4 h-12 rounded-2xl transition-all text-sm">

              <User size={18} />

              Perfil

            </button>

          </nav>

        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 transition-all h-12 rounded-2xl font-semibold text-sm"
        >

          <LogOut size={18} />

          Cerrar sesión

        </button>

      </aside>

      <section className="flex-1 p-5 md:p-8 overflow-y-auto">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

          <div>

            <p className="text-orange-500 uppercase tracking-[4px] text-xs font-semibold">

              PANEL PRINCIPAL

            </p>

            <h1 className="text-4xl md:text-5xl font-black mt-3 tracking-[-2px]">

              Bienvenido 👋

            </h1>

            <p className="text-zinc-400 mt-3 text-sm md:text-base">

              Gestiona tu cuenta FASTY fácilmente.

            </p>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 px-5 py-4 rounded-2xl">

            <p className="text-zinc-500 text-xs">
              Usuario conectado
            </p>

            <h2 className="font-semibold mt-1 text-sm md:text-base break-all">

              {user?.email}

            </h2>

          </div>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">

          <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-[28px] p-6 shadow-xl shadow-orange-500/10">

            <p className="text-white/70 text-xs">
              PEDIDOS
            </p>

            <h2 className="text-5xl font-black mt-3">
              0
            </h2>

            <p className="mt-4 text-white/80 text-sm">
              Pedidos realizados
            </p>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-6">

            <p className="text-zinc-500 text-xs">
              ESTADO
            </p>

            <h2 className="text-3xl font-black mt-3 text-green-400">

              Activo

            </h2>

            <p className="mt-4 text-zinc-400 text-sm">
              Cuenta verificada
            </p>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-6">

            <p className="text-zinc-500 text-xs">
              MIEMBRO DESDE
            </p>

            <h2 className="text-3xl font-black mt-3">
              2026
            </h2>

            <p className="mt-4 text-zinc-400 text-sm">
              Usuario FASTY
            </p>

          </div>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-6">

          <div className="flex items-center gap-3 mb-6">

            <Clock3
              size={20}
              className="text-orange-500"
            />

            <h2 className="text-xl font-bold">

              Actividad reciente

            </h2>

          </div>

          <div className="space-y-3">

            <div className="bg-[#151515] border border-zinc-800 rounded-2xl p-4 flex items-center justify-between gap-4">

              <div>

                <h3 className="font-semibold text-sm md:text-base">

                  Bienvenido a FASTY

                </h3>

                <p className="text-zinc-500 text-xs md:text-sm mt-1">

                  Tu cuenta fue creada exitosamente.

                </p>

              </div>

              <span className="text-orange-500 text-xs md:text-sm whitespace-nowrap">

                Ahora

              </span>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}