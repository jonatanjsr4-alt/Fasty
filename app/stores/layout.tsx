import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tiendas — FASTY',
  description: 'Explora restaurantes, supermercados, farmacias y más negocios de Quibdó. Pide a domicilio rápido y seguro.',
}

export default function StoresLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
