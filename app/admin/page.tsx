'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {

  const [orders, setOrders] = useState<any[]>([])

  async function getOrders() {

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

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-black mb-10">
        Pedidos
      </h1>

      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order.id}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
          >

            <h2 className="text-2xl font-bold">
              {order.customer_name}
            </h2>

            <p className="text-zinc-400 mt-2">
              {order.customer_phone}
            </p>

            <p className="text-zinc-400">
              {order.customer_address}
            </p>

            <div className="mt-5">

              <p className="font-bold mb-2">
                Productos:
              </p>

              <pre className="text-sm bg-black p-4 rounded-2xl overflow-auto">
                {JSON.stringify(JSON.parse(order.products), null, 2)}
              </pre>

            </div>

            <div className="mt-5 text-orange-500 font-black text-2xl">
              ${order.total}
            </div>

          </div>

        ))}

      </div>

    </div>
  )
}