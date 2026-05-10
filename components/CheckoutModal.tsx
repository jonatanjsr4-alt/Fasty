'use client'

import { useState } from 'react'

import { X } from 'lucide-react'

import { supabase } from '@/lib/supabase'

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

    const totalPrice = cart.reduce((acc, item) => {

      const price =
        typeof item.price === 'string'
          ? parseFloat(item.price)
          : item.price || 0

      return acc + price

    }, 0)

    const orderData = {

      customer_name: name,

      customer_phone: phone,

      customer_address: address,

      products: cart,

      total: totalPrice,

      status: 'Pendiente',
    }

    const { error } = await supabase
      .from('orders')
      .insert([orderData])

    if (error) {

      console.log(error)

      alert('Error enviando pedido')

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
$${totalPrice.toLocaleString()}

`

    const whatsappUrl =
      `https://wa.me/573001112233?text=${message}`

    window.open(whatsappUrl, '_blank')

    alert('Pedido enviado correctamente')

    setLoading(false)

    onClose()
  }

  return (

    <div
      className="
        fixed
        inset-0
        z-[9999]
        bg-black/70
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-5
      "
    >

      <div
        className="
          w-full
          max-w-2xl
          rounded-[36px]
          bg-[#101010]
          border
          border-white/10
          p-8
          relative
          animate-[bounceIn_.35s_ease]
        "
      >

        <button
          onClick={onClose}
          className="
            absolute
            top-5
            right-5
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

        <div className="mb-10">

          <span className="text-orange-500 font-bold uppercase tracking-[4px]">

            Finalizar pedido

          </span>

          <h2 className="text-6xl font-black mt-4 leading-none">

            Último paso 🚀

          </h2>

          <p className="text-zinc-400 mt-5 text-lg">

            Completa tus datos para enviar el pedido.

          </p>

        </div>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              w-full
              h-16
              rounded-2xl
              bg-white/5
              border
              border-white/10
              px-5
              text-white
              outline-none
            "
          />

          <input
            type="text"
            placeholder="WhatsApp"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="
              w-full
              h-16
              rounded-2xl
              bg-white/5
              border
              border-white/10
              px-5
              text-white
              outline-none
            "
          />

          <textarea
            placeholder="Dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="
              w-full
              h-40
              rounded-2xl
              bg-white/5
              border
              border-white/10
              px-5
              py-4
              text-white
              outline-none
              resize-none
            "
          />

          <div
            className="
              glass
              rounded-3xl
              p-6
              flex
              items-center
              justify-between
            "
          >

            <span className="text-zinc-400 text-xl">

              Total a pagar

            </span>

            <span className="text-5xl font-black text-orange-500">

              ${total.toLocaleString()}

            </span>

          </div>

          <button
            onClick={sendOrder}
            disabled={loading}
            className="
              w-full
              h-16
              rounded-2xl
              orange-gradient
              glow-orange
              text-white
              font-black
              text-lg
              mt-4
              disabled:opacity-50
            "
          >

            {loading
              ? 'Enviando pedido...'
              : 'Enviar pedido'}

          </button>

        </div>

      </div>

    </div>

  )
}