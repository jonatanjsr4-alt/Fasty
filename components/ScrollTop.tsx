'use client'

import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ScrollTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {show && (
        <button
          onClick={scrollTop}
          className="fixed bottom-8 right-8 z-50 bg-orange-500 hover:bg-orange-600 transition-all p-4 rounded-full shadow-2xl shadow-orange-500/30"
        >

          <ChevronUp className="text-white w-7 h-7" />

        </button>
      )}
    </>
  )
}