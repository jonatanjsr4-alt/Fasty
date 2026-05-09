'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
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
    }
    router.push('/dashboard')

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white rounded-[32px] border border-[#efefef] p-8">

        <h1 className="text-3xl font-black text-[#18181b]">

          FASTY

        </h1>

        <p className="text-[#666] mt-2">

          Inicia sesión o crea tu cuenta.

        </p>

        <div className="mt-8 space-y-4">

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-14 rounded-2xl border border-[#efefef] px-5 outline-none"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-14 rounded-2xl border border-[#efefef] px-5 outline-none"
          />

          <button
            onClick={signIn}
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-[#18181b] text-white font-semibold"
          >

            Iniciar sesión

          </button>

          <button
            onClick={signUp}
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-orange-500 text-white font-semibold"
          >

            Crear cuenta

          </button>

        </div>

      </div>

    </main>
  )
}