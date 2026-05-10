'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function TrackingPage() {

  const params = useParams()

  const orderId = params.id as string

  const [order, setOrder] = useState<any>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    if (orderId) {

      fetchOrder()

      subscribeRealtime()

    }

  }, [orderId])

  async function fetchOrder() {

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (error) {

      console.log(error)
      setLoading(false)
      return

    }

    setOrder(data)

    setLoading(false)

  }

  function subscribeRealtime() {

    supabase
      .channel('tracking-orders')

      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`,
        },

        (payload) => {

          setOrder(payload.new)

        }
      )

      .subscribe()

  }

  if (loading) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <h1 className="text-4xl font-black">

          Cargando pedido...

        </h1>

      </main>

    )

  }

  if (!order) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <h1 className="text-4xl font-black">

          Pedido no encontrado

        </h1>

      </main>

    )

  }

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-6xl font-black tracking-[-4px]">

          Tracking pedido

        </h1>

        <div className="mt-10 rounded-[32px] border border-white/10 bg-white/5 p-8">

          <div className="space-y-4">

            <div>

              <p className="text-white/50 text-sm">

                Cliente

              </p>

              <h2 className="text-3xl font-bold">

                {order.customer_name}

              </h2>

            </div>

            <div>

              <p className="text-white/50 text-sm">

                Dirección

              </p>

              <h2 className="text-xl">

                {order.customer_address}

              </h2>

            </div>

            <div>

              <p className="text-white/50 text-sm">

                Estado

              </p>

              <div className="mt-2 inline-flex px-5 py-3 rounded-full bg-orange-500 text-white font-bold text-lg">

                {order.status}

              </div>

            </div>

            <div>

              <p className="text-white/50 text-sm">

                Total

              </p>

              <h2 className="text-5xl font-black text-orange-500">

                ${order.total}

              </h2>

            </div>

          </div>

        </div>

      </div>

    </main>

  )

}