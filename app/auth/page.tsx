'use client'

import { useState } from 'react'

import { supabase } from '@/lib/supabase'

import { useRouter } from 'next/navigation'

import Link from 'next/link'

import {
  ArrowRight,
} from 'lucide-react'

export default function AuthPage() {
  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function signUp() {
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Cuenta creada correctamente')
    }

    setLoading(false)
  }

  async function signIn() {
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      router.push('/dashboard')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#f6f3ee] overflow-hidden relative flex items-center justify-center px-5 py-10">

      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-orange-200/40 blur-3xl rounded-full" />

      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-orange-100/40 blur-3xl rounded-full" />

      <div className="relative z-10 grid lg:grid-cols-2 max-w-6xl w-full overflow-hidden rounded-[40px] border border-white/40 bg-white/70 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,.08)]">

        <div className="hidden lg:flex relative overflow-hidden bg-[#111111] p-14 flex-col justify-between">

          <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-orange-500/20 blur-3xl rounded-full" />

          <div className="relative z-10">

            <Link
              href="/"
              className="flex items-center gap-3"
            >

              <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center">

                <span className="text-white font-bold">
                  F
                </span>

              </div>

              <div>

                <h1 className="text-2xl font-bold text-white tracking-[-1px]">

                  FASTY

                </h1>

                <p className="text-xs text-zinc-400 mt-1">

                  Delivery Platform

                </p>

              </div>

            </Link>

          </div>

          <div className="relative z-10">

            <h2 className="text-5xl font-bold text-white leading-[1] tracking-[-3px]">

              Delivery
              <br />

              moderno para
              <br />

              Quibdó.

            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed mt-8 max-w-md">

              Restaurantes, supermercados y negocios
              locales conectados en una experiencia premium.

            </p>

          </div>

          <div className="relative z-10 flex items-center gap-10">

            <div>

              <h3 className="text-3xl font-bold text-white">
                +10K
              </h3>

              <p className="text-sm text-zinc-500 mt-1">
                Pedidos
              </p>

            </div>

            <div>

              <h3 className="text-3xl font-bold text-white">
                +500
              </h3>

              <p className="text-sm text-zinc-500 mt-1">
                Negocios
              </p>

            </div>

          </div>

        </div>

        <div className="p-8 md:p-14 flex items-center">

          <div className="w-full max-w-md mx-auto">

            <div className="lg:hidden flex items-center gap-3 mb-10">

              <div className="w-11 h-11 rounded-2xl bg-[#111111] flex items-center justify-center">

                <span className="text-white font-bold">
                  F
                </span>

              </div>

              <div>

                <h1 className="text-xl font-bold tracking-[-1px]">

                  FASTY

                </h1>

                <p className="text-xs text-[#888]">

                  Delivery Platform

                </p>

              </div>

            </div>

            <p className="text-orange-500 text-sm font-medium uppercase tracking-[3px]">

              Bienvenido

            </p>

            <h2 className="text-5xl font-bold tracking-[-3px] text-[#111111] mt-4 leading-none">

              Inicia sesión
              <br />

              en FASTY

            </h2>

            <p className="text-[#666] leading-relaxed mt-6">

              Accede a tu cuenta o crea una nueva
              experiencia dentro de FASTY.

            </p>

            <div className="space-y-5 mt-10">

              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 rounded-2xl border border-[#e7e2da] bg-white px-5 outline-none focus:border-orange-400 transition-all"
              />

              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 rounded-2xl border border-[#e7e2da] bg-white px-5 outline-none focus:border-orange-400 transition-all"
              />

              <button
                onClick={signIn}
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-[#111111] hover:bg-black text-white font-medium transition-all flex items-center justify-center gap-3 shadow-xl"
              >

                Ingresar

                <ArrowRight size={18} />

              </button>

              <button
                onClick={signUp}
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all shadow-lg shadow-orange-500/20"
              >

                Crear cuenta

              </button>

            </div>

          </div>

        </div>

      </div>

    </main>
  )
}