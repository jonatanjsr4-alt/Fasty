'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, User, Phone, Mail, MapPin,
  ShoppingBag, Clock, CheckCircle, XCircle,
  Truck, Package, LogOut, Loader2, Save,
} from 'lucide-react'

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  Pendiente:   { label: 'Pendiente',   color: '#facc15', icon: Clock },
  Preparando:  { label: 'Preparando',  color: '#60a5fa', icon: Package },
  'En camino': { label: 'En camino',   color: '#a78bfa', icon: Truck },
  Entregado:   { label: 'Entregado',   color: '#4ade80', icon: CheckCircle },
  Cancelado:   { label: 'Cancelado',   color: '#f87171', icon: XCircle },
}

type Order = {
  id: string
  total: number
  status: string
  created_at: string
  customer_name: string
  products: { name: string; quantity: number; price: number }[]
  restaurant_id: string
}

export default function profilesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profiles, setprofiles] = useState<any>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'pedidos' | 'datos'>('pedidos')
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => { init() }, [])

  async function init() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth'); return }
    setUser(user)

    const { data: prof } = await supabase
      .from('profiless')
      .select('*')
      .eq('id', user.id)
      .single()

    if (prof) {
      setprofiles(prof)
      setName(prof.name || '')
      setPhone(prof.phone || '')
      setAddress(prof.address || '')
    }

    const { data: ordersData } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(30)

    setOrders(ordersData || [])
    setLoading(false)
  }

  async function saveprofiles() {
    setSaving(true)
    const { error } = await supabase
      .from('profiless')
      .update({ name, phone, address })
      .eq('id', user.id)

    if (error) {
      setToast({ type: 'error', msg: 'Error guardando cambios' })
    } else {
      setToast({ type: 'success', msg: '¡Perfil actualizado!' })
    }
    setSaving(false)
    setTimeout(() => setToast(null), 3000)
  }

  async function logout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 size={32} color="#FF5001" style={{ animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  const totalGastado = orders.filter(o => o.status === 'Entregado').reduce((a, o) => a + o.total, 0)
  const pedidosEntregados = orders.filter(o => o.status === 'Entregado').length

  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0A', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 20, right: 20, zIndex: 9999,
          background: toast.type === 'success' ? 'rgba(74,222,128,0.15)' : 'rgba(248,113,113,0.15)',
          border: `1px solid ${toast.type === 'success' ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)'}`,
          borderRadius: 14, padding: '12px 20px', color: toast.type === 'success' ? '#4ade80' : '#f87171',
          fontSize: '0.9rem', fontWeight: 600,
        }}>
          {toast.msg}
        </div>
      )}

      {/* Nav */}
      <nav style={{ padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/stores" style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none' }}>
          <ArrowLeft size={16} />
        </Link>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FF5001', fontWeight: 600, margin: 0 }}>Mi cuenta</p>
          <h1 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{name || user?.email}</h1>
        </div>
        <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#888', fontSize: '0.8rem', cursor: 'pointer' }}>
          <LogOut size={14} /> Salir
        </button>
      </nav>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Pedidos', value: orders.length, icon: ShoppingBag },
            { label: 'Entregados', value: pedidosEntregados, icon: CheckCircle },
            { label: 'Total gastado', value: `$${totalGastado.toLocaleString('es-CO')}`, icon: null },
          ].map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '1.2rem', textAlign: 'center' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: 0 }}>{s.value}</p>
              <p style={{ fontSize: '0.75rem', color: '#666', margin: '4px 0 0' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem', background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 4 }}>
          {(['pedidos', 'datos'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1, height: 40, borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s',
              background: activeTab === tab ? '#FF5001' : 'transparent',
              color: activeTab === tab ? '#fff' : '#666',
            }}>
              {tab === 'pedidos' ? '🛒 Mis pedidos' : '👤 Mis datos'}
            </button>
          ))}
        </div>

        {/* Pedidos */}
        {activeTab === 'pedidos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#555' }}>
                <ShoppingBag size={40} style={{ marginBottom: 12, opacity: 0.4 }} />
                <p>Aún no tienes pedidos</p>
                <Link href="/stores" style={{ color: '#FF5001', textDecoration: 'none', fontWeight: 600 }}>Explorar tiendas →</Link>
              </div>
            ) : orders.map(order => {
              const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG['Pendiente']
              const Icon = cfg.icon
              return (
                <div key={order.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '1.2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <p style={{ fontSize: '0.7rem', color: '#555', margin: 0 }}>#{order.id.split('-')[0].toUpperCase()}</p>
                      <p style={{ fontSize: '0.8rem', color: '#888', margin: '2px 0 0' }}>
                        {new Date(order.created_at).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: `${cfg.color}18`, borderRadius: 8, padding: '4px 10px' }}>
                      <Icon size={12} color={cfg.color} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: cfg.color }}>{cfg.label}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#888', marginBottom: 10 }}>
                    {order.products?.map((p, i) => (
                      <span key={i}>{p.name} x{p.quantity}{i < order.products.length - 1 ? ', ' : ''}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, color: '#FF5001', fontSize: '1.1rem' }}>
                      ${order.total.toLocaleString('es-CO')}
                    </span>
                    <Link href={`/tracking/${order.id}`} style={{ fontSize: '0.78rem', color: '#FF5001', textDecoration: 'none', fontWeight: 600 }}>
                      Rastrear →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Datos personales */}
        {activeTab === 'datos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '1.5rem' }}>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#FF5001', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800 }}>
                  {(name || user?.email || 'U')[0].toUpperCase()}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 700 }}>{name || 'Sin nombre'}</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>{user?.email}</p>
                </div>
              </div>

              {[
                { label: 'Nombre completo', value: name, set: setName, icon: User, placeholder: 'Tu nombre' },
                { label: 'Teléfono / WhatsApp', value: phone, set: setPhone, icon: Phone, placeholder: '+57 300 000 0000' },
                { label: 'Dirección principal', value: address, set: setAddress, icon: MapPin, placeholder: 'Tu dirección en Quibdó' },
              ].map((field, i) => (
                <div key={i} style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.72rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, display: 'block', marginBottom: 6 }}>
                    {field.label}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <field.icon size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
                    <input
                      type="text"
                      value={field.value}
                      onChange={e => field.set(e.target.value)}
                      placeholder={field.placeholder}
                      style={{ width: '100%', height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', paddingLeft: 40, paddingRight: 16, color: '#fff', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              ))}

              <button onClick={saveprofiles} disabled={saving} style={{ width: '100%', height: 50, borderRadius: 12, background: '#FF5001', border: 'none', color: '#fff', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8 }}>
                {saving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
                {saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </main>
  )
}