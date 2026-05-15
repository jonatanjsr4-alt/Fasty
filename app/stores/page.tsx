'use client'
import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import { Search, Clock, Star, ChevronRight, Loader2 } from 'lucide-react'

const CATEGORIES = ['Todos','Restaurantes','Supermercados','Farmacias','Licores','Heladerías','Cafeterías','Moda','Belleza','Salud','Tecnología','Mantenimiento','Deportes','Educación','Hogar','Otro']

function StoresContent() {
  const searchParams = useSearchParams()
  const [restaurants, setRestaurants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState(searchParams.get('category') || 'Todos')

  useEffect(() => { fetch() }, [cat])

  async function fetch() {
    setLoading(true)
    let q = supabase.from('restaurants').select('*').eq('approved', true).order('created_at', { ascending: false })
    if (cat !== 'Todos') q = q.eq('category', cat)
    const { data } = await q
    setRestaurants(data || [])
    setLoading(false)
  }

  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    (r.description || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main style={{ minHeight: '100vh', background: 'var(--dark)', color: 'var(--white)', fontFamily: 'var(--font-body)' }}>
      <Navbar />
      <div style={{ paddingTop: 80 }}>
        <div style={{ background: 'linear-gradient(180deg,rgba(255,80,1,0.08) 0%,transparent 100%)', padding: '3rem 1.5rem 2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 600, marginBottom: 10 }}>Quibdó · Disponible ahora</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
            Explora <span style={{ color: 'var(--orange)' }}>negocios</span>
          </h1>
          <div style={{ maxWidth: 500, margin: '0 auto', display: 'flex', gap: 10, background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '0 16px', height: 52, alignItems: 'center' }}>
            <Search size={15} color="var(--muted)" />
            <input type="text" placeholder="Busca pizza, sushi, hamburguesas..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--white)', fontSize: '0.9rem' }} />
          </div>
        </div>

        <div style={{ overflowX: 'auto', padding: '0 1.5rem 1.5rem', display: 'flex', gap: 8, scrollbarWidth: 'none' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ flexShrink: 0, height: 36, padding: '0 16px', borderRadius: 100, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', border: 'none', background: cat === c ? 'var(--orange)' : 'var(--dark3)', color: cat === c ? '#fff' : 'var(--muted)' }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem 5rem' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
              <Loader2 size={32} color="var(--orange)" style={{ animation: 'spin 1s linear infinite' }} />
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted)' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>No hay negocios disponibles</p>
              <p style={{ fontSize: '0.88rem' }}>Pronto habrá más opciones en Quibdó</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1.5rem' }}>
              {filtered.map(r => <StoreCard key={r.id} r={r} />)}
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </main>
  )
}

function StoreCard({ r }: { r: any }) {
  const [h, setH] = useState(false)
  const img = r.image_url || r.banner_url || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop'
  return (
    <Link href={`/business/${r.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', borderRadius: 24, overflow: 'hidden', background: 'var(--dark3)', border: `1px solid ${h ? 'rgba(255,80,1,0.3)' : 'rgba(255,255,255,0.07)'}`, transition: 'all 0.2s', transform: h ? 'translateY(-4px)' : 'none' }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
        <img src={img} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s', transform: h ? 'scale(1.05)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 60%)' }} />
        <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.65)', borderRadius: 8, padding: '3px 8px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--lime)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Star size={10} fill="var(--lime)" /> {r.rating || '4.8'}
        </div>
      </div>
      <div style={{ padding: '1rem 1.2rem 1.2rem' }}>
        <h3 style={{ fontWeight: 800, fontSize: '1.05rem', marginBottom: 4, fontFamily: 'var(--font-display)' }}>{r.name}</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5 }}>{r.description || r.category}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.78rem', color: 'var(--muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} /> {r.delivery_time || '30-45 min'}</span>
            <span style={{ background: 'rgba(255,80,1,0.12)', color: 'var(--orange)', padding: '2px 8px', borderRadius: 6, fontWeight: 600 }}>{r.category}</span>
          </div>
          <ChevronRight size={15} color="var(--orange)" />
        </div>
      </div>
    </Link>
  )
}

export default function StoresPage() {
  return (
    <Suspense fallback={<main style={{ minHeight:'100vh',background:'var(--dark)',display:'flex',alignItems:'center',justifyContent:'center' }}><Loader2 size={28} color="var(--orange)" style={{ animation:'spin 1s linear infinite' }} /><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></main>}>
      <StoresContent />
    </Suspense>
  )
}
