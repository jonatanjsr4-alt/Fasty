'use client'

import { useEffect, useState } from 'react'

export default function CursorGlow() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener('mousemove', move)

    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30"
    >

      <div
        className="absolute w-[300px] h-[300px] rounded-full bg-orange-500/10 blur-3xl transition-all duration-200"
        style={{
          left: position.x - 150,
          top: position.y - 150,
        }}
      />

    </div>
  )
}