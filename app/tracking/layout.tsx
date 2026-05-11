import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Seguimiento de pedido — FASTY',
}

export default function TrackingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
