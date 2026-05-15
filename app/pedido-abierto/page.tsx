'use client'
import { Suspense, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { ArrowLeft, MapPin, Store, Package, Send, CheckCircle, Loader2 } from 'lucide-react'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573134157991'

function PedidoAbierto() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [storeName, setStoreName] = useState('')
  const [storeAddress, setStoreAddress] = useState('')
  const [items, setItems] = useState('')
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [payMethod] = useState('Efectivo')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      const { data: p } = await supabase.from('profiles').select('name,phone,address').eq('id', user.id).single()
      if (p) { if (p.name) setUserName(p.name); if (p.phone) setUserPhone(p.phone); if (p.address) setUserAddress(p.address) }
    })
  }, [])

  async function submit() {
    if (!storeName.trim() || !items.trim() || !userName.trim() || !userAddress.trim()) { setError('Completa todos los campos obligatorios'); return }
    setLoading(true); setError('')
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error: e } = await supabase.from('orders').insert([{
      user_id: user?.id ?? null, customer_name: userName, customer_phone: userPhone, customer_address: userAddress,
      products: [{ name: items, quantity: 1, price: 0 }], total: 0, status: 'Pendiente',
      notes: `PEDIDO ABIERTO - Tienda: ${storeName}${storeAddress ? ` (${storeAddress})` : ''}. Productos: ${items}`,
      restaurant_id: null,
    }]).select().single()
    if (e || !data) { setError('Error al crear el pedido'); setLoading(false); return }
    const msg = [
      '🛒 *PEDIDO ABIERTO - FASTY*',
      `📋 ID: ${data.id.split('-')[0].toUpperCase()}`,
      '',`🏪 *Tienda:* ${storeName}`,
      storeAddress ? `📍 *Dirección tienda:* ${storeAddress}` : '',
      '',`📦 *Productos:* ${items}`,
      '',`👤 *Cliente:* ${userName}`,
      `📞 *Tel:* ${userPhone}`,`📍 *Entrega:* ${userAddress}`,
      '',`💳 *Pago:* ${payMethod}`,
    ].filter(Boolean).join('%0A')
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank')
    setDone(true); setLoading(false)
  }

  const inp: React.CSSProperties = { width: '100%', height: 52, borderRadius: 14, background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.1)', padding: '0 16px', color: 'var(--white)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }
  const ta: React.CSSProperties = { ...inp, height: 'auto', padding: '14px 16px', resize: 'none' as const }
  const label: React.CSSProperties = { fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase' as const, letterSpacing: '0.08em', fontWeight: 600, display: 'block', marginBottom: 6 }

  if (done) return (
    <main style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <div>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(74,222,128,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <CheckCircle size={40} color="#4ade80" />
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}>¡Pedido enviado!</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Recibimos tu pedido abierto y un domiciliario lo gestionará pronto.</p>
        <Link href="/stores" style={{ background: 'var(--orange)', color: '#fff', padding: '14px 28px', borderRadius: 14, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>Volver a negocios</Link>
      </div>
    </main>
  )

  return (
    <main style={{ minHeight: '100vh', background: 'var(--dark)', color: 'var(--white)', fontFamily: 'var(--font-body)' }}>
      <Navbar />
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '100px 1.5rem 5rem' }}>
        <Link href="/stores" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--muted)', marginBottom: '2rem', fontSize: '0.88rem', textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Volver
        </Link>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 8 }}>Pedido Abierto</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>
          ¿No encuentras lo que buscas? <span style={{ color: 'var(--orange)', fontWeight: 600 }}>Nosotros lo compramos por ti.</span>
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Dónde compramos */}
          <div style={{ background: 'var(--dark2)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.2rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,80,1,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Store size={20} color="var(--orange)" />
              </div>
              <div><h3 style={{ fontWeight: 700, margin: 0 }}>¿Dónde compramos?</h3><p style={{ color: 'var(--muted)', fontSize: '0.82rem', margin: 0 }}>Dinos el lugar y lo que necesitas.</p></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div><label style={label}>Nombre del establecimiento *</label><input value={storeName} onChange={e => setStoreName(e.target.value)} placeholder="Ej: Ferretería El Martillo, Panadería..." style={inp} /></div>
              <div><label style={label}>Dirección del lugar (opcional)</label><input value={storeAddress} onChange={e => setStoreAddress(e.target.value)} placeholder="Ej: Calle 10 # 5-20" style={inp} /></div>
              <div><label style={label}>¿Qué necesitas que compremos? *</label><textarea value={items} onChange={e => setItems(e.target.value)} rows={4} placeholder="Describe los productos con detalles: cantidad, talla, color, referencias..." style={ta} /></div>
            </div>
          </div>

          {/* A dónde lo llevamos */}
          <div style={{ background: 'var(--dark2)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.2rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,80,1,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={20} color="var(--orange)" />
              </div>
              <div><h3 style={{ fontWeight: 700, margin: 0 }}>¿A dónde lo llevamos?</h3><p style={{ color: 'var(--muted)', fontSize: '0.82rem', margin: 0 }}>Confirma tus datos de entrega.</p></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div><label style={label}>Tu nombre *</label><input value={userName} onChange={e => setUserName(e.target.value)} placeholder="Nombre completo" style={inp} /></div>
              <div><label style={label}>Teléfono de contacto</label><input value={userPhone} onChange={e => setUserPhone(e.target.value)} placeholder="310 000 0000" style={inp} /></div>
              <div><label style={label}>Dirección de entrega *</label><input value={userAddress} onChange={e => setUserAddress(e.target.value)} placeholder="Ej: Calle 10 #5-20, Interior 3" style={inp} /></div>
            </div>
          </div>

          {/* Método de pago */}
          <div style={{ background: 'var(--dark2)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.2rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,80,1,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Package size={20} color="var(--orange)" />
              </div>
              <div><h3 style={{ fontWeight: 700, margin: 0 }}>Método de pago</h3><p style={{ color: 'var(--muted)', fontSize: '0.82rem', margin: 0 }}>Paga el mandado al recibir.</p></div>
            </div>
            <div style={{ background: 'rgba(255,80,1,0.08)', border: '1px solid rgba(255,80,1,0.25)', borderRadius: 14, padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: '1.4rem' }}>💵</span>
                <div><p style={{ fontWeight: 700, margin: 0 }}>Efectivo</p><p style={{ color: 'var(--muted)', fontSize: '0.78rem', margin: 0 }}>Paga al domiciliario cuando llegue</p></div>
              </div>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--orange)', border: '3px solid var(--dark)', boxShadow: '0 0 0 2px var(--orange)' }} />
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: 10, fontStyle: 'italic' }}>* El valor de los productos se paga al recibir. Fasty solo gestiona el servicio de transporte.</p>
          </div>

          {error && <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: '12px 16px', color: '#f87171', fontSize: '0.85rem' }}>{error}</div>}

          <button onClick={submit} disabled={loading} style={{ height: 56, borderRadius: 16, background: 'linear-gradient(135deg, var(--orange) 0%, #ff8c00 100%)', border: 'none', color: '#fff', fontWeight: 800, fontSize: '1.05rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: loading ? 0.7 : 1 }}>
            {loading ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={20} />}
            {loading ? 'Enviando...' : 'Enviar mi Pedido Abierto'}
          </button>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </main>
  )
}

export default function PedidoAbiertoPage() {
  return <Suspense fallback={null}><PedidoAbierto /></Suspense>
}
