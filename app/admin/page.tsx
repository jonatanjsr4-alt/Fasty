'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import AdminOrders from '@/components/AdminOrders'
import { Loader2, Lock } from 'lucide-react'

export default function AdminPage() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const [debugMsg, setDebugMsg] = useState('')

  useEffect(() => {
    checkAdmin()
  }, [])

  async function checkAdmin() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { router.push('/auth'); return }

    // Intentar con función RPC que bypasa RLS
    const { data: isAdmin, error: rpcError } = await supabase.rpc('is_admin')

    if (!rpcError && isAdmin === true) {
      setAllowed(true)
      setChecking(false)
      return
    }

    // Fallback: query directa
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profileError) {
      setDebugMsg(`RPC error: ${rpcError?.message} | Profile error: ${profileError.message}`)
      setAllowed(false)
      setChecking(false)
      return
    }

    setDebugMsg(profile ? `role: ${profile.role}` : 'sin perfil')
    setAllowed(profile?.role === 'admin')
    setChecking(false)
  }

  if (checking) return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 size={32} color="#FF5001" style={{ animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  if (!allowed) return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, textAlign: 'center', padding: '2rem' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Lock size={28} color="#f87171" />
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Acceso restringido</h2>
      <p style={{ color: '#888', maxWidth: 300 }}>No tienes permisos de administrador.</p>
      {debugMsg && (
        <p style={{ color: '#555', fontSize: '0.75rem', fontFamily: 'monospace', background: '#111', padding: '8px 16px', borderRadius: 8, maxWidth: 400 }}>
          Debug: {debugMsg}
        </p>
      )}
      <button onClick={() => router.push('/')} style={{ marginTop: 8, background: '#FF5001', color: '#fff', border: 'none', borderRadius: 12, padding: '10px 24px', cursor: 'pointer', fontWeight: 600 }}>
        Ir al inicio
      </button>
    </div>
  )

  return <AdminOrders />
}
