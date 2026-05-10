'use client'

import { useEffect, useState } from 'react'

import { supabase } from '@/lib/supabase'

type Product = {
  id: string
  name: string
  price: number
  image: string
}

type Order = {
  id: string

  customer_name: string

  customer_phone: string

  customer_address: string

  products: Product[]

  total: number

  status: string

  created_at: string
}

export default function AdminOrders() {

  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {

    fetchOrders()

    const channel = supabase

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
      supabase.removeChannel(channel)
    }

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

  async function updateStatus(
    id: string,
    status: string
  ) {

    await supabase

      .from('orders')

      .update({ status })

      .eq('id', id)

    fetchOrders()
  }

  return (

    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 lg:p-10">

      <div className="max-w-7xl mx-auto">

        <div className="mb-14">

          <span className="text-orange-500 font-bold uppercase tracking-[4px]">

            FASTY ADMIN

          </span>

          <h1 className="text-7xl font-black mt-4 leading-none">

            Pedidos en tiempo real

          </h1>

          <p className="text-zinc-400 text-xl mt-5">

            Administra pedidos y estados en vivo.

          </p>

        </div>

        <div className="space-y-8">

          {orders.map((order) => (

            <div
              key={order.id}
              className="
                glass
                rounded-[36px]
                p-7
                border
                border-white/10
              "
            >

              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                <div>

                  <h2 className="text-5xl font-black">

                    {order.customer_name}

                  </h2>

                  <div className="space-y-2 mt-5 text-zinc-300">

                    <p>

                      📞 {order.customer_phone}

                    </p>

                    <p>

                      📍 {order.customer_address}

                    </p>

                  </div>

                </div>

                <select
                  value={order.status || 'Pendiente'}
                  onChange={(e) =>
                    updateStatus(
                      order.id,
                      e.target.value
                    )
                  }
                  className="
                    h-14
                    px-5
                    rounded-2xl
                    bg-black
                    border
                    border-white/10
                    outline-none
                    text-white
                    font-bold
                  "
                >

                  <option value="Pendiente">

                    Pendiente

                  </option>

                  <option value="Preparando">

                    Preparando

                  </option>

                  <option value="En camino">

                    En camino

                  </option>

                  <option value="Entregado">

                    Entregado

                  </option>

                </select>

              </div>

              <div className="mt-10">

                <h3 className="text-3xl font-black mb-6">

                  Productos

                </h3>

                <div className="space-y-5">

                  {order.products?.map(
                    (product, index) => (

                      <div
                        key={index}
                        className="
                          bg-black/40
                          rounded-[28px]
                          p-4
                          flex
                          items-center
                          gap-5
                        "
                      >

                        <img
                          src={product.image}
                          alt={product.name}
                          className="
                            w-24
                            h-24
                            rounded-2xl
                            object-cover
                          "
                        />

                        <div>

                          <h4 className="text-3xl font-black">

                            {product.name}

                          </h4>

                          <p className="text-orange-500 text-2xl font-black mt-2">

                            $
                            {product.price?.toLocaleString()}

                          </p>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

              <div
                className="
                  mt-10
                  pt-7
                  border-t
                  border-white/10
                  flex
                  flex-col
                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                  gap-5
                "
              >

                <div className="text-zinc-500">

                  Pedido creado:
                  {' '}
                  {new Date(
                    order.created_at
                  ).toLocaleString()}

                </div>

                <div className="text-6xl font-black text-orange-500">

                  $
                  {order.total?.toLocaleString()}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )
}