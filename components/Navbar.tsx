'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/components/CartContext'
import CartSidebar from '@/components/CartSidebar'
import { ShoppingCart, User } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const LINKS = [
  { label: 'Negocios', href: '/stores' },
  { label: 'Categorías', href: '/#categorias' },
  { label: 'Cómo funciona', href: '/#como' },
  { label: 'Contacto', href: '/#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState<string | null>(null)
  const { itemCount } = useCart()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    async function check() {
      const { data } = await supabase.auth.getSession()
      if (data.session?.user) {
        setIsLoggedIn(true)
        const { data: p } = await supabase.from('profiles').select('role').eq('id', data.session.user.id).single()
        setRole(p?.role ?? 'customer')
      }
    }
    check()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_e, session) => {
      setIsLoggedIn(!!session)
      if (session?.user) {
        const { data: p } = await supabase.from('profiles').select('role').eq('id', session.user.id).single()
        setRole(p?.role ?? 'customer')
      } else setRole(null)
    })
    return () => { window.removeEventListener('scroll', fn); subscription.unsubscribe() }
  }, [])

  const panelHref = role === 'admin' ? '/admin' : role === 'business' ? '/dashboard' : role === 'delivery' ? '/delivery' : '/profile'
  const panelLabel = role === 'admin' ? 'Admin' : role === 'business' ? 'Mi negocio' : role === 'delivery' ? 'Entregas' : 'Mi perfil'

  return (
    <>
      <nav style={{ position:'fixed',top:0,left:0,right:0,zIndex:500,padding:'1rem 2rem',display:'flex',alignItems:'center',justifyContent:'space-between',backdropFilter:'blur(20px)',background:scrolled?'rgba(10,10,10,0.97)':'rgba(10,10,10,0.7)',borderBottom:'1px solid rgba(255,255,255,0.05)',transition:'background 0.3s' }}>
        <Link href="/" style={{ fontFamily:'var(--font-display)',fontWeight:800,fontSize:'1.4rem',letterSpacing:'-0.04em',display:'flex',alignItems:'center',gap:8,color:'var(--white)' }}>
          <span style={{ display:'inline-block',width:8,height:8,background:'var(--orange)',borderRadius:'50%',animation:'pulse 2s infinite' }} />
          FASTY
        </Link>
        <ul className="nav-links-desktop">
          {LINKS.map(l => (
            <li key={l.href}>
              <Link href={l.href} style={{ color:'var(--muted)',fontSize:'0.82rem',letterSpacing:'0.05em',textTransform:'uppercase',transition:'color 0.2s' }}
                onMouseEnter={e=>(e.currentTarget.style.color='#fff')} onMouseLeave={e=>(e.currentTarget.style.color='var(--muted)')}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div style={{ display:'flex',alignItems:'center',gap:'0.8rem' }}>
          <button onClick={() => setCartOpen(true)} style={{ position:'relative',width:40,height:40,borderRadius:12,background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'var(--white)' }}>
            <ShoppingCart size={16} />
            {itemCount > 0 && <span style={{ position:'absolute',top:-5,right:-5,width:18,height:18,borderRadius:'50%',background:'var(--orange)',color:'#fff',fontSize:'0.6rem',fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center' }}>{itemCount > 9 ? '9+' : itemCount}</span>}
          </button>
          {isLoggedIn
            ? <Link href={panelHref} title={panelLabel} style={{ width:40,height:40,borderRadius:12,background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--white)' }}><User size={16} /></Link>
            : <Link href="/auth" style={{ background:'var(--orange)',color:'var(--white)',padding:'0.55rem 1.2rem',borderRadius:'100px',fontSize:'0.82rem',fontWeight:500,whiteSpace:'nowrap' }}
                onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.05)';e.currentTarget.style.boxShadow='0 0 25px rgba(255,80,1,0.4)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.boxShadow='none'}}>Pedir ahora →</Link>
          }
          <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
            <span style={{ display:'block',width:22,height:2,background:'var(--white)',borderRadius:2,transition:'all 0.3s',transform:menuOpen?'rotate(45deg) translateY(7px)':'none' }} />
            <span style={{ display:'block',width:22,height:2,background:'var(--white)',borderRadius:2,margin:'4px 0',transition:'all 0.3s',opacity:menuOpen?0:1 }} />
            <span style={{ display:'block',width:22,height:2,background:'var(--white)',borderRadius:2,transition:'all 0.3s',transform:menuOpen?'rotate(-45deg) translateY(-7px)':'none' }} />
          </button>
        </div>
      </nav>
      <div className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}>
        {LINKS.map(l => <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</Link>)}
        {isLoggedIn
          ? <Link href={panelHref} onClick={() => setMenuOpen(false)} style={{ color:'var(--muted)' }}>{panelLabel}</Link>
          : <Link href="/auth" onClick={() => setMenuOpen(false)} style={{ background:'var(--orange)',color:'var(--white)',padding:'0.8rem 1.4rem',borderRadius:'100px',fontSize:'0.95rem',fontWeight:500,textAlign:'center',marginTop:'0.5rem' }}>Pedir ahora →</Link>
        }
      </div>
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
