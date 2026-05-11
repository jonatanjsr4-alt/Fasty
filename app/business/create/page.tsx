'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, AlertCircle, Loader2, Upload } from 'lucide-react'

const CATEGORIES = [
  'Restaurantes', 'Supermercados', 'Farmacias', 'Licores',
  'Heladerías', 'Cafeterías', 'Moda', 'Belleza', 'Tecnología', 'Otro',
]

type Toast = { type: 'success' | 'error'; message: string } | null

export default function CreateBusinessPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [logo, setLogo] = useState('')
  const [banner, setBanner] = useState('')
  const [logoUploading, setLogoUploading] = useState(false)
  const [bannerUploading, setBannerUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<Toast>(null)

  function showToast(type: 'success' | 'error', message: string) {
    setToast({ type, message })
    setTimeout(() => setToast(null), 4000)
  }

  async function uploadImage(file: File, folder: string, setUploading: (v: boolean) => void) {
    setUploading(true)
    const fileName = `${folder}-${Date.now()}-${file.name.replace(/\s/g, '_')}`
    const { error } = await supabase.storage.from('products').upload(fileName, file)
    setUploading(false)
    if (error) { showToast('error', 'Error subiendo imagen'); return null }
    const { data } = supabase.storage.from('products').getPublicUrl(fileName)
    return data.publicUrl
  }

  async function createBusiness() {
    if (!name.trim() || !description.trim() || !category) {
      showToast('error', 'Completa los campos obligatorios: nombre, descripción y categoría')
      return
    }
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { showToast('error', 'Debes iniciar sesión'); setLoading(false); return }

    const { data, error } = await supabase
      .from('restaurants')
      .insert([{
        owner_id: user.id,
        name: name.trim(),
        description: description.trim(),
        category,
        phone: phone.trim(),
        address: address.trim(),
        logo_url: logo,
        banner_url: banner,
      }])
      .select()
      .single()

    setLoading(false)

    if (error) {
      showToast('error', 'Error creando el negocio. Intenta de nuevo.')
      return
    }

    showToast('success', '¡Negocio creado correctamente!')
    setTimeout(() => router.push(`/business/${data.id}`), 1500)
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--dark)', color: 'var(--white)' }}>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 10, background: toast.type === 'success' ? 'rgba(74,222,128,0.12)' : 'rgba(239,68,68,0.12)', border: `1px solid ${toast.type === 'success' ? 'rgba(74,222,128,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: 14, padding: '12px 18px', maxWidth: 340, backdropFilter: 'blur(12px)' }}>
          {toast.type === 'success'
            ? <CheckCircle size={18} color="#4ade80" />
            : <AlertCircle size={18} color="#f87171" />}
          <span style={{ fontSize: '0.875rem', color: toast.type === 'success' ? '#4ade80' : '#f87171' }}>{toast.message}</span>
        </div>
      )}

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link href="/stores" style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)' }}>
          <ArrowLeft size={16} />
        </Link>
        <div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 600, margin: 0 }}>Negocios</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Registrar negocio</h1>
        </div>
      </nav>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '2.5rem 1.5rem 5rem' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          <Field label="Nombre del negocio *">
            <input type="text" placeholder="Ej: Restaurante El Sabor" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
          </Field>

          <Field label="Descripción *">
            <textarea placeholder="Describe qué ofrece tu negocio..." value={description} onChange={e => setDescription(e.target.value)} rows={3} style={{ ...inputStyle, height: 'auto', padding: '12px 16px', resize: 'none' }} />
          </Field>

          <Field label="Categoría *">
            <select value={category} onChange={e => setCategory(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              <option value="">Selecciona una categoría</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>

          <Field label="Teléfono / WhatsApp">
            <input type="tel" placeholder="+57 300 000 0000" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} />
          </Field>

          <Field label="Dirección">
            <input type="text" placeholder="Ej: Calle 27 #5-30, Quibdó" value={address} onChange={e => setAddress(e.target.value)} style={inputStyle} />
          </Field>

          <Field label="Logo del negocio">
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, height: 52, background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: 12, padding: '0 16px', cursor: 'pointer', color: 'var(--muted)', fontSize: '0.88rem' }}>
              {logoUploading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={16} />}
              {logo ? 'Cambiar logo' : 'Subir logo'}
              <input type="file" accept="image/*" style={{ display: 'none' }}
                onChange={async e => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  const url = await uploadImage(file, 'logo', setLogoUploading)
                  if (url) setLogo(url)
                }}
              />
            </label>
            {logo && <img src={logo} alt="logo" style={{ width: 100, height: 100, borderRadius: 16, objectFit: 'cover', marginTop: 8 }} />}
          </Field>

          <Field label="Imagen de portada">
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, height: 52, background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: 12, padding: '0 16px', cursor: 'pointer', color: 'var(--muted)', fontSize: '0.88rem' }}>
              {bannerUploading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={16} />}
              {banner ? 'Cambiar portada' : 'Subir portada'}
              <input type="file" accept="image/*" style={{ display: 'none' }}
                onChange={async e => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  const url = await uploadImage(file, 'banner', setBannerUploading)
                  if (url) setBanner(url)
                }}
              />
            </label>
            {banner && <img src={banner} alt="portada" style={{ width: '100%', height: 180, borderRadius: 16, objectFit: 'cover', marginTop: 8 }} />}
          </Field>

          <button onClick={createBusiness} disabled={loading || logoUploading || bannerUploading}
            style={{ height: 54, borderRadius: 14, background: 'var(--orange)', border: 'none', color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8 }}>
            {loading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Creando...</> : 'Crear negocio →'}
          </button>

        </div>
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
