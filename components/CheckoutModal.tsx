'use client'

import { useState } from 'react'
import { X, Loader2, CheckCircle, ShoppingBag, ExternalLink } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/components/CartContext'
import Link from 'next/link'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573134157991'

type Props = {
  onClose: () => void
  restaurantId?: string
}

export default function CheckoutModal({ onClose, restaurantId }: Props) {

  const { cart, total, clearCart } = useCart()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')

  const [loading, setLoading] = useState(false)

  const [orderId, setOrderId] = useState<string | null>(null)

  const [error, setError] = useState('')

  async function sendOrder() {

    if (
      !name.trim() ||
      !phone.trim() ||
      !address.trim()
    ) {

      setError(
        'Por favor completa todos los campos obligatorios'
      )

      return

    }

    setLoading(true)

    setError('')

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const orderData = {

      user_id: user?.id ?? null,

      restaurant_id: restaurantId ?? null,

      customer_name: name.trim(),

      customer_phone: phone.trim(),

      customer_address: address.trim(),

      products: cart.map((item) => ({

        id: item.id,

        name: item.name,

        price: item.price,

        quantity: item.quantity,

      })),

      total,

      status: 'pending',

      notes: notes.trim() || null,

    }

    const {
      data,
      error: dbError,
    } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single()

if (dbError || !data) {

  console.log(dbError)

  setError(JSON.stringify(dbError))

  setLoading(false)

  return

}

    const productsText = cart
      .map(
        (item) =>

          `• ${item.name} x${item.quantity} — $${(
            item.price * item.quantity
          ).toLocaleString('es-CO')}`

      )

      .join('%0A')

    const trackingUrl =
      `${window.location.origin}/tracking/${data.id}`

    const message = [

      '🚀 *NUEVO PEDIDO FASTY*',

      `📋 ID: ${data.id
        .split('-')[0]
        .toUpperCase()}`,

      '',

      `👤 *Cliente:* ${name}`,

      `📞 *WhatsApp:* ${phone}`,

      `📍 *Dirección:* ${address}`,

      notes
        ? `📝 *Notas:* ${notes}`
        : '',

      '',

      `🛒 *Productos:*`,

      productsText,

      '',

      `💰 *TOTAL: $${total.toLocaleString('es-CO')}*`,

      '',

      `🔗 Tracking: ${trackingUrl}`,

    ]

      .filter(Boolean)

      .join('%0A')

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      '_blank'
    )

    clearCart()

    setOrderId(data.id)

    setLoading(false)

  }

  if (orderId) {

    return (

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}
      >

        <div
          style={{
            width: '100%',
            maxWidth: 440,
            background: '#101010',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 32,
            padding: '2.5rem',
            textAlign: 'center',
          }}
        >

          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'rgba(74,222,128,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}
          >

            <CheckCircle
              size={40}
              color="#4ade80"
            />

          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.8rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '0.8rem',
            }}
          >

            ¡Pedido enviado!

          </h2>

          <p
            style={{
              color: 'var(--muted)',
              lineHeight: 1.6,
              marginBottom: '0.5rem',
            }}
          >

            Tu pedido fue registrado y enviado por WhatsApp.

          </p>

          <p
            style={{
              color: 'var(--muted)',
              fontSize: '0.8rem',
              marginBottom: '2rem',
            }}
          >

            Código:{' '}

            <span
              style={{
                color: 'var(--white)',
                fontWeight: 600,
              }}
            >

              #{orderId
                .split('-')[0]
                .toUpperCase()}

            </span>

          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
            }}
          >

            <Link
              href={`/tracking/${orderId}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                height: 52,
                borderRadius: 14,
                background: 'var(--orange)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
              }}
            >

              <ExternalLink size={16} />

              Seguir mi pedido

            </Link>

            <button
              onClick={onClose}
              style={{
                height: 52,
                borderRadius: 14,
                background: 'rgba(255,255,255,0.05)',
                border:
                  '1px solid rgba(255,255,255,0.1)',
                color: 'var(--muted)',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >

              Cerrar

            </button>

          </div>

        </div>

      </div>

    )

  }

  return null

}