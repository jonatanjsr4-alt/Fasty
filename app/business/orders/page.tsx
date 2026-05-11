'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Clock, Package, Truck, CheckCircle,
  XCircle, Loader2, ShoppingBag, ExternalLink,
} from 'lucide-react'

type Order = {
  id: string
  customer_name: string
  customer_phone: string
  customer_address: string
  products: { name: string; price: number; quantity: number }[]
  total: number
  status: string
  created_at: string
  notes?: string
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  Pendiente:  { label: 'Pendiente',  color: '#facc15', bg: 'rgba(250,204,21,0.1)',   icon: Clock },
  Preparando: { label: 'Preparando', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)',   icon: Package },
  'En camino':{ label: 'En camino',  color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', icon: Truck },
  Entregado:  { label: 'Entregado',  color: '#4ade80', bg: 'rgba(74,222,128,0.1)',   icon: CheckCircle },
  Cancelado:  { label: 'Cancelado',  color: '#f87171', bg: 'rgba(248,113,113,0.1)',  icon: XCircle },
}

const STATUS_FLOW = ['Pendiente', 'Preparando', 'En camino', 'Entregado']

export default function BusinessOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [restaurantId, setRestaurantId] = useState<string | null>(null)
  const [restaurantName, setRestaurantName] = useState('')
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('Todos')

  useEffect(() => {
    init()
  }, [])

  async function init() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth'); return }

    const { data: rest } = await supabase
      .from('restaurants')
      .select('id, name')
      .eq('owner_id', user.id)
      .single()

    if (!rest) { setLoading(false); return }

    setRestaurantId(rest.id)
    setRestaurantName(rest.name)
    await fetchOrders(rest.id)

    // Tiempo real
    const channel = supabase
      .channel(`biz-orders-${rest.id}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'orders',
        filter: `restaurant_id=eq.${rest.id}`,
      }, () => fetchOrders(rest.id))
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }

  async function fetchOrders(restId: string) {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('restaurant_id', restId)
      .order('created_at', { ascending: false })

    setOrders(data || [])
    setLoading(false)
  }

  async function updateStatus(orderId: string, status: string) {
    setUpdatingId(orderId)
    await supabase.from('orders').update({ status }).eq('id', orderId)
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
    setUpdatingId(null)
  }

  const filters = ['Todos', ...Object.keys(STATUS_CONFIG)]
  const filtered = activeFilter === 'Todos'
    ? orders
    : orders.filter(o => o.status === activeFilter)

  const pendingCount = orders.filter(o => o.status === 'Pendiente').length

  return (
    <main style={{ minHeight: '100vh', background: 'var(--dark)', color: 'var(--white)' }}>

      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => router.push('/dashboard')} style={{
            width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', color: 'var(--white)',
          }}>
            <ArrowLeft size={16} />
          </button>
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 600, margin: 0 }}>
              {restaurantName || 'Mi negocio'}
            </p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              Pedidos
              {pendingCount > 0 && (
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: '50%', background: 'var(--orange)', color: '#fff', fontSize: '0.65rem', fontWeight: 800 }}>
                  {pendingCount}
                </span>
              )}
            </h1>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
          <span style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>En vivo</span>
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem 6rem' }}>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem 0' }}>
            <Loader2 size={32} color="var(--orange)" style={{ animation: 'spin 0.8s linear infinite' }} />
          </div>
        ) : !restaurantId ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
            <ShoppingBag size={56} color="var(--muted)" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.8rem' }}>
              Sin negocio registrado
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>
              Primero debes crear tu negocio para recibir pedidos.
            </p>
            <Link href="/business/create" style={{
              background: 'var(--orange)', color: '#fff', padding: '12px 28px',
              borderRadius: 14, fontWeight: 700, textDecoration: 'none',
            }}>
              Crear mi negocio
            </Link>
          </div>
        ) : (
          <>
            {/* Stats rápidas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {Object.entries(STATUS_CONFIG).slice(0, 4).map(([key, cfg]) => {
                const Icon = cfg.icon
                const count = orders.filter(o => o.status === key).length
                return (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(activeFilter === key ? 'Todos' : key)}
                    style={{
                      padding: '0.9rem 1rem', borderRadius: 16, cursor: 'pointer',
                      background: activeFilter === key ? cfg.bg : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${activeFilter === key ? cfg.color + '55' : 'rgba(255,255,255,0.07)'}`,
                      textAlign: 'left', transition: 'all 0.2s',
                    }}
                  >
                    <Icon size={16} color={cfg.color} style={{ marginBottom: 6 }} />
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: cfg.color, margin: 0 }}>{count}</p>
                    <p style={{ color: 'var(--muted)', fontSize: '0.7rem', margin: 0 }}>{cfg.label}</p>
                  </button>
                )
              })}
            </div>

            {/* Filtro pills */}
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
              {filters.map(f => {
                const cfg = STATUS_CONFIG[f]
                return (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    style={{
                      padding: '6px 16px', borderRadius: 100, whiteSpace: 'nowrap', cursor: 'pointer',
                      fontSize: '0.78rem', fontWeight: 500, transition: 'all 0.2s',
                      background: activeFilter === f ? (cfg?.color || 'var(--orange)') : 'var(--dark3)',
                      color: activeFilter === f ? '#000' : 'var(--muted)',
                      border: `1px solid ${activeFilter === f ? (cfg?.color || 'var(--orange)') : 'rgba(255,255,255,0.08)'}`,
                    }}
                  >
                    {f} {f !== 'Todos' && `(${orders.filter(o => o.status === f).length})`}
                  </button>
                )
              })}
            </div>

            {/* Lista */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'rgba(255,255,255,0.03)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.06)' }}>
                <ShoppingBag size={40} color="var(--muted)" style={{ margin: '0 auto 1rem' }} />
                <p style={{ color: 'var(--muted)' }}>
                  {activeFilter === 'Todos'
                    ? 'Aún no tienes pedidos. Cuando lleguen aparecerán aquí.'
                    : `No hay pedidos con estado "${activeFilter}".`}
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filtered.map(order => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    updating={updatingId === order.id}
                    onUpdate={(status) => updateStatus(order.id, status)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
      `}</style>
    </main>
  )
}

function OrderCard({ order, updating, onUpdate }: {
  order: Order
  updating: boolean
  onUpdate: (status: string) => void
}) {
  const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG['Pendiente']
  const Icon = cfg.icon
  const currentIdx = STATUS_FLOW.indexOf(order.status)
  const isCancelled = order.status === 'Cancelado'

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 22, overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '1.2rem 1.4rem',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon size={18} color={cfg.color} />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.95rem', margin: 0 }}>{order.customer_name}</p>
            <p style={{ color: 'var(--muted)', fontSize: '0.78rem', margin: 0 }}>
              #{order.id.split('-')[0].toUpperCase()} · {new Date(order.created_at).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' })}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--orange)' }}>
            ${order.total.toLocaleString()}
          </span>
          <Link
            href={`/tracking/${order.id}`}
            target="_blank"
            style={{ display: 'flex', alignItems: 'center', padding: 8, borderRadius: 10, background: 'rgba(255,255,255,0.06)', color: 'var(--muted)', textDecoration: 'none' }}
            title="Ver seguimiento"
          >
            <ExternalLink size={14} />
          </Link>
        </div>
      </div>

      {/* Info cliente */}
      <div style={{ padding: '0.9rem 1.4rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>📞 {order.customer_phone || '—'}</span>
        <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>📍 {order.customer_address}</span>
        {order.notes && <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>📝 {order.notes}</span>}
      </div>

      {/* Productos */}
      <div style={{ padding: '0.9rem 1.4rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {order.products?.map((p, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
              <span style={{ color: 'var(--muted)' }}>{p.name} <span style={{ color: 'rgba(255,255,255,0.3)' }}>×{p.quantity}</span></span>
              <span>${(p.price * p.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Acciones de estado */}
      {!isCancelled && (
        <div style={{ padding: '1rem 1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {STATUS_FLOW.map((status, idx) => {
            const s = STATUS_CONFIG[status]
            const isDone = idx < currentIdx
            const isCurrent = idx === currentIdx
            const isNext = idx === currentIdx + 1
            return (
              <button
                key={status}
                disabled={updating || (!isNext && !isCurrent)}
                onClick={() => isNext && onUpdate(status)}
                style={{
                  height: 36, padding: '0 14px', borderRadius: 10, fontSize: '0.8rem', fontWeight: 600,
                  cursor: isNext ? 'pointer' : 'default',
                  background: isDone ? 'rgba(255,255,255,0.06)' : isCurrent ? s.bg : isNext ? 'var(--dark3)' : 'transparent',
                  border: `1px solid ${isDone ? 'rgba(255,255,255,0.08)' : isCurrent ? s.color + '66' : isNext ? 'rgba(255,255,255,0.15)' : 'transparent'}`,
                  color: isDone ? 'var(--muted)' : isCurrent ? s.color : isNext ? 'var(--white)' : 'var(--muted)',
                  opacity: updating ? 0.6 : 1,
                  transition: 'all 0.2s',
                  textDecoration: isDone ? 'line-through' : 'none',
                }}
              >
                {isCurrent && updating ? '...' : status}
              </button>
            )
          })}

          <button
            disabled={updating}
            onClick={() => onUpdate('Cancelado')}
            style={{
              marginLeft: 'auto', height: 36, padding: '0 14px', borderRadius: 10,
              fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
              background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)',
              color: '#f87171', transition: 'all 0.2s',
            }}
          >
            Cancelar
          </button>
        </div>
      )}

      {isCancelled && (
        <div style={{ padding: '0.8rem 1.4rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <XCircle size={15} color="#f87171" />
          <span style={{ color: '#f87171', fontSize: '0.82rem' }}>Pedido cancelado</span>
        </div>
      )}
    </div>
  )
}
