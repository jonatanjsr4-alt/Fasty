'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function CtaFinal() {
  const ref=useRef<HTMLElement>(null)
  const [vis,setVis]=useState(false)
  useEffect(()=>{
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true)},{threshold:0.1})
    if(ref.current)io.observe(ref.current)
    return()=>io.disconnect()
  },[])

  return (
    <section ref={ref} className={vis?'reveal visible':'reveal'} style={{ padding:'5rem 2rem 3rem',maxWidth:1300,margin:'0 auto',textAlign:'center' }}>
      <h2 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(2.5rem,5vw,4.5rem)',fontWeight:800,lineHeight:0.95,letterSpacing:'-0.04em',marginBottom:'1.5rem' }}>
        Todo lo que<br/>
        <span style={{ color:'var(--orange)' }}>necesitas,</span><br/>
        <span style={{ color:'rgba(255,255,255,0.3)' }}>en minutos.</span>
      </h2>
      <p style={{ color:'var(--muted)',fontSize:'1.05rem',marginBottom:'2.5rem',maxWidth:450,margin:'0 auto 2.5rem',lineHeight:1.6 }}>
        Restaurantes, supermercados y negocios locales conectados en una experiencia moderna y rápida.
      </p>
      <div style={{ display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap' }}>
        <Btn href="/auth" primary>Comenzar ahora →</Btn>
        <Btn href="/business" primary={false}>Soy un negocio</Btn>
      </div>
      <div style={{ display:'inline-flex',alignItems:'center',gap:6,background:'rgba(255,255,255,0.05)',borderRadius:'100px',padding:'5px 14px',fontSize:'0.75rem',color:'var(--muted)',marginTop:'1.5rem' }}>
        📍 Quibdó, Chocó · Colombia 🇨🇴
      </div>
    </section>
  )
}

function Btn({href,children,primary}:{href:string,children:React.ReactNode,primary:boolean}){
  const [h,setH]=useState(false)
  return (
    <Link href={href} style={{ padding:'1rem 2rem',borderRadius:'100px',fontSize:'1rem',fontWeight:500,transition:'all 0.2s',textDecoration:'none',display:'inline-block',
      background:primary?'var(--orange)':'transparent',
      color:'var(--white)',
      border:primary?'none':'1px solid rgba(255,255,255,0.15)',
      transform:h&&primary?'translateY(-3px)':'none',
      boxShadow:h&&primary?'0 20px 40px rgba(255,80,1,0.35)':'none',
      borderColor:h&&!primary?'rgba(255,255,255,0.4)':undefined,
    }} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}>
      {children}
    </Link>
  )
}