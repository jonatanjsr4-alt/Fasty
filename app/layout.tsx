import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/components/CartContext'

export const metadata = {

  title: 'FASTY',

  description: 'Marketplace delivery FASTY',

  manifest: '/manifest.json',

  themeColor: '#FF5001',

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