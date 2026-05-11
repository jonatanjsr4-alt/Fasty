'use client'

import {
  useEffect,
  useState,
} from 'react'

import {
  supabase,
} from '@/lib/supabase'

const STATUS = [
  'Pendiente',
  'Preparando',
  'En camino',
  'Entregado',
]

export default function BusinessOrdersPage() {

  const [orders, setOrders] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetchOrders()

  }, [])

  async function fetchOrders() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {

      setLoading(false)

      return

    }

    const { data: restaurants } = await supabase
      .from('restaurants')
      .select('id')
      .eq('owner_id', user.id)

    const restaurantIds =
      restaurants?.map((r) => r.id) || []

    if (restaurantIds.length === 0) {

      setLoading(false)

      return

    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .in('restaurant_id', restaurantIds)
      .order('created_at', {
        ascending: false,
      })

    if (error) {

      console.log(error)

      setLoading(false)

      return

    }

    setOrders(data || [])

    setLoading(false)

  }

  async function updateStatus(
    orderId: string,
    status: string
  ) {

    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)

    if (error) {

      console.log(error)

      alert('Error actualizando estado')

      return

    }

    setOrders((prev) =>

      prev.map((order) =>

        order.id === orderId
          ? {
              ...order,
              status,
            }
          : order

      )

    )

  }

  if (loading) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <h1 className="text-5xl font-black">

          Cargando pedidos...

        </h1>

      </main>

    )

  }

  return (

    <main className="min-h-screen bg-black text-white">

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="mb-12">

          <p className="text-orange-500 uppercase tracking-[4px] font-bold">

            PANEL NEGOCIO

          </p>

          <h1 className="text-7xl font-black tracking-[-5px] mt-4">

            Pedidos

          </h1>

        </div>

        {orders.length === 0 ? (

          <div className="text-center py-32">

            <h2 className="text-5xl font-black">

              No hay pedidos

            </h2>

            <p className="text-white/60 mt-4">

              Cuando entren pedidos aparecerán aquí

            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order.id}
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-[32px]
                  p-8
                "
              >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                  <div>

                    <p className="text-white/40 text-sm">

                      Pedido

                    </p>

                    <h2 className="text-4xl font-black mt-2">

                      #{order.id?.slice(0, 8)}

                    </h2>

                    <div className="mt-6 space-y-2 text-white/70">

                      <p>

                        Cliente: {order.customer_name || 'Cliente'}

                      </p>

                      <p>

                        Teléfono: {order.customer_phone || 'No definido'}

                      </p>

                      <p>

                        Dirección: {order.customer_address || 'No definida'}

                      </p>

                      <p>

                        Total: ${order.total || 0}

                      </p>

                    </div>

                  </div>

                  <div className="flex flex-col gap-4">

                    <p className="text-white/40 text-sm">

                      Estado actual

                    </p>

                    <div className="flex flex-wrap gap-3">

                      {STATUS.map((status) => (

                        <button
                          key={status}
                          onClick={() =>
                            updateStatus(
                              order.id,
                              status
                            )
                          }
                          className={`
                            px-5
                            h-12
                            rounded-2xl
                            font-bold
                            transition-all
                            ${
                              order.status === status
                                ? 'bg-orange-500 text-white'
                                : 'bg-white/5 border border-white/10 text-white/60'
                            }
                          `}
                        >

                          {status}

                        </button>

                      ))}

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </main>

  )

}