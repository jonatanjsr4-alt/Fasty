'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { CheckCircle, Clock, Truck, Package, XCircle, ArrowLeft, Phone, MapPin } from 'lucide-react'

type Order = {
  id: string
  customer_name: string
  customer_phone: string
  customer_address: string
  products: { name: string; price: number; quantity: number }[]
  total: number
  status: string
  created_at: string
  restaurant_id: string
}

type Restaurant = {
  name: string
  phone: string
}

const STEPS = [
  { key: 'Pendiente',   label: 'Pedido recibido',  icon: Clock,        desc: 'Tu pedido ha sido registrado y está en espera.' },
  { key: 'Preparando',  label: 'Preparando',        icon: Package,      desc: 'El negocio está preparando tu pedido.' },
  { key: 'En camino',   label: 'En camino',         icon: Truck,        desc: 'Tu pedido está en camino hacia ti. 🚀' },
  { key: 'Entregado',   label: 'Entregado',         icon: CheckCircle,  desc: '¡Tu pedido ha llegado! Buen provecho. 🎉' },
]

export default function TrackingPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string

  const [order, setOrder] = useState<Order | null>(null)
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!orderId) return
    fetchOrder()

    // Suscripción en tiempo real
    const channel = supabase
      .channel(`order-${orderId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${orderId}` },
        (payload) => { setOrder(prev => prev ? { ...prev, status: (payload.new as Order).status } : null) }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [orderId])

  async function fetchOrder() {
    setLoading(true)
    const { data } = await supabase.from('orders').select('*').eq('id', orderId).single()
    if (!data) { setNotFound(true); setLoading(false); return }
    setOrder(data)

    if (data.restaurant_id) {
      const { data: rest } = await supabase.from('restaurants').select('name, phone').eq('id', data.restaurant_id).single()
      if (rest) setRestaurant(rest)
    }
    setLoading(false)
  }

  if (loading) return <LoadingScreen />

  if (notFound) return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, textAlign: 'center', padding: '2rem' }}>
      <XCircle size={56} color="var(--muted)" />
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700 }}>Pedido no encontrado</h2>
      <p style={{ color: 'var(--muted)' }}>El código de seguimiento no es válido.</p>
      <Link href="/stores" style={{ marginTop: 8, color: 'var(--orange)', fontSize: '0.9rem' }}>← Volver a tiendas</Link>
    </div>
  )

  if (!order) return null

  const currentStepIndex = STEPS.findIndex(s => s.key === order.status)
  const isCancelled = order.status === 'Cancelado'

  return (
    <main style={{ minHeight: '100vh', background: 'var(--dark)', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 600 }}>

        {/* BACK */}
        <button onClick={() => router.push('/stores')} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--muted)', fontSize: '0.85rem', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Volver a tiendas
        </button>

        {/* HEADER */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '0.5rem' }}>
            Seguimiento de pedido
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>
            {isCancelled ? 'Pedido cancelado' : order.status === 'Entregado' ? '¡Pedido entregado! 🎉' : 'Tu pedido está en camino'}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>
            Pedido #{order.id.split('-')[0].toUpperCase()} · {new Date(order.created_at).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' })}
          </p>
        </div>

        {/* STEPS */}
        {!isCancelled && (
          <div style={{ background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: '1.5rem', marginBottom: '1.5rem' }}>
            {STEPS.map((step, index) => {
              const Icon = step.icon
              const isDone = index < currentStepIndex
              const isCurrent = index === currentStepIndex
              const isPending = index > currentStepIndex
              return (
                <div key={step.key} style={{ display: 'flex', gap: 16, paddingBottom: index < STEPS.length - 1 ? '1.5rem' : 0, position: 'relative' }}>
                  {/* Line connector */}
                  {index < STEPS.length - 1 && (
                    <div style={{ position: 'absolute', left: 19, top: 40, width: 2, height: 'calc(100% - 16px)', background: isDone ? 'var(--orange)' : 'rgba(255,255,255,0.08)', transition: 'background 0.5s' }} />
                  )}
                  {/* Icon */}
                  <div style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.4s', background: isDone ? 'var(--orange)' : isCurrent ? 'rgba(255,80,1,0.15)' : 'rgba(255,255,255,0.05)', border: `2px solid ${isDone ? 'var(--orange)' : isCurrent ? 'var(--orange)' : 'rgba(255,255,255,0.08)'}` }}>
                    <Icon size={16} color={isDone ? '#fff' : isCurrent ? 'var(--orange)' : 'var(--muted)'} />
                  </div>
                  {/* Text */}
                  <div style={{ flex: 1, paddingTop: 8 }}>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem', color: isPending ? 'var(--muted)' : 'var(--white)', marginBottom: '0.2rem' }}>
                      {step.label}
                      {isCurrent && <span style={{ marginLeft: 8, display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: 'var(--orange)', animation: 'pulse 1.5s infinite' }} />}
                    </p>
                    {isCurrent && <p style={{ color: 'var(--muted)', fontSize: '0.78rem', lineHeight: 1.4 }}>{step.desc}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {isCancelled && (
          <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 20, padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', gap: 12, alignItems: 'center' }}>
            <XCircle size={24} color="#f87171" />
            <div>
              <p style={{ fontWeight: 600, color: '#f87171', marginBottom: '0.2rem' }}>Pedido cancelado</p>
              <p style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>Este pedido fue cancelado. Contáctanos si tienes dudas.</p>
            </div>
          </div>
        )}

        {/* ORDER DETAILS */}
        <div style={{ background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>Detalle del pedido</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
            {order.products?.map((p, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--muted)' }}>{p.name} <span style={{ color: 'rgba(255,255,255,0.3)' }}>x{p.quantity}</span></span>
                <span>${(p.price * p.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Total</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--orange)' }}>${order.total.toLocaleString()}</span>
          </div>
        </div>

        {/* DELIVERY INFO */}
        <div style={{ background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>Información de entrega</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <MapPin size={15} color="var(--orange)" style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <p style={{ color: 'var(--muted)', fontSize: '0.72rem', marginBottom: 2 }}>Dirección</p>
                <p>{order.customer_address}</p>
              </div>
            </div>
            {restaurant && (
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Package size={15} color="var(--orange)" style={{ marginTop: 2, flexShrink: 0 }} />
                <div>
                  <p style={{ color: 'var(--muted)', fontSize: '0.72rem', marginBottom: 2 }}>Negocio</p>
                  <p>{restaurant.name}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/stores" style={{ color: 'var(--orange)', fontSize: '0.85rem' }}>
            ← Hacer otro pedido
          </Link>
        </div>
      </div>
    </main>
  )
}

function LoadingScreen() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid var(--dark3)', borderTopColor: 'var(--orange)', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Cargando tu pedido...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )
}