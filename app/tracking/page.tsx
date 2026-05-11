'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Search, ArrowLeft, Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react'

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  Pendiente:   { label: 'Pendiente',   color: '#facc15', icon: Clock },
  Preparando:  { label: 'Preparando',  color: '#60a5fa', icon: Package },
  'En camino': { label: 'En camino',   color: '#a78bfa', icon: Truck },
  Entregado:   { label: 'Entregado',   color: '#4ade80', icon: CheckCircle },
  Cancelado:   { label: 'Cancelado',   color: '#f87171', icon: XCircle },
}

export default function TrackingSearchPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [notFound, setNotFound] = useState(false)

  async function search() {
    const q = query.trim()
    if (!q) return
    setLoading(true)
    setNotFound(false)
    setResult(null)

    // Buscar por UUID completo o por prefijo del ID
    const { data } = await supabase
      .from('orders')
      .select('id, customer_name, status, total, created_at')
      .or(`id.eq.${q},id.ilike.${q}%`)
      .limit(1)
      .single()

    setLoading(false)
    if (!data) {
      setNotFound(true)
    } else {
      setResult(data)
    }
  }

  const cfg = result ? STATUS_CONFIG[result.status] || STATUS_CONFIG['Pendiente'] : null

  return (
    <main style={{ minHeight: '100vh', background: 'var(--dark)', color: 'var(--white)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 520 }}>

        <Link href="/stores" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '2.5rem', textDecoration: 'none' }}>
          <ArrowLeft size={15} /> Volver a tiendas
        </Link>

        <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '0.5rem' }}>
          Seguimiento
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,5vw,2.8rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '0.8rem' }}>
          Rastrear mi pedido
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
          Ingresa el código de seguimiento que recibiste al confirmar tu pedido.
        </p>

        {/* Buscador */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 10,
            background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 14, padding: '0 16px', height: 54,
          }}>
            <Search size={18} color="var(--muted)" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && search()}
              placeholder="Código de pedido"
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--white)', fontSize: '0.95rem' }}
            />
          </div>
          <button
            onClick={search}
            disabled={loading || !query.trim()}
            style={{
              height: 54, padding: '0 22px', borderRadius: 14, background: 'var(--orange)',
              color: '#fff', fontWeight: 700, fontSize: '0.9rem', border: 'none',
              cursor: loading || !query.trim() ? 'not-allowed' : 'pointer',
              opacity: !query.trim() ? 0.6 : 1, transition: 'opacity 0.2s',
            }}
          >
            {loading ? '...' : 'Buscar'}
          </button>
        </div>

        {/* Resultado */}
        {notFound && (
          <div style={{ marginTop: '1.5rem', padding: '1.2rem 1.5rem', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
            <XCircle size={20} color="#f87171" />
            <div>
              <p style={{ fontWeight: 600, color: '#f87171', fontSize: '0.9rem', marginBottom: 2 }}>Pedido no encontrado</p>
              <p style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>Verifica el código e intenta de nuevo.</p>
            </div>
          </div>
        )}

        {result && cfg && (
          <div style={{ marginTop: '1.5rem', background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `${cfg.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <cfg.icon size={18} color={cfg.color} />
              </div>
              <div>
                <p style={{ fontWeight: 700, margin: 0 }}>{result.customer_name}</p>
                <p style={{ color: 'var(--muted)', fontSize: '0.78rem', margin: 0 }}>
                  #{result.id.split('-')[0].toUpperCase()} · {new Date(result.created_at).toLocaleDateString('es-CO')}
                </p>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <p style={{ color: cfg.color, fontWeight: 700, fontSize: '0.85rem', margin: 0 }}>{cfg.label}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--orange)', fontSize: '1.1rem', margin: 0 }}>
                  ${result.total.toLocaleString()}
                </p>
              </div>
            </div>
            <div style={{ padding: '1.2rem 1.5rem' }}>
              <Link
                href={`/tracking/${result.id}`}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  height: 46, borderRadius: 12, background: 'var(--orange)', color: '#fff',
                  fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem',
                }}
              >
                Ver seguimiento completo →
              </Link>
            </div>
          </div>
        )}

        {/* Hint */}
        <p style={{ color: 'var(--muted)', fontSize: '0.78rem', marginTop: '2rem', textAlign: 'center', lineHeight: 1.6 }}>
          El código aparece en el mensaje de WhatsApp después de confirmar tu pedido.<br />
          También puedes verlo en el link de seguimiento que se abrió automáticamente.
        </p>
      </div>
    </main>
  )
}
