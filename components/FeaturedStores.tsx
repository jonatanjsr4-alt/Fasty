'use client'

const stores = [

  {
    name: 'Burger House',
    category: 'Hamburguesas',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop',
    delivery: '15-25 min',
  },

  {
    name: 'Pizza Fast',
    category: 'Pizza',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
    delivery: '20-30 min',
  },

  {
    name: 'Chicken City',
    category: 'Pollo',
    image:
      'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=1200&auto=format&fit=crop',
    delivery: '10-20 min',
  },

]

export default function FeaturedStores() {

  return (

    <section
      id="tiendas"
      className="px-6 py-28"
    >

      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between mb-16">

          <div>

            <span className="text-orange-500 font-bold uppercase tracking-[4px]">

              Restaurantes

            </span>

            <h2 className="text-6xl font-black mt-4 leading-none">

              Los más pedidos

            </h2>

          </div>

          <button
            className="
              hidden
              md:flex
              h-14
              px-8
              rounded-full
              orange-gradient
              text-black
              font-bold
              items-center
              justify-center
            "
          >

            Ver todos

          </button>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {stores.map((store) => (

            <div
              key={store.name}
              className="
                glass
                rounded-[36px]
                overflow-hidden
                card-hover
                group
                cursor-pointer
              "
            >

              <div className="relative overflow-hidden">

                <img
                  src={store.image}
                  alt={store.name}
                  className="
                    w-full
                    h-[280px]
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />

                <div
                  className="
                    absolute
                    top-5
                    left-5
                    px-4
                    h-10
                    rounded-full
                    bg-black/70
                    backdrop-blur-md
                    flex
                    items-center
                    text-sm
                    font-bold
                  "
                >

                  ⭐ 4.9

                </div>

              </div>

              <div className="p-7">

                <div className="flex items-center justify-between">

                  <h3 className="text-3xl font-black">

                    {store.name}

                  </h3>

                  <span className="text-orange-500 font-bold">

                    {store.delivery}

                  </span>

                </div>

                <p className="text-zinc-400 mt-3 text-lg">

                  {store.category}

                </p>

                <button
                  className="
                    mt-7
                    w-full
                    h-14
                    rounded-2xl
                    bg-white
                    text-black
                    font-bold
                    hover:bg-orange-500
                    hover:text-white
                    transition-all
                  "
                >

                  Ver tienda

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  )
}