'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const LINKS = [
  { label: 'Categorías', href: '#categorias' },
  { label: 'Cómo funciona', href: '#como' },
  { label: 'App', href: '#app' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        padding: '1.2rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backdropFilter: 'blur(20px)',
        background: scrolled ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0.7)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        transition: 'background 0.3s',
      }}>
        {/* LOGO */}
        <Link href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.04em', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--white)' }}>
          <span style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--orange)', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
          FASTY
        </Link>

        {/* DESKTOP LINKS */}
        <ul className="nav-links-desktop">
          {LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href} style={{ color: 'var(--muted)', fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/auth" style={{ background: 'var(--orange)', color: 'var(--white)', padding: '0.65rem 1.4rem', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 500, transition: 'transform 0.2s,box-shadow 0.2s', whiteSpace: 'nowrap' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(255,80,1,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}>
            Pedir ahora →
          </Link>

          {/* BURGER */}
          <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'none' }}
            aria-label="Menú">
            <span style={{ display: 'block', width: 24, height: 2, background: 'var(--white)', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span style={{ display: 'block', width: 24, height: 2, background: 'var(--white)', borderRadius: 2, margin: '5px 0', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 24, height: 2, background: 'var(--white)', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}>
        {LINKS.map(l => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
        <Link href="/auth" onClick={() => setMenuOpen(false)}
          style={{ background: 'var(--orange)', color: 'var(--white)', padding: '0.8rem 1.4rem', borderRadius: '100px', fontSize: '0.95rem', fontWeight: 500, textAlign: 'center', marginTop: '0.5rem', border: 'none' }}>
          Pedir ahora →
        </Link>
      </div>

      {/* BURGER VISIBLE ONLY ON MOBILE via CSS */}
      <style>{`
        @media (max-width: 768px) {
          .nav-burger-btn { display: flex !important; flex-direction: column; gap: 5px; }
        }
      `}</style>
    </>
  )
}