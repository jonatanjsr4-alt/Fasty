'use client'
import { useEffect, useRef, useState } from 'react'

const TESTIS = [
  { i: 'LM', name: 'Laura Mosquera',   role: 'Cliente FASTY',     color: 'linear-gradient(135deg,var(--orange),#ff8a50)', stars: 5, quote: 'La experiencia es rápida y muy cómoda para pedir en Quibdó. Ya no salgo a buscar nada, todo llega a mi casa en minutos.' },
  { i: 'KC', name: 'Kevin Cuesta',     role: 'Negocio aliado',    color: 'linear-gradient(135deg,var(--lime),#89a800)',   stars: 5, quote: 'FASTY nos ayudó a aumentar los pedidos y mejorar la atención al cliente. La plataforma es muy fácil de usar.', tc: 'var(--dark)' },
  { i: 'AP', name: 'Adriana Palacios', role: 'Cliente FASTY',     color: 'linear-gradient(135deg,#a855f7,#7c3aed)',      stars: 5, quote: 'Increíble app, la uso todos los días. Los repartidores son súper amables y siempre llegan rápido. 100% recomendada.' },
  { i: 'JR', name: 'José Rentería',    role: 'Restaurante aliado',color: 'linear-gradient(135deg,#0ea5e9,#0284c7)',      stars: 5, quote: 'Como restaurante, FASTY nos conectó con cientos de clientes nuevos. La interfaz es hermosa y muy intuitiva.' },
]

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div style={{ background: 'var(--dark2)' }} className="section-pad-bg">
      <div ref={ref} className={vis ? 'reveal visible' : 'reveal'}>
        <p className="section-eyebrow">Lo dicen nuestros usuarios</p>
        <h2 className="section-title">Opiniones <span style={{ color: 'var(--lime)' }}>reales</span></h2>
        <div className="testis-grid">
          {TESTIS.map(t => <TestiCard key={t.name} {...t} />)}
        </div>
      </div>
    </div>
  )
}

function TestiCard({ i, name, role, color, stars, quote, tc }: { i: string; name: string; role: string; color: string; stars: number; quote: string; tc?: string }) {
  const [h, setH] = useState(false)
  return (
    <div style={{ background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius)', padding: '2rem', transition: 'transform 0.25s', transform: h ? 'translateY(-4px)' : 'none' }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <div style={{ color: 'var(--lime)', fontSize: '0.8rem', marginBottom: '0.8rem' }}>{'★'.repeat(stars)}</div>
      <div style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', marginBottom: '1.5rem', paddingTop: '1.2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>{quote}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: color, color: tc ?? 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>{i}</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{name}</div>
          <div style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>{role}</div>
        </div>
      </div>
    </div>
  )
}