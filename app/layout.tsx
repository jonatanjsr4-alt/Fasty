import type { Metadata } from 'next'
import { CartProvider } from '@/components/CartContext'
import Cursor from '@/components/Cursor'

export const metadata: Metadata = {
  title: 'FASTY',
  description: 'Marketplace delivery FASTY',
  manifest: '/manifest.json',
}

export const viewport = {
  themeColor: '#FF5001',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Cursor />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}