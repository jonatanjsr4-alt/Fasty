'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function CreateProductPage() {

  const router = useRouter()

  const [restaurants, setRestaurants] = useState<any[]>([])

  const [restaurantId, setRestaurantId] = useState('')

  const [name, setName] = useState('')

  const [description, setDescription] = useState('')

  const [price, setPrice] = useState('')

  const [category, setCategory] = useState('')

  const [image, setImage] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {

    fetchRestaurants()

  }, [])

  async function fetchRestaurants() {

    const { data, error } = await supabase
      .from('restaurants')
      .select('*')

    if (!error && data) {

      setRestaurants(data)

    }

  }

  async function createProduct() {

    if (
      !restaurantId ||
      !name ||
      !description ||
      !price
    ) {

      alert('Completa todos los campos')
      return

    }

    setLoading(true)

    const { error } = await supabase
      .from('products')
      .insert([
        {
          restaurant_id: restaurantId,
          name,
          description,
          price: Number(price),
          category,
          image,
        },
      ])

    setLoading(false)

    if (error) {

      console.log(error)

      alert('Error creando producto')

      return

    }

    alert('Producto creado correctamente')

    router.push(`/business/${restaurantId}`)

  }

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-6xl font-black tracking-[-4px]">

          Crear producto

        </h1>

        <div className="mt-10 space-y-6">

          <select
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
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
          >

            <option value="">

              Selecciona restaurante

            </option>

            {restaurants.map((restaurant) => (

              <option
                key={restaurant.id}
                value={restaurant.id}
              >

                {restaurant.name}

              </option>

            ))}

          </select>

          <input
            type="text"
            placeholder="Nombre producto"
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
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
            placeholder="URL imagen"
            value={image}
            onChange={(e) => setImage(e.target.value)}
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

          <button
            onClick={createProduct}
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
              : 'Crear producto'}

          </button>

        </div>

      </div>

    </main>

  )

}