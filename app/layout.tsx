import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FASTY — Delivery Quibdó',
  description: 'Restaurantes, supermercados, farmacias y negocios locales en una sola plataforma. Delivery moderno para Quibdó.',
  keywords: 'delivery, domicilios, Quibdó, restaurantes, comida',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}