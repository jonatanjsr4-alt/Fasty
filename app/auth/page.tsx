'use client'

import { useState } from 'react'

import { supabase } from '@/lib/supabase'

import { useRouter } from 'next/navigation'

import Link from 'next/link'

import {
  ArrowRight,
  Loader2,
  ShoppingBag,
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
      alert('Bienvenido a FASTY')

      router.push('/dashboard')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5] overflow-hidden relative flex items-center justify-center px-5 py-10">

      <div className="absolute top-[-250px] right-[-250px] w-[500px] h-[500px] bg-orange-200 blur-3xl rounded-full opacity-40" />

      <div className="absolute bottom-[-250px] left-[-250px] w-[500px] h-[500px] bg-orange-100 blur-3xl rounded-full opacity-50" />

      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 bg-white border border-[#ececec] rounded-[36px] overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,.06)]">

        <div className="hidden lg:flex relative bg-[#111111] p-12 flex-col justify-between overflow-hidden">

          <div className="absolute top-[-150px] right-[-150px] w-[350px] h-[350px] bg-orange-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">

                <span className="text-white text-lg font-black">
                  F
                </span>

              </div>

              <div>

                <h1 className="text-2xl font-black text-white">
                  FASTY
                </h1>

                <p className="text-zinc-500 text-sm mt-1">
                  Delivery Platform
                </p>

              </div>

            </div>

            <div className="mt-20">

              <p className="text-orange-500 uppercase tracking-[4px] text-xs font-semibold">

                DELIVERY MODERNO

              </p>

              <h2 className="text-5xl font-black text-white mt-5 leading-[0.95] tracking-[-3px]">

                Pide comida,
                <br />

                supermercados
                <br />

                y más.

              </h2>

              <p className="text-zinc-400 mt-7 text-lg leading-relaxed max-w-md">

                FASTY conecta usuarios y negocios
                en una experiencia rápida, moderna y elegante.

              </p>

            </div>

          </div>

          <div className="relative z-10 flex items-center gap-4 bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">

            <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">

              <ShoppingBag
                size={24}
                className="text-white"
              />

            </div>

            <div>

              <h3 className="text-white font-bold text-lg">

                +10K Pedidos

              </h3>

              <p className="text-zinc-400 text-sm mt-1">

                Entregados exitosamente

              </p>

            </div>

          </div>

        </div>

        <div className="p-6 md:p-10 lg:p-14 flex items-center">

          <div className="w-full">

            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-8"
            >

              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">

                <span className="text-white font-black">
                  F
                </span>

              </div>

              <div>

                <h1 className="text-2xl font-black text-[#18181b]">
                  FASTY
                </h1>

                <p className="text-[#888] text-xs mt-1">
                  Delivery Platform
                </p>

              </div>

            </Link>

            <p className="text-orange-500 uppercase tracking-[4px] text-xs font-semibold">

              ACCESO

            </p>

            <h2 className="text-4xl md:text-5xl font-black text-[#18181b] mt-3 tracking-[-2px] leading-none">

              Bienvenido 👋

            </h2>

            <p className="text-[#666] mt-4 text-sm md:text-base leading-relaxed max-w-md">

              Inicia sesión o crea tu cuenta
              para comenzar en FASTY.

            </p>

            <div className="mt-10 space-y-4">

              <div>

                <p className="text-sm font-medium text-[#444] mb-2">

                  Correo electrónico

                </p>

                <input
                  type="email"
                  placeholder="correo@fasty.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 rounded-2xl border border-[#ececec] bg-[#fafafa] px-4 outline-none text-sm focus:border-orange-500 transition-all"
                />

              </div>

              <div>

                <p className="text-sm font-medium text-[#444] mb-2">

                  Contraseña

                </p>

                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 rounded-2xl border border-[#ececec] bg-[#fafafa] px-4 outline-none text-sm focus:border-orange-500 transition-all"
                />

              </div>

              <button
                onClick={signIn}
                disabled={loading}
                className="w-full h-12 rounded-2xl bg-[#18181b] hover:bg-black transition-all text-white font-semibold text-sm flex items-center justify-center gap-3 shadow-lg"
              >

                {loading ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <>
                    Iniciar sesión

                    <ArrowRight size={16} />
                  </>
                )}

              </button>

              <button
                onClick={signUp}
                disabled={loading}
                className="w-full h-12 rounded-2xl bg-orange-500 hover:bg-orange-600 transition-all text-white font-semibold text-sm shadow-lg shadow-orange-500/20"
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