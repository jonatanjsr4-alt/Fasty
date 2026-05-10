'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { Search, Star, Clock, ShoppingBag, ChevronRight } from 'lucide-react'

type Restaurant = {
  id: string
  name: string
  description: string
  category: string
  image_url: string
  logo_url: string
  rating: number
  delivery_time: string
  delivery_fee: number
  is_active: boolean
}

const CATEGORIES = [
  { emoji: '🍽️', name: 'Todos' },
  { emoji: '🍔', name: 'Restaurantes' },
  { emoji: '🛒', name: 'Supermercados' },
  { emoji: '💊', name: 'Farmacias' },
  { emoji: '🍺', name: 'Licores' },
  { emoji: '🍦', name: 'Heladerías' },
  { emoji: '☕', name: 'Cafeterías' },
  { emoji: '👗', name: 'Moda' },
  { emoji: '💄', name: 'Belleza' },
  { emoji: '📱', name: 'Tecnología' },
]

const PLACEHOLDER_IMAGES: Record<string, string> = {
  Restaurantes: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop',
  Supermercados: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop',
  Farmacias: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop',
  Licores: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&auto=format&fit=crop',
  Heladerías: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&auto=format&fit=crop',
  Cafeterías: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop',
  default: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop',
}

export default function StoresPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [filtered, setFiltered] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')

  useEffect(() => {
    fetchRestaurants()
  }, [])

  useEffect(() => {
    let result = restaurants
    if (activeCategory !== 'Todos') {
      result = result.filter(r => r.category === activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
      )
    }
    setFiltered(result)
  }, [search, activeCategory, restaurants])

  async function fetchRestaurants() {
    setLoading(true)
    const { data } = await supabase
      .from('restaurants')
      .select('*')
      .eq('is_active', true)
      .order('rating', { ascending: false })
    setRestaurants(data || [])
    setLoading(false)
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '5rem', background: 'var(--dark)' }}>

        {/* HERO SECTION */}
        <div style={{ position: 'relative', padding: '3rem 2rem 2rem', maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ position: 'absolute', top: 0, right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,80,1,0.08)', filter: 'blur(100px)', pointerEvents: 'none' }} />

          <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '0.8rem' }}>
            Quibdó, Chocó
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '2rem' }}>
            ¿Qué se te<br /><span style={{ color: 'var(--orange)' }}>antoja hoy?</span>
          </h1>

          {/* SEARCH */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '0 20px', maxWidth: 560, height: 56, marginBottom: '2rem' }}>
            <Search size={18} color="var(--muted)" />
            <input
              type="text"
              placeholder="Buscar restaurantes, comida..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--white)', fontSize: '0.95rem' }}
            />
          </div>

          {/* CATEGORY PILLS */}
          <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 16px', borderRadius: 100, whiteSpace: 'nowrap',
                  fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: activeCategory === cat.name ? 'var(--orange)' : 'var(--dark3)',
                  color: activeCategory === cat.name ? '#fff' : 'var(--muted)',
                  border: `1px solid ${activeCategory === cat.name ? 'var(--orange)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <span>{cat.emoji}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* RESULTS */}
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '1rem 2rem 5rem' }}>
          {loading ? (
            <LoadingGrid />
          ) : filtered.length === 0 ? (
            <EmptyState search={search} category={activeCategory} />
          ) : (
            <>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                {filtered.length} negocio{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {filtered.map(r => (
                  <RestaurantCard key={r.id} restaurant={r} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  )
}

function RestaurantCard({ restaurant: r }: { restaurant: Restaurant }) {
  const [hovered, setHovered] = useState(false)
  const imgSrc = r.image_url || PLACEHOLDER_IMAGES[r.category] || PLACEHOLDER_IMAGES.default

  return (
    <Link
      href={`/stores/${r.id}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        background: 'var(--dark3)',
        border: `1px solid ${hovered ? 'rgba(255,80,1,0.3)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 24,
        overflow: 'hidden',
        transition: 'transform 0.25s, border-color 0.25s, box-shadow 0.25s',
        transform: hovered ? 'translateY(-6px)' : 'none',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.4)' : 'none',
        cursor: 'pointer',
      }}>
        {/* IMAGE */}
        <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
          <img
            src={imgSrc}
            alt={r.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />

          {/* CATEGORY BADGE */}
          <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', borderRadius: 8, padding: '4px 10px', fontSize: '0.7rem', color: 'var(--muted)' }}>
            {r.category}
          </div>

          {/* RATING */}
          <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', borderRadius: 8, padding: '4px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Star size={11} fill="#C8F135" color="#C8F135" />
            <span style={{ color: '#C8F135', fontWeight: 600 }}>{r.rating?.toFixed(1) || '4.5'}</span>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ padding: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.2 }}>{r.name}</h3>
            <ChevronRight size={16} color="var(--muted)" style={{ flexShrink: 0, marginTop: 2 }} />
          </div>

          {r.description && (
            <p style={{ color: 'var(--muted)', fontSize: '0.8rem', lineHeight: 1.5, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {r.description}
            </p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', color: 'var(--muted)' }}>
              <Clock size={13} />
              {r.delivery_time || '20-35 min'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', color: 'var(--muted)' }}>
              <ShoppingBag size={13} />
              {r.delivery_fee === 0 ? <span style={{ color: '#C8F135' }}>Gratis</span> : `$${r.delivery_fee?.toLocaleString()}`}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

function LoadingGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} style={{ background: 'var(--dark3)', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ height: 200, background: 'var(--mid)', animation: 'pulse 1.5s infinite' }} />
          <div style={{ padding: '1.2rem' }}>
            <div style={{ height: 20, background: 'var(--mid)', borderRadius: 8, marginBottom: 10, width: '60%' }} />
            <div style={{ height: 14, background: 'var(--mid)', borderRadius: 6, marginBottom: 6, width: '90%' }} />
            <div style={{ height: 14, background: 'var(--mid)', borderRadius: 6, width: '70%' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyState({ search, category }: { search: string; category: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍽️</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Sin resultados
      </h3>
      <p style={{ color: 'var(--muted)', maxWidth: 360, margin: '0 auto' }}>
        {search
          ? `No encontramos negocios para "${search}".`
          : `Aún no hay negocios en la categoría "${category}".`}
        <br />Pronto habrá más opciones en Quibdó.
      </p>
    </div>
  )
}