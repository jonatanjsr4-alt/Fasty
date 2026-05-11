'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, AlertCircle, Loader2, Upload } from 'lucide-react'

type Toast = { type: 'success' | 'error'; message: string } | null

export default function CreateProductPage() {
  const router = useRouter()

  const [restaurants, setRestaurants] = useState<any[]>([])
  const [restaurantId, setRestaurantId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<Toast>(null)

  useEffect(() => { fetchMyRestaurants() }, [])

  async function fetchMyRestaurants() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth'); return }

    // Solo muestra los negocios del usuario autenticado
    const { data } = await supabase
      .from('restaurants')
      .select('id, name')
      .eq('owner_id', user.id)
      .order('name')

    setRestaurants(data || [])
    if (data && data.length === 1) setRestaurantId(data[0].id)
  }

  function showToast(type: 'success' | 'error', message: string) {
    setToast({ type, message })
    setTimeout(() => setToast(null), 4000)
  }

  async function createProduct() {
    if (!restaurantId || !name.trim() || !price) {
      showToast('error', 'Completa los campos obligatorios: negocio, nombre y precio')
      return
    }
    const priceNum = Number(price)
    if (isNaN(priceNum) || priceNum <= 0) {
      showToast('error', 'El precio debe ser un número válido mayor a 0')
      return
    }

    setLoading(true)

    const { error } = await supabase.from('products').insert([{
      restaurant_id: restaurantId,
      name: name.trim(),
      description: description.trim(),
      price: priceNum,
      category: category.trim(),
      image,
      available: true,
    }])

    setLoading(false)

    if (error) { showToast('error', 'Error creando el producto. Intenta de nuevo.'); return }

    showToast('success', '¡Producto creado correctamente!')
    setTimeout(() => router.push(`/business/${restaurantId}`), 1500)
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--dark)', color: 'var(--white)' }}>

      {toast && (
        <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 10, background: toast.type === 'success' ? 'rgba(74,222,128,0.12)' : 'rgba(239,68,68,0.12)', border: `1px solid ${toast.type === 'success' ? 'rgba(74,222,128,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: 14, padding: '12px 18px', maxWidth: 340, backdropFilter: 'blur(12px)' }}>
          {toast.type === 'success' ? <CheckCircle size={18} color="#4ade80" /> : <AlertCircle size={18} color="#f87171" />}
          <span style={{ fontSize: '0.875rem', color: toast.type === 'success' ? '#4ade80' : '#f87171' }}>{toast.message}</span>
        </div>
      )}

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={() => router.back()} style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--white)' }}>
          <ArrowLeft size={16} />
        </button>
        <div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 600, margin: 0 }}>Productos</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Agregar producto</h1>
        </div>
      </nav>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '2.5rem 1.5rem 5rem' }}>

        {restaurants.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>Primero debes crear un negocio para agregar productos.</p>
            <Link href="/business/create" style={{ background: 'var(--orange)', color: '#fff', padding: '12px 28px', borderRadius: 14, fontWeight: 700 }}>
              Crear mi negocio
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {restaurants.length > 1 && (
              <Field label="Negocio *">
                <select value={restaurantId} onChange={e => setRestaurantId(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="">Selecciona un negocio</option>
                  {restaurants.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </Field>
            )}

            <Field label="Nombre del producto *">
              <input type="text" placeholder="Ej: Bandeja paisa" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
            </Field>

            <Field label="Descripción">
              <textarea placeholder="Ingredientes, alérgenos, etc." value={description} onChange={e => setDescription(e.target.value)} rows={3} style={{ ...inputStyle, height: 'auto', padding: '12px 16px', resize: 'none' }} />
            </Field>

            <Field label="Precio (COP) *">
              <input type="number" placeholder="0" min="0" value={price} onChange={e => setPrice(e.target.value)} style={inputStyle} />
            </Field>

            <Field label="Categoría (opcional)">
              <input type="text" placeholder="Ej: Platos principales, Bebidas..." value={category} onChange={e => setCategory(e.target.value)} style={inputStyle} />
            </Field>

            <Field label="Imagen del producto">
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, height: 52, background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: 12, padding: '0 16px', cursor: 'pointer', color: 'var(--muted)', fontSize: '0.88rem' }}>
                {uploading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={16} />}
                {image ? 'Cambiar imagen' : 'Subir imagen'}
                <input type="file" accept="image/*" style={{ display: 'none' }}
                  onChange={async e => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    setUploading(true)
                    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`
                    const { error } = await supabase.storage.from('products').upload(fileName, file)
                    setUploading(false)
                    if (error) { showToast('error', 'Error subiendo imagen'); return }
                    const { data } = supabase.storage.from('products').getPublicUrl(fileName)
                    setImage(data.publicUrl)
                  }}
                />
              </label>
              {image && <img src={image} alt="preview" style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 16, marginTop: 8 }} />}
            </Field>

            <button onClick={createProduct} disabled={loading || uploading}
              style={{ height: 54, borderRadius: 14, background: 'var(--orange)', border: 'none', color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8 }}>
              {loading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Creando...</> : 'Crear producto →'}
            </button>

          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</label>
      {children}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  height: 52,
  borderRadius: 12,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  padding: '0 16px',
  color: '#fff',
  fontSize: '0.9rem',
  outline: 'none',
  width: '100%',
}
