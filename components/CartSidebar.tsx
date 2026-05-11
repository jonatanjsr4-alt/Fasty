'use client'

import { useState } from 'react'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '@/components/CartContext'
import CheckoutModal from '@/components/CheckoutModal'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: Props) {
  const { cart, total, itemCount, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[900] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <aside className="fixed right-0 top-0 bottom-0 z-[901] w-full max-w-md bg-[#0f0f11] border-l border-white/10 flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div>
            <h2 className="text-xl font-black text-white">Mi carrito</h2>
            <p className="text-zinc-500 text-sm mt-0.5">
              {itemCount} producto{itemCount !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
              >
                Vaciar
              </button>
            )}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-5">
                <ShoppingBag size={32} className="text-zinc-600" />
              </div>
              <p className="text-zinc-500 text-lg font-medium">Tu carrito está vacío</p>
              <p className="text-zinc-700 text-sm mt-2">
                Agrega productos para continuar
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <ShoppingBag size={18} className="text-zinc-600" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">{item.name}</p>
                  <p className="text-orange-500 font-bold text-sm mt-0.5">
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 transition-all"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-8 text-center text-white font-bold text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-8 h-8 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 flex items-center justify-center text-orange-400 transition-all"
                  >
                    <Plus size={12} />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-8 h-8 rounded-xl bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 transition-all ml-1"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer con total y botón */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Total</span>
              <span className="text-2xl font-black text-orange-500">
                ${total.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg transition-all shadow-xl shadow-orange-500/20"
            >
              Confirmar pedido 🚀
            </button>
          </div>
        )}
      </aside>

      {showCheckout && (
<CheckoutModal
  onClose={() => setShowCheckout(false)}
  restaurantId={cart[0]?.restaurant_id}
/>
      )}
    </>
  )
}