'use client'
import { Suspense, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Search, ArrowLeft, Package, Clock, Truck, CheckCircle, XCircle, Loader2 } from 'lucide-react'

const SC: Record<string, { label: string; color: string; icon: any; step: number }> = {
  Pendiente:   { label:'Pendiente',   color:'#facc15', icon:Clock,        step:0 },
  Preparando:  { label:'Preparando',  color:'#60a5fa', icon:Package,      step:1 },
  'En camino': { label:'En camino',   color:'#a78bfa', icon:Truck,        step:2 },
  Entregado:   { label:'Entregado',   color:'#4ade80', icon:CheckCircle,  step:3 },
  Cancelado:   { label:'Cancelado',   color:'#f87171', icon:XCircle,      step:-1 },
}
const STEPS = ['Pendiente','Preparando','En camino','Entregado']

function TrackingContent() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [myOrders, setMyOrders] = useState<any[]>([])
  const [notFound, setNotFound] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      setIsLoggedIn(true)
      const { data } = await supabase.from('orders').select('id,customer_name,status,total,created_at')
        .eq('user_id', user.id).not('status', 'in', '("Entregado","Cancelado")').order('created_at', { ascending: false }).limit(5)
      setMyOrders(data || [])
    })
  }, [])

  async function doSearch() {
    const q = query.trim(); if (!q) return
    setLoading(true); setNotFound(false); setResult(null)
    const { data } = await supabase.from('orders').select('*').ilike('id', `${q}%`).limit(1).single()
    setLoading(false)
    if (!data) { setNotFound(true); return }
    setResult(data)
  }

  const cfg = result ? SC[result.status] : null

  return (
    <main style={{ minHeight:'100vh',background:'var(--dark)',color:'var(--white)',fontFamily:'var(--font-body)' }}>
      <nav style={{ padding:'1.2rem 1.5rem',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',gap:12 }}>
        <Link href="/stores" style={{ width:36,height:36,borderRadius:10,background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',textDecoration:'none' }}>
          <ArrowLeft size={15} />
        </Link>
        <div>
          <p style={{ fontSize:'0.65rem',color:'var(--orange)',textTransform:'uppercase',letterSpacing:'0.12em',fontWeight:600,margin:0 }}>Fasty</p>
          <h1 style={{ fontSize:'1.1rem',fontWeight:800,margin:0,fontFamily:'var(--font-display)' }}>Rastrea tu pedido</h1>
        </div>
      </nav>

      <div style={{ maxWidth:600,margin:'0 auto',padding:'2rem 1.5rem 5rem' }}>

        {/* Buscador */}
        <div style={{ background:'var(--dark2)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:20,padding:'2rem',textAlign:'center',marginBottom:'2rem' }}>
          <div style={{ width:64,height:64,borderRadius:'50%',background:'rgba(255,80,1,0.12)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 1rem' }}>
            <Search size={28} color="var(--orange)" />
          </div>
          <h2 style={{ fontFamily:'var(--font-display)',fontWeight:800,fontSize:'1.4rem',marginBottom:8 }}>Rastrea tu pedido</h2>
          <p style={{ color:'var(--muted)',fontSize:'0.88rem',marginBottom:'1.5rem' }}>Ingresa el ID de tu pedido para ver su estado actual en tiempo real.</p>
          <div style={{ display:'flex',gap:10 }}>
            <input type="text" value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&doSearch()}
              placeholder="EJ: ORD-723A"
              style={{ flex:1,height:50,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',padding:'0 16px',color:'#fff',fontSize:'0.9rem',outline:'none',textAlign:'center',letterSpacing:'0.05em' }} />
          </div>
          <button onClick={doSearch} disabled={loading||!query.trim()} style={{ width:'100%',height:50,borderRadius:12,background:'linear-gradient(135deg,var(--orange),#ff8c00)',border:'none',color:'#fff',fontWeight:700,cursor:'pointer',marginTop:10,display:'flex',alignItems:'center',justifyContent:'center',gap:8,opacity:!query.trim()?0.6:1 }}>
            {loading ? <Loader2 size={18} style={{ animation:'spin 1s linear infinite' }} /> : null}
            {loading ? 'Buscando...' : 'Buscar mi pedido'}
          </button>
        </div>

        {/* Mis activos */}
        {isLoggedIn && myOrders.length > 0 && !result && (
          <div style={{ marginBottom:'2rem' }}>
            <p style={{ fontSize:'0.72rem',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.1em',fontWeight:600,marginBottom:10 }}>Tus pedidos activos</p>
            <div style={{ display:'flex',flexDirection:'column',gap:'0.6rem' }}>
              {myOrders.map(o => {
                const c = SC[o.status]
                return (
                  <Link key={o.id} href={`/tracking/${o.id}`} style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0.9rem 1.2rem',background:'var(--dark2)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:14,textDecoration:'none',color:'#fff' }}>
                    <div>
                      <p style={{ margin:0,fontWeight:700,fontSize:'0.88rem' }}>#{o.id.split('-')[0].toUpperCase()}</p>
                      <p style={{ margin:'2px 0 0',fontSize:'0.72rem',color:'var(--muted)' }}>{new Date(o.created_at).toLocaleString('es-CO',{dateStyle:'short',timeStyle:'short'})}</p>
                    </div>
                    <div style={{ display:'flex',alignItems:'center',gap:8 }}>
                      <span style={{ fontWeight:800,color:'var(--orange)' }}>${o.total?.toLocaleString('es-CO')}</span>
                      <span style={{ fontSize:'0.72rem',fontWeight:700,color:c?.color,background:`${c?.color}18`,padding:'3px 8px',borderRadius:6 }}>{o.status}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {notFound && (
          <div style={{ padding:'1.2rem 1.5rem',background:'rgba(248,113,113,0.08)',border:'1px solid rgba(248,113,113,0.2)',borderRadius:16,display:'flex',gap:12,alignItems:'center' }}>
            <XCircle size={20} color="#f87171" />
            <div>
              <p style={{ fontWeight:600,color:'#f87171',fontSize:'0.9rem',margin:0 }}>Pedido no encontrado</p>
              <p style={{ color:'var(--muted)',fontSize:'0.8rem',margin:'4px 0 0' }}>Verifica el código e intenta de nuevo.</p>
            </div>
          </div>
        )}

        {result && cfg && (
          <div style={{ background:'var(--dark2)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:20,overflow:'hidden' }}>
            <div style={{ padding:'1.5rem',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
              <div>
                <p style={{ margin:0,fontWeight:800,fontSize:'1.1rem',fontFamily:'var(--font-display)' }}>{result.customer_name}</p>
                <p style={{ margin:'4px 0 0',fontSize:'0.72rem',color:'var(--muted)' }}>#{result.id.split('-')[0].toUpperCase()}</p>
              </div>
              <div style={{ textAlign:'right' }}>
                <p style={{ color:cfg.color,fontWeight:700,margin:0 }}>{cfg.label}</p>
                <p style={{ color:'var(--orange)',fontWeight:800,fontSize:'1.2rem',margin:0,fontFamily:'var(--font-display)' }}>${result.total?.toLocaleString('es-CO')}</p>
              </div>
            </div>
            {result.status !== 'Cancelado' && (
              <div style={{ padding:'1.5rem' }}>
                <div style={{ display:'flex',justifyContent:'space-between',position:'relative' }}>
                  <div style={{ position:'absolute',top:16,left:'8%',right:'8%',height:2,background:'rgba(255,255,255,0.07)' }}>
                    <div style={{ height:'100%',background:'var(--orange)',width:`${(cfg.step/3)*100}%`,transition:'width 0.6s ease' }} />
                  </div>
                  {STEPS.map((s,i) => {
                    const sc = SC[s]; const done = cfg.step >= i
                    return (
                      <div key={s} style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:6,zIndex:1 }}>
                        <div style={{ width:32,height:32,borderRadius:'50%',background:done?'var(--orange)':'rgba(255,255,255,0.06)',border:`2px solid ${done?'var(--orange)':'rgba(255,255,255,0.1)'}`,display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.3s' }}>
                          <sc.icon size={14} color={done?'#fff':'var(--muted)'} />
                        </div>
                        <span style={{ fontSize:'0.62rem',color:done?'#fff':'var(--muted)',fontWeight:done?700:400,textAlign:'center' }}>{s}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            <div style={{ padding:'0 1.5rem 1.5rem' }}>
              <Link href={`/tracking/${result.id}`} style={{ display:'flex',alignItems:'center',justifyContent:'center',height:46,borderRadius:12,background:'var(--orange)',color:'#fff',textDecoration:'none',fontWeight:700,fontSize:'0.88rem' }}>
                Ver seguimiento completo →
              </Link>
            </div>
          </div>
        )}

        {!isLoggedIn && !result && (
          <p style={{ color:'var(--muted)',fontSize:'0.78rem',textAlign:'center',lineHeight:1.7,marginTop:'1.5rem' }}>
            El código aparece en el WhatsApp al confirmar tu pedido.<br />
            <Link href="/auth" style={{ color:'var(--orange)',fontWeight:600 }}>Inicia sesión</Link> para ver tus pedidos activos.
          </p>
        )}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </main>
  )
}

export default function TrackingPage() {
  return <Suspense fallback={<div style={{ minHeight:'100vh',background:'var(--dark)',display:'flex',alignItems:'center',justifyContent:'center' }}><Loader2 size={28} color="var(--orange)" style={{ animation:'spin 1s linear infinite' }} /><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>}><TrackingContent /></Suspense>
}
