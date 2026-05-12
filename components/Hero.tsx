'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PhoneMockup from './PhoneMockup'
import { supabase } from '@/lib/supabase'

export default function Hero() {
  const router = useRouter()
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session?.user) {
        const { data: profiles } = await supabase
          .from('profiless')
          .select('role')
          .eq('id', data.session.user.id)
          .single()
        setRole(profiles?.role ?? 'customer')
      }
    })
  }, [])

  function handleRegisterBusiness() {
    if (!role) {
      // No logueado: ir a auth y luego a crear negocio
      router.push('/auth?next=/business/create')
    } else if (role === 'business') {
      // Ya tiene negocio: ir al dashboard
      router.push('/dashboard')
    } else {
      // Logueado como customer/delivery/admin: ir a crear negocio
      router.push('/business/create')
    }
  }

  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', filter: 'blur(120px)', background: 'rgba(255,80,1,0.12)', top: -100, right: -100, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', filter: 'blur(120px)', background: 'rgba(200,241,53,0.06)', bottom: -50, left: -100, pointerEvents: 'none' }} />

      <div className="hero-grid">
        {/* LEFT */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(200,241,53,0.1)', border: '1px solid rgba(200,241,53,0.25)', borderRadius: '100px', padding: '4px 12px', fontSize: '0.7rem', color: 'var(--lime)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, background: 'var(--lime)', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
            Disponible en Quibdó
          </div>

          <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '1.5rem' }}>
            La app de domicilios
          </p>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem,7vw,6rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
            Todo lo<br />
            que <span style={{ color: 'var(--orange)' }}>necesitas</span><br />
            <span style={{ WebkitTextStroke: '2px var(--white)', color: 'transparent' }}>al instante</span>
          </h1>

          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 400, marginBottom: '2rem' }}>
            Restaurantes, supermercados, farmacias y negocios locales de Quibdó. Rápido, seguro y al mejor precio.
          </p>

          <div className="hero-actions">
            <Link href="/stores"
              style={{ background: 'var(--orange)', color: 'var(--white)', padding: '0.9rem 1.8rem', borderRadius: '100px', fontSize: '1rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 8, animation: 'bounceIn 0.8s 0.4s both' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,80,1,0.35)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
              Pedir ahora
              <span style={{ width: 22, height: 22, background: 'rgba(255,255,255,0.25)', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>→</span>
            </Link>
            <button
              onClick={handleRegisterBusiness}
              style={{ color: 'var(--white)', padding: '0.9rem 1.8rem', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '100px', fontSize: '1rem', background: 'transparent', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'transparent' }}>
              {role === 'business' ? 'Mi negocio →' : 'Registrar negocio'}
            </button>
          </div>

          <div className="hero-stats">
            {[{ num: '+10K', label: 'Pedidos' }, { num: '+500', label: 'Negocios' }, { num: '24/7', label: 'Soporte' }].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 800 }}>{s.num}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-phone-col">
          <div style={{ position: 'absolute', top: 60, right: -40, background: 'var(--dark2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, zIndex: 3, animation: 'floatBadge1 4s ease-in-out infinite', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            <span style={{ fontSize: '1.3rem' }}>🚀</span>
            <div>
              <div style={{ color: 'var(--lime)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>30 - 45 min</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>Tiempo promedio</div>
            </div>
          </div>
          <PhoneMockup />
          <div style={{ position: 'absolute', bottom: 80, left: -50, background: 'var(--dark2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, zIndex: 3, animation: 'floatBadge2 4s ease-in-out 1s infinite', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            <span style={{ fontSize: '1.3rem' }}>⭐</span>
            <div>
              <div style={{ color: 'var(--lime)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>4.9/5</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>Calificación</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}