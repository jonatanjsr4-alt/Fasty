'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

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
    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-10">

          <div>
            <h1 className="text-5xl font-black">
              Dashboard
            </h1>

            <p className="text-zinc-400 mt-2">
              Bienvenido a FASTY
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-orange-500 px-5 py-3 rounded-xl font-semibold"
          >
            Cerrar sesión
          </button>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-zinc-900 rounded-3xl p-6">
            <h2 className="text-zinc-400 text-sm">
              EMAIL
            </h2>

            <p className="text-xl font-semibold mt-3">
              {user?.email}
            </p>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6">
            <h2 className="text-zinc-400 text-sm">
              PEDIDOS
            </h2>

            <p className="text-5xl font-black mt-3">
              0
            </p>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6">
            <h2 className="text-zinc-400 text-sm">
              ESTADO
            </h2>

            <p className="text-green-400 text-xl font-semibold mt-3">
              Activo
            </p>
          </div>

        </div>

      </div>

    </main>
  )
}