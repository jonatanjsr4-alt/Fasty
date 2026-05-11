'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Plus, Pencil, Trash2, ToggleLeft, ToggleRight,
  Loader2, ArrowLeft, Package, AlertCircle,
} from 'lucide-react'

type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url: string
  image: string
  available: boolean
}

export default function BusinessProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [restaurantId, setRestaurantId] = useState<string | null>(null)
  const [restaurantName, setRestaurantName] = useState('')
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth'); return }

    const { data: rest } = await supabase
      .from('restaurants')
      .select('id, name')
      .eq('owner_id', user.id)
      .single()

    if (!rest) {
      setLoading(false)
      return
    }

    setRestaurantId(rest.id)
    setRestaurantName(rest.name)

    const { data: prods } = await supabase
      .from('products')
      .select('*')
      .eq('restaurant_id', rest.id)
      .order('category')
      .order('name')

    setProducts(prods || [])
    setLoading(false)
  }

  function showToast(type: 'success' | 'error', msg: string) {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 3500)
  }

  async function toggleAvailable(product: Product) {
    setTogglingId(product.id)
    const { error } = await supabase
      .from('products')
      .update({ available: !product.available })
      .eq('id', product.id)

    if (!error) {
      setProducts(prev =>
        prev.map(p => p.id === product.id ? { ...p, available: !p.available } : p)
      )
      showToast('success', product.available ? 'Producto desactivado' : 'Producto activado')
    }
    setTogglingId(null)
  }

  async function deleteProduct(id: string) {
    if (!confirm('¿Eliminar este producto? Esta acción no se puede deshacer.')) return
    setDeletingId(id)
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== id))
      showToast('success', 'Producto eliminado')
    } else {
      showToast('error', 'Error al eliminar')
    }
    setDeletingId(null)
  }

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))]
  const uncategorized = products.filter(p => !p.category)
  const available = products.filter(p => p.available).length
  const unavailable = products.filter(p => !p.available).length

  return (
    <main style={{ minHeight: '100vh', background: 'var(--dark)', color: 'var(--white)' }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 24, right: 24, zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: 10,
          background: toast.type === 'success' ? 'rgba(74,222,128,0.12)' : 'rgba(239,68,68,0.12)',
          border: `1px solid ${toast.type === 'success' ? 'rgba(74,222,128,0.3)' : 'rgba(239,68,68,0.3)'}`,
          borderRadius: 14, padding: '12px 18px', backdropFilter: 'blur(12px)', maxWidth: 320,
        }}>
          <span style={{ fontSize: '0.875rem', color: toast.type === 'success' ? '#4ade80' : '#f87171' }}>
            {toast.msg}
          </span>
        </div>
      )}

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
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
              Mis productos
            </h1>
          </div>
        </div>

        <Link
          href="/business/products/create"
          style={{
            display: 'flex', alignItems: 'center', gap: 8, height: 40, padding: '0 18px',
            borderRadius: 12, background: 'var(--orange)', color: '#fff',
            fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
          }}
        >
          <Plus size={16} /> Agregar producto
        </Link>
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem 6rem' }}>

        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 0' }}>
            <Loader2 size={32} color="var(--orange)" style={{ animation: 'spin 0.8s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : !restaurantId ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
            <Package size={56} color="var(--muted)" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.8rem' }}>
              Aún no tienes un negocio
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>
              Crea tu negocio primero para poder agregar productos.
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
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'Total productos', value: products.length },
                { label: 'Disponibles', value: available, color: '#4ade80' },
                { label: 'Desactivados', value: unavailable, color: 'var(--muted)' },
              ].map(s => (
                <div key={s.label} style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 20, padding: '1.2rem 1.5rem',
                }}>
                  <p style={{ color: 'var(--muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                    {s.label}
                  </p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: s.color || 'var(--white)' }}>
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            {products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'rgba(255,255,255,0.03)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.06)' }}>
                <Package size={48} color="var(--muted)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Sin productos aún
                </h3>
                <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
                  Agrega tus primeros productos para que los clientes puedan pedir.
                </p>
                <Link href="/business/products/create" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'var(--orange)', color: '#fff', padding: '12px 24px',
                  borderRadius: 14, fontWeight: 700, textDecoration: 'none',
                }}>
                  <Plus size={16} /> Agregar primer producto
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Categorías con productos */}
                {categories.map(cat => (
                  <div key={cat}>
                    <p style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 700, marginBottom: '0.8rem' }}>
                      {cat}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {products.filter(p => p.category === cat).map(p => (
                        <ProductRow
                          key={p.id}
                          product={p}
                          toggling={togglingId === p.id}
                          deleting={deletingId === p.id}
                          onToggle={() => toggleAvailable(p)}
                          onDelete={() => deleteProduct(p.id)}
                        />
                      ))}
                    </div>
                  </div>
                ))}

                {/* Sin categoría */}
                {uncategorized.length > 0 && (
                  <div>
                    {categories.length > 0 && (
                      <p style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700, marginBottom: '0.8rem' }}>
                        Sin categoría
                      </p>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {uncategorized.map(p => (
                        <ProductRow
                          key={p.id}
                          product={p}
                          toggling={togglingId === p.id}
                          deleting={deletingId === p.id}
                          onToggle={() => toggleAvailable(p)}
                          onDelete={() => deleteProduct(p.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}

function ProductRow({
  product: p,
  toggling,
  deleting,
  onToggle,
  onDelete,
}: {
  product: Product
  toggling: boolean
  deleting: boolean
  onToggle: () => void
  onDelete: () => void
}) {
  const img = p.image_url || p.image || null

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '1rem',
      background: p.available ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
      border: `1px solid ${p.available ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)'}`,
      borderRadius: 18, padding: '0.9rem 1.2rem',
      opacity: p.available ? 1 : 0.6, transition: 'opacity 0.2s',
    }}>
      {/* Imagen */}
      <div style={{
        width: 56, height: 56, borderRadius: 12, flexShrink: 0,
        background: 'var(--mid)', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {img
          ? <img src={img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ fontSize: '1.5rem' }}>🍽️</span>
        }
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {p.name}
        </p>
        {p.description && (
          <p style={{ color: 'var(--muted)', fontSize: '0.78rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>
            {p.description}
          </p>
        )}
      </div>

      {/* Precio */}
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: 'var(--orange)', flexShrink: 0 }}>
        ${p.price.toLocaleString()}
      </span>

      {/* Toggle disponible */}
      <button
        onClick={onToggle}
        disabled={toggling}
        title={p.available ? 'Desactivar' : 'Activar'}
        style={{
          background: 'none', border: 'none', cursor: toggling ? 'not-allowed' : 'pointer',
          color: p.available ? '#4ade80' : 'var(--muted)', flexShrink: 0, padding: 4,
          display: 'flex', alignItems: 'center',
        }}
      >
        {toggling
          ? <Loader2 size={20} style={{ animation: 'spin 0.8s linear infinite' }} />
          : p.available
            ? <ToggleRight size={22} />
            : <ToggleLeft size={22} />
        }
      </button>

      {/* Eliminar */}
      <button
        onClick={onDelete}
        disabled={deleting}
        title="Eliminar"
        style={{
          background: 'none', border: 'none', cursor: deleting ? 'not-allowed' : 'pointer',
          color: 'var(--muted)', flexShrink: 0, padding: 4,
          display: 'flex', alignItems: 'center',
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => { if (!deleting) (e.currentTarget as HTMLElement).style.color = '#f87171' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)' }}
      >
        {deleting
          ? <Loader2 size={18} style={{ animation: 'spin 0.8s linear infinite' }} />
          : <Trash2 size={18} />
        }
      </button>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
