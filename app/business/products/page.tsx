'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
  Upload,
  Plus,
} from 'lucide-react'

export default function ProductsPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState<File | null>(null)

  async function createProduct() {
    if (!image) {
      alert('Selecciona una imagen')
      return
    }

    const fileName = `${Date.now()}-${image.name}`

    const { error: uploadError } = await supabase
      .storage
      .from('products')
      .upload(fileName, image)

    if (uploadError) {
      alert(uploadError.message)
      return
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${fileName}`

    const { error } = await supabase
      .from('products')
      .insert({
        name,
        description,
        price,
        image: imageUrl,
      })

    if (error) {
      alert(error.message)
    } else {
      alert('Producto creado correctamente')

      setName('')
      setDescription('')
      setPrice('')
    }
  }

  return (
    <main className="min-h-screen bg-[#0f0f11] text-white p-6 md:p-10">

      <div className="max-w-3xl mx-auto">

        <p className="text-orange-500 uppercase tracking-[4px] text-xs font-semibold">

          FASTY BUSINESS

        </p>

        <h1 className="text-5xl font-black tracking-[-3px] mt-4">

          Crear producto

        </h1>

        <p className="text-zinc-400 mt-4 text-lg">

          Publica productos reales dentro de FASTY.

        </p>

        <div className="dark-section luxury-border rounded-[36px] p-8 mt-10">

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Nombre del producto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 px-5 outline-none"
            />

            <textarea
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-32 rounded-2xl bg-white/5 border border-white/10 px-5 py-4 outline-none resize-none"
            />

            <input
              type="number"
              placeholder="Precio"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 px-5 outline-none"
            />

            <label className="w-full h-40 rounded-[28px] border-2 border-dashed border-white/10 hover:border-orange-500 transition-all flex flex-col items-center justify-center gap-4 cursor-pointer">

              <Upload
                size={36}
                className="text-orange-500"
              />

              <p className="text-zinc-400">

                Subir imagen del producto

              </p>

              <input
                type="file"
                hidden
                onChange={(e) =>
                  setImage(e.target.files?.[0] || null)
                }
              />

            </label>

            <button
              onClick={createProduct}
              className="bg-orange-500 hover:bg-orange-600 transition-all h-14 rounded-2xl px-8 font-semibold flex items-center gap-3 glow-orange"
            >

              <Plus size={20} />

              Crear producto

            </button>

          </div>

        </div>

      </div>

    </main>
  )
}