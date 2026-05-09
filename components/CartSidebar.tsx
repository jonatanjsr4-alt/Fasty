'use client'

import { useCart } from '@/components/CartContext'
import {
  X,
  ShoppingBag,
  Trash2,
} from 'lucide-react'

type Props = {
  open: boolean
  onClose: () => void
}

export default function CartSidebar({
  open,
  onClose,
}: Props) {
  const {
    cart,
    removeFromCart,
  } = useCart()

  const total = cart.reduce(
    (acc, item) => acc + Number(item.price),
    0
  )

  return (
    <>

      {open && (

        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998]"
          onClick={onClose}
        />

      )}

      <div
        className={`fixed top-0 right-0 h-full w-[420px] max-w-full bg-[#111111] border-l border-white/10 z-[999] transition-all duration-500 flex flex-col
        ${
          open
            ? 'translate-x-0'
            : 'translate-x-full'
        }`}
      >

        <div className="p-6 border-b border-white/10 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <ShoppingBag className="text-orange-500" />

            <h2 className="text-white text-2xl font-bold">

              Tu carrito

            </h2>

          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"
          >

            <X className="text-white" />

          </button>

        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {cart.length === 0 && (

            <div className="text-zinc-400 text-center mt-20">

              No hay productos en el carrito.

            </div>

          )}

          {cart.map((item) => (

            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-3xl p-4 flex gap-4"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 rounded-2xl object-cover"
              />

              <div className="flex-1">

                <h3 className="text-white font-bold text-lg">

                  {item.name}

                </h3>

                <p className="text-orange-500 font-bold mt-2">

                  ${item.price}

                </p>

              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500 transition-all flex items-center justify-center"
              >

                <Trash2
                  size={18}
                  className="text-white"
                />

              </button>

            </div>

          ))}

        </div>

        <div className="p-6 border-t border-white/10">

          <div className="flex items-center justify-between mb-6">

            <span className="text-zinc-400">

              Total

            </span>

            <span className="text-3xl font-black text-orange-500">

              ${total}

            </span>

          </div>

          <button className="w-full h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 transition-all text-white font-bold text-lg">

            Finalizar pedido

          </button>

        </div>

      </div>

    </>
  )
}