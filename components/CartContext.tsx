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
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
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

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}