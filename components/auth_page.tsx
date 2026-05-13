'use client'

import { Suspense, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react'

function AuthForm() {
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
    if (!fullName.trim()) { setError('Ingresa tu nombre completo'); return }
    if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); return }
    setLoading(true); setError('')
    const { data, error: signUpError } = await supabase.auth.signUp({
      email, password, options: { data: { full_name: fullName } },
    })
    if (signUpError) { setError(signUpError.message); setLoading(false); return }
    if (data.user) {
      await supabase.from('profiles').upsert({ id: data.user.id, name: fullName, email, role: 'customer' })
    }
    setSuccess('¡Cuenta creada! Revisa tu correo para confirmar.')
    setMode('login'); setLoading(false)
  }

  async function signIn() {
    setLoading(true); setError('')
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError) { setError('Correo o contraseña incorrectos'); setLoading(false); return }
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single()
    const role = profile?.role ?? 'customer'
    if (nextUrl) { router.push(nextUrl) }
    else if (role === 'admin') { router.push('/admin') }
    else if (role === 'business') { router.push('/dashboard') }
    else if (role === 'delivery') { router.push('/delivery') }
    else { router.push('/stores') }
    setLoading(false)
  }

  function handleSubmit() {
    if (!email.trim() || !password.trim()) { setError('Completa todos los campos'); return }
    if (mode === 'login') signIn(); else signUp()
  }

  return (
    <main style={{ minHeight: '100vh', background: '#f6f3ee', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div style={{ position: 'absolute', top: -200, left: -200, width: 500, height: 500, background: 'rgba(255,130,50,0.15)', filter: 'blur(80px)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: -200, right: -200, width: 500, height: 500, background: 'rgba(255,130,50,0.1)', filter: 'blur(80px)', borderRadius: '50%' }} />

      <div style={{ position: 'relative', zIndex: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: 900, width: '100%', borderRadius: 40, overflow: 'hidden', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', boxShadow: '0 30px 80px rgba(0,0,0,0.08)', border: '1px solid rgba(255,255,255,0.5)' }}>

        {/* Panel izquierdo */}
        <div style={{ background: '#111', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -80, right: -80, width: 250, height: 250, background: 'rgba(255,80,1,0.15)', filter: 'blur(60px)', borderRadius: '50%' }} />
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', position: 'relative', zIndex: 1 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: '#FF5001', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontSize: '1.1rem' }}>F</div>
            <div>
              <p style={{ color: '#fff', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.04em', margin: 0 }}>FASTY</p>
              <p style={{ color: '#666', fontSize: '0.7rem', margin: 0 }}>Delivery Platform</p>
            </div>
          </Link>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ color: '#fff', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, margin: '0 0 1rem' }}>
              Delivery<br />moderno<br />para Quibdó.
            </h2>
            <p style={{ color: '#666', lineHeight: 1.7, margin: 0, fontSize: '0.9rem' }}>Restaurantes, supermercados y negocios locales en un solo lugar.</p>
          </div>
          <div style={{ display: 'flex', gap: '2rem', position: 'relative', zIndex: 1 }}>
            {[{ n: '+10K', l: 'Pedidos' }, { n: '+500', l: 'Negocios' }].map(s => (
              <div key={s.l}>
                <p style={{ color: '#fff', fontWeight: 800, fontSize: '1.5rem', margin: 0 }}>{s.n}</p>
                <p style={{ color: '#555', fontSize: '0.75rem', margin: '4px 0 0' }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Panel derecho */}
        <div style={{ padding: '3.5rem', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '100%' }}>
            <p style={{ color: '#FF5001', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16 }}>{mode === 'login' ? 'Bienvenido' : 'Únete'}</p>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.04em', color: '#111', margin: '0 0 8px', lineHeight: 1 }}>
              {mode === 'login' ? 'Inicia sesión' : 'Crea tu cuenta'}
            </h2>
            <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
              {mode === 'login' ? 'Accede para pedir y gestionar tu negocio.' : 'Regístrate gratis en segundos.'}
            </p>

            <div style={{ display: 'flex', gap: 6, background: '#f0ebe3', borderRadius: 14, padding: 4, marginBottom: '1.2rem' }}>
              {(['login', 'register'] as const).map(m => (
                <button key={m} onClick={() => { setMode(m); setError(''); setSuccess('') }}
                  style={{ flex: 1, height: 38, borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem', background: mode === m ? '#fff' : 'transparent', color: mode === m ? '#111' : '#888', boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>
                  {m === 'login' ? 'Ingresar' : 'Registrarse'}
                </button>
              ))}
            </div>

            {error && <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: '10px 14px', color: '#dc2626', fontSize: '0.82rem', marginBottom: '1rem' }}>{error}</div>}
            {success && <div style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 12, padding: '10px 14px', color: '#16a34a', fontSize: '0.82rem', marginBottom: '1rem' }}>{success}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {mode === 'register' && (
                <input type="text" placeholder="Nombre completo" value={fullName} onChange={e => setFullName(e.target.value)}
                  style={{ height: 50, borderRadius: 14, border: '1.5px solid #e5e0d8', background: '#fff', padding: '0 16px', fontSize: '0.9rem', outline: 'none', color: '#111' }} />
              )}
              <input type="email" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                style={{ height: 50, borderRadius: 14, border: '1.5px solid #e5e0d8', background: '#fff', padding: '0 16px', fontSize: '0.9rem', outline: 'none', color: '#111' }} />
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  style={{ width: '100%', height: 50, borderRadius: 14, border: '1.5px solid #e5e0d8', background: '#fff', padding: '0 48px 0 16px', fontSize: '0.9rem', outline: 'none', color: '#111', boxSizing: 'border-box' }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa' }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <button onClick={handleSubmit} disabled={loading}
                style={{ height: 50, borderRadius: 14, background: '#111', color: '#fff', fontWeight: 700, fontSize: '0.95rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1, marginTop: 4 }}>
                {loading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <>{mode === 'login' ? 'Ingresar' : 'Crear cuenta'} <ArrowRight size={16} /></>}
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @media(max-width:640px){div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important} div[style*="background: #111"]{display:none!important}}`}</style>
    </main>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#f6f3ee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader2 size={28} color="#FF5001" style={{ animation: 'spin 1s linear infinite' }} /><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>}>
      <AuthForm />
    </Suspense>
  )
}
