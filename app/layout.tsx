import PageTransition from '@/components/PageTransition'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/CartContext'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  title: 'FASTY',
  description: 'Delivery moderno para Quibdó',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">

      <body
        className={`${jakarta.variable} font-sans`}
      >

        <CartProvider>

          <PageTransition>

            {children}

          </PageTransition>

        </CartProvider>

      </body>

    </html>
  )
}