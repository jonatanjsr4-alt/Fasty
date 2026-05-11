import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panel de negocio — FASTY',
  description: 'Administra tu negocio, pedidos y estadísticas desde tu panel FASTY.',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
