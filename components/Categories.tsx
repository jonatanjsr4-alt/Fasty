'use client'
import { useState, useEffect, useRef } from 'react'

const CATS = [
  {emoji:'🍺',name:'Licores'},{emoji:'🍽️',name:'Restaurantes'},{emoji:'🍦',name:'Heladerías'},
  {emoji:'📚',name:'Educación'},{emoji:'☕',name:'Cafeterías'},{emoji:'🛒',name:'Supermercados'},
  {emoji:'👗',name:'Moda'},{emoji:'💄',name:'Belleza'},{emoji:'💊',name:'Salud'},
  {emoji:'🏠',name:'Hogar'},{emoji:'📱',name:'Tecnología'},{emoji:'🔧',name:'Mantenimiento'},
  {emoji:'⚽',name:'Deporte'},{emoji:'🎁',name:'Regalos'},
]

export default function Categories() {
  const ref = useRef<HTMLElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(()=>{
    const io = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVis(true) },{threshold:0.1})
    if(ref.current) io.observe(ref.current)
    return ()=>io.disconnect()
  },[])

  return (
    <section ref={ref} id="categorias" className={vis?'reveal visible':'reveal'} style={{ padding:'5rem 2rem',maxWidth:1300,margin:'0 auto' }}>
      <p style={{ fontSize:'0.75rem',letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--orange)',marginBottom:'1rem' }}>Todo en un solo lugar</p>
      <h2 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(2rem,4vw,3.2rem)',fontWeight:800,lineHeight:1,letterSpacing:'-0.03em',marginBottom:'3rem' }}>
        Explora <span style={{ color:'var(--lime)' }}>FASTY</span>
      </h2>
      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:'1rem' }}>
        {CATS.map(c=><CatCard key={c.name} {...c}/>)}
      </div>
    </section>
  )
}

function CatCard({emoji,name}:{emoji:string,name:string}){
  const [h,setH]=useState(false)
  return (
    <div style={{ background:'var(--dark3)',border:`1px solid ${h?'rgba(255,80,1,0.3)':'rgba(255,255,255,0.06)'}`,borderRadius:'var(--radius)',padding:'1.5rem 1rem',textAlign:'center',cursor:'none',transition:'transform 0.25s,border-color 0.25s',position:'relative',overflow:'hidden',transform:h?'translateY(-6px)':'none' }}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} data-cursor>
      {h&&<div style={{ position:'absolute',inset:0,background:'radial-gradient(circle at 50% 0%,rgba(255,80,1,0.15) 0%,transparent 70%)',pointerEvents:'none' }}/>}
      <span style={{ fontSize:'2rem',marginBottom:'0.7rem',display:'block' }}>{emoji}</span>
      <div style={{ fontSize:'0.78rem',fontWeight:500,color:h?'var(--white)':'var(--muted)',transition:'color 0.2s' }}>{name}</div>
    </div>
  )
}