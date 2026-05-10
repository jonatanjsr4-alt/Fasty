'use client'

import { X, ShoppingBag, Trash2 } from 'lucide-react'

type CartItem = {
  id: string
  name: string
  price: number
  image: string
}

type Props = {
  cart: CartItem[]
  total: number
  onClose: () => void
  onCheckout: () => void
  removeFromCart: (id: string) => void
}

export default function CartSidebar({
  cart,
  total,
  onClose,
  onCheckout,
  removeFromCart,
}: Props) {

  return (

    <div
      className="
        fixed
        inset-0
        z-[9999]
        bg-black/60
        backdrop-blur-sm
        flex
        justify-end
      "
    >

      <div
        className="
          w-full
          max-w-[480px]
          h-screen
          bg-[#0f0f0f]
          border-l
          border-white/10
          p-7
          flex
          flex-col
          animate-[bounceIn_.4s_ease]
        "
      >

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-4xl font-black">

              Tu carrito

            </h2>

            <p className="text-zinc-400 mt-2">

              {cart.length} productos agregados

            </p>

          </div>

          <button
            onClick={onClose}
            className="
              w-12
              h-12
              rounded-2xl
              glass
              flex
              items-center
              justify-center
            "
          >

            <X />

          </button>

        </div>

        <div
          className="
            flex-1
            overflow-y-auto
            mt-8
            space-y-5
            pr-2
          "
        >

          {cart.length === 0 && (

            <div
              className="
                h-full
                flex
                flex-col
                items-center
                justify-center
                text-center
              "
            >

              <div
                className="
                  w-24
                  h-24
                  rounded-full
                  glass
                  flex
                  items-center
                  justify-center
                  mb-6
                "
              >

                <ShoppingBag size={42} />

              </div>

              <h3 className="text-3xl font-black">

                Carrito vacío

              </h3>

              <p className="text-zinc-500 mt-3 max-w-xs">

                Agrega productos para comenzar tu pedido.

              </p>

            </div>

          )}

          {cart.map((item, index) => (

            <div
              key={`${item.id}-${index}`}
              className="
                glass
                rounded-[28px]
                p-4
                flex
                gap-4
                items-center
                card-hover
              "
            >

              <img
                src={item.image}
                alt={item.name}
                className="
                  w-24
                  h-24
                  rounded-2xl
                  object-cover
                "
              />

              <div className="flex-1">

                <h3 className="text-2xl font-bold">

                  {item.name}

                </h3>

                <p className="text-orange-500 font-black text-xl mt-2">

                  ${item.price.toLocaleString()}

                </p>

              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-red-500/10
                  border
                  border-red-500/20
                  flex
                  items-center
                  justify-center
                  text-red-500
                "
              >

                <Trash2 size={18} />

              </button>

            </div>

          ))}

        </div>

        <div
          className="
            border-t
            border-white/10
            pt-6
            mt-6
          "
        >

          <div className="flex items-center justify-between">

            <span className="text-zinc-400 text-lg">

              Total

            </span>

            <span className="text-5xl font-black text-orange-500">

              ${total.toLocaleString()}

            </span>

          </div>

          <button
            onClick={onCheckout}
            disabled={cart.length === 0}
            className="
              w-full
              h-16
              rounded-2xl
              orange-gradient
              glow-orange
              font-bold
              text-lg
              mt-6
              disabled:opacity-50
            "
          >

            Finalizar pedido

          </button>

        </div>

      </div>

    </div>

  )
}