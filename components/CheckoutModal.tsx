'use client'

import { useState } from 'react'
import { X, Loader2, CheckCircle, ShoppingBag } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/components/CartContext'

// ⚠️ Cambia este número por el de WhatsApp del negocio
const WHATSAPP_NUMBER = '573001112233'

type Props = {
  onClose: () => void
  restaurantId?: string
}

export default function CheckoutModal({ onClose, restaurantId }: Props) {
  const { cart, total, clearCart } = useCart()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function sendOrder() {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError('Por favor completa todos los campos')
      return
    }

    setLoading(true)
    setError('')

    // Obtener usuario actual (puede ser null si no está logueado)
    const { data: { user } } = await supabase.auth.getUser()

    const orderData = {
      user_id: user?.id ?? null,
      restaurant_id: restaurantId ?? null,
      customer_name: name,
      customer_phone: phone,
      customer_address: address,
      products: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
      status: 'Pendiente',
    }

    const { error: dbError } = await supabase.from('orders').insert([orderData])

    if (dbError) {
      setError('Error al guardar el pedido. Intenta de nuevo.')
      setLoading(false)
      return
    }

    // Construir mensaje de WhatsApp
    const productsText = cart
      .map((item) => `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString()}`)
      .join('%0A')

    const message = [
      '🚀 *NUEVO PEDIDO FASTY*',
      '',
      `👤 *Cliente:* ${name}`,
      `📞 *WhatsApp:* ${phone}`,
      `📍 *Dirección:* ${address}`,
      '',
      `🛒 *Productos:*`,
      productsText,
      '',
      `💰 *Total: $${total.toLocaleString()}*`,
    ].join('%0A')

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')

    setSent(true)
    clearCart()
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-5">
        <div className="w-full max-w-md rounded-[36px] bg-[#101010] border border-white/10 p-10 text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-400" />
          </div>
          <h2 className="text-3xl font-black text-white mb-3">¡Pedido enviado!</h2>
          <p className="text-zinc-400 leading-relaxed">
            Tu pedido fue registrado y enviado por WhatsApp. Pronto te contactaremos.
          </p>
          <button
            onClick={onClose}
            className="mt-8 w-full h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all"
          >
            Listo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-5">
      <div className="w-full max-w-2xl rounded-[36px] bg-[#101010] border border-white/10 p-8 relative max-h-[90vh] overflow-y-auto">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-11 h-11 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 transition-all"
        >
          <X size={18} />
        </button>

        <div className="mb-8">
          <span className="text-orange-500 font-bold uppercase tracking-[4px] text-xs">
            Finalizar pedido
          </span>
          <h2 className="text-4xl font-black text-white mt-4 leading-none">
            Último paso 🚀
          </h2>
          <p className="text-zinc-400 mt-4">
            Completa tus datos para confirmar el pedido.
          </p>
        </div>

        {/* Resumen del carrito */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag size={16} className="text-orange-500" />
            <p className="text-sm font-semibold text-zinc-300">
              {cart.length} producto{cart.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">
                  {item.name} <span className="text-zinc-600">x{item.quantity}</span>
                </span>
                <span className="text-white font-medium">
                  ${(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-5 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nombre completo *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 px-5 text-white outline-none focus:border-orange-500 transition-all"
          />

          <input
            type="tel"
            placeholder="WhatsApp (ej: 3001234567) *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 px-5 text-white outline-none focus:border-orange-500 transition-all"
          />

          <textarea
            placeholder="Dirección de entrega *"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full h-28 rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white outline-none resize-none focus:border-orange-500 transition-all"
          />

          <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex items-center justify-between">
            <span className="text-zinc-400">Total a pagar</span>
            <span className="text-3xl font-black text-orange-500">
              ${total.toLocaleString()}
            </span>
          </div>

          <button
            onClick={sendOrder}
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold text-lg transition-all flex items-center justify-center gap-3"
          >
            {loading ? (
              <><Loader2 size={20} className="animate-spin" /> Enviando...</>
            ) : (
              '🚀 Confirmar pedido'
            )}
          </button>
        </div>

      </div>
    </div>
  )
}