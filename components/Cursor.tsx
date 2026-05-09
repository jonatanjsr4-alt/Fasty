'use client'

import {
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion'

import {
  useEffect,
} from 'react'

export default function Cursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springX = useSpring(mouseX, {
    stiffness: 500,
    damping: 28,
  })

  const springY = useSpring(mouseY, {
    stiffness: 500,
    damping: 28,
  })

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 10)
      mouseY.set(e.clientY - 10)
    }

    window.addEventListener('mousemove', moveCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="hidden md:block fixed top-0 left-0 w-5 h-5 rounded-full bg-orange-500 z-[9999] pointer-events-none mix-blend-difference"
      style={{
        x: springX,
        y: springY,
      }}
    />
  )
}