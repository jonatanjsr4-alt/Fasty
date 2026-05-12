'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
  ShoppingBag, Store, Users, TrendingUp,
  Clock, Package, Truck, CheckCircle, XCircle,
  ChevronDown, Search, LogOut, Loader2,
  ToggleLeft, ToggleRight, Trash2,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  Pendiente:   { label: 'Pendiente',   color: '#facc15', bg: 'rgba(250,204,21,0.1)',   icon: Clock },
  Preparando:  { label: 'Preparando',  color: '#60a5fa', bg: 'rgba(96,165,250,0.1)',   icon: Package },
  'En camino': { label: 'En camino',   color: '#a78bfa', bg: 'rgba(167,139,250,0.1)',  icon: Truck },
  Entregado:   { label: 'Entregado',   color: '#4ade80', bg: 'rgba(74,222,128,0.1)',   icon: CheckCircle },
  Cancelado:   { label: 'Cancelado',   color: '#f87171', bg: 'rgba(248,113,113,0.1)',  icon: XCircle },
}

const STATUS_FLOW = ['Pendiente', 'Preparando', 'En camino', 'Entregado', 'Cancelado']

type Order = {
  id: string
  customer_name: string
  customer_phone: string
  customer_address: string
  products: { name: string; price: number; quantity: number; image?: string }[]
  total: number
  status: string
  created_at: string
  notes?: string
  restaurant_id?: string
}

type Restaurant = {
  id: string
  name: string
  category: string
  approved: boolean
  owner_id: string
  phone?: string
  address?: string
}

type profiles = {
  id: string
  name: string
  email: string
  role: string
  phone?: string
}

type Tab = 'pedidos' | 'negocios' | 'usuarios'

export default function AdminOrders() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('pedidos')
  const [orders, setOrders] = useState<Order[]>([])
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [users, setUsers] = useState<profiles[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('Todos')
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  const stats = {
    pedidos: orders.length,
    negocios: restaurants.length,
    usuarios: users.length,
    ingresos: orders.filter(o => o.status === 'Entregado').reduce((a, o) => a + o.total, 0),
  }

  useEffect(() => {
    fetchAll()
    const channel = supabase
      .channel('admin-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchAll)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  async function fetchAll() {
    setLoading(true)
    const [ordersRes, restRes, usersRes] = await Promise.all([
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('restaurants').select('*').order('created_at', { ascending: false }),
      supabase.from('profiless').select('*').order('created_at', { ascending: false }),
    ])
    setOrders(ordersRes.data || [])
    setRestaurants(restRes.data || [])
    setUsers(usersRes.data || [])
    setLoading(false)
  }

  function showToast(type: 'success' | 'error', msg: string) {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 3000)
  }

  async function updateOrderStatus(id: string, status: string) {
    setUpdatingId(id)
    await supabase.from('orders').update({ status }).eq('id', id)
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
    setUpdatingId(null)
  }

  async function toggleRestaurantApproval(id: string, current: boolean) {
    const { error } = await supabase.from('restaurants').update({ approved: !current }).eq('id', id)
    if (!error) {
      setRestaurants(prev => prev.map(r => r.id === id ? { ...r, approved: !current } : r))
      showToast('success', current ? 'Negocio desactivado' : 'Negocio aprobado')
    }
  }

  async function updateUserRole(id: string, role: string) {
    const { error } = await supabase.from('profiless').update({ role }).eq('id', id)
    if (!error) {
      setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u))
      showToast('success', 'Rol actualizado')
    }
  }

  async function deleteOrder(id: string) {
    if (!confirm('¿Eliminar este pedido?')) return
    await supabase.from('orders').delete().eq('id', id)
    setOrders(prev => prev.filter(o => o.id !== id))
    showToast('success', 'Pedido eliminado')
  }

  const filteredOrders = orders.filter(o => {
    const matchSearch = o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.id.includes(search)
    const matchStatus = filterStatus === 'Todos' || o.status === filterStatus
    return matchSearch && matchStatus
  })

  const filteredRestaurants = restaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  )

  const filteredUsers = users.filter(u =>
    (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(search.toLowerCase())
  )

  const logout = async () => { await supabase.auth.signOut(); router.push('/auth') }

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 20, right: 20, zIndex: 9999,
          background: toast.type === 'success' ? 'rgba(74,222,128,0.15)' : 'rgba(248,113,113,0.15)',
          border: `1px solid ${toast.type === 'success' ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)'}`,
          borderRadius: 14, padding: '12px 20px',
          color: toast.type === 'success' ? '#4ade80' : '#f87171',
          fontSize: '0.9rem', fontWeight: 600,
        }}>{toast.msg}</div>
      )}

      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FF5001', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>F</div>
          <div>
            <p style={{ margin: 0, fontWeight: 800, fontSize: '1rem' }}>Panel Admin</p>
            <p style={{ margin: 0, fontSize: '0.7rem', color: '#FF5001' }}>FASTY PLATFORM</p>
          </div>
        </div>
        <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#888', fontSize: '0.8rem', cursor: 'pointer' }}>
          <LogOut size={14} /> Salir
        </button>
      </header>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Pedidos totales', value: stats.pedidos, icon: ShoppingBag, color: '#FF5001' },
            { label: 'Negocios', value: stats.negocios, icon: Store, color: '#60a5fa' },
            { label: 'Usuarios', value: stats.usuarios, icon: Users, color: '#a78bfa' },
            { label: 'Ingresos', value: `$${stats.ingresos.toLocaleString('es-CO')}`, icon: TrendingUp, color: '#4ade80' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800 }}>{s.value}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#666' }}>{s.label}</p>
                </div>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <s.icon size={18} color={s.color} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem', background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 4 }}>
          {([
            { key: 'pedidos', label: '🛒 Pedidos' },
            { key: 'negocios', label: '🏪 Negocios' },
            { key: 'usuarios', label: '👥 Usuarios' },
          ] as const).map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              flex: 1, height: 40, borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
              background: activeTab === tab.key ? '#FF5001' : 'transparent',
              color: activeTab === tab.key ? '#fff' : '#666',
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search + filter */}
        <div style={{ display: 'flex', gap: 10, marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', height: 42, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', paddingLeft: 38, paddingRight: 14, color: '#fff', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          {activeTab === 'pedidos' && (
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
              style={{ height: 42, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '0 12px', color: '#fff', fontSize: '0.85rem', outline: 'none' }}>
              <option value="Todos">Todos</option>
              {STATUS_FLOW.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <Loader2 size={32} color="#FF5001" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        ) : (
          <>
            {/* PEDIDOS */}
            {activeTab === 'pedidos' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredOrders.length === 0 && <p style={{ color: '#555', textAlign: 'center', padding: '2rem' }}>No hay pedidos</p>}
                {filteredOrders.map(order => {
                  const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG['Pendiente']
                  const Icon = cfg.icon
                  return (
                    <div key={order.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '1.2rem' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <p style={{ margin: 0, fontWeight: 800, fontSize: '1rem' }}>{order.customer_name}</p>
                          <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#666' }}>#{order.id.split('-')[0].toUpperCase()} · {new Date(order.created_at).toLocaleString('es-CO')}</p>
                          <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#888' }}>📞 {order.customer_phone} · 📍 {order.customer_address}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <select
                            value={order.status}
                            onChange={e => updateOrderStatus(order.id, e.target.value)}
                            disabled={updatingId === order.id}
                            style={{ height: 36, borderRadius: 8, background: cfg.bg, border: `1px solid ${cfg.color}40`, padding: '0 10px', color: cfg.color, fontSize: '0.8rem', fontWeight: 600, outline: 'none', cursor: 'pointer' }}
                          >
                            {STATUS_FLOW.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <button onClick={() => deleteOrder(order.id)} style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                      <div style={{ marginTop: 10, fontSize: '0.82rem', color: '#666' }}>
                        {order.products?.map((p, i) => `${p.name} x${p.quantity}`).join(' · ')}
                      </div>
                      <div style={{ marginTop: 8, fontWeight: 800, color: '#FF5001' }}>
                        ${order.total?.toLocaleString('es-CO')}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* NEGOCIOS */}
            {activeTab === 'negocios' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredRestaurants.length === 0 && <p style={{ color: '#555', textAlign: 'center', padding: '2rem' }}>No hay negocios</p>}
                {filteredRestaurants.map(r => (
                  <div key={r.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 700 }}>{r.name}</p>
                      <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#666' }}>{r.category} {r.phone && `· ${r.phone}`}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: 8, background: r.approved ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)', color: r.approved ? '#4ade80' : '#f87171', fontWeight: 600 }}>
                        {r.approved ? 'Activo' : 'Inactivo'}
                      </span>
                      <button onClick={() => toggleRestaurantApproval(r.id, r.approved)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>
                        {r.approved ? <ToggleRight size={14} color="#4ade80" /> : <ToggleLeft size={14} color="#f87171" />}
                        {r.approved ? 'Desactivar' : 'Aprobar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* USUARIOS */}
            {activeTab === 'usuarios' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredUsers.length === 0 && <p style={{ color: '#555', textAlign: 'center', padding: '2rem' }}>No hay usuarios</p>}
                {filteredUsers.map(u => (
                  <div key={u.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#FF5001', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>
                        {(u.name || u.email || 'U')[0].toUpperCase()}
                      </div>
                      <div>
                        <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem' }}>{u.name || '—'}</p>
                        <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#666' }}>{u.email}</p>
                      </div>
                    </div>
                    <select
                      value={u.role || 'customer'}
                      onChange={e => updateUserRole(u.id, e.target.value)}
                      style={{ height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '0 10px', color: '#fff', fontSize: '0.82rem', outline: 'none', cursor: 'pointer' }}
                    >
                      <option value="customer">Cliente</option>
                      <option value="business">Negocio</option>
                      <option value="delivery">Domiciliario</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}