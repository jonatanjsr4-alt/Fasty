'use client'

import CartSidebar from '@/components/CartSidebar'
import { useCart } from '@/components/CartContext'
import Link from 'next/link'

import {
  Menu,
  ShoppingBag,
  X,
} from 'lucide-react'

import {
  motion,
  AnimatePresence,
} from 'framer-motion'

import {
  useEffect,
  useState,
} from 'react'

export default function Navbar() {
  const { cart } = useCart()

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <motion.header
        animate={{
          y: 0,
        }}
        className="sticky top-0 z-50 px-4 md:px-6 pt-4"
      >

        <div className="max-w-7xl mx-auto">

          <motion.div
            animate={{
              height: scrolled ? 72 : 82,
              borderRadius: scrolled ? 24 : 30,
            }}
            transition={{
              duration: 0.35,
            }}
            className={`glass border border-white/10 flex items-center justify-between px-6 shadow-[0_10px_40px_rgba(0,0,0,.08)]
            ${
              scrolled
                ? 'bg-white/70 backdrop-blur-2xl'
                : 'bg-white/40 backdrop-blur-xl'
            }`}
          >

            <Link
              href="/"
              className="flex items-center gap-4 group"
            >

              <div className="relative">

                <div className="absolute inset-0 bg-orange-500 blur-2xl opacity-30 rounded-2xl group-hover:opacity-50 transition-all" />

                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">

                  <span className="text-white text-lg font-black">

                    F

                  </span>

                </div>

              </div>

              <div>

                <h1 className="text-xl md:text-2xl font-black tracking-[-1px] text-[#111111]">

                  FASTY

                </h1>

                <p className="text-xs text-[#777] mt-0.5 font-medium">

                  Delivery Platform

                </p>

              </div>

            </Link>

            <nav className="hidden lg:flex items-center gap-10">

              {[
                'Inicio',
                'Restaurantes',
                'Categorías',
                'Contacto',
              ].map((item) => (

                <a
                  key={item}
                  href="#"
                  className="text-[#666] hover:text-[#111111] transition-all font-medium text-sm relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-orange-500 hover:after:w-full after:transition-all"
                >

                  {item}

                </a>

              ))}

            </nav>

            <div className="flex items-center gap-3">

              <button
                onClick={() => setCartOpen(true)}
                className="relative w-12 h-12 rounded-2xl bg-white border border-[#ececec] flex items-center justify-center hover:border-orange-500 transition-all"
              >

                <ShoppingBag
                  size={20}
                  className="text-[#111111]"
                />

                {cart.length > 0 && (

                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">

                    {cart.length}

                  </div>

                )}

              </button>

              <Link
                href="/auth"
                className="hidden md:flex bg-[#111111] hover:bg-black text-white px-6 h-11 rounded-2xl font-semibold items-center transition-all"
              >

                Ingresar

              </Link>

              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden w-11 h-11 rounded-2xl bg-white border border-[#ececec] flex items-center justify-center"
              >

                <Menu
                  size={20}
                  className="text-[#111111]"
                />

              </button>

            </div>

          </motion.div>

        </div>

      </motion.header>

      <AnimatePresence>

        {menuOpen && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-2xl"
          >

            <motion.div
              initial={{
                y: -40,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -40,
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
              }}
              className="h-full flex flex-col px-8 py-8"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">

                    <span className="text-white text-lg font-black">

                      F

                    </span>

                  </div>

                  <div>

                    <h1 className="text-2xl font-black text-white">

                      FASTY

                    </h1>

                    <p className="text-sm text-zinc-400">

                      Delivery Platform

                    </p>

                  </div>

                </div>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center"
                >

                  <X
                    size={22}
                    className="text-white"
                  />

                </button>

              </div>

              <div className="flex flex-col gap-6 mt-20">

                {[
                  'Inicio',
                  'Restaurantes',
                  'Categorías',
                  'Contacto',
                ].map((item) => (

                  <a
                    key={item}
                    href="#"
                    onClick={() => setMenuOpen(false)}
                    className="text-4xl font-black text-white tracking-[-2px]"
                  >

                    {item}

                  </a>

                ))}

              </div>

              <div className="mt-auto">

                <Link
                  href="/auth"
                  className="bg-orange-500 h-14 rounded-2xl text-white font-semibold flex items-center justify-center"
                >

                  Ingresar

                </Link>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  )
}