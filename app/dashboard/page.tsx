'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/app/hooks/useAuth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  User, LogOut, ShoppingBag, MapPin, Phone,
  Edit2, Check, Loader2, Clock, ChevronRight,
  Package, Truck, CheckCircle, XCircle
} from 'lucide-react'

type Profile = {
  full_name: string
  phone: string
  address: string
}

type Order = {
  id: string
  total: number
  status: string
  products: { name: string; quantity: number; price: number }[]
  created_at: string
  restaurant_id: string
}

const STATUS_STYLES: Record<string, { color: string; bg: string; icon: any }> = {
  'Pendiente':  { color: '#facc15', bg: 'rgba(250,204,21,0.1)',  icon: Clock },
  'Preparando': { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)',  icon: Package },
  'En camino':  { color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', icon: Truck },
  'Entregado':  { color: '#4ade80', bg: 'rgba(74,222,128,0.1)',  icon: CheckCircle },
  'Cancelado':  { color: '#f87171', bg: 'rgba(248,113,113,0.1)', icon: XCircle },
}

export default function ProfilePage() {
  const { user, loading: authLoading, logout } = useAuth()
  const router = useRouter()

  const [profile, setProfile] = useState<Profile>({ full_name: '', phone: '', address: '' })
  const [orders, setOrders] = useState<Order[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'pedidos' | 'perfil'>('pedidos')

  useEffect(() => {
    if (user) fetchData()
  }, [user])

  async function fetchData() {
    setLoadingData(true)
    const { data: prof } = await supabase.from('profiles').select('*').eq('id', user!.id).single()
    if (prof) setProfile({ full_name: prof.full_name || '', phone: prof.phone || '', address: prof.address || '' })

    const { data: ords } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false })
      .limit(30)
    setOrders(ords || [])
    setLoadingData(false)
  }

  async function saveProfile() {
    setSaving(true)
    await supabase.from('profiles').update({ full_name: profile.full_name, phone: profile.phone, address: profile.address }).eq('id', user!.id)
    setSaved(true); setEditing(false)
    setTimeout(() => setSaved(false), 2000)
    setSaving(false)
  }

  if (authLoading || loadingData) return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 size={32} color="var(--orange)" style={{ animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  return (
    <main style={{ minHeight: '100vh', background: 'var(--dark)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <Link href="/stores" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--muted)', fontSize: '0.85rem' }}>
            ← Tiendas
          </Link>
          <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '8px 14px', color: '#f87171', fontSize: '0.82rem', cursor: 'pointer' }}>
            <LogOut size={14} /> Salir
          </button>
        </div>

        {/* AVATAR + NAME */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '2rem' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,var(--orange),#ff8a50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, flexShrink: 0 }}>
            {profile.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>
              {profile.full_name || 'Mi perfil'}
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginTop: 4 }}>{user?.email}</p>
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: 6, background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 5, marginBottom: '1.5rem' }}>
          {(['pedidos', 'perfil'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: '10px', borderRadius: 10, fontSize: '0.85rem', fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'all 0.2s', background: activeTab === tab ? 'var(--orange)' : 'transparent', color: activeTab === tab ? '#fff' : 'var(--muted)' }}>
              {tab === 'pedidos' ? `Mis pedidos (${orders.length})` : 'Mi perfil'}
            </button>
          ))}
        </div>

        {/* PEDIDOS */}
        {activeTab === 'pedidos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--dark3)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.06)' }}>
                <ShoppingBag size={40} color="var(--muted)" style={{ margin: '0 auto 1rem' }} />
                <p style={{ color: 'var(--muted)' }}>Aún no tienes pedidos. ¡Pide algo delicioso!</p>
                <Link href="/stores" style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--orange)', fontSize: '0.85rem' }}>Ver tiendas →</Link>
              </div>
            ) : (
              orders.map(order => {
                const s = STATUS_STYLES[order.status] || STATUS_STYLES['Pendiente']
                const Icon = s.icon
                return (
                  <Link key={order.id} href={`/tracking/${order.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '1.2rem', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', transition: 'border-color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,80,1,0.25)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={20} color={s.color} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: s.color, background: s.bg, padding: '2px 8px', borderRadius: 6 }}>{order.status}</span>
                          <span style={{ color: 'var(--muted)', fontSize: '0.72rem' }}>{new Date(order.created_at).toLocaleDateString('es-CO')}</span>
                        </div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {order.products?.map(p => `${p.name} x${p.quantity}`).join(', ')}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--orange)', marginBottom: 4 }}>${order.total.toLocaleString()}</p>
                        <ChevronRight size={16} color="var(--muted)" />
                      </div>
                    </div>
                  </Link>
                )
              })
            )}
          </div>
        )}

        {/* PERFIL */}
        {activeTab === 'perfil' && (
          <div style={{ background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>Información personal</h2>
              {!editing ? (
                <button onClick={() => setEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '8px 14px', color: 'var(--muted)', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <Edit2 size={13} /> Editar
                </button>
              ) : (
                <button onClick={saveProfile} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--orange)', border: 'none', borderRadius: 10, padding: '8px 16px', color: '#fff', fontSize: '0.8rem', cursor: 'pointer' }}>
                  {saving ? <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> : <Check size={13} />}
                  {saved ? '¡Guardado!' : 'Guardar'}
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Field label="Nombre completo" value={profile.full_name} editing={editing} onChange={v => setProfile(p => ({ ...p, full_name: v }))} placeholder="Tu nombre completo" />
              <Field label="WhatsApp" value={profile.phone} editing={editing} onChange={v => setProfile(p => ({ ...p, phone: v }))} placeholder="3001234567" />
              <Field label="Dirección habitual" value={profile.address} editing={editing} onChange={v => setProfile(p => ({ ...p, address: v }))} placeholder="Calle, barrio, referencias" multiline />
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>Correo: <span style={{ color: 'var(--white)' }}>{user?.email}</span></p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

function Field({ label, value, editing, onChange, placeholder, multiline }: { label: string; value: string; editing: boolean; onChange: (v: string) => void; placeholder: string; multiline?: boolean }) {
  const inputStyle: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '10px 14px', color: 'var(--white)', fontSize: '0.85rem', outline: 'none', fontFamily: 'var(--font-body)', resize: 'none' }
  return (
    <div>
      <p style={{ color: 'var(--muted)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{label}</p>
      {editing ? (
        multiline
          ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} style={inputStyle} />
          : <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={inputStyle} />
      ) : (
        <p style={{ color: value ? 'var(--white)' : 'var(--muted)', fontSize: '0.88rem' }}>{value || `Sin ${label.toLowerCase()}`}</p>
      )}
    </div>
  )
}