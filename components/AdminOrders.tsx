'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ShoppingBag, Store, Users, TrendingUp, Clock, Package, Truck, CheckCircle, XCircle, Search, LogOut, Loader2, ToggleLeft, ToggleRight, Trash2, Bike } from 'lucide-react'
import { useRouter } from 'next/navigation'

const S: Record<string, { label: string; color: string; bg: string }> = {
  Pendiente:   { label:'Pendiente',   color:'#facc15', bg:'rgba(250,204,21,0.1)' },
  Preparando:  { label:'Preparando',  color:'#60a5fa', bg:'rgba(96,165,250,0.1)' },
  'En camino': { label:'En camino',   color:'#a78bfa', bg:'rgba(167,139,250,0.1)' },
  Entregado:   { label:'Entregado',   color:'#4ade80', bg:'rgba(74,222,128,0.1)' },
  Cancelado:   { label:'Cancelado',   color:'#f87171', bg:'rgba(248,113,113,0.1)' },
}

type Tab = 'resumen' | 'pedidos' | 'solicitudes' | 'negocios' | 'usuarios' | 'domiciliarios'

export default function AdminOrders() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('resumen')
  const [orders, setOrders] = useState<any[]>([])
  const [restaurants, setRestaurants] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('Todos')
  const [toast, setToast] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  // Cargar menu modal
  const [showLoadMenu, setShowLoadMenu] = useState(false)
  const [menuRestId, setMenuRestId] = useState('')
  const [menuText, setMenuText] = useState('')
  const [loadingMenu, setLoadingMenu] = useState(false)

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  useEffect(() => { fetchAll() }, [])

  async function fetchAll() {
    setLoading(true)
    const [o, r, u] = await Promise.all([
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('restaurants').select('*').order('created_at', { ascending: false }),
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
    ])
    setOrders(o.data || []); setRestaurants(r.data || []); setUsers(u.data || [])
    setLoading(false)
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from('orders').update({ status }).eq('id', id)
    setOrders(p => p.map(o => o.id === id ? { ...o, status } : o))
  }

  async function toggleRestaurant(id: string, cur: boolean) {
    await supabase.from('restaurants').update({ approved: !cur }).eq('id', id)
    setRestaurants(p => p.map(r => r.id === id ? { ...r, approved: !cur } : r))
    showToast(cur ? 'Negocio desactivado' : 'Negocio aprobado ✅')
  }

  async function updateRole(id: string, role: string) {
    await supabase.from('profiles').update({ role }).eq('id', id)
    setUsers(p => p.map(u => u.id === id ? { ...u, role } : u))
    showToast('Rol actualizado ✅')
  }

  async function deleteOrder(id: string) {
    if (!confirm('¿Eliminar?')) return
    await supabase.from('orders').delete().eq('id', id)
    setOrders(p => p.filter(o => o.id !== id))
    showToast('Pedido eliminado')
  }

  async function loadMenu() {
    if (!menuRestId.trim() || !menuText.trim()) return
    setLoadingMenu(true)
    let products: any[] = []
    try {
      const cleaned = menuText.trim().replace(/```json|```/g, '').trim()
      products = JSON.parse(cleaned)
    } catch {
      // Formato texto: Nombre - $Precio - Descripción - Categoría
      products = menuText.split('\n').filter(l => l.trim()).map(line => {
        const parts = line.split('-').map(p => p.trim())
        return { name: parts[0] || '', price: parseInt((parts[1] || '0').replace(/\D/g, '')) || 0, description: parts[2] || '', category: parts[3] || 'General' }
      }).filter(p => p.name)
    }
    if (products.length > 0) {
      const inserts = products.map(p => ({ ...p, restaurant_id: menuRestId, available: true }))
      const { error } = await supabase.from('products').insert(inserts)
      showToast(error ? 'Error al cargar' : `${products.length} productos cargados ✅`)
    }
    setLoadingMenu(false); setShowLoadMenu(false); setMenuRestId(''); setMenuText('')
  }

  const revenue = orders.filter(o => o.status === 'Entregado').reduce((a, o) => a + (o.total || 0), 0)
  const pending = orders.filter(o => o.status === 'Pendiente').length
  const deliverers = users.filter(u => u.role === 'delivery')
  const filteredOrders = orders.filter(o => {
    const ms = o.customer_name?.toLowerCase().includes(search.toLowerCase()) || o.id?.includes(search)
    const mst = filterStatus === 'Todos' || o.status === filterStatus
    return ms && mst
  })
  const solicitudes = restaurants.filter(r => !r.approved)

  const SIDEBAR_ITEMS: { key: Tab; label: string; icon: any; badge?: number }[] = [
    { key: 'resumen', label: 'Director del panel', icon: TrendingUp },
    { key: 'solicitudes', label: 'Solicitudes', icon: Store, badge: solicitudes.length },
    { key: 'pedidos', label: 'Pedidos', icon: ShoppingBag, badge: pending },
    { key: 'negocios', label: 'Negocios', icon: Store },
    { key: 'usuarios', label: 'Usuarios', icon: Users },
    { key: 'domiciliarios', label: 'Domiciliarios', icon: Bike },
  ]

  const inp: React.CSSProperties = { height: 42, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0 12px', color: '#fff', fontSize: '0.85rem', outline: 'none' }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f5f0', display: 'flex', fontFamily: 'system-ui, sans-serif' }}>
      {toast && <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '12px 20px', color: '#4ade80', fontWeight: 600, fontSize: '0.88rem' }}>{toast}</div>}

      {/* Modal cargar menú */}
      {showLoadMenu && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ width: '100%', maxWidth: 600, background: '#fff', borderRadius: 24, padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.3rem', color: '#111' }}>Cargar Menú Completo</h3>
              <button onClick={() => setShowLoadMenu(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#888' }}>✕</button>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#666', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>ID del Negocio</label>
              <input value={menuRestId} onChange={e => setMenuRestId(e.target.value)} placeholder="Ej: abc123def" style={{ width: '100%', height: 48, borderRadius: 12, border: '1.5px solid #e5e0d8', padding: '0 14px', fontSize: '0.9rem', outline: 'none', color: '#111', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#666', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Menú (una línea por producto)</label>
              <textarea value={menuText} onChange={e => setMenuText(e.target.value)} rows={8} placeholder={'Formato TEXTO:\nPizza Margherita - $25000 - Pizza clásica - Pizzas\n\nFormato JSON:\n[{"name":"Pizza","price":25000,"description":"Clásica","category":"Pizzas"}]'}
                style={{ width: '100%', borderRadius: 12, border: '1.5px solid #e5e0d8', padding: '12px 14px', fontSize: '0.85rem', outline: 'none', resize: 'none', color: '#111', boxSizing: 'border-box' }} />
              <p style={{ fontSize: '0.75rem', color: '#999', marginTop: 6 }}>Soporta formato de texto separado por " - " o matriz JSON.</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowLoadMenu(false)} style={{ flex: 1, height: 48, borderRadius: 12, background: '#f5f5f5', border: 'none', cursor: 'pointer', fontWeight: 600, color: '#666' }}>Cancelar</button>
              <button onClick={loadMenu} disabled={loadingMenu} style={{ flex: 1, height: 48, borderRadius: 12, background: 'var(--orange)', border: 'none', cursor: 'pointer', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {loadingMenu ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : null} Cargar Menú
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside style={{ width: 240, background: '#fff', borderRight: '1px solid #ede9e1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #ede9e1', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>F</div>
            <span style={{ fontWeight: 800, fontSize: '1rem', fontFamily: 'var(--font-display)', color: '#111' }}>FASTY</span>
          </div>
          <div style={{ padding: '1rem 0.8rem' }}>
            <p style={{ fontSize: '0.65rem', color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, padding: '0 0.8rem', marginBottom: 6 }}>Gestión</p>
            {SIDEBAR_ITEMS.map(item => (
              <button key={item.key} onClick={() => setTab(item.key)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '0.7rem 0.8rem', borderRadius: 10, border: 'none', cursor: 'pointer', background: tab === item.key ? '#fff5f0' : 'transparent', color: tab === item.key ? 'var(--orange)' : '#555', fontWeight: tab === item.key ? 700 : 400, fontSize: '0.88rem', position: 'relative', textAlign: 'left' }}>
                <item.icon size={16} />
                {item.label}
                {item.badge ? <span style={{ marginLeft: 'auto', background: 'var(--orange)', color: '#fff', borderRadius: 100, padding: '1px 7px', fontSize: '0.68rem', fontWeight: 800 }}>{item.badge}</span> : null}
              </button>
            ))}
          </div>
        </div>
        <button onClick={async () => { await supabase.auth.signOut(); router.push('/auth') }}
          style={{ margin: '1rem', padding: '0.8rem', borderRadius: 12, background: '#f5f0eb', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: '#888', fontSize: '0.85rem', fontWeight: 600 }}>
          <LogOut size={15} /> Cerrar sesión
        </button>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, overflowY: 'auto', minHeight: '100vh' }}>
        {/* Topbar */}
        <div style={{ background: '#fff', borderBottom: '1px solid #ede9e1', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#111', margin: 0 }}>
            {SIDEBAR_ITEMS.find(i => i.key === tab)?.label}
          </h2>
          {tab === 'negocios' && (
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setShowLoadMenu(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, background: '#f5f0eb', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem', color: '#555' }}>
                <Package size={14} /> Cargar Menú
              </button>
            </div>
          )}
        </div>

        <div style={{ padding: '2rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <Loader2 size={32} color="var(--orange)" style={{ animation: 'spin 1s linear infinite' }} />
            </div>
          ) : (
            <>
              {/* RESUMEN */}
              {tab === 'resumen' && (
                <div>
                  <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Administración</p>
                  <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, color: '#111', marginBottom: 4 }}>Panel de control</h1>
                  <p style={{ color: '#888', marginBottom: '2rem' }}>Visión completa de la operación de Fasty.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.2rem', marginBottom: '2rem' }}>
                    {[
                      { label: 'Ingresos totales', value: `$${revenue.toLocaleString('es-CO')}`, icon: TrendingUp, color: '#4ade80' },
                      { label: 'Pedidos', value: orders.length, icon: ShoppingBag, color: 'var(--orange)' },
                      { label: 'Negocios', value: restaurants.length, icon: Store, color: '#60a5fa' },
                      { label: 'Domiciliarios', value: deliverers.length, icon: Bike, color: '#a78bfa' },
                    ].map((s, i) => (
                      <div key={i} style={{ background: '#fff', border: '1px solid #ede9e1', borderRadius: 18, padding: '1.2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <p style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800, color: '#111', fontFamily: 'var(--font-display)' }}>{s.value}</p>
                            <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#888' }}>{s.label}</p>
                          </div>
                          <div style={{ width: 38, height: 38, borderRadius: 10, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <s.icon size={18} color={s.color} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Top negocios */}
                  <div style={{ background: '#fff', border: '1px solid #ede9e1', borderRadius: 18, padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                      <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#111', margin: 0 }}>Los mejores negocios</h3>
                      <span style={{ fontSize: '0.78rem', color: '#888' }}>Por pedidos</span>
                    </div>
                    {restaurants.slice(0, 5).map((r, i) => {
                      const cnt = orders.filter(o => o.restaurant_id === r.id && o.status === 'Entregado').length
                      const max = Math.max(...restaurants.slice(0,5).map(x => orders.filter(o => o.restaurant_id === x.id && o.status === 'Entregado').length), 1)
                      return (
                        <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                          <span style={{ fontSize: '0.75rem', color: '#999', width: 80, textAlign: 'right', flexShrink: 0 }}>{r.name?.substring(0,12)}</span>
                          <div style={{ flex: 1, height: 24, background: '#f5f0eb', borderRadius: 6, overflow: 'hidden' }}>
                            <div style={{ height: '100%', background: 'var(--orange)', width: `${(cnt / max) * 100}%`, borderRadius: 6, transition: 'width 0.5s', display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                              {cnt > 0 && <span style={{ fontSize: '0.68rem', color: '#fff', fontWeight: 700 }}>{cnt}</span>}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* SOLICITUDES */}
              {tab === 'solicitudes' && (
                <div>
                  <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Administración</p>
                  <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: '#111', marginBottom: 4 }}>Solicitudes</h1>
                  <p style={{ color: '#888', marginBottom: '1.5rem' }}>Nuevos negocios esperando aprobación para unirse a Fasty.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {restaurants.map(r => (
                      <div key={r.id} style={{ background: '#fff', border: '1px solid #ede9e1', borderRadius: 16, padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>{r.name?.[0]?.toUpperCase()}</div>
                          <div>
                            <p style={{ margin: 0, fontWeight: 700, color: '#111' }}>{r.name}</p>
                            <p style={{ margin: 0, fontSize: '0.78rem', color: '#888' }}>{r.category} · {new Date(r.created_at).toLocaleDateString('es-CO')}</p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: '0.78rem', padding: '4px 12px', borderRadius: 100, background: r.approved ? 'rgba(74,222,128,0.1)' : 'rgba(250,204,21,0.1)', color: r.approved ? '#4ade80' : '#facc15', fontWeight: 600, border: `1px solid ${r.approved ? 'rgba(74,222,128,0.2)' : 'rgba(250,204,21,0.2)'}` }}>
                            {r.approved ? 'Aprobado' : 'Pendiente'}
                          </span>
                          <button onClick={() => toggleRestaurant(r.id, r.approved)} style={{ padding: '6px 14px', borderRadius: 10, background: r.approved ? '#f5f0eb' : 'var(--orange)', border: 'none', color: r.approved ? '#888' : '#fff', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}>
                            {r.approved ? 'Desactivar' : 'Aprobar'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PEDIDOS */}
              {tab === 'pedidos' && (
                <div>
                  <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Administración</p>
                  <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: '#111', marginBottom: 4 }}>Pedidos</h1>
                  <p style={{ color: '#888', marginBottom: '1.5rem' }}>{orders.length} pedidos. Monitorea el flujo de vida de las órdenes.</p>
                  <div style={{ display: 'flex', gap: 10, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
                      <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                      <input type="text" placeholder="Buscar por ID, cliente..." value={search} onChange={e => setSearch(e.target.value)}
                        style={{ width: '100%', height: 42, borderRadius: 10, border: '1px solid #ede9e1', background: '#fff', paddingLeft: 36, paddingRight: 14, fontSize: '0.85rem', outline: 'none', color: '#111', boxSizing: 'border-box' }} />
                    </div>
                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                      style={{ height: 42, borderRadius: 10, border: '1px solid #ede9e1', background: '#fff', padding: '0 12px', fontSize: '0.85rem', outline: 'none', color: '#111' }}>
                      <option value="Todos">Todos los estados</option>
                      {Object.keys(S).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div style={{ background: '#fff', border: '1px solid #ede9e1', borderRadius: 18, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #ede9e1' }}>
                          {['PEDIDO','NEGOCIO','PRODUCTOS','CLIENTE','TOTAL','ESTADO',''].map(h => (
                            <th key={h} style={{ padding: '0.8rem 1rem', textAlign: 'left', fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map(o => {
                          const rest = restaurants.find(r => r.id === o.restaurant_id)
                          const sc = S[o.status] || S['Pendiente']
                          return (
                            <tr key={o.id} style={{ borderBottom: '1px solid #f5f0eb' }}>
                              <td style={{ padding: '0.8rem 1rem' }}>
                                <span style={{ color: 'var(--orange)', fontSize: '0.8rem', fontWeight: 700 }}>#{o.id?.split('-')[0]?.toUpperCase()}</span>
                              </td>
                              <td style={{ padding: '0.8rem 1rem', fontSize: '0.82rem', color: '#111', fontWeight: 600 }}>{rest?.name || 'Pedido Abierto'}</td>
                              <td style={{ padding: '0.8rem 1rem', fontSize: '0.78rem', color: '#666', maxWidth: 180 }}>
                                <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                  {o.products?.map((p: any) => `${p.quantity}x ${p.name}`).join(', ')}
                                </span>
                              </td>
                              <td style={{ padding: '0.8rem 1rem', fontSize: '0.82rem', color: '#111' }}>{o.customer_name}</td>
                              <td style={{ padding: '0.8rem 1rem', fontSize: '0.88rem', fontWeight: 700, color: '#111' }}>${(o.total || 0).toLocaleString('es-CO')}</td>
                              <td style={{ padding: '0.8rem 1rem' }}>
                                <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)}
                                  style={{ height: 32, borderRadius: 8, background: sc.bg, border: `1px solid ${sc.color}40`, padding: '0 8px', color: sc.color, fontSize: '0.78rem', fontWeight: 700, outline: 'none', cursor: 'pointer' }}>
                                  {Object.keys(S).map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                              </td>
                              <td style={{ padding: '0.8rem 0.8rem' }}>
                                <button onClick={() => deleteOrder(o.id)} style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(239,68,68,0.08)', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Trash2 size={12} />
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    {filteredOrders.length === 0 && <p style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>No hay pedidos</p>}
                  </div>
                </div>
              )}

              {/* NEGOCIOS */}
              {tab === 'negocios' && (
                <div>
                  <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Administración</p>
                  <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: '#111', marginBottom: 4 }}>Negocios</h1>
                  <p style={{ color: '#888', marginBottom: '1.5rem' }}>Controla los aliados y establecimientos de la plataforma.</p>
                  <div style={{ background: '#fff', border: '1px solid #ede9e1', borderRadius: 18, overflow: 'hidden' }}>
                    <div style={{ padding: '1rem 1.2rem', borderBottom: '1px solid #ede9e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                      <div style={{ position: 'relative' }}>
                        <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                        <input placeholder="Buscar negocio..." value={search} onChange={e => setSearch(e.target.value)}
                          style={{ height: 38, borderRadius: 10, border: '1px solid #ede9e1', paddingLeft: 36, paddingRight: 12, fontSize: '0.85rem', outline: 'none', color: '#111', width: 250 }} />
                      </div>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #ede9e1' }}>
                          {['NEGOCIO','CATEGORÍA','ESTADO','ACCIONES'].map(h => (
                            <th key={h} style={{ padding: '0.8rem 1rem', textAlign: 'left', fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {restaurants.filter(r => r.name?.toLowerCase().includes(search.toLowerCase())).map(r => (
                          <tr key={r.id} style={{ borderBottom: '1px solid #f5f0eb' }}>
                            <td style={{ padding: '0.8rem 1rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#f5f0eb', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  {r.image_url ? <img src={r.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: '1rem' }}>🏪</span>}
                                </div>
                                <div>
                                  <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: '#111' }}>{r.name}</p>
                                  <p style={{ margin: 0, fontSize: '0.72rem', color: '#888' }}>ID: {r.id?.split('-')[0]}</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: '0.8rem 1rem' }}><span style={{ background: '#f5f0eb', padding: '3px 10px', borderRadius: 100, fontSize: '0.75rem', color: '#555', fontWeight: 600 }}>{r.category}</span></td>
                            <td style={{ padding: '0.8rem 1rem' }}>
                              <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: 100, background: r.approved ? 'rgba(74,222,128,0.1)' : 'rgba(250,204,21,0.1)', color: r.approved ? '#4ade80' : '#facc15', fontWeight: 600 }}>
                                {r.approved ? '● Activo' : '● Pendiente'}
                              </span>
                            </td>
                            <td style={{ padding: '0.8rem 1rem' }}>
                              <button onClick={() => toggleRestaurant(r.id, r.approved)} style={{ padding: '6px 14px', borderRadius: 8, background: r.approved ? '#f5f0eb' : 'var(--orange)', border: 'none', color: r.approved ? '#888' : '#fff', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>
                                {r.approved ? 'Desactivar' : 'Aprobar'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* USUARIOS */}
              {tab === 'usuarios' && (
                <div>
                  <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Administración</p>
                  <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: '#111', marginBottom: 16 }}>Usuarios</h1>
                  <div style={{ background: '#fff', border: '1px solid #ede9e1', borderRadius: 18, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #ede9e1' }}>
                          {['USUARIO','EMAIL','ROL'].map(h => <th key={h} style={{ padding: '0.8rem 1rem', textAlign: 'left', fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{h}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(u => (
                          <tr key={u.id} style={{ borderBottom: '1px solid #f5f0eb' }}>
                            <td style={{ padding: '0.8rem 1rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '0.88rem', flexShrink: 0 }}>{(u.name || u.email || 'U')[0]?.toUpperCase()}</div>
                                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.88rem', color: '#111' }}>{u.name || '—'}</p>
                              </div>
                            </td>
                            <td style={{ padding: '0.8rem 1rem', fontSize: '0.82rem', color: '#666' }}>{u.email}</td>
                            <td style={{ padding: '0.8rem 1rem' }}>
                              <select value={u.role || 'customer'} onChange={e => updateRole(u.id, e.target.value)}
                                style={{ height: 34, borderRadius: 8, border: '1px solid #ede9e1', padding: '0 10px', fontSize: '0.82rem', outline: 'none', color: '#111', background: '#fff', cursor: 'pointer' }}>
                                <option value="customer">Cliente</option>
                                <option value="business">Negocio</option>
                                <option value="delivery">Domiciliario</option>
                                <option value="admin">Admin</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* DOMICILIARIOS */}
              {tab === 'domiciliarios' && (
                <div>
                  <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Administración</p>
                  <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: '#111', marginBottom: 4 }}>Domiciliarios</h1>
                  <p style={{ color: '#888', marginBottom: '1.5rem' }}>Administra el equipo de reparto de la plataforma.</p>
                  <div style={{ background: '#fff', border: '1px solid #ede9e1', borderRadius: 18, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #ede9e1' }}>
                          {['DOMICILIARIO','CONTACTO','ENTREGAS','ESTADO'].map(h => <th key={h} style={{ padding: '0.8rem 1rem', textAlign: 'left', fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{h}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {deliverers.length === 0 ? (
                          <tr><td colSpan={4} style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>No hay domiciliarios registrados. Asigna el rol "Domiciliario" a usuarios desde la pestaña Usuarios.</td></tr>
                        ) : deliverers.map(u => {
                          const delivered = orders.filter(o => o.status === 'Entregado').length
                          return (
                            <tr key={u.id} style={{ borderBottom: '1px solid #f5f0eb' }}>
                              <td style={{ padding: '0.8rem 1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, flexShrink: 0 }}>{(u.name || 'D')[0]?.toUpperCase()}</div>
                                  <div><p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: '#111' }}>{u.name || '—'}</p><p style={{ margin: 0, fontSize: '0.72rem', color: '#888' }}>🏍 Moto</p></div>
                                </div>
                              </td>
                              <td style={{ padding: '0.8rem 1rem', fontSize: '0.82rem', color: '#555' }}>{u.phone || u.email || '—'}</td>
                              <td style={{ padding: '0.8rem 1rem', fontSize: '0.88rem', fontWeight: 700, color: '#111' }}>{delivered}</td>
                              <td style={{ padding: '0.8rem 1rem' }}>
                                <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: 100, background: 'rgba(74,222,128,0.1)', color: '#4ade80', fontWeight: 600 }}>● EN LÍNEA</span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
