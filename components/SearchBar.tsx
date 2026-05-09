import { MapPin, Search } from 'lucide-react'

export default function SearchBar() {
  return (
    <section className="px-6 -mt-10 relative z-40">

      <div className="max-w-5xl mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-2xl shadow-black/40">

        <div className="flex flex-col md:flex-row gap-4">

          <div className="flex items-center gap-3 bg-zinc-800 rounded-2xl px-5 py-4 flex-1">

            <MapPin className="text-orange-500" />

            <input
              type="text"
              placeholder="Tu ubicación"
              className="bg-transparent outline-none text-white w-full"
            />

          </div>

          <div className="flex items-center gap-3 bg-zinc-800 rounded-2xl px-5 py-4 flex-[2]">

            <Search className="text-orange-500" />

            <input
              type="text"
              placeholder="Buscar restaurantes, comida o productos..."
              className="bg-transparent outline-none text-white w-full"
            />

          </div>

          <button className="bg-orange-500 hover:bg-orange-600 transition-all px-8 py-4 rounded-2xl font-bold">
            Buscar
          </button>

        </div>

      </div>

    </section>
  )
}