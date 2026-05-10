
'use client'

import { useState } from 'react'
import { X, Loader2, CheckCircle, ShoppingBag, ExternalLink } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/components/CartContext'
import Link from 'next/link'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573134157991'

type Props = {
  onClose: () => void
  restaurantId?: string
}

export default function CheckoutModal({ onClose, restaurantId }: Props) {
  const { cart, total, clearCart } = useCart()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function sendOrder() {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError('Por favor completa todos los campos obligatorios')
      return
    }
    setLoading(true)
    setError('')
    const { data: { user } } = await supabase.auth.getUser()
    const orderData = {
      user_id: user?.id ?? null,
      restaurant_id: restaurantId ?? null,
      customer_name: name.trim(),
      customer_phone: phone.trim(),
      customer_address: address.trim(),
      products: cart.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity })),
      total,
      status: 'Pendiente',
      notes: notes.trim() || null,
    }
    const { data, error: dbError } = await supabase.from('orders').insert([orderData]).select().single()
    if (dbError || !data) {
      setError('Error al registrar el pedido. Intenta de nuevo.')
      setLoading(false)
      return
    }
    const productsText = cart.map(item => `• ${item.name} x${item.quantity} — $${(item.price * item.quantity).toLocaleString('es-CO')}`).join('%0A')
    const trackingUrl = `${window.location.origin}/tracking/${data.id}`
    const message = ['🚀 *NUEVO PEDIDO FASTY*', `📋 ID: ${data.id.split('-')[0].toUpperCase()}`, '', `👤 *Cliente:* ${name}`, `📞 *WhatsApp:* ${phone}`, `📍 *Dirección:* ${address}`, notes ? `📝 *Notas:* ${notes}` : '', '', `🛒 *Productos:*`, productsText, '', `💰 *TOTAL: $${total.toLocaleString('es-CO')}*`, '', `🔗 Tracking: ${trackingUrl}`].filter(Boolean).join('%0A')
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
    clearCart()
    setOrderId(data.id)
    setLoading(false)
  }

  if (orderId) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <div style={{ width: '100%', maxWidth: 440, background: '#101010', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 32, padding: '2.5rem', textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(74,222,128,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <CheckCircle size={40} color="#4ade80" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.8rem' }}>¡Pedido enviado!</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: '0.5rem' }}>Tu pedido fue registrado y enviado por WhatsApp.</p>
          <p style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '2rem' }}>Código: <span style={{ color: 'var(--white)', fontWeight: 600 }}>#{orderId.split('-')[0].toUpperCase()}</span></p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <Link href={`/tracking/${orderId}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 52, borderRadius: 14, background: 'var(--orange)', color: '#fff', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
              <ExternalLink size={16} /> Seguir mi pedido
            </Link>
            <button onClick={onClose} style={{ height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.9rem' }}>Cerrar</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 540, background: '#101010', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 32, padding: '2rem', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 18, right: 18, width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--muted)' }}>
          <X size={16} />
        </button>
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '0.5rem' }}>Finalizar pedido</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>Último paso 🚀</h2>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '1rem', marginBottom: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '0.8rem' }}>
            <ShoppingBag size={14} color="var(--orange)" />
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{cart.length} producto{cart.length !== 1 ? 's' : ''}</span>
          </div>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: 4 }}>
              <span style={{ color: 'var(--muted)' }}>{item.name} <span style={{ opacity: 0.5 }}>x{item.quantity}</span></span>
              <span>${(item.price * item.quantity).toLocaleString('es-CO')}</span>
            </div>
          ))}
        </div>
        {error && <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: '1rem', color: '#f87171', fontSize: '0.82rem' }}>{error}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {[{p:'Nombre completo *',v:name,s:setName,t:'text'},{p:'WhatsApp (ej: 3001234567) *',v:phone,s:setPhone,t:'tel'}].map(({p,v,s,t})=>(
            <input key={p} type={t} placeholder={p} value={v} onChange={e=>s(e.target.value)} style={{ height:50,borderRadius:12,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',padding:'0 16px',color:'var(--white)',fontSize:'0.88rem',outline:'none',fontFamily:'var(--font-body)',width:'100%' }} onFocus={e=>(e.target.style.borderColor='var(--orange)')} onBlur={e=>(e.target.style.borderColor='rgba(255,255,255,0.1)')} />
          ))}
          {[{p:'Dirección de entrega *',v:address,s:setAddress},{p:'Notas adicionales (opcional)',v:notes,s:setNotes}].map(({p,v,s})=>(
            <textarea key={p} placeholder={p} value={v} onChange={e=>s(e.target.value)} rows={2} style={{ borderRadius:12,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',padding:'12px 16px',color:'var(--white)',fontSize:'0.88rem',outline:'none',fontFamily:'var(--font-body)',resize:'none',width:'100%' }} onFocus={e=>(e.target.style.borderColor='var(--orange)')} onBlur={e=>(e.target.style.borderColor='rgba(255,255,255,0.1)')} />
          ))}
          <div style={{ background: 'rgba(255,80,1,0.06)', border: '1px solid rgba(255,80,1,0.15)', borderRadius: 14, padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Total a pagar</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--orange)' }}>${total.toLocaleString('es-CO')}</span>
          </div>
          <button onClick={sendOrder} disabled={loading} style={{ height:54,borderRadius:14,background:loading?'rgba(255,80,1,0.5)':'var(--orange)',border:'none',color:'#fff',fontWeight:700,fontSize:'1rem',cursor:loading?'not-allowed':'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8,transition:'background 0.2s' }}>
            {loading ? <><Loader2 size={18} style={{ animation:'spin 1s linear infinite' }} /> Enviando...</> : '🚀 Confirmar pedido'}
          </button>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )
}
