'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const CATS = [
  { emoji: '🍺', name: 'Licores' },
  { emoji: '🍽️', name: 'Restaurantes' },
  { emoji: '🍦', name: 'Heladerías' },
  { emoji: '📚', name: 'Educación' },
  { emoji: '☕', name: 'Cafeterías' },
  { emoji: '🛒', name: 'Supermercados' },
  { emoji: '👗', name: 'Moda' },
  { emoji: '💄', name: 'Belleza' },
  { emoji: '💊', name: 'Salud' },
  { emoji: '🏠', name: 'Hogar' },
  { emoji: '📱', name: 'Tecnología' },
  { emoji: '🔧', name: 'Mantenimiento' },
  { emoji: '⚽', name: 'Deporte' },
  { emoji: '🎁', name: 'Regalos' },
]

export default function Categories() {

  const router = useRouter()

  const ref = useRef<HTMLElement>(null)

  const [vis, setVis] = useState(false)

  useEffect(() => {

    const io = new IntersectionObserver(

      ([e]) => {

        if (e.isIntersecting) setVis(true)

      },

      { threshold: 0.1 }

    )

    if (ref.current) io.observe(ref.current)

    return () => io.disconnect()

  }, [])

  return (

    <section
      ref={ref}
      id="categorias"
      className={`section-pad${vis ? ' reveal visible' : ' reveal'}`}
    >

      <p className="section-eyebrow">

        Todo en un solo lugar

      </p>

      <h2 className="section-title">

        Explora{' '}

        <span style={{ color: 'var(--lime)' }}>

          FASTY

        </span>

      </h2>

      <div className="cats-grid">

        {CATS.map((c) => (

          <CatCard
            key={c.name}
            {...c}

            onClick={() => {

              router.push(

                `/stores?category=${encodeURIComponent(c.name)}`

              )

            }}

          />

        ))}

      </div>

    </section>

  )

}

function CatCard({
  emoji,
  name,
  onClick,
}: {
  emoji: string
  name: string
  onClick: () => void
}) {

  const [h, setH] = useState(false)

  return (

    <div

      onClick={onClick}

      style={{
        background: 'var(--dark3)',
        border: `1px solid ${
          h
            ? 'rgba(255,80,1,0.3)'
            : 'rgba(255,255,255,0.06)'
        }`,
        borderRadius: 'var(--radius)',
        padding: '1.2rem 0.8rem',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.25s,border-color 0.25s',
        position: 'relative',
        overflow: 'hidden',
        transform: h ? 'translateY(-6px)' : 'none',
      }}

      onMouseEnter={() => setH(true)}

      onMouseLeave={() => setH(false)}

    >

      {h && (

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 0%,rgba(255,80,1,0.15) 0%,transparent 70%)',
            pointerEvents: 'none',
          }}
        />

      )}

      <span
        style={{
          fontSize: '1.8rem',
          marginBottom: '0.6rem',
          display: 'block',
        }}
      >

        {emoji}

      </span>

      <div
        style={{
          fontSize: '0.75rem',
          fontWeight: 500,
          color: h ? 'var(--white)' : 'var(--muted)',
          transition: 'color 0.2s',
        }}
      >

        {name}

      </div>

    </div>

  )

}