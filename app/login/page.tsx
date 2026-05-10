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

    <main
      className="
        min-h-screen
        bg-[#0A0A0A]
        flex
        items-center
        justify-center
        p-6
        overflow-hidden
      "
    >

      <div className="absolute w-[600px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full" />

      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          glass
          rounded-[36px]
          p-8
          border
          border-white/10
        "
      >

        <div className="mb-10">

          <span className="text-orange-500 font-bold uppercase tracking-[4px]">

            FASTY ADMIN

          </span>

          <h1 className="text-6xl font-black mt-4 leading-none">

            Bienvenido 🚀

          </h1>

          <p className="text-zinc-400 text-lg mt-5">

            Inicia sesión para administrar pedidos.

          </p>

        </div>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              h-16
              rounded-2xl
              bg-black/40
              border
              border-white/10
              px-5
              text-white
              outline-none
            "
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              h-16
              rounded-2xl
              bg-black/40
              border
              border-white/10
              px-5
              text-white
              outline-none
            "
          />

          <button
            onClick={handleLogin}
            className="
              w-full
              h-16
              rounded-2xl
              orange-gradient
              glow-orange
              font-black
              text-lg
              mt-3
            "
          >

            Ingresar al panel

          </button>

        </div>

      </div>

    </main>

  )
}