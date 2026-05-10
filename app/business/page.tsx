'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/app/hooks/useAuth'
import Link from 'next/link'
import {
  Store, Plus, Package, ShoppingBag,
  ArrowRight, BarChart3, LogOut,
  Loader2, Trash2, Edit2, Check, X,
} from 'lucide-react'

type Restaurant = {
  id: string
  name: string
  description: string
  address: string
  category: string
  is_active: boolean
}

type Product = {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  is_available: boolean
}

const CATEGORIES = [
  'Restaurantes', 'Supermercados', 'Farmacias',
  'Licores', 'Heladerías', 'Cafeterías',
  'Moda', 'Belleza', 'Tecnología', 'Hogar',
]

export default function BusinessPage() {
  const { user, loading: authLoading, logout } = useAuth()

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [activeTab, setActiveTab] = useState<'negocio' | 'productos'>('negocio')

  // Form restaurante
  const [rName, setRName] = useState('')
  const [rDesc, setRDesc] = useState('')
  const [rAddress, setRAddress] = useState('')
  const [rCategory, setRCategory] = useState('Restaurantes')
  const [savingRest, setSavingRest] = useState(false)
  const [restSaved, setRestSaved] = useState(false)

  // Form producto
  const [pName, setPName] = useState('')
  const [pDesc, setPDesc] = useState('')
  const [pPrice, setPPrice] = useState('')
  const [pCategory, setPCategory] = useState('')
  const [pImage, setPImage] = useState('')
  const [savingProduct, setSavingProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<string | null>(null)

  useEffect(() => {
    if (user) fetchData()
  }, [user])

  async function fetchData() {
    setLoadingData(true)

    const { data: rest } = await supabase
      .from('restaurants')
      .select('*')
      .eq('owner_id', user!.id)
      .single()

    if (rest) {
      setRestaurant(rest)
      setRName(rest.name)
      setRDesc(rest.description || '')
      setRAddress(rest.address || '')
      setRCategory(rest.category || 'Restaurantes')

      // Cargar productos
      const { data: prods } = await supabase
        .from('products')
        .select('*')
        .eq('restaurant_id', rest.id)
        .order('created_at', { ascending: false })

      setProducts(prods || [])
    }

    setLoadingData(false)
  }

  async function saveRestaurant() {
    if (!rName.trim()) return

    setSavingRest(true)

    if (restaurant) {
      // Actualizar
      const { error } = await supabase
        .from('restaurants')
        .update({ name: rName, description: rDesc, address: rAddress, category: rCategory })
        .eq('id', restaurant.id)

      if (!error) {
        setRestaurant({ ...restaurant, name: rName, description: rDesc, address: rAddress, category: rCategory })
        setRestSaved(true)
        setTimeout(() => setRestSaved(false), 2000)
      }
    } else {
      // Crear
      const { data, error } = await supabase
        .from('restaurants')
        .insert({
          owner_id: user!.id,
          name: rName,
          description: rDesc,
          address: rAddress,
          category: rCategory,
        })
        .select()
        .single()

      if (!error && data) {
        setRestaurant(data)
        setRestSaved(true)
        setTimeout(() => setRestSaved(false), 2000)
      }
    }

    setSavingRest(false)
  }

  async function addProduct() {
    if (!restaurant || !pName.trim() || !pPrice) return

    setSavingProduct(true)

    const { data, error } = await supabase
      .from('products')
      .insert({
        restaurant_id: restaurant.id,
        name: pName,
        description: pDesc,
        price: parseFloat(pPrice),
        category: pCategory,
        image_url: pImage,
      })
      .select()
      .single()

    if (!error && data) {
      setProducts((prev) => [data, ...prev])
      setPName(''); setPDesc(''); setPPrice(''); setPCategory(''); setPImage('')
    }

    setSavingProduct(false)
  }

  async function deleteProduct(id: string) {
    await supabase.from('products').delete().eq('id', id)
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  async function toggleProduct(id: string, current: boolean) {
    await supabase.from('products').update({ is_available: !current }).eq('id', id)
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_available: !current } : p))
    )
  }

  if (authLoading || loadingData) {
    return (
      <div className="min-h-screen bg-[#070707] flex items-center justify-center">
        <Loader2 size={32} className="text-orange-500 animate-spin" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#070707] text-white flex overflow-hidden">

      {/* Sidebar */}
      <aside className="hidden lg:flex w-[280px] border-r border-white/5 bg-black/40 backdrop-blur-2xl p-6 flex-col justify-between">
        <div>
          <Link href="/" className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-white text-lg font-bold">F</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-[-1px]">FASTY</h1>
              <p className="text-zinc-500 text-xs mt-1">Business Platform</p>
            </div>
          </Link>

          {restaurant && (
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-[24px] p-5 shadow-2xl shadow-orange-500/20 mb-8">
              <p className="text-white/70 text-xs uppercase tracking-widest">Estado</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <h2 className="text-lg font-bold">{restaurant.name}</h2>
              </div>
              <div className="flex items-center gap-2 mt-3 text-sm text-white/80">
                <BarChart3 size={14} />
                {products.length} producto{products.length !== 1 ? 's' : ''}
              </div>
            </div>
          )}

          <nav className="space-y-2">
            {[
              { label: 'Mi negocio', icon: Store, tab: 'negocio' as const },
              { label: 'Productos', icon: Package, tab: 'productos' as const },
            ].map(({ label, icon: Icon, tab }) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full h-13 py-3.5 rounded-2xl px-5 flex items-center justify-between transition-all ${
                  activeTab === tab
                    ? 'bg-white text-black font-semibold'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} />
                  {label}
                </div>
                <ArrowRight size={14} />
              </button>
            ))}

            <Link
              href="/dashboard"
              className="w-full h-13 py-3.5 rounded-2xl px-5 flex items-center justify-between bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5 transition-all"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={16} />
                Pedidos
              </div>
              <ArrowRight size={14} />
            </Link>
          </nav>
        </div>

        <button
          onClick={logout}
          className="w-full h-12 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all flex items-center justify-center gap-3 font-medium text-sm"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </aside>

      {/* Contenido */}
      <section className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-5 md:px-10 py-10">

          <div className="mb-10">
            <p className="text-orange-500 uppercase tracking-[4px] text-sm font-medium">
              PANEL DE NEGOCIOS
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-[-3px] mt-3 leading-none">
              {activeTab === 'negocio' ? 'Mi restaurante' : 'Mis productos'}
            </h1>
          </div>

          {/* ── TAB: NEGOCIO ── */}
          {activeTab === 'negocio' && (
            <div className="grid xl:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/5 rounded-[32px] p-7">
                <h2 className="text-xl font-bold mb-2">
                  {restaurant ? 'Editar negocio' : 'Crear negocio'}
                </h2>
                <p className="text-zinc-400 text-sm mb-7">
                  {restaurant
                    ? 'Actualiza la información visible a tus clientes.'
                    : 'Configura tu negocio y empieza a recibir pedidos.'}
                </p>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nombre del negocio *"
                    value={rName}
                    onChange={(e) => setRName(e.target.value)}
                    className="w-full h-13 py-3.5 rounded-2xl bg-black/40 border border-white/5 px-5 outline-none focus:border-orange-500 transition-all"
                  />

                  <textarea
                    placeholder="Descripción"
                    value={rDesc}
                    onChange={(e) => setRDesc(e.target.value)}
                    className="w-full h-28 rounded-2xl bg-black/40 border border-white/5 px-5 py-4 outline-none resize-none focus:border-orange-500 transition-all"
                  />

                  <input
                    type="text"
                    placeholder="Dirección"
                    value={rAddress}
                    onChange={(e) => setRAddress(e.target.value)}
                    className="w-full h-13 py-3.5 rounded-2xl bg-black/40 border border-white/5 px-5 outline-none focus:border-orange-500 transition-all"
                  />

                  <select
                    value={rCategory}
                    onChange={(e) => setRCategory(e.target.value)}
                    className="w-full h-13 py-3.5 rounded-2xl bg-black/40 border border-white/5 px-5 outline-none focus:border-orange-500 transition-all text-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-[#111]">{cat}</option>
                    ))}
                  </select>

                  <button
                    onClick={saveRestaurant}
                    disabled={savingRest || !rName.trim()}
                    className="h-13 py-3.5 px-8 rounded-2xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 font-medium flex items-center gap-3 transition-all shadow-xl shadow-orange-500/20"
                  >
                    {savingRest ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : restSaved ? (
                      <><Check size={16} /> ¡Guardado!</>
                    ) : (
                      <><Plus size={16} /> {restaurant ? 'Guardar cambios' : 'Crear negocio'}</>
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-[32px] p-7 shadow-2xl shadow-orange-500/20">
                  <p className="text-white/70 text-sm">Productos activos</p>
                  <h2 className="text-6xl font-bold tracking-[-4px] mt-3">
                    {products.filter((p) => p.is_available).length}
                  </h2>
                  <p className="text-white/80 mt-3 text-sm">
                    de {products.length} en total
                  </p>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-[32px] p-7">
                  <p className="text-zinc-500 text-sm">Estado</p>
                  <div className="flex items-center gap-3 mt-4">
                    <span className={`w-3 h-3 rounded-full ${restaurant ? 'bg-green-400 animate-pulse' : 'bg-zinc-600'}`} />
                    <p className="font-medium">
                      {restaurant ? 'Negocio activo' : 'Sin negocio creado'}
                    </p>
                  </div>
                  <p className="text-zinc-500 text-sm mt-4 leading-relaxed">
                    {restaurant
                      ? 'Tu restaurante es visible y listo para pedidos.'
                      : 'Crea tu negocio para aparecer en la plataforma.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB: PRODUCTOS ── */}
          {activeTab === 'productos' && (
            <div className="grid xl:grid-cols-[1fr_1.2fr] gap-6">

              {/* Formulario nuevo producto */}
              <div className="bg-white/5 border border-white/5 rounded-[32px] p-7 h-fit">
                <h2 className="text-xl font-bold mb-6">Agregar producto</h2>

                {!restaurant && (
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 mb-6 text-orange-400 text-sm">
                    Primero crea tu negocio en la pestaña "Mi negocio".
                  </div>
                )}

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nombre del producto *"
                    value={pName}
                    onChange={(e) => setPName(e.target.value)}
                    disabled={!restaurant}
                    className="w-full h-13 py-3.5 rounded-2xl bg-black/40 border border-white/5 px-5 outline-none focus:border-orange-500 transition-all disabled:opacity-40"
                  />
                  <textarea
                    placeholder="Descripción"
                    value={pDesc}
                    onChange={(e) => setPDesc(e.target.value)}
                    disabled={!restaurant}
                    className="w-full h-24 rounded-2xl bg-black/40 border border-white/5 px-5 py-4 outline-none resize-none focus:border-orange-500 transition-all disabled:opacity-40"
                  />
                  <input
                    type="number"
                    placeholder="Precio (COP) *"
                    value={pPrice}
                    onChange={(e) => setPPrice(e.target.value)}
                    disabled={!restaurant}
                    className="w-full h-13 py-3.5 rounded-2xl bg-black/40 border border-white/5 px-5 outline-none focus:border-orange-500 transition-all disabled:opacity-40"
                  />
                  <input
                    type="text"
                    placeholder="Categoría"
                    value={pCategory}
                    onChange={(e) => setPCategory(e.target.value)}
                    disabled={!restaurant}
                    className="w-full h-13 py-3.5 rounded-2xl bg-black/40 border border-white/5 px-5 outline-none focus:border-orange-500 transition-all disabled:opacity-40"
                  />
                  <input
                    type="url"
                    placeholder="URL de imagen (opcional)"
                    value={pImage}
                    onChange={(e) => setPImage(e.target.value)}
                    disabled={!restaurant}
                    className="w-full h-13 py-3.5 rounded-2xl bg-black/40 border border-white/5 px-5 outline-none focus:border-orange-500 transition-all disabled:opacity-40"
                  />

                  <button
                    onClick={addProduct}
                    disabled={savingProduct || !restaurant || !pName.trim() || !pPrice}
                    className="w-full h-13 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 disabled:opacity-40 font-medium flex items-center justify-center gap-3 transition-all"
                  >
                    {savingProduct ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <><Plus size={16} /> Agregar producto</>
                    )}
                  </button>
                </div>
              </div>

              {/* Lista de productos */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold">
                    {products.length} producto{products.length !== 1 ? 's' : ''}
                  </h2>
                </div>

                {products.length === 0 ? (
                  <div className="bg-white/5 border border-white/5 rounded-[32px] p-10 text-center">
                    <Package size={40} className="text-zinc-700 mx-auto mb-4" />
                    <p className="text-zinc-500">
                      {restaurant
                        ? 'Aún no tienes productos. ¡Agrega el primero!'
                        : 'Crea tu negocio primero.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white/5 border border-white/5 rounded-2xl p-5 flex items-center gap-4"
                      >
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                            <Package size={20} className="text-zinc-600" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{product.name}</p>
                          <p className="text-orange-500 font-bold text-sm mt-0.5">
                            ${product.price.toLocaleString()}
                          </p>
                          {product.category && (
                            <p className="text-zinc-600 text-xs mt-0.5">{product.category}</p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {/* Toggle disponible */}
                          <button
                            onClick={() => toggleProduct(product.id, product.is_available)}
                            title={product.is_available ? 'Desactivar' : 'Activar'}
                            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                              product.is_available
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-zinc-800 text-zinc-500'
                            }`}
                          >
                            {product.is_available ? <Check size={14} /> : <X size={14} />}
                          </button>

                          {/* Eliminar */}
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="w-9 h-9 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </section>
    </main>
  )
}