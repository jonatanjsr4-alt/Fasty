'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminOrders() {

  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.log(error)
      return
    }

    setOrders(data || [])
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-black mb-10">
        Pedidos
      </h1>

      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order.id}
            className="bg-white/5 border border-white/10 rounded-3xl p-6"
          >

            <h2 className="text-3xl font-bold">
              {order.customer_name}
            </h2>

            <p className="mt-2">
              {order.customer_phone}
            </p>

            <p>
              {order.customer_address}
            </p>

            <div className="mt-6">

              <h3 className="text-2xl font-bold mb-4">
                Productos
              </h3>

              <pre className="bg-black/40 p-4 rounded-2xl overflow-auto text-sm">
                {JSON.stringify(order.products, null, 2)}
              </pre>

            </div>

            <div className="mt-6 text-3xl font-black text-orange-500">
              Total: ${order.total}
            </div>

          </div>

        ))}

      </div>

    </div>
  )
}