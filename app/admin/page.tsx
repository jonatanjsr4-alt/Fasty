'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {

  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    getOrders()
  }, [])

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

  return (
    <div className="min-h-screen bg-black p-10 text-white">

      <h1 className="text-5xl font-black mb-10">
        Pedidos
      </h1>

      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order.id}
            className="bg-zinc-900 border border-white/10 rounded-3xl p-6"
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

            <div className="mt-6">

              <h3 className="text-xl font-bold mb-4">
                Productos
              </h3>

              <div className="space-y-4">

                {order.products?.map((product: any) => (

                  <div
                    key={product.id}
                    className="flex items-center gap-4 bg-black/40 rounded-2xl p-4"
                  >

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />

                    <div>

                      <h4 className="font-bold text-lg">
                        {product.name}
                      </h4>

                      <p className="text-orange-400 font-bold">
                        ${product.price}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

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