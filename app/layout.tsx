import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/components/CartContext'

export const metadata: Metadata = {
  title: 'FASTY',
  description: 'Delivery moderno para Quibdó',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}