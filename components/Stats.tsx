'use client'
import { useEffect, useRef, useState } from 'react'

const STATS = [
  {target:10000,label:'Pedidos entregados',fmt:(n:number)=>`+${Math.round(n/1000)}K`},
  {target:500,label:'Negocios activos',fmt:(n:number)=>`+${Math.round(n)}`},
  {target:20000,label:'Usuarios registrados',fmt:(n:number)=>`+${Math.round(n/1000)}K`},
  {target:null,label:'Soporte disponible',fmt:()=>'24/7'},
]

export default function Stats() {
  const ref = useRef<HTMLElement>(null)
  const [vis,setVis]=useState(false)
  useEffect(()=>{
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true)},{threshold:0.1})
    if(ref.current)io.observe(ref.current)
    return()=>io.disconnect()
  },[])

  return (
    <section ref={ref} className={vis?'reveal visible':'reveal'} style={{ padding:'5rem 2rem',maxWidth:1300,margin:'0 auto' }}>
      <p style={{ fontSize:'0.75rem',letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--orange)',marginBottom:'1rem' }}>FASTY en números</p>
      <h2 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(2rem,4vw,3.2rem)',fontWeight:800,lineHeight:1,letterSpacing:'-0.03em',marginBottom:'3rem' }}>
        Delivery moderno<br/>para <span style={{ color:'var(--lime)' }}>Quibdó</span>
      </h2>
      <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1.5rem' }}>
        {STATS.map((s,i)=><StatCard key={i} {...s} animate={vis}/>)}
      </div>
    </section>
  )
}

function StatCard({target,label,fmt,animate}:{target:number|null,label:string,fmt:(n:number)=>string,animate:boolean}){
  const [count,setCount]=useState(0)
  const [h,setH]=useState(false)
  const started=useRef(false)
  useEffect(()=>{
    if(!animate||target===null||started.current)return
    started.current=true
    let v=0; const step=target/60
    const t=setInterval(()=>{ v+=step; if(v>=target){v=target;clearInterval(t)} setCount(v) },16)
    return()=>clearInterval(t)
  },[animate,target])

  return (
    <div style={{ background:'var(--dark3)',border:`1px solid ${h?'rgba(200,241,53,0.3)':'rgba(255,255,255,0.06)'}`,borderRadius:'var(--radius)',padding:'2rem 1.5rem',position:'relative',overflow:'hidden',transition:'transform 0.25s,border-color 0.25s',transform:h?'translateY(-4px)':'none' }}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}>
      {h&&<div style={{ position:'absolute',bottom:0,left:0,right:0,height:3,background:'linear-gradient(90deg,var(--orange),var(--lime))' }}/>}
      <div style={{ fontFamily:'var(--font-display)',fontSize:'2.8rem',fontWeight:800,lineHeight:1,marginBottom:'0.5rem',background:'linear-gradient(135deg,var(--white),rgba(255,255,255,0.6))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>
        {target===null?fmt(0):fmt(count)}
      </div>
      <div style={{ color:'var(--muted)',fontSize:'0.85rem' }}>{label}</div>
    </div>
  )
}