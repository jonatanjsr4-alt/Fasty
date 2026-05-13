'use client'

import { Suspense, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react'

function AuthContent() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const searchParams = useSearchParams()
  const nextUrl = searchParams.get('next')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const router = useRouter()

  async function signUp() {
    if (!fullName.trim()) {
      setError('Ingresa tu nombre completo')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)
    setError('')

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        full_name: fullName,
        role: 'customer',
      })
    }

    setSuccess('¡Cuenta creada! Revisa tu correo para confirmar.')
    setMode('login')
    setLoading(false)
  }

  async function signIn() {
    setLoading(true)
    setError('')

    const { data, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (signInError) {
      setError('Correo o contraseña incorrectos')
      setLoading(false)
      return
    }

    const { data: profiles } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    const role = profiles?.role ?? 'customer'
    document.cookie = `fasty-role=${role}; path=/`
    document.cookie = `sb-access-token=true; path=/`

    if (nextUrl) {
      router.push(nextUrl)
    } else if (role === 'admin') {
      router.push('/admin')
    } else if (role === 'business') {
      router.push('/dashboard')
    } else {
      router.push('/stores')
    }

    setLoading(false)
  }

  function handleSubmit() {
    if (!email.trim() || !password.trim()) {
      setError('Completa todos los campos')
      return
    }

    if (mode === 'login') signIn()
    else signUp()
  }

  return (
    <main className="min-h-screen bg-[#f6f3ee] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl">

        <h1 className="text-4xl font-bold mb-8 text-center">
          FASTY
        </h1>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-600 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-green-100 text-green-600 text-sm">
            {success}
          </div>
        )}

        {mode === 'register' && (
          <input
            type="text"
            placeholder="Nombre completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full h-14 rounded-2xl border px-4 mb-4"
          />
        )}

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-14 rounded-2xl border px-4 mb-4"
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-14 rounded-2xl border px-4 pr-14"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full h-14 rounded-2xl bg-black text-white flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              {mode === 'login' ? 'Ingresar' : 'Crear cuenta'}
              <ArrowRight size={18} />
            </>
          )}
        </button>

        <div className="mt-6 text-center">
          {mode === 'login' ? (
            <button
              onClick={() => setMode('register')}
              className="text-orange-500"
            >
              Crear cuenta
            </button>
          ) : (
            <button
              onClick={() => setMode('login')}
              className="text-orange-500"
            >
              Ya tengo cuenta
            </button>
          )}
        </div>

      </div>
    </main>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <AuthContent />
    </Suspense>
  )
}