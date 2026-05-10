'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position:'fixed',top:0,left:0,right:0,zIndex:500,
      padding:'1.2rem 2rem',display:'flex',alignItems:'center',justifyContent:'space-between',
      backdropFilter:'blur(20px)',
      background: scrolled ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0.7)',
      borderBottom:'1px solid rgba(255,255,255,0.05)',
      transition:'background 0.3s',
    }}>
      <Link href="/" style={{ fontFamily:'var(--font-display)',fontWeight:800,fontSize:'1.5rem',letterSpacing:'-0.04em',display:'flex',alignItems:'center',gap:8,color:'var(--white)' }}>
        <span style={{ display:'inline-block',width:8,height:8,background:'var(--orange)',borderRadius:'50%',animation:'pulse 2s infinite' }} />
        FASTY
      </Link>

      <ul style={{ display:'flex',gap:'2rem',listStyle:'none' }}>
        {[['Categorías','#categorias'],['Cómo funciona','#como'],['App','#app'],['Contacto','#contacto']].map(([l,h]) => (
          <li key={h}><a href={h} style={{ color:'var(--muted)',fontSize:'0.85rem',letterSpacing:'0.05em',textTransform:'uppercase',transition:'color 0.2s' }}
            onMouseEnter={e=>(e.currentTarget.style.color='#fff')}
            onMouseLeave={e=>(e.currentTarget.style.color='var(--muted)')}>{l}</a></li>
        ))}
      </ul>

      <Link href="/auth" style={{ background:'var(--orange)',color:'var(--white)',padding:'0.65rem 1.4rem',borderRadius:'100px',fontSize:'0.85rem',fontWeight:500,transition:'transform 0.2s,box-shadow 0.2s' }}
        onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.05)';e.currentTarget.style.boxShadow='0 0 30px rgba(255,80,1,0.4)'}}
        onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.boxShadow='none'}}>
        Pedir ahora →
      </Link>
    </nav>
  )
}