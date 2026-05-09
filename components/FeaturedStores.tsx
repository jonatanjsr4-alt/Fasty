'use client'

import { useEffect, useState } from 'react'

import { supabase } from '@/lib/supabase'
import { useCart } from '@/components/CartContext'
import {
  Clock3,
  Star,
  ArrowRight,
} from 'lucide-react'

type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export default function FeaturedStores() {
  const [products, setProducts] = useState<Product[]>([])
  const { addToCart } = useCart()

  useEffect(() => {
    getProducts()
  }, [])

  async function getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setProducts(data)
    }
  }

  return (
    <section className="px-5 md:px-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between mb-14">

          <div>

            <p className="text-orange-500 uppercase tracking-[4px] text-sm font-medium">

              PRODUCTOS REALES

            </p>

            <h2 className="text-5xl md:text-6xl font-black text-white mt-4 tracking-[-4px]">

              Descubre FASTY

            </h2>

          </div>

        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {products.map((product) => (

            <div
              key={product.id}
              className="group relative overflow-hidden rounded-[36px] h-[520px] bg-black border border-white/10"
            >

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute top-5 left-5">

                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 flex items-center gap-2">

                  <Star
                    size={15}
                    className="text-orange-500 fill-orange-500"
                  />

                  <span className="text-sm font-medium text-white">

                    5.0

                  </span>

                </div>

              </div>

              <div className="absolute bottom-6 left-6 right-6">

                <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[28px] p-5">

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <p className="text-sm text-zinc-400">

                        FASTY PRODUCT

                      </p>

                      <h3 className="text-3xl font-bold tracking-[-2px] text-white mt-2">

                        {product.name}

                      </h3>

                    </div>

                    <button
  onClick={() =>
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }
  className="w-12 h-12 rounded-2xl bg-orange-500 hover:bg-orange-600 transition-all flex items-center justify-center"
>

  <ArrowRight
    size={18}
    className="text-white"
  />

</button>

                      
  </div>

     <p className="text-zinc-300 mt-4 line-clamp-2">

     {product.description}

     </p>

                  <div className="flex items-center justify-between mt-5">

                    <div className="flex items-center gap-3 text-zinc-400">

                      <Clock3 size={16} />

                      <span className="text-sm">

                        15 min

                      </span>

                    </div>

                    <span className="text-2xl font-bold text-orange-500">

                      ${product.price}

                    </span>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}