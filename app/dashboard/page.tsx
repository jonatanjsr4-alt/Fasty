'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/app/hooks/useAuth'
import {
  Store,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Bell,
  Search,
  LogOut,
  Loader2,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
} from 'lucide-react'

type Order = {
  id: string
  customer_name: string
  customer_address: string
  total: number
  status: string
  created_at: string
  products: { name: string; price: number; quantity: number }[]
}

type Restaurant = {
  id: string
  name: string
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  'Pendiente':   { label: 'Pendiente',   color: 'text-yellow-400', icon: Clock },
  'En camino':   { label: 'En camino',   color: 'text-blue-400',   icon: Truck },
  'Entregado':   { label: 'Entregado',   color: 'text-green-400',  icon: CheckCircle },
  'Cancelado':   { label: 'Cancelado',   color: 'text-red-400',    icon: XCircle },
}

export default function DashboardPage() {
  const { user, loading: authLoading, logout } = useAuth()

  const [orders, setOrders] = useState<Order[]>([])
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [loadingData, setLoadingData] = useState(true)
  const [activeTab, setActiveTab] = useState('Resumen')
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null)

  useEffect(() => {
    if (user) fetchData()
  }, [user])

  async function fetchData() {
    setLoadingData(true)

    // Obtener restaurante del usuario
    const { data: rest } = await supabase
      .from('restaurants')
      .select('id, name')
      .eq('owner_id', user!.id)
      .single()

    setRestaurant(rest)

    if (rest) {
      // Obtener pedidos del restaurante
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .eq('restaurant_id', rest.id)
        .order('created_at', { ascending: false })
        .limit(20)

      setOrders(ordersData || [])
    }

    setLoadingData(false)
  }

  async function updateOrderStatus(orderId: string, newStatus: string) {
    setUpdatingOrder(orderId)
    await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId)

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    )
    setUpdatingOrder(null)
  }

  // Calcular métricas
  const totalRevenue = orders
    .filter((o) => o.status === 'Entregado')
    .reduce((acc, o) => acc + o.total, 0)

  const pendingOrders = orders.filter((o) => o.status === 'Pendiente').length
  const deliveredOrders = orders.filter((o) => o.status === 'Entregado').length
  const todayOrders = orders.filter((o) => {
    const today = new Date().toDateString()
    return new Date(o.created_at).toDateString() === today
  }).length

  const navItems = ['Resumen', 'Pedidos', 'Configuración']

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0f0f11] flex items-center justify-center">
        <Loader2 size={32} className="text-orange-500 animate-spin" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#0f0f11] text-white flex">

      {/* Sidebar */}
      <aside className="w-[280px] border-r border-white/5 bg-black/40 backdrop-blur-2xl p-8 hidden lg:flex flex-col">
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <span className="text-white text-xl font-black">F</span>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-[-1px]">FASTY</h1>
              <p className="text-zinc-500 text-sm">Dashboard</p>
            </div>
          </div>

          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`w-full h-13 py-3 rounded-2xl px-5 flex items-center justify-between transition-all font-medium ${
                  activeTab === item
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'text-zinc-400 hover:bg-white/5'
                }`}
              >
                {item}
                {activeTab === item && <ChevronRight size={16} />}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto space-y-4">
          {restaurant && (
            <div className="bg-white/5 border border-white/5 rounded-[20px] p-4">
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Negocio activo</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-sm font-medium">{restaurant.name}</p>
              </div>
            </div>
          )}

          <button
            onClick={logout}
            className="w-full h-12 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all flex items-center justify-center gap-3 font-medium text-sm"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <section className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-6 md:p-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">
            <div>
              <p className="text-orange-500 uppercase tracking-[4px] text-xs font-semibold">
                PANEL ADMINISTRATIVO
              </p>
              <h1 className="text-4xl md:text-5xl font-black tracking-[-3px] mt-3">
                {restaurant ? restaurant.name : 'Bienvenido'}
              </h1>
              <p className="text-zinc-500 mt-2 text-sm">
                {user?.email}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white/5 border border-white/5 rounded-2xl h-12 px-5 flex items-center gap-3">
                <Search size={18} className="text-zinc-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="bg-transparent outline-none text-sm text-white placeholder:text-zinc-500 w-40"
                />
              </div>
              <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center relative">
                <Bell size={18} />
                {pendingOrders > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
                    {pendingOrders}
                  </span>
                )}
              </button>
            </div>
          </div>

          {loadingData ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="text-orange-500 animate-spin" />
            </div>
          ) : (
            <>
              {/* Métricas */}
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                {[
                  {
                    title: `$${totalRevenue.toLocaleString()}`,
                    subtitle: 'Ingresos totales',
                    icon: DollarSign,
                    color: 'from-orange-500 to-orange-600',
                  },
                  {
                    title: String(orders.length),
                    subtitle: 'Total pedidos',
                    icon: ShoppingBag,
                    color: 'from-blue-500 to-blue-600',
                  },
                  {
                    title: String(todayOrders),
                    subtitle: 'Pedidos hoy',
                    icon: Store,
                    color: 'from-green-500 to-green-600',
                  },
                  {
                    title: String(pendingOrders),
                    subtitle: 'Pendientes',
                    icon: TrendingUp,
                    color: 'from-yellow-500 to-yellow-600',
                  },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.subtitle}
                      className="bg-white/5 border border-white/5 rounded-[28px] p-6"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5`}>
                        <Icon size={20} className="text-white" />
                      </div>
                      <h2 className="text-3xl font-black tracking-[-2px]">{item.title}</h2>
                      <p className="text-zinc-500 mt-2 text-sm">{item.subtitle}</p>
                    </div>
                  )
                })}
              </div>

              {/* Pedidos */}
              <div className="bg-white/5 border border-white/5 rounded-[32px] p-7">
                <div className="flex items-center justify-between mb-7">
                  <div>
                    <h2 className="text-xl font-black">Pedidos recientes</h2>
                    <p className="text-zinc-500 text-sm mt-1">
                      {orders.length} pedido{orders.length !== 1 ? 's' : ''} en total
                    </p>
                  </div>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag size={40} className="text-zinc-700 mx-auto mb-4" />
                    <p className="text-zinc-500">
                      {restaurant
                        ? 'Aún no tienes pedidos. ¡Pronto llegarán!'
                        : 'Primero crea tu restaurante en la sección de Negocios.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((order) => {
                      const statusCfg = STATUS_CONFIG[order.status] || STATUS_CONFIG['Pendiente']
                      const StatusIcon = statusCfg.icon
                      const nextStatuses = Object.keys(STATUS_CONFIG).filter(
                        (s) => s !== order.status
                      )

                      return (
                        <div
                          key={order.id}
                          className="bg-black/30 border border-white/5 rounded-2xl p-5"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-3">
                                <h3 className="font-semibold">{order.customer_name}</h3>
                                <span className={`flex items-center gap-1.5 text-xs font-medium ${statusCfg.color}`}>
                                  <StatusIcon size={13} />
                                  {statusCfg.label}
                                </span>
                              </div>
                              <p className="text-sm text-zinc-500 mt-1">{order.customer_address}</p>
                              <p className="text-xs text-zinc-600 mt-1">
                                {order.products?.length ?? 0} producto(s) •{' '}
                                {new Date(order.created_at).toLocaleString('es-CO', {
                                  dateStyle: 'short',
                                  timeStyle: 'short',
                                })}
                              </p>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-orange-500 font-bold text-lg">
                                ${order.total.toLocaleString()}
                              </span>

                              <select
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                disabled={updatingOrder === order.id}
                                className="bg-white/5 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none cursor-pointer"
                              >
                                {Object.keys(STATUS_CONFIG).map((s) => (
                                  <option key={s} value={s} className="bg-[#111]">
                                    {s}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Estadísticas rápidas */}
              {orders.length > 0 && (
                <div className="mt-5 bg-white/5 border border-white/5 rounded-[32px] p-7">
                  <h2 className="text-xl font-black mb-6">Rendimiento</h2>
                  <div className="space-y-5">
                    {[
                      {
                        label: 'Tasa de entrega',
                        value: orders.length
                          ? Math.round((deliveredOrders / orders.length) * 100)
                          : 0,
                      },
                      {
                        label: 'Pedidos completados',
                        value: orders.length
                          ? Math.round(
                              (orders.filter((o) => o.status !== 'Cancelado').length /
                                orders.length) *
                                100
                            )
                          : 0,
                      },
                      {
                        label: 'Satisfacción estimada',
                        value: 92,
                      },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-zinc-400">{stat.label}</span>
                          <span className="text-sm font-bold text-white">{stat.value}%</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-white/5">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-700"
                            style={{ width: `${stat.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  )
}