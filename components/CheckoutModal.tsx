'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

type Props = {
  open: boolean
  onClose: () => void
}

export default function CheckoutModal({
  open,
  onClose,
}: Props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="w-full max-w-xl bg-[#111111] border border-white/10 rounded-[36px] overflow-hidden">

        <div className="flex items-center justify-between p-6 border-b border-white/10">

          <h2 className="text-3xl font-black text-white">

            Finalizar pedido

          </h2>

          <button
            onClick={onClose}
            className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center"
          >

            <X className="text-white" />

          </button>

        </div>

        <div className="p-6 space-y-5">

          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 px-5 text-white outline-none"
          />

          <input
            type="text"
            placeholder="WhatsApp"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 px-5 text-white outline-none"
          />

          <textarea
            placeholder="Dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full h-32 rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white outline-none resize-none"
          />

          <button
            onClick={() => {
              alert('Pedido enviado correctamente')
              onClose()
            }}
            className="w-full h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 transition-all text-white font-bold text-lg"
          >

            Enviar pedido

          </button>

        </div>

      </div>

    </div>
  )
}