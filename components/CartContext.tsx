'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  restaurant_id?: string
}

type CartContextType = {
  cart: CartItem[]
  total: number
  itemCount: number

  addToCart: (
    item: Omit<CartItem, 'quantity'>
  ) => void

  removeFromCart: (
    id: string
  ) => void

  increaseQty: (
    id: string
  ) => void

  decreaseQty: (
    id: string
  ) => void

  clearCart: () => void
}

const CartContext =
  createContext<CartContextType>({
    cart: [],
    total: 0,
    itemCount: 0,

    addToCart: () => {},

    removeFromCart: () => {},

    increaseQty: () => {},

    decreaseQty: () => {},

    clearCart: () => {},
  })

export function CartProvider({
  children,
}: {
  children: ReactNode
}) {

  const [cart, setCart] =
    useState<CartItem[]>([])

  // ====================================
  // RESTAURAR CARRITO
  // ====================================

  useEffect(() => {

    const savedCart =
      localStorage.getItem(
        'fasty-cart'
      )

    if (savedCart) {

      try {

        setCart(
          JSON.parse(savedCart)
        )

      } catch {

        localStorage.removeItem(
          'fasty-cart'
        )

      }

    }

  }, [])

  // ====================================
  // GUARDAR CARRITO
  // ====================================

  useEffect(() => {

    localStorage.setItem(
      'fasty-cart',
      JSON.stringify(cart)
    )

  }, [cart])

  // ====================================
  // TOTAL
  // ====================================

  const total = cart.reduce(
    (acc, item) =>
      acc +
      item.price *
        item.quantity,
    0
  )

  // ====================================
  // ITEMS
  // ====================================

  const itemCount = cart.reduce(
    (acc, item) =>
      acc + item.quantity,
    0
  )

  // ====================================
  // AGREGAR
  // ====================================

  function addToCart(
    item: Omit<
      CartItem,
      'quantity'
    >
  ) {

    setCart((prev) => {

      const existing =
        prev.find(
          (i) =>
            i.id === item.id
        )

      if (existing) {

        return prev.map((i) =>

          i.id === item.id
            ? {
                ...i,
                quantity:
                  i.quantity + 1,
              }
            : i

        )

      }

      return [
        ...prev,
        {
          ...item,
          quantity: 1,
        },
      ]

    })

  }

  // ====================================
  // ELIMINAR
  // ====================================

  function removeFromCart(
    id: string
  ) {

    setCart((prev) =>

      prev.filter(
        (item) =>
          item.id !== id
      )

    )

  }

  // ====================================
  // AUMENTAR
  // ====================================

  function increaseQty(
    id: string
  ) {

    setCart((prev) =>

      prev.map((item) =>

        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item

      )

    )

  }

  // ====================================
  // DISMINUIR
  // ====================================

  function decreaseQty(
    id: string
  ) {

    setCart((prev) =>

      prev
        .map((item) =>

          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item

        )
        .filter(
          (item) =>
            item.quantity > 0
        )

    )

  }

  // ====================================
  // LIMPIAR
  // ====================================

  function clearCart() {

    setCart([])

    localStorage.removeItem(
      'fasty-cart'
    )

  }

  return (

    <CartContext.Provider
      value={{
        cart,
        total,
        itemCount,

        addToCart,

        removeFromCart,

        increaseQty,

        decreaseQty,

        clearCart,
      }}
    >

      {children}

    </CartContext.Provider>

  )

}

export function useCart() {

  return useContext(
    CartContext
  )

}