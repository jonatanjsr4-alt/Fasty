import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Iniciar sesión — FASTY',
  description: 'Crea tu cuenta o inicia sesión en FASTY para pedir a domicilio en Quibdó.',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
