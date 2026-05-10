'use client'
import { useEffect, useRef, useState } from 'react'

const STEPS = [
  { num: '01', icon: '🔍', title: 'Explora negocios', desc: 'Encuentra restaurantes, supermercados y tiendas locales de Quibdó fácilmente.' },
  { num: '02', icon: '🛒', title: 'Haz tu pedido', desc: 'Ordena rápidamente desde una experiencia moderna, bonita y super simple.' },
  { num: '03', icon: '🚀', title: 'Recibe en minutos', desc: 'FASTY conecta entregas rápidas y seguras directamente a tu puerta.' },
]

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div style={{ background: 'var(--dark2)' }} className="section-pad-bg" id="como">
      <div ref={ref} className={vis ? 'reveal visible' : 'reveal'}>
        <p className="section-eyebrow">Sencillo como 1, 2, 3</p>
        <h2 className="section-title">
          Delivery simple,<br /><span style={{ color: 'var(--lime)' }}>rápido y moderno</span>
        </h2>
        <div className="steps-grid">
          {STEPS.map((s, i) => <Step key={s.num} {...s} isLast={i === STEPS.length - 1} />)}
        </div>
      </div>
    </div>
  )
}

function Step({ num, icon, title, desc, isLast }: { num: string; icon: string; title: string; desc: string; isLast: boolean }) {
  const [h, setH] = useState(false)
  return (
    <div style={{ background: h ? 'var(--dark3)' : 'var(--dark2)', padding: '2.5rem', position: 'relative', transition: 'background 0.3s' }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', fontWeight: 800, color: 'rgba(255,255,255,0.04)', lineHeight: 1, marginBottom: '1rem' }}>{num}</div>
      <div style={{ width: 52, height: 52, background: 'rgba(255,80,1,0.1)', border: '1px solid rgba(255,80,1,0.2)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '1.2rem', transition: 'transform 0.3s', transform: h ? 'rotate(-5deg) scale(1.1)' : 'none' }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.6rem' }}>{title}</div>
      <div style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{desc}</div>
      {!isLast && (
        <div className="step-arrow" style={{ position: 'absolute', top: '50%', right: -1, width: 24, height: 24, background: 'var(--orange)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateY(-50%)', fontSize: '0.7rem', zIndex: 2 }}>→</div>
      )}
    </div>
  )
}