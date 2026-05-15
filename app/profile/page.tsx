'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, User, Phone, Mail, MapPin, ShoppingBag, CheckCircle, Truck, Package, Clock, XCircle, LogOut, Loader2, Save } from 'lucide-react'

const SC: Record<string, { label: string; color: string; icon: any }> = {
  Pendiente:   { label:'Pendiente',   color:'#facc15', icon:Clock },
  Preparando:  { label:'Preparando',  color:'#60a5fa', icon:Package },
  'En camino': { label:'En camino',   color:'#a78bfa', icon:Truck },
  Entregado:   { label:'Entregado',   color:'#4ade80', icon:CheckCircle },
  Cancelado:   { label:'Cancelado',   color:'#f87171', icon:XCircle },
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState<'pedidos'|'datos'>('pedidos')
  const [toast, setToast] = useState<{type:'success'|'error';msg:string}|null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => { init() }, [])

  async function init() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth'); return }
    setUser(user)
    const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (p) { setName(p.name || ''); setPhone(p.phone || ''); setAddress(p.address || '') }
    const { data: o } = await supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(30)
    setOrders(o || [])
    setLoading(false)
  }

  async function save() {
    setSaving(true)
    const { error } = await supabase.from('profiles').update({ name, phone, address }).eq('id', user.id)
    setToast({ type: error ? 'error' : 'success', msg: error ? 'Error guardando' : '¡Perfil actualizado!' })
    setSaving(false); setTimeout(() => setToast(null), 3000)
  }

  if (loading) return (
    <div style={{ minHeight:'100vh',background:'var(--dark)',display:'flex',alignItems:'center',justifyContent:'center' }}>
      <Loader2 size={32} color="var(--orange)" style={{ animation:'spin 1s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  const totalGastado = orders.filter(o => o.status === 'Entregado').reduce((a,o) => a + o.total, 0)
  const inp: React.CSSProperties = { width:'100%',height:48,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',padding:'0 14px 0 40px',color:'#fff',fontSize:'0.88rem',outline:'none',boxSizing:'border-box' }

  return (
    <main style={{ minHeight:'100vh',background:'var(--dark)',color:'var(--white)',fontFamily:'var(--font-body)' }}>
      {toast && <div style={{ position:'fixed',top:20,right:20,zIndex:9999,background:toast.type==='success'?'rgba(74,222,128,0.15)':'rgba(248,113,113,0.15)',border:`1px solid ${toast.type==='success'?'rgba(74,222,128,0.3)':'rgba(248,113,113,0.3)'}`,borderRadius:14,padding:'12px 20px',color:toast.type==='success'?'#4ade80':'#f87171',fontWeight:600,fontSize:'0.88rem' }}>{toast.msg}</div>}

      <nav style={{ padding:'1.2rem 1.5rem',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,background:'rgba(10,10,10,0.95)',backdropFilter:'blur(20px)',zIndex:100 }}>
        <Link href="/stores" style={{ width:36,height:36,borderRadius:10,background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',textDecoration:'none' }}>
          <ArrowLeft size={15} />
        </Link>
        <div style={{ flex:1 }}>
          <p style={{ fontSize:'0.65rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--orange)',fontWeight:600,margin:0 }}>Mi cuenta</p>
          <h1 style={{ fontSize:'1.1rem',fontWeight:800,margin:0,fontFamily:'var(--font-display)' }}>{name || user?.email}</h1>
        </div>
        <button onClick={async () => { await supabase.auth.signOut(); router.push('/') }} style={{ display:'flex',alignItems:'center',gap:6,padding:'8px 14px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'var(--muted)',fontSize:'0.8rem',cursor:'pointer' }}>
          <LogOut size={14} /> Salir
        </button>
      </nav>

      <div style={{ maxWidth:680,margin:'0 auto',padding:'2rem 1.5rem 5rem' }}>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1rem',marginBottom:'2rem' }}>
          {[{label:'Pedidos',v:orders.length},{label:'Entregados',v:orders.filter(o=>o.status==='Entregado').length},{label:'Gastado',v:`$${totalGastado.toLocaleString('es-CO')}`}].map((s,i) => (
            <div key={i} style={{ background:'var(--dark2)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:'1rem',textAlign:'center' }}>
              <p style={{ margin:0,fontSize:'1.4rem',fontWeight:800,fontFamily:'var(--font-display)' }}>{s.v}</p>
              <p style={{ margin:'4px 0 0',fontSize:'0.72rem',color:'var(--muted)' }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div style={{ display:'flex',gap:6,background:'rgba(255,255,255,0.04)',borderRadius:12,padding:4,marginBottom:'1.5rem' }}>
          {(['pedidos','datos'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex:1,height:38,borderRadius:9,border:'none',cursor:'pointer',fontWeight:600,fontSize:'0.82rem',background:tab===t?'var(--orange)':'transparent',color:tab===t?'#fff':'var(--muted)' }}>
              {t === 'pedidos' ? '🛒 Mis pedidos' : '👤 Mis datos'}
            </button>
          ))}
        </div>

        {tab === 'pedidos' && (
          <div style={{ display:'flex',flexDirection:'column',gap:'0.8rem' }}>
            {orders.length === 0 ? (
              <div style={{ textAlign:'center',padding:'3rem',color:'var(--muted)' }}>
                <ShoppingBag size={36} style={{ marginBottom:12,opacity:0.3 }} />
                <p style={{ marginBottom:12 }}>Aún no tienes pedidos</p>
                <Link href="/stores" style={{ color:'var(--orange)',fontWeight:600 }}>Explorar negocios →</Link>
              </div>
            ) : orders.map(o => {
              const c = SC[o.status] || SC['Pendiente']
              const Icon = c.icon
              return (
                <div key={o.id} style={{ background:'var(--dark2)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:'1rem 1.2rem' }}>
                  <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8 }}>
                    <div>
                      <p style={{ margin:0,fontWeight:700,fontSize:'0.88rem' }}>#{o.id.split('-')[0].toUpperCase()}</p>
                      <p style={{ margin:'2px 0 0',fontSize:'0.75rem',color:'var(--muted)' }}>{new Date(o.created_at).toLocaleDateString('es-CO',{day:'2-digit',month:'short',year:'numeric'})}</p>
                    </div>
                    <div style={{ display:'flex',alignItems:'center',gap:5,background:`${c.color}15`,borderRadius:8,padding:'3px 10px' }}>
                      <Icon size={11} color={c.color} />
                      <span style={{ fontSize:'0.72rem',fontWeight:700,color:c.color }}>{c.label}</span>
                    </div>
                  </div>
                  <p style={{ fontSize:'0.8rem',color:'var(--muted)',marginBottom:8 }}>{o.products?.map((p:any) => `${p.name} x${p.quantity}`).join(', ')}</p>
                  <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                    <span style={{ fontWeight:800,color:'var(--orange)' }}>${o.total?.toLocaleString('es-CO')}</span>
                    <Link href={`/tracking/${o.id}`} style={{ fontSize:'0.78rem',color:'var(--orange)',textDecoration:'none',fontWeight:600 }}>Rastrear →</Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {tab === 'datos' && (
          <div style={{ background:'var(--dark2)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:20,padding:'1.5rem' }}>
            <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:'1.5rem' }}>
              <div style={{ width:48,height:48,borderRadius:'50%',background:'var(--orange)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'1.2rem',fontFamily:'var(--font-display)' }}>
                {(name||user?.email||'U')[0].toUpperCase()}
              </div>
              <div><p style={{ margin:0,fontWeight:700 }}>{name||'Sin nombre'}</p><p style={{ margin:0,fontSize:'0.8rem',color:'var(--muted)' }}>{user?.email}</p></div>
            </div>
            <div style={{ display:'flex',flexDirection:'column',gap:'1rem' }}>
              {[
                {label:'Nombre completo',v:name,set:setName,icon:User,ph:'Tu nombre'},
                {label:'Teléfono / WhatsApp',v:phone,set:setPhone,icon:Phone,ph:'+57 300 000 0000'},
                {label:'Dirección principal',v:address,set:setAddress,icon:MapPin,ph:'Tu dirección'},
              ].map((f,i) => (
                <div key={i}>
                  <label style={{ fontSize:'0.7rem',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.08em',fontWeight:600,display:'block',marginBottom:6 }}>{f.label}</label>
                  <div style={{ position:'relative' }}>
                    <f.icon size={14} style={{ position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',color:'var(--muted)' }} />
                    <input type="text" value={f.v} onChange={e=>f.set(e.target.value)} placeholder={f.ph} style={inp} />
                  </div>
                </div>
              ))}
              <button onClick={save} disabled={saving} style={{ height:48,borderRadius:12,background:'var(--orange)',border:'none',color:'#fff',fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8,marginTop:4 }}>
                {saving ? <Loader2 size={16} style={{ animation:'spin 1s linear infinite' }} /> : <Save size={16} />}
                {saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </main>
  )
}
