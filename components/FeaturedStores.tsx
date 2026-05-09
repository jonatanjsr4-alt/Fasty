const stores = [
  {
    name: 'Pizza Gold',
    category: 'Pizza',
    time: '20 min',
    rating: '4.9',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Burger House',
    category: 'Hamburguesas',
    time: '15 min',
    rating: '4.8',
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Helados Frost',
    category: 'Postres',
    time: '10 min',
    rating: '4.7',
    image:
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1200&auto=format&fit=crop',
  },
]

export default function FeaturedStores() {
  return (
    <section className="px-6">

      <div className="max-w-7xl mx-auto">

        <div className="mb-14">

          <h2 className="text-3xl md:text-4xl font-bold text-[#18181b]">
            Negocios destacados
          </h2>

          <p className="text-[#7c6f64] mt-3 text-lg">
            Restaurantes y tiendas populares en FASTY.
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {stores.map((store) => (
            <div
              key={store.name}
              className="bg-[#fffaf4] border border-[#e7ded4] rounded-[32px] overflow-hidden hover:shadow-[0_10px_40px_rgba(0,0,0,.06)] transition-all duration-300"
            >

              <div className="overflow-hidden">

                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-64 object-cover hover:scale-105 transition-all duration-700"
                />

              </div>

              <div className="p-6">

                <div className="flex items-center justify-between">

                  <h3 className="text-[#18181b] text-xl font-semibold">
                    {store.name}
                  </h3>

                  <span className="text-orange-500 text-sm font-medium">
                    ★ {store.rating}
                  </span>

                </div>

                <div className="flex items-center gap-3 mt-3 text-[#7c6f64] text-sm">

                  <span>{store.category}</span>

                  <span>•</span>

                  <span>{store.time}</span>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}