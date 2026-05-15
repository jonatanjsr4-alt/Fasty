'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

export type CartItem = {
  id: string; name: string; price: number; image: string; quantity: number; restaurant_id?: string
}
type CartContextType = {
  cart: CartItem[]; total: number; itemCount: number
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  increaseQty: (id: string) => void
  decreaseQty: (id: string) => void
  clearCart: () => void
}
const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try { const s = localStorage.getItem('fasty_cart'); if (s) setCart(JSON.parse(s)) } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try { localStorage.setItem('fasty_cart', JSON.stringify(cart)) } catch {}
  }, [cart, hydrated])

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0)
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0)

  function addToCart(item: Omit<CartItem, 'quantity'>) {
    setCart(prev => {
      const ex = prev.find(i => i.id === item.id)
      if (ex) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { ...item, quantity: 1 }]
    })
  }
  function removeFromCart(id: string) { setCart(p => p.filter(i => i.id !== id)) }
  function increaseQty(id: string) { setCart(p => p.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i)) }
  function decreaseQty(id: string) { setCart(p => p.map(i => i.id === id ? { ...i, quantity: Math.max(0, i.quantity - 1) } : i).filter(i => i.quantity > 0)) }
  function clearCart() { setCart([]); try { localStorage.removeItem('fasty_cart') } catch {} }

  return <CartContext.Provider value={{ cart, total, itemCount, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart }}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
