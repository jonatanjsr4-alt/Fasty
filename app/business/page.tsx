'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import CartSidebar from '@/components/CartSidebar'
import { useCart } from '@/components/CartContext'
import {
  Star, Clock, ShoppingBag, ArrowLeft,
  Plus, Minus, ShoppingCart, MapPin, Phone,
} from 'lucide-react'

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
  min_order: number
  address: string
  phone: string
  is_active: boolean
}

type Product = {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  image: string
  category: string
  available: boolean
}

export default function StorePage() {
  const params = useParams()
  const router = useRouter()
  const storeId = params.id as string

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [cartOpen, setCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [addedId, setAddedId] = useState<string | null>(null)

  const { addToCart, itemCount, total } = useCart()

  useEffect(() => {
    if (storeId) fetchData()
  }, [storeId])

  async function fetchData() {
    setLoading(true)

    const { data: rest } = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', storeId)
      .single()

    if (!rest) { router.push('/stores'); return }
    setRestaurant(rest)

    const { data: prods } = await supabase
      .from('products')
      .select('*')
      .eq('restaurant_id', storeId)
      .eq('available', true)
      .order('category')

    setProducts(prods || [])
    setLoading(false)
  }

  function handleAddToCart(product: Product) {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url || product.image || '',
      restaurant_id: storeId,
    })
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1200)
  }

  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))]
  const filteredProducts = activeCategory === 'Todos'
    ? products
    : products.filter(p => p.category === activeCategory)

  if (loading) return <LoadingScreen />

  if (!restaurant) return null

  const headerImg = restaurant.image_url ||
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop'

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: 'var(--dark)', paddingTop: '4rem' }}>

        {/* HEADER */}
        <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
          <img src={headerImg} alt={restaurant.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.4) 60%, transparent 100%)' }} />

          <button
            onClick={() => router.push('/stores')}
            style={{ position: 'absolute', top: 20, left: 20, width: 40, height: 40, borderRadius: 12, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--white)' }}
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* INFO */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ marginTop: '-3rem', position: 'relative', zIndex: 10, marginBottom: '2rem' }}>
            <span style={{ display: 'inline-block', background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '4px 12px', fontSize: '0.72rem', color: 'var(--muted)', marginBottom: '0.8rem' }}>
              {restaurant.category}
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '0.8rem' }}>
              {restaurant.name}
            </h1>
            {restaurant.description && (
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: 560, marginBottom: '1rem' }}>
                {restaurant.description}
              </p>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.82rem' }}>
              <InfoBadge icon={<Star size={13} fill="#C8F135" color="#C8F135" />} text={`${restaurant.rating?.toFixed(1) || '4.5'} Calificación`} highlight />
              <InfoBadge icon={<Clock size={13} />} text={restaurant.delivery_time || '20-35 min'} />
              <InfoBadge icon={<ShoppingBag size={13} />} text={restaurant.delivery_fee === 0 ? 'Domicilio gratis' : `Domicilio $${restaurant.delivery_fee?.toLocaleString()}`} />
              {restaurant.address && <InfoBadge icon={<MapPin size={13} />} text={restaurant.address} />}
            </div>
          </div>

          {/* CATEGORY FILTER */}
          {categories.length > 1 && (
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '6px 16px', borderRadius: 100, fontSize: '0.78rem', whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.2s',
                    background: activeCategory === cat ? 'var(--orange)' : 'var(--dark3)',
                    color: activeCategory === cat ? '#fff' : 'var(--muted)',
                    border: `1px solid ${activeCategory === cat ? 'var(--orange)' : 'rgba(255,255,255,0.08)'}`,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* PRODUCTS */}
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <p style={{ color: 'var(--muted)', fontSize: '1rem' }}>Este negocio aún no tiene productos disponibles.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', paddingBottom: '8rem' }}>
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  justAdded={addedId === product.id}
                  onAdd={() => handleAddToCart(product)}
                />
              ))}
            </div>
          )}
        </div>

        {/* FLOATING CART BUTTON */}
        {itemCount > 0 && (
          <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 800 }}>
            <button
              onClick={() => setCartOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--orange)', color: '#fff', padding: '14px 24px', borderRadius: 100, fontSize: '0.95rem', fontWeight: 600, boxShadow: '0 8px 30px rgba(255,80,1,0.5)', cursor: 'pointer', border: 'none', whiteSpace: 'nowrap' }}
            >
              <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                {itemCount}
              </div>
              <span>Ver carrito</span>
              <span style={{ opacity: 0.85 }}>· ${total.toLocaleString()}</span>
            </button>
          </div>
        )}
      </main>

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}

function ProductCard({ product, justAdded, onAdd }: { product: Product; justAdded: boolean; onAdd: () => void }) {
  const [hovered, setHovered] = useState(false)
  const { cart, increaseQty, decreaseQty } = useCart()
  const cartItem = cart.find(i => i.id === product.id)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--dark3)',
        border: `1px solid ${hovered ? 'rgba(255,80,1,0.25)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 20, overflow: 'hidden',
        transition: 'transform 0.25s, border-color 0.25s',
        transform: hovered ? 'translateY(-3px)' : 'none',
      }}
    >
      {/* IMAGE */}
      <div style={{ height: 160, background: 'var(--mid)', overflow: 'hidden', position: 'relative' }}>
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>🍽️</div>
        )}
        {product.category && (
          <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', borderRadius: 6, padding: '2px 8px', fontSize: '0.65rem', color: 'var(--muted)' }}>
            {product.category}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div style={{ padding: '1rem' }}>
        <h3 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.3rem', lineHeight: 1.3 }}>{product.name}</h3>
        {product.description && (
          <p style={{ color: 'var(--muted)', fontSize: '0.78rem', lineHeight: 1.5, marginBottom: '0.8rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.description}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--orange)' }}>
            ${product.price.toLocaleString()}
          </span>

          {cartItem ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={() => decreaseQty(product.id)} style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.08)', border: 'none', color: 'var(--white)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Minus size={13} />
              </button>
              <span style={{ fontWeight: 700, fontSize: '0.95rem', minWidth: 20, textAlign: 'center' }}>{cartItem.quantity}</span>
              <button onClick={() => increaseQty(product.id)} style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--orange)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus size={13} />
              </button>
            </div>
          ) : (
            <button
              onClick={onAdd}
              style={{
                width: 34, height: 34, borderRadius: 10, cursor: 'pointer', border: 'none',
                background: justAdded ? '#22c55e' : 'var(--orange)',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s, transform 0.15s',
                transform: justAdded ? 'scale(1.2)' : 'scale(1)',
              }}
            >
              {justAdded ? '✓' : <Plus size={16} />}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoBadge({ icon, text, highlight }: { icon: React.ReactNode; text: string; highlight?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: highlight ? '#C8F135' : 'var(--muted)' }}>
      {icon}
      <span>{text}</span>
    </div>
  )
}

function LoadingScreen() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--dark)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid var(--dark3)', borderTopColor: 'var(--orange)', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Cargando tienda...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}