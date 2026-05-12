'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  async function signUp() {
    if (!fullName.trim()) { setError('Ingresa tu nombre completo'); return }
    if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); return }

    setLoading(true)
    setError('')

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    // Crear perfil con role 'customer' por defecto
    // (también lo hace el trigger de Supabase, esto es un respaldo)
    if (data.user) {
     await supabase.from('profiles').upsert({
  id: data.user.id,
  name: fullName,
  email: email,
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

    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError('Correo o contraseña incorrectos')
      setLoading(false)
      return
    }

    // Leer el rol del perfil y redirigir según corresponda
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    const role = profile?.role ?? 'customer'

    if (role === 'admin') {
      router.push('/admin')
    } else if (role === 'business') {
      router.push('/dashboard')
    } else {
      router.push('/stores')
    }

    setLoading(false)
  }

  function handleSubmit() {
    if (!email.trim() || !password.trim()) { setError('Completa todos los campos'); return }
    if (mode === 'login') signIn()
    else signUp()
  }

  return (
    <main className="min-h-screen bg-[#f6f3ee] overflow-hidden relative flex items-center justify-center px-5 py-10">

      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-orange-200/40 blur-3xl rounded-full" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-orange-100/40 blur-3xl rounded-full" />

      <div className="relative z-10 grid lg:grid-cols-2 max-w-6xl w-full overflow-hidden rounded-[40px] border border-white/40 bg-white/70 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,.08)]">

        {/* Panel izquierdo */}
        <div className="hidden lg:flex relative overflow-hidden bg-[#111111] p-14 flex-col justify-between">
          <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-orange-500/20 blur-3xl rounded-full" />

          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-[-1px]">FASTY</h1>
                <p className="text-xs text-zinc-400 mt-1">Delivery Platform</p>
              </div>
            </Link>
          </div>

          <div className="relative z-10">
            <h2 className="text-5xl font-bold text-white leading-[1] tracking-[-3px]">
              Delivery<br />moderno para<br />Quibdó.
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mt-8 max-w-md">
              Restaurantes, supermercados y negocios locales conectados en una experiencia premium.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-10">
            <div>
              <h3 className="text-3xl font-bold text-white">+10K</h3>
              <p className="text-sm text-zinc-500 mt-1">Pedidos</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">+500</h3>
              <p className="text-sm text-zinc-500 mt-1">Negocios</p>
            </div>
          </div>
        </div>

        {/* Panel derecho - Formulario */}
        <div className="p-8 md:p-14 flex items-center">
          <div className="w-full max-w-md mx-auto">

            {/* Logo mobile */}
            <div className="lg:hidden flex items-center gap-3 mb-10">
              <div className="w-11 h-11 rounded-2xl bg-[#111111] flex items-center justify-center">
                <span className="text-white font-bold">F</span>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-[-1px]">FASTY</h1>
                <p className="text-xs text-[#888]">Delivery Platform</p>
              </div>
            </div>

            <p className="text-orange-500 text-sm font-medium uppercase tracking-[3px]">
              {mode === 'login' ? 'Bienvenido' : 'Únete a FASTY'}
            </p>

            <h2 className="text-4xl md:text-5xl font-bold tracking-[-3px] text-[#111111] mt-4 leading-none">
              {mode === 'login' ? <>Inicia sesión<br />en FASTY</> : <>Crea tu<br />cuenta</>}
            </h2>

            <p className="text-[#666] leading-relaxed mt-6">
              {mode === 'login'
                ? 'Accede a tu cuenta para pedir y gestionar tu negocio.'
                : 'Regístrate gratis y empieza a pedir en minutos.'}
            </p>

            {/* Tabs */}
            <div className="flex gap-2 mt-8 p-1 bg-[#f0ebe3] rounded-2xl">
              <button
                onClick={() => { setMode('login'); setError(''); setSuccess('') }}
                className={`flex-1 h-11 rounded-xl text-sm font-medium transition-all ${
                  mode === 'login' ? 'bg-white text-[#111] shadow-sm' : 'text-[#888]'
                }`}
              >
                Ingresar
              </button>
              <button
                onClick={() => { setMode('register'); setError(''); setSuccess('') }}
                className={`flex-1 h-11 rounded-xl text-sm font-medium transition-all ${
                  mode === 'register' ? 'bg-white text-[#111] shadow-sm' : 'text-[#888]'
                }`}
              >
                Crear cuenta
              </button>
            </div>

            {error && (
              <div className="mt-5 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mt-5 p-4 rounded-2xl bg-green-50 border border-green-100 text-green-600 text-sm">
                {success}
              </div>
            )}

            <div className="space-y-4 mt-6">
              {mode === 'register' && (
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-14 rounded-2xl border border-[#e7e2da] bg-white px-5 outline-none focus:border-orange-400 transition-all text-[#111]"
                />
              )}

              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full h-14 rounded-2xl border border-[#e7e2da] bg-white px-5 outline-none focus:border-orange-400 transition-all text-[#111]"
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  className="w-full h-14 rounded-2xl border border-[#e7e2da] bg-white px-5 pr-14 outline-none focus:border-orange-400 transition-all text-[#111]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#999]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-[#111111] hover:bg-black text-white font-medium transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-60"
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

              {mode === 'login' && (
                <p className="text-center text-sm text-[#999]">
                  ¿Sin cuenta?{' '}
                  <button
                    onClick={() => { setMode('register'); setError('') }}
                    className="text-orange-500 font-medium"
                  >
                    Regístrate gratis
                  </button>
                </p>
              )}
            </div>

          </div>
        </div>

      </div>
    </main>
  )
}