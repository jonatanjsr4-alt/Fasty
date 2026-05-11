'use client'

import { useState } from 'react'
import {
  X,
  Loader2,
  CheckCircle,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react'

import { supabase } from '@/lib/supabase'
import { useCart } from '@/components/CartContext'
import Link from 'next/link'

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
  '573134157991'

type Props = {
  onClose: () => void
  restaurantId?: string
}

export default function CheckoutModal({
  onClose,
  restaurantId,
}: Props) {

  const {
    cart,
    total,
    clearCart,
  } = useCart()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')

  const [loading, setLoading] = useState(false)

  const [orderId, setOrderId] =
    useState<string | null>(null)

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

      restaurant_id:
  restaurantId ||
  cart[0]?.restaurant_id ||
  null,

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
              background:
                'rgba(74,222,128,0.15)',
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
              fontSize: '2rem',
              fontWeight: 800,
              marginBottom: '1rem',
            }}
          >

            ¡Pedido enviado!

          </h2>

          <p
            style={{
              color: '#888',
              marginBottom: '2rem',
            }}
          >

            Tu pedido fue registrado correctamente.

          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >

            <Link
              href={`/tracking/${orderId}`}
              style={{
                height: 52,
                borderRadius: 14,
                background: '#FF5001',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                textDecoration: 'none',
                fontWeight: 700,
              }}
            >

              <ExternalLink size={18} />

              Seguir pedido

            </Link>

            <button
              onClick={onClose}
              style={{
                height: 52,
                borderRadius: 14,
                background:
                  'rgba(255,255,255,0.05)',
                border:
                  '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                cursor: 'pointer',
              }}
            >

              Cerrar

            </button>

          </div>

        </div>

      </div>

    )

  }

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
          maxWidth: 540,
          background: '#101010',
          border:
            '1px solid rgba(255,255,255,0.1)',
          borderRadius: 32,
          padding: '2rem',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
        }}
      >

        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            width: 38,
            height: 38,
            borderRadius: 12,
            background:
              'rgba(255,255,255,0.05)',
            border:
              '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#888',
          }}
        >

          <X size={16} />

        </button>

        <div style={{ marginBottom: '1.5rem' }}>

          <p
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#FF5001',
              marginBottom: '0.5rem',
            }}
          >

            Finalizar pedido

          </p>

          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 800,
            }}
          >

            Último paso 🚀

          </h2>

        </div>

        {error && (

          <div
            style={{
              background:
                'rgba(239,68,68,0.08)',
              border:
                '1px solid rgba(239,68,68,0.2)',
              borderRadius: 12,
              padding: '12px 16px',
              marginBottom: '1rem',
              color: '#f87171',
              fontSize: '0.82rem',
              wordBreak: 'break-word',
            }}
          >

            {error}

          </div>

        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
          }}
        >

          <input
            type="text"
            placeholder="Nombre completo *"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="tel"
            placeholder="WhatsApp *"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            style={inputStyle}
          />

          <textarea
            placeholder="Dirección *"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            rows={2}
            style={textareaStyle}
          />

          <textarea
            placeholder="Notas (opcional)"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            rows={2}
            style={textareaStyle}
          />

          <button
            onClick={sendOrder}
            disabled={loading}
            style={{
              height: 54,
              borderRadius: 14,
              background: '#FF5001',
              border: 'none',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >

            {loading ? (

              <>

                <Loader2
                  size={18}
                  style={{
                    animation:
                      'spin 1s linear infinite',
                  }}
                />

                Enviando...

              </>

            ) : (

              '🚀 Confirmar pedido'

            )}

          </button>

        </div>

        <style>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>

      </div>

    </div>

  )

}

const inputStyle = {
  height: 50,
  borderRadius: 12,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  padding: '0 16px',
  color: '#fff',
  fontSize: '0.88rem',
  outline: 'none',
  width: '100%',
}

const textareaStyle = {
  borderRadius: 12,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  padding: '12px 16px',
  color: '#fff',
  fontSize: '0.88rem',
  outline: 'none',
  resize: 'none' as const,
  width: '100%',
}