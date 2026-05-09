import { Smartphone } from 'lucide-react'

export default function DownloadApp() {
  return (
    <section className="py-28 px-6 bg-black">

      <div className="max-w-7xl mx-auto">

        <div className="bg-zinc-900 border border-zinc-800 rounded-[40px] p-12 md:p-20 relative overflow-hidden">

          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/10 blur-3xl rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            <div>

              <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
                Descarga FASTY
                <span className="text-orange-500"> App</span>
              </h2>

              <p className="text-gray-400 mt-8 text-xl">
                Pide comida, compra productos y recibe entregas rápidas desde tu celular.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 mt-12">

                <button className="bg-orange-500 hover:bg-orange-600 transition-all px-8 py-5 rounded-2xl font-bold text-lg">
                  Google Play
                </button>

                <button className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all px-8 py-5 rounded-2xl font-bold text-lg">
                  App Store
                </button>

              </div>

            </div>

            <div className="flex justify-center">

              <div className="w-[280px] h-[560px] bg-black border-4 border-zinc-700 rounded-[50px] shadow-2xl shadow-orange-500/20 overflow-hidden">

                <div className="bg-orange-500 h-24 flex items-center justify-center">

                  <Smartphone className="w-12 h-12 text-white" />

                </div>

                <div className="p-6 space-y-5">

                  <div className="bg-zinc-800 rounded-3xl h-24" />

                  <div className="bg-zinc-800 rounded-3xl h-24" />

                  <div className="bg-zinc-800 rounded-3xl h-24" />

                  <div className="bg-zinc-800 rounded-3xl h-24" />

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}