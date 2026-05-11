'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft, Clock, CheckCircle, Package, Truck } from 'lucide-react'

const STEPS = [
  { key: 'Pendiente',  label: 'Recibido',    icon: Clock,        desc: 'Tu pedido fue registrado correctamente' },
  { key: 'Preparando', label: 'Preparando',  icon: Package,      desc: 'El negocio está preparando tu pedido' },
  { key: 'En camino',  label: 'En camino',   icon: Truck,        desc: 'Tu domiciliario está en ruta' },
  { key: 'Entregado',  label: 'Entregado',   icon: CheckCircle,  desc: '¡Pedido entregado con éxito!' },
]

export default function TrackingPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string

  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!orderId) return
    fetchOrder()

    const channel = supabase
      .channel(`tracking-${orderId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'orders',
        filter: `id=eq.${orderId}`,
      }, (payload) => {
        setOrder(payload.new)
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [orderId])

  async function fetchOrder() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (!error && data) setOrder(data)
    setLoading(false)
  }

  const activeIndex = Math.max(0, STEPS.findIndex(s => s.key === order?.status))
  const isDelivered = order?.status === 'Entregado'

  if (loading) return (
    <main style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid var(--dark3)', borderTopColor: 'var(--orange)', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
        <p style={{ color: 'var(--muted)' }}>Cargando pedido...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  )

  if (!order) return (
    <main style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--white)' }}>Pedido no encontrado</h2>
      <Link href="/stores" style={{ background: 'var(--orange)', color: '#fff', padding: '10px 24px', borderRadius: 12, fontWeight: 600 }}>Volver a tiendas</Link>
    </main>
  )

  const currentStep = STEPS[activeIndex]
  const StatusIcon = currentStep.icon

  return (
    <main style={{ minHeight: '100vh', background: 'var(--dark)', color: 'var(--white)' }}>

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={() => router.back()} style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--white)' }}>
          <ArrowLeft size={16} />
        </button>
        <div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 600, margin: 0 }}>Seguimiento</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
            Pedido #{orderId.split('-')[0].toUpperCase()}
          </h1>
        </div>
      </nav>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>

        {/* Estado principal */}
        <div style={{ textAlign: 'center', padding: '2.5rem 1rem', background: isDelivered ? 'rgba(74,222,128,0.06)' : 'rgba(255,80,1,0.06)', border: `1px solid ${isDelivered ? 'rgba(74,222,128,0.2)' : 'rgba(255,80,1,0.15)'}`, borderRadius: 28, marginBottom: '1.5rem' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: isDelivered ? 'rgba(74,222,128,0.15)' : 'rgba(255,80,1,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <StatusIcon size={32} color={isDelivered ? '#4ade80' : 'var(--orange)'} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem,3vw,1.8rem)', fontWeight: 800, marginBottom: '0.4rem' }}>
            {currentStep.label}
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: 0 }}>{currentStep.desc}</p>
        </div>

        {/* Barra de progreso */}
        <div style={{ background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            {STEPS.map((step, i) => {
              const Icon = step.icon
              const done = i <= activeIndex
              const active = i === activeIndex
              return (
                <div key={step.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                  {i > 0 && (
                    <div style={{ position: 'absolute', left: 0, top: 17, width: '50%', height: 2, background: i <= activeIndex ? 'var(--orange)' : 'rgba(255,255,255,0.08)', transition: 'background 0.5s' }} />
                  )}
                  {i < STEPS.length - 1 && (
                    <div style={{ position: 'absolute', right: 0, top: 17, width: '50%', height: 2, background: i < activeIndex ? 'var(--orange)' : 'rgba(255,255,255,0.08)', transition: 'background 0.5s' }} />
                  )}
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: done ? (active ? 'var(--orange)' : 'rgba(255,80,1,0.15)') : 'var(--dark2)', border: `2px solid ${done ? 'var(--orange)' : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, transition: 'all 0.4s', flexShrink: 0 }}>
                    <Icon size={13} color={done ? (active ? '#fff' : 'var(--orange)') : 'var(--muted)'} />
                  </div>
                  <p style={{ fontSize: '0.6rem', fontWeight: active ? 700 : 400, color: done ? (active ? 'var(--white)' : 'rgba(255,80,1,0.8)') : 'var(--muted)', marginTop: '0.5rem', textAlign: 'center', lineHeight: 1.3 }}>
                    {step.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Detalles */}
        <div style={{ background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Detalles del pedido</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {order.customer_name && <InfoRow label="Cliente" value={order.customer_name} />}
            {order.customer_address && <InfoRow label="Dirección" value={order.customer_address} />}
            {order.customer_phone && <InfoRow label="Teléfono" value={order.customer_phone} />}
            {order.notes && <InfoRow label="Notas" value={order.notes} />}
            <InfoRow label="Fecha" value={new Date(order.created_at).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' })} />
          </div>
        </div>

        {/* Productos */}
        {order.products && order.products.length > 0 && (
          <div style={{ background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: '1.5rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Productos</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {order.products.map((p: any, i: number) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.55rem 0', borderBottom: i < order.products.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <span style={{ fontSize: '0.88rem', color: 'var(--white)' }}>
                    {p.name}
                    {p.quantity > 1 && <span style={{ color: 'var(--muted)', marginLeft: 6 }}>×{p.quantity}</span>}
                  </span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--orange)' }}>
                    ${((p.price || 0) * (p.quantity || 1)).toLocaleString('es-CO')}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '1rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700 }}>Total</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--orange)' }}>
                ${order.total?.toLocaleString('es-CO')}
              </span>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/stores" style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>← Volver a tiendas</Link>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', fontSize: '0.88rem' }}>
      <span style={{ color: 'var(--muted)', flexShrink: 0 }}>{label}</span>
      <span style={{ color: 'var(--white)', textAlign: 'right' }}>{value}</span>
    </div>
  )
}
