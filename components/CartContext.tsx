'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react'

type CartItem = {
  id: string
  name: string
  price: number
  image: string
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
})

export function CartProvider({
  children,
}: {
  children: ReactNode
}) {
  const [cart, setCart] = useState<CartItem[]>([])

  function addToCart(item: CartItem) {
    setCart((prev) => [...prev, item])
  }

  function removeFromCart(id: string) {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    )
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}