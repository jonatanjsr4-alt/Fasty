'use client'

const categories = [

  {
    name: 'Hamburguesas',
    image:
      'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
  },

  {
    name: 'Pizza',
    image:
      'https://cdn-icons-png.flaticon.com/512/3595/3595455.png',
  },

  {
    name: 'Pollo',
    image:
      'https://cdn-icons-png.flaticon.com/512/5787/5787016.png',
  },

  {
    name: 'Bebidas',
    image:
      'https://cdn-icons-png.flaticon.com/512/2405/2405479.png',
  },

  {
    name: 'Postres',
    image:
      'https://cdn-icons-png.flaticon.com/512/2553/2553691.png',
  },

  {
    name: 'Mercado',
    image:
      'https://cdn-icons-png.flaticon.com/512/3081/3081822.png',
  },

]

export default function Categories() {

  return (

    <section
      id="categorias"
      className="px-6 py-28"
    >

      <div className="max-w-7xl mx-auto">

        <div className="mb-16">

          <span className="text-orange-500 font-bold uppercase tracking-[4px]">

            Categorías

          </span>

          <h2 className="text-6xl font-black mt-4 leading-none">

            Todo en un solo lugar

          </h2>

          <p className="text-zinc-400 text-lg mt-5 max-w-2xl">

            Explora restaurantes, bebidas,
            supermercados y mucho más en FASTY.

          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {categories.map((category) => (

            <div
              key={category.name}
              className="
                glass
                rounded-[32px]
                p-7
                flex
                flex-col
                items-center
                justify-center
                text-center
                card-hover
                cursor-pointer
                min-h-[220px]
              "
            >

              <div
                className="
                  w-24
                  h-24
                  rounded-3xl
                  bg-white
                  flex
                  items-center
                  justify-center
                  overflow-hidden
                "
              >

                <img
                  src={category.image}
                  alt={category.name}
                  className="
                    w-16
                    h-16
                    object-contain
                  "
                />

              </div>

              <h3 className="text-3xl font-black mt-7">

                {category.name}

              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>

  )
}