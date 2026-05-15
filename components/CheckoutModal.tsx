'use client'
import { useState, useEffect } from 'react'
import { X, Loader2, CheckCircle, Send, MapPin, Navigation } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/components/CartContext'
import Link from 'next/link'

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573134157991'

const PAYMENT_METHODS = [
  { id: 'Efectivo', label: 'Efectivo', icon: '💵', desc: 'Paga al domiciliario cuando llegue' },
  { id: 'Nequi', label: 'Nequi', icon: '📱', desc: 'Transferencia por Nequi' },
  { id: 'Daviplata', label: 'Daviplata', icon: '💳', desc: 'Transferencia por Daviplata' },
]

type Props = { onClose: () => void; restaurantId?: string }

export default function CheckoutModal({ onClose, restaurantId }: Props) {
  const { cart, total, clearCart } = useCart()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [payMethod, setPayMethod] = useState('Efectivo')
  const [loading, setLoading] = useState(false)
  const [gpsLoading, setGpsLoading] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      const { data: p } = await supabase.from('profiles').select('name,phone,address').eq('id', user.id).single()
      if (p) { if (p.name) setName(p.name); if (p.phone) setPhone(p.phone); if (p.address) setAddress(p.address) }
    })
  }, [])

  function getGPS() {
    if (!navigator.geolocation) { setError('Tu navegador no soporta GPS'); return }
    setGpsLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
          const data = await res.json()
          const addr = data.display_name || `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`
          setAddress(addr)
        } catch {
          setAddress(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`)
        }
        setGpsLoading(false)
      },
      () => { setError('No se pudo obtener la ubicación'); setGpsLoading(false) },
      { timeout: 10000 }
    )
  }

  async function sendOrder() {
    if (!name.trim() || !address.trim()) { setError('Nombre y dirección son obligatorios'); return }
    setLoading(true); setError('')
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error: e } = await supabase.from('orders').insert([{
      user_id: user?.id ?? null,
      restaurant_id: restaurantId || cart[0]?.restaurant_id || null,
      customer_name: name.trim(), customer_phone: phone.trim(), customer_address: address.trim(),
      products: cart.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
      total, status: 'Pendiente',
      notes: notes.trim() || null,
      payment_method: payMethod,
    }]).select().single()

    if (e || !data) { setError('Error al crear el pedido. Intenta de nuevo.'); setLoading(false); return }

    const msg = [
      '🚀 *NUEVO PEDIDO FASTY*',
      `📋 ID: #${data.id.split('-')[0].toUpperCase()}`,
      '',
      `👤 *Cliente:* ${name}`,
      `📞 *WhatsApp:* ${phone}`,
      `📍 *Dirección:* ${address}`,
      `💳 *Pago:* ${payMethod}`,
      notes ? `📝 *Notas:* ${notes}` : '',
      '',
      '🛒 *Productos:*',
      ...cart.map(i => `• ${i.name} x${i.quantity} — $${(i.price * i.quantity).toLocaleString('es-CO')}`),
      '',
      `💰 *TOTAL: $${total.toLocaleString('es-CO')}*`,
    ].filter(Boolean).join('%0A')

    window.open(`https://wa.me/${WA}?text=${msg}`, '_blank')
    clearCart(); setOrderId(data.id); setLoading(false)
  }

  const inp: React.CSSProperties = { width: '100%', height: 50, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0 14px', color: '#fff', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }
  const ta: React.CSSProperties = { ...inp, height: 'auto', padding: '12px 14px', resize: 'none' as const }

  if (orderId) return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 420, background: '#101010', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 28, padding: '2.5rem', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(74,222,128,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <CheckCircle size={36} color="#4ade80" />
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: 8 }}>¡Pedido enviado!</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2rem', lineHeight: 1.6 }}>Tu pedido fue registrado y el negocio fue notificado por WhatsApp.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <Link href={`/tracking/${orderId}`} style={{ height: 50, borderRadius: 14, background: 'var(--orange)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none', fontWeight: 700 }}>
            Seguir pedido →
          </Link>
          <button onClick={onClose} style={{ height: 50, borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--muted)', cursor: 'pointer', fontWeight: 600 }}>
            Seguir comprando
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 520, background: '#101010', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 28, padding: '2rem', maxHeight: '92vh', overflowY: 'auto', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--muted)' }}>
          <X size={15} />
        </button>

        <p style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 6 }}>Finalizar pedido</p>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: '1.5rem' }}>Confirma tu pedido 🚀</h2>

        {/* Resumen carrito */}
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: '1rem', marginBottom: '1.2rem' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Tu pedido</p>
          {cart.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#ccc', marginBottom: 4 }}>
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toLocaleString('es-CO')}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 10, paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: 'var(--orange)' }}>
            <span>Total</span><span>${total.toLocaleString('es-CO')}</span>
          </div>
        </div>

        {error && <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '10px 14px', color: '#f87171', fontSize: '0.82rem', marginBottom: '1rem' }}>{error}</div>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <input type="text" placeholder="Nombre completo *" value={name} onChange={e => setName(e.target.value)} style={inp} />
          <input type="tel" placeholder="WhatsApp" value={phone} onChange={e => setPhone(e.target.value)} style={inp} />

          {/* Dirección + GPS */}
          <div style={{ position: 'relative' }}>
            <textarea placeholder="Dirección de entrega *" value={address} onChange={e => setAddress(e.target.value)} rows={2} style={{ ...ta, paddingRight: 50 }} />
            <button onClick={getGPS} disabled={gpsLoading} title="Obtener mi ubicación actual"
              style={{ position: 'absolute', top: 12, right: 12, width: 32, height: 32, borderRadius: 8, background: 'rgba(255,80,1,0.15)', border: '1px solid rgba(255,80,1,0.3)', color: 'var(--orange)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {gpsLoading ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Navigation size={14} />}
            </button>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: -6 }}>
            📍 Escribe tu dirección o usa el botón GPS para detectarla automáticamente.
          </p>

          <textarea placeholder="Notas al negocio (opcional)" value={notes} onChange={e => setNotes(e.target.value)} rows={2} style={ta} />

          {/* Método de pago */}
          <div>
            <p style={{ fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 10 }}>Método de pago</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PAYMENT_METHODS.map(m => (
                <button key={m.id} onClick={() => setPayMethod(m.id)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 1rem', borderRadius: 12, border: `1.5px solid ${payMethod === m.id ? 'var(--orange)' : 'rgba(255,255,255,0.08)'}`, background: payMethod === m.id ? 'rgba(255,80,1,0.08)' : 'rgba(255,255,255,0.03)', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '1.3rem' }}>{m.icon}</span>
                    <div style={{ textAlign: 'left' }}>
                      <p style={{ margin: 0, fontWeight: 700, color: '#fff', fontSize: '0.88rem' }}>{m.label}</p>
                      <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.75rem' }}>{m.desc}</p>
                    </div>
                  </div>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${payMethod === m.id ? 'var(--orange)' : 'rgba(255,255,255,0.2)'}`, background: payMethod === m.id ? 'var(--orange)' : 'transparent', flexShrink: 0 }} />
                </button>
              ))}
            </div>
          </div>

          <button onClick={sendOrder} disabled={loading}
            style={{ height: 52, borderRadius: 14, background: 'linear-gradient(135deg,var(--orange),#ff8c00)', border: 'none', color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1, marginTop: 4 }}>
            {loading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={18} />}
            {loading ? 'Enviando...' : 'Confirmar pedido'}
          </button>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )
}