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
                Delivery Platform
              </p>
            </div>

          </div>

          <nav className="space-y-3">

            <button className="w-full flex items-center gap-4 bg-orange-500 text-white px-5 py-4 rounded-2xl font-semibold">

              <LayoutDashboard size={20} />

              Dashboard

            </button>

            <button className="w-full flex items-center gap-4 hover:bg-zinc-900 text-zinc-300 px-5 py-4 rounded-2xl transition-all">

              <ShoppingBag size={20} />

              Pedidos

            </button>

            <button className="w-full flex items-center gap-4 hover:bg-zinc-900 text-zinc-300 px-5 py-4 rounded-2xl transition-all">

              <Store size={20} />

              Restaurantes

            </button>

            <button className="w-full flex items-center gap-4 hover:bg-zinc-900 text-zinc-300 px-5 py-4 rounded-2xl transition-all">

              <User size={20} />

              Perfil

            </button>

          </nav>

        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 transition-all py-4 rounded-2xl font-semibold"
        >

          <LogOut size={20} />

          Cerrar sesión

        </button>

      </aside>

      <section className="flex-1 p-10 overflow-y-auto">

        <div className="flex items-center justify-between mb-10">

          <div>

            <p className="text-orange-500 uppercase tracking-[4px] text-sm font-semibold">
              PANEL PRINCIPAL
            </p>

            <h1 className="text-5xl font-black mt-4">
              Bienvenido 👋
            </h1>

            <p className="text-zinc-400 mt-3 text-lg">
              Gestiona tu cuenta FASTY fácilmente.
            </p>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 px-6 py-4 rounded-2xl">

            <p className="text-zinc-500 text-sm">
              Usuario conectado
            </p>

            <h2 className="font-semibold mt-1">
              {user?.email}
            </h2>

          </div>

        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">

          <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-[32px] p-8">

            <p className="text-white/70 text-sm">
              PEDIDOS
            </p>

            <h2 className="text-6xl font-black mt-4">
              0
            </h2>

            <p className="mt-5 text-white/80">
              Pedidos realizados
            </p>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8">

            <p className="text-zinc-500 text-sm">
              ESTADO
            </p>

            <h2 className="text-4xl font-black mt-4 text-green-400">
              Activo
            </h2>

            <p className="mt-5 text-zinc-400">
              Cuenta verificada
            </p>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8">

            <p className="text-zinc-500 text-sm">
              MIEMBRO DESDE
            </p>

            <h2 className="text-4xl font-black mt-4">
              2026
            </h2>

            <p className="mt-5 text-zinc-400">
              Usuario FASTY
            </p>

          </div>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8">

          <div className="flex items-center gap-3 mb-8">

            <Clock3 className="text-orange-500" />

            <h2 className="text-2xl font-bold">
              Actividad reciente
            </h2>

          </div>

          <div className="space-y-4">

            <div className="bg-[#151515] border border-zinc-800 rounded-2xl p-5 flex items-center justify-between">

              <div>

                <h3 className="font-semibold">
                  Bienvenido a FASTY
                </h3>

                <p className="text-zinc-500 text-sm mt-1">
                  Tu cuenta fue creada exitosamente.
                </p>

              </div>

              <span className="text-orange-500 text-sm">
                Ahora
              </span>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}