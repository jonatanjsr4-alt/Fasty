const stores = [
  {
    name: 'Burger House',
    category: 'Hamburguesas',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
  },
  {
    name: 'Pizza Gold',
    category: 'Pizzería',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591',
  },
  {
    name: 'Helados Frost',
    category: 'Heladería',
    image:
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
  },
]
import FadeIn from './FadeIn'
export default function FeaturedStores() {
  return (
    <FadeIn>
  <section className="py-24 px-6 bg-black">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-12">

          <h2 className="text-4xl font-extrabold text-white">
            Negocios Destacados
          </h2>

          <button className="text-orange-500 font-bold">
            Ver Todos
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {stores.map((store) => (
            <div
              key={store.name}
              className="glass-card rounded-3xl overflow-hidden"
            >

              <div className="overflow-hidden">

  <img
    src={store.image}
    alt={store.name}
    className="w-full h-64 object-cover hover:scale-110 transition-all duration-700"
  />

</div>

              <div className="p-6">

                <h3 className="text-2xl font-bold text-white">
                  {store.name}
                </h3>

                <p className="text-gray-400 mt-2">
                  {store.category}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

       </section>
</FadeIn>
  )
}