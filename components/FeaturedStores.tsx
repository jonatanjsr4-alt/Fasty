'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Star, Clock, ArrowRight } from 'lucide-react'

type Restaurant = { id: string; name: string; category: string; image_url: string; rating: number; delivery_time: string; delivery_fee: number }

const PLACEHOLDERS: Record<string, string> = {
  Restaurantes: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop',
  Supermercados: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop',
  Farmacias: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop',
  Licores: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&auto=format&fit=crop',
  default: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop',
}

export default function FeaturedStores() {
  const [stores, setStores] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('restaurants').select('id,name,category,image_url,rating,delivery_time,delivery_fee')
      .eq('approved', true).order('rating', { ascending: false }).limit(3)
      .then(({ data }) => { setStores(data || []); setLoading(false) })
  }, [])

  return (
    <section id="tiendas" className="section-pad">
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="section-eyebrow">Mejor calificados</p>
          <h2 className="section-title" style={{ marginBottom: 0 }}>Los favoritos<br />de Quibdó</h2>
        </div>
        <Link href="/stores" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 48, padding: '0 24px', borderRadius: 100, background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>
          Ver todos <ArrowRight size={16} />
        </Link>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.5rem' }}>
          {[1,2,3].map(i => <div key={i} style={{ borderRadius: 28, height: 380, background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.06)', animation: 'pulse 1.5s infinite' }} />)}
        </div>
      ) : stores.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
          <p style={{ marginBottom: '1rem' }}>Pronto habrá negocios disponibles.</p>
          <Link href="/business/create" style={{ background: 'var(--orange)', color: '#fff', padding: '10px 24px', borderRadius: 100, fontWeight: 700 }}>Registra tu negocio</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.5rem' }}>
          {stores.map(s => <StoreCard key={s.id} store={s} />)}
        </div>
      )}
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
    </section>
  )
}

function StoreCard({ store }: { store: Restaurant }) {
  const [h, setH] = useState(false)
  const img = store.image_url || PLACEHOLDERS[store.category] || PLACEHOLDERS.default
  return (
    <Link href={`/business/${store.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', borderRadius: 28, overflow: 'hidden', background: 'var(--dark3)', border: `1px solid ${h ? 'rgba(255,80,1,0.3)' : 'rgba(255,255,255,0.06)'}`, transition: 'all 0.25s', transform: h ? 'translateY(-4px)' : 'none' }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
        <img src={img} alt={store.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: h ? 'scale(1.06)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', borderRadius: 100, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.8rem', fontWeight: 700, color: 'var(--lime)' }}>
          <Star size={12} fill="var(--lime)" color="var(--lime)" /> {store.rating?.toFixed(1) || '4.5'}
        </div>
        <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', borderRadius: 100, padding: '4px 10px', fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)' }}>{store.category}</div>
      </div>
      <div style={{ padding: '1.2rem 1.4rem 1.4rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', marginBottom: 8 }}>{store.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 14 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Clock size={12} /> {store.delivery_time || '20-35 min'}</span>
          <span style={{ color: 'var(--orange)', fontWeight: 600 }}>{store.delivery_fee === 0 ? 'Domicilio gratis' : `$${store.delivery_fee?.toLocaleString()}`}</span>
        </div>
        <div style={{ width: '100%', height: 44, borderRadius: 12, background: h ? 'var(--orange)' : 'rgba(255,255,255,0.08)', color: h ? '#fff' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 700, fontSize: '0.85rem', transition: 'all 0.2s' }}>
          Ver tienda <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  )
}
