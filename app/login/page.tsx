'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin() {

    if (
      email === 'admin@fasty.com'
      &&
      password === '123456'
    ) {

      localStorage.setItem(
        'fasty-admin',
        'true'
      )

      router.push('/admin')

    } else {

      alert('Credenciales incorrectas')

    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-5">

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[32px] p-8">

        <h1 className="text-5xl font-black text-white mb-8">
          Admin Login
        </h1>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full h-14 rounded-2xl bg-black border border-white/10 px-5 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full h-14 rounded-2xl bg-black border border-white/10 px-5 text-white outline-none"
          />

          <button
            onClick={handleLogin}
            className="w-full h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 transition-all text-white font-bold"
          >
            Ingresar
          </button>

        </div>

      </div>

    </div>
  )
}