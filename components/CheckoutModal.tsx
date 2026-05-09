'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { X } from 'lucide-react'

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
}

export default function CheckoutModal({
  cart,
  total,
  onClose,
}: Props) {

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  async function sendOrder() {

    if (!name || !phone || !address) {
      alert('Completa todos los campos')
      return
    }

    setLoading(true)

    const orderData = {
      customer_name: name,
      customer_phone: phone,
      customer_address: address,
      products: cart,
      total,
    }

    console.log(orderData)

    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()

    console.log(data)
    console.log(error)

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    const productsText = cart
      .map(
        (item) =>
          `• ${item.name} - $${item.price}`
      )
      .join('%0A')

    const message = `
🚀 *NUEVO PEDIDO FASTY*

👤 Cliente:
${name}

📞 WhatsApp:
${phone}

📍 Dirección:
${address}

🛒 Productos:
${productsText}

💰 Total:
$${total}
`

    const whatsappUrl =
      `https://wa.me/573001112233?text=${message}`

    window.open(whatsappUrl, '_blank')

    alert('Intentando guardar pedido')

    setLoading(false)

    onClose()
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-5">

      <div className="w-full max-w-xl rounded-[32px] bg-[#111111] border border-white/10 p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white"
        >
          <X size={28} />
        </button>

        <h2 className="text-5xl font-black text-white tracking-[-3px]">

          Finalizar pedido

        </h2>

        <div className="space-y-4 mt-8">

          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-16 rounded-2xl bg-white/5 border border-white/10 px-5 text-white outline-none"
          />

          <input
            type="text"
            placeholder="WhatsApp"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-16 rounded-2xl bg-white/5 border border-white/10 px-5 text-white outline-none"
          />

          <textarea
            placeholder="Dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full h-40 rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white outline-none resize-none"
          />

          <button
            onClick={sendOrder}
            disabled={loading}
            className="w-full h-16 rounded-2xl bg-orange-500 hover:bg-orange-600 transition-all text-white font-bold text-lg"
          >

            {loading ? 'Enviando...' : 'Enviar pedido'}

          </button>

        </div>

      </div>

    </div>
  )
}