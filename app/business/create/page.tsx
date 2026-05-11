'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function CreateBusinessPage() {

  const router = useRouter()

  const [name, setName] = useState('')

  const [description, setDescription] = useState('')

  const [category, setCategory] = useState('')

  const [phone, setPhone] = useState('')

  const [address, setAddress] = useState('')

  const [logo, setLogo] = useState('')

  const [banner, setBanner] = useState('')

  const [loading, setLoading] = useState(false)

  async function uploadImage(
    file: File,
    folder: string
  ) {

    const fileName = `${folder}-${Date.now()}-${file.name}`

    const { error } = await supabase.storage
      .from('products')
      .upload(fileName, file)

    if (error) {

      console.log(error)

      alert('Error subiendo imagen')

      return null

    }

    const { data } = supabase.storage
      .from('products')
      .getPublicUrl(fileName)

    return data.publicUrl

  }

  async function createBusiness() {

    if (
      !name ||
      !description ||
      !category
    ) {

      alert('Completa los campos')

      return

    }

    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()
    console.log(user)

    const { data, error } = await supabase
      .from('restaurants')
      .insert([
        {
          owner_id: user?.id,
          name,
          description,
          category,
          phone,
          address,
          logo_url: logo,
          banner_url: banner,
        },
      ])
      .select()
      .single()

    setLoading(false)

    if (error) {

      console.log(error)

      alert(JSON.stringify(error))

      return

    }

    alert('Negocio creado correctamente')

    router.push(`/business/${data.id}`)

  }

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-6xl font-black tracking-[-4px]">

          Crear negocio

        </h1>

        <div className="mt-10 space-y-6">

          <input
            type="text"
            placeholder="Nombre negocio"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              w-full
              h-16
              rounded-2xl
              bg-white/5
              border
              border-white/10
              px-5
              text-white
              outline-none
            "
          />

          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="
              w-full
              h-40
              rounded-2xl
              bg-white/5
              border
              border-white/10
              px-5
              py-4
              text-white
              outline-none
              resize-none
            "
          />

          <input
            type="text"
            placeholder="Categoría"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="
              w-full
              h-16
              rounded-2xl
              bg-white/5
              border
              border-white/10
              px-5
              text-white
              outline-none
            "
          />

          <input
            type="text"
            placeholder="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="
              w-full
              h-16
              rounded-2xl
              bg-white/5
              border
              border-white/10
              px-5
              text-white
              outline-none
            "
          />

          <input
            type="text"
            placeholder="Dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="
              w-full
              h-16
              rounded-2xl
              bg-white/5
              border
              border-white/10
              px-5
              text-white
              outline-none
            "
          />

          <div className="space-y-4">

            <p className="text-white/60">

              Logo negocio

            </p>

            <input
              type="file"
              accept="image/*"

              onChange={async (e) => {

                const file = e.target.files?.[0]

                if (!file) return

                const url = await uploadImage(
                  file,
                  'logo'
                )

                if (url) {

                  setLogo(url)

                }

              }}

              className="
                w-full
                rounded-2xl
                bg-white/5
                border
                border-white/10
                px-5
                py-5
                text-white
              "
            />

            {logo && (

              <img
                src={logo}
                alt="logo"
                className="
                  w-40
                  h-40
                  rounded-3xl
                  object-cover
                "
              />

            )}

          </div>

          <div className="space-y-4">

            <p className="text-white/60">

              Imagen de portada

            </p>

            <input
              type="file"
              accept="image/*"

              onChange={async (e) => {

                const file = e.target.files?.[0]

                if (!file) return

                const url = await uploadImage(
                  file,
                  'banner'
                )

                if (url) {

                  setBanner(url)

                }

              }}

              className="
                w-full
                rounded-2xl
                bg-white/5
                border
                border-white/10
                px-5
                py-5
                text-white
              "
            />

            {banner && (

              <img
                src={banner}
                alt="banner"
                className="
                  w-full
                  h-72
                  rounded-3xl
                  object-cover
                "
              />

            )}

          </div>

          <button
            onClick={createBusiness}
            disabled={loading}
            className="
              w-full
              h-16
              rounded-2xl
              bg-orange-500
              hover:bg-orange-600
              transition-all
              font-bold
              text-lg
            "
          >

            {loading
              ? 'Creando...'
              : 'Crear negocio'}

          </button>

        </div>

      </div>

    </main>

  )

}