'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0, fx = 0, fy = 0
    let animId: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (cursorRef.current)
        cursorRef.current.style.transform = `translate(${mx - 6}px,${my - 6}px)`
    }

    const tick = () => {
      fx += (mx - fx) * 0.12; fy += (my - fy) * 0.12
      if (followerRef.current)
        followerRef.current.style.transform = `translate(${fx - 18}px,${fy - 18}px)`
      animId = requestAnimationFrame(tick)
    }

    const grow = () => {
      if (!followerRef.current) return
      followerRef.current.style.width = '60px'
      followerRef.current.style.height = '60px'
      followerRef.current.style.borderColor = 'rgba(255,80,1,0.7)'
    }
    const shrink = () => {
      if (!followerRef.current) return
      followerRef.current.style.width = '36px'
      followerRef.current.style.height = '36px'
      followerRef.current.style.borderColor = 'rgba(255,80,1,0.4)'
    }

    document.addEventListener('mousemove', onMove)
    animId = requestAnimationFrame(tick)
    document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(animId) }
  }, [])

  return (
    <>
      <div ref={cursorRef} style={{ width:12,height:12,background:'var(--orange)',borderRadius:'50%',position:'fixed',top:0,left:0,pointerEvents:'none',zIndex:9999,transition:'transform 0.05s' }} />
      <div ref={followerRef} style={{ width:36,height:36,border:'1.5px solid rgba(255,80,1,0.4)',borderRadius:'50%',position:'fixed',top:0,left:0,pointerEvents:'none',zIndex:9998,transition:'width 0.2s,height 0.2s,border-color 0.2s' }} />
    </>
  )
}