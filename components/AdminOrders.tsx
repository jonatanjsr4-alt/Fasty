'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminOrders() {

  const [orders, setOrders] = useState<any[]>([])

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

  useEffect(() => {

    fetchOrders()

    const subscription = supabase
      .channel('orders-realtime')

      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
        },

        () => {
          fetchOrders()
        }
      )

      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }

  }, [])

  async function updateStatus(
    id: string,
    status: string
  ) {

    await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)

  }

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-black mb-10">
        Pedidos en tiempo real
      </h1>

      <div className="space-y-6">

        {orders.map((order) => {

          const products =
            typeof order.products === 'string'
              ? JSON.parse(order.products)
              : order.products

          return (

            <div
              key={order.id}
              className="bg-white/5 border border-white/10 rounded-3xl p-6"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-3xl font-bold">
                    {order.customer_name}
                  </h2>

                  <p className="mt-2">
                    {order.customer_phone}
                  </p>

                  <p>
                    {order.customer_address}
                  </p>

                </div>

                <select
                  value={order.status || 'Pendiente'}
                  onChange={(e) =>
                    updateStatus(
                      order.id,
                      e.target.value
                    )
                  }
                  className="bg-black border border-white/10 rounded-2xl px-4 py-3"
                >

                  <option>
                    Pendiente
                  </option>

                  <option>
                    Preparando
                  </option>

                  <option>
                    En camino
                  </option>

                  <option>
                    Entregado
                  </option>

                </select>

              </div>

              <div className="mt-6">

                <h3 className="text-2xl font-bold mb-4">
                  Productos
                </h3>

                <div className="space-y-4">

                  {products?.map(
                    (
                      product: any,
                      index: number
                    ) => (

                      <div
                        key={index}
                        className="bg-black/40 rounded-2xl p-4 flex items-center gap-4"
                      >

                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 rounded-2xl object-cover"
                        />

                        <div>

                          <h4 className="text-xl font-bold">
                            {product.name}
                          </h4>

                          <p className="text-orange-500 font-bold">
                            ${product.price}
                          </p>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

              <div className="mt-6 text-3xl font-black text-orange-500">

                Total: $
                {products.reduce(
                  (
                    acc: number,
                    product: any
                  ) => {

                    const price =
                      typeof product.price === 'string'
                        ? parseFloat(product.price)
                        : product.price || 0

                    return acc + price

                  },
                  0
                ).toLocaleString()}

              </div>

            </div>

          )
        })}

      </div>

    </div>
  )
}