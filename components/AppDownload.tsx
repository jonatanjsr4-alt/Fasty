'use client'
import { useEffect, useRef, useState } from 'react'

export default function AppDownload() {
  const ref=useRef<HTMLElement>(null)
  const [vis,setVis]=useState(false)
  useEffect(()=>{
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true)},{threshold:0.1})
    if(ref.current)io.observe(ref.current)
    return()=>io.disconnect()
  },[])

  return (
    <section ref={ref} id="app" className={vis?'reveal visible':'reveal'} style={{ padding:'5rem 2rem',maxWidth:1300,margin:'0 auto' }}>
      <div style={{ background:'var(--dark3)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:32,padding:'4rem',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'3rem',alignItems:'center',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',top:-100,right:-100,width:400,height:400,borderRadius:'50%',background:'rgba(200,241,53,0.06)',filter:'blur(80px)',pointerEvents:'none' }}/>
        <div style={{ position:'relative',zIndex:1 }}>
          <div style={{ display:'inline-flex',alignItems:'center',gap:6,background:'rgba(200,241,53,0.1)',border:'1px solid rgba(200,241,53,0.25)',borderRadius:'100px',padding:'4px 12px',fontSize:'0.7rem',color:'var(--lime)',fontWeight:600,letterSpacing:'0.05em',textTransform:'uppercase',marginBottom:'1.5rem' }}>
            <span style={{ display:'inline-block',width:6,height:6,background:'var(--lime)',borderRadius:'50%',animation:'pulse 1.5s infinite' }}/>
            Próximamente en app stores
          </div>
          <h2 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(2rem,3.5vw,2.8rem)',fontWeight:800,lineHeight:1.05,letterSpacing:'-0.03em',marginBottom:'1rem' }}>
            Descarga<br/>FASTY <span style={{ color:'var(--lime)' }}>App</span>
          </h2>
          <p style={{ color:'var(--muted)',lineHeight:1.6,marginBottom:'2rem' }}>Pide comida, compra productos y recibe entregas rápidas desde tu celular. La mejor experiencia de delivery en Quibdó.</p>
          <div style={{ display:'flex',gap:'1rem',flexWrap:'wrap' }}>
            {[{icon:'🤖',store:'Google Play'},{icon:'🍎',store:'App Store'}].map(b=><StoreBtn key={b.store} {...b}/>)}
          </div>
        </div>
        <div style={{ display:'flex',justifyContent:'center',alignItems:'flex-end',gap:8 }}>
          <div style={{ width:150,background:'var(--dark)',borderRadius:30,border:'1px solid rgba(255,255,255,0.08)',height:240,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2rem',transform:'rotate(-8deg) translateY(20px)',zIndex:1 }}>🍕</div>
          <div style={{ width:180,height:280,background:'var(--dark2)',borderRadius:36,border:'1px solid rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:8,zIndex:2,boxShadow:'0 30px 60px rgba(0,0,0,0.5)' }}>
            <div style={{ width:80,height:80,background:'var(--white)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.6rem',color:'var(--dark)',fontWeight:700,textAlign:'center' }}>QR<br/>FASTY</div>
            <div style={{ fontSize:'0.65rem',color:'var(--muted)' }}>Escanea para descargar</div>
          </div>
          <div style={{ width:150,background:'var(--dark)',borderRadius:30,border:'1px solid rgba(255,255,255,0.08)',height:240,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2rem',transform:'rotate(8deg) translateY(20px)',zIndex:1 }}>🛒</div>
        </div>
      </div>
    </section>
  )
}

function StoreBtn({icon,store}:{icon:string,store:string}){
  const [h,setH]=useState(false)
  return (
    <a href="#" style={{ border:`1px solid ${h?'rgba(200,241,53,0.4)':'rgba(255,255,255,0.1)'}`,borderRadius:14,padding:'12px 20px',display:'flex',alignItems:'center',gap:12,transition:'border-color 0.2s,background 0.2s',background:h?'rgba(200,241,53,0.05)':'var(--dark2)',color:'var(--white)',textDecoration:'none' }}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}>
      <span style={{ fontSize:'1.5rem' }}>{icon}</span>
      <div>
        <div style={{ fontSize:'0.65rem',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.05em' }}>Disponible en</div>
        <div style={{ fontSize:'0.9rem',fontWeight:600 }}>{store}</div>
      </div>
    </a>
  )
}