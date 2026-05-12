'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import {
  Truck, Clock, CheckCircle, XCircle,
  Package, MapPin, Phone, Loader2,
  LogOut, Navigation,
} from 'lucide-react'

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  Pendiente:   { label: 'Pendiente',   color: '#facc15', bg: 'rgba(250,204,21,0.1)' },
  Preparando:  { label: 'Preparando',  color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
  'En camino': { label: 'En camino',   color: '#a78bfa', bg: 'rgba(167,139,250,0.1)' },
  Entregado:   { label: 'Entregado',   color: '#4ade80', bg: 'rgba(74,222,128,0.1)' },
  Cancelado:   { label: 'Cancelado',   color: '#f87171', bg: 'rgba(248,113,113,0.1)' },
}

type Order = {
  id: string
  customer_name: string
  customer_phone: string
  customer_address: string
  products: { name: string; quantity: number; price: number }[]
  total: number
  status: string
  created_at: string
  notes?: string
}

export default function DeliveryPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'activos' | 'entregados'>('activos')
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    init()
    const channel = supabase
      .channel('delivery-orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchOrders)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  async function init() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth'); return }

    const { data: profiles } = await supabase
      .from('profiless')
      .select('role')
      .eq('id', user.id)
      .single()

    // Solo repartidores y admins pueden acceder
    if (!profiles || !['delivery', 'admin'].includes(profiles.role)) {
      router.push('/')
      return
    }

    setUser(user)
    await fetchOrders()
  }

  async function fetchOrders() {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .in('status', ['Preparando', 'En camino', 'Entregado', 'Pendiente'])
      .order('created_at', { ascending: false })
    setOrders(data || [])
    setLoading(false)
  }

  async function updateStatus(id: string, status: string) {
    setUpdatingId(id)
    await supabase.from('orders').update({ status }).eq('id', id)
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
    setUpdatingId(null)
    setToast(`Pedido marcado como: ${status}`)
    setTimeout(() => setToast(null), 2500)
  }

  async function logout() {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  const activeOrders = orders.filter(o => ['Pendiente', 'Preparando', 'En camino'].includes(o.status))
  const deliveredOrders = orders.filter(o => o.status === 'Entregado')
  const shown = filter === 'activos' ? activeOrders : deliveredOrders

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 size={32} color="#FF5001" style={{ animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0A', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>

      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 14, padding: '12px 20px', color: '#4ade80', fontSize: '0.9rem', fontWeight: 600 }}>
          {toast}
        </div>
      )}

      {/* Nav */}
      <nav style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FF5001', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Truck size={18} color="#fff" />
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 800 }}>Panel Domiciliario</p>
            <p style={{ margin: 0, fontSize: '0.7rem', color: '#FF5001' }}>FASTY DELIVERY</p>
          </div>
        </div>
        <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#888', fontSize: '0.8rem', cursor: 'pointer' }}>
          <LogOut size={14} /> Salir
        </button>
      </nav>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>

        {/* Stats rápidas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(250,204,21,0.08)', border: '1px solid rgba(250,204,21,0.15)', borderRadius: 16, padding: '1rem', textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800, color: '#facc15' }}>{activeOrders.length}</p>
            <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#888' }}>Pendientes / En ruta</p>
          </div>
          <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: 16, padding: '1rem', textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800, color: '#4ade80' }}>{deliveredOrders.length}</p>
            <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#888' }}>Entregados hoy</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem', background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 4 }}>
          {([
            { key: 'activos', label: `🚀 Activos (${activeOrders.length})` },
            { key: 'entregados', label: `✅ Entregados (${deliveredOrders.length})` },
          ] as const).map(tab => (
            <button key={tab.key} onClick={() => setFilter(tab.key)} style={{
              flex: 1, height: 40, borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
              background: filter === tab.key ? '#FF5001' : 'transparent',
              color: filter === tab.key ? '#fff' : '#666',
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Lista de pedidos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {shown.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#555' }}>
              <Truck size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
              <p>{filter === 'activos' ? 'No hay pedidos activos' : 'No hay pedidos entregados'}</p>
            </div>
          )}

          {shown.map(order => {
            const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG['Pendiente']
            return (
              <div key={order.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '1.2rem' }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 800, fontSize: '1rem' }}>{order.customer_name}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '0.7rem', color: '#555' }}>#{order.id.split('-')[0].toUpperCase()}</p>
                  </div>
                  <div style={{ background: cfg.bg, borderRadius: 8, padding: '4px 10px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: cfg.color }}>{cfg.label}</span>
                  </div>
                </div>

                {/* Info cliente */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: '#ccc' }}>
                    <MapPin size={13} color="#FF5001" />
                    <span>{order.customer_address}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: '#ccc' }}>
                    <Phone size={13} color="#FF5001" />
                    <a href={`tel:${order.customer_phone}`} style={{ color: '#ccc', textDecoration: 'none' }}>{order.customer_phone}</a>
                  </div>
                </div>

                {/* Productos */}
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '0.8rem', marginBottom: 12, fontSize: '0.82rem', color: '#888' }}>
                  {order.products?.map((p, i) => (
                    <span key={i}>{p.name} x{p.quantity}{i < order.products.length - 1 ? ' · ' : ''}</span>
                  ))}
                  {order.notes && <p style={{ margin: '6px 0 0', color: '#666', fontStyle: 'italic' }}>📝 {order.notes}</p>}
                </div>

                {/* Total */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontWeight: 800, color: '#FF5001', fontSize: '1.1rem' }}>${order.total.toLocaleString('es-CO')}</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.customer_address + ', Quibdó')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', color: '#60a5fa', fontSize: '0.78rem', textDecoration: 'none', fontWeight: 600 }}
                  >
                    <Navigation size={13} /> Ver mapa
                  </a>
                </div>

                {/* Acciones de estado */}
                {filter === 'activos' && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    {order.status === 'Pendiente' && (
                      <button onClick={() => updateStatus(order.id, 'En camino')} disabled={updatingId === order.id}
                        style={{ flex: 1, height: 42, borderRadius: 10, background: '#FF5001', border: 'none', color: '#fff', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <Truck size={15} /> Salir a entregar
                      </button>
                    )}
                    {order.status === 'En camino' && (
                      <button onClick={() => updateStatus(order.id, 'Entregado')} disabled={updatingId === order.id}
                        style={{ flex: 1, height: 42, borderRadius: 10, background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <CheckCircle size={15} /> Marcar entregado
                      </button>
                    )}
                    {order.status === 'Preparando' && (
                      <button onClick={() => updateStatus(order.id, 'En camino')} disabled={updatingId === order.id}
                        style={{ flex: 1, height: 42, borderRadius: 10, background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)', color: '#a78bfa', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <Truck size={15} /> Listo, saliendo
                      </button>
                    )}
                    <button onClick={() => updateStatus(order.id, 'Cancelado')} disabled={updatingId === order.id}
                      style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <XCircle size={16} />
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </main>
  )
}