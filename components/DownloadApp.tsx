import { Smartphone, Download } from 'lucide-react'

export default function DownloadApp() {
  return (
    <section className="py-20 px-5 md:px-6 bg-black">

      <div className="max-w-7xl mx-auto">

        <div className="relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-[36px] px-6 md:px-12 py-12 md:py-16 shadow-[0_20px_70px_rgba(0,0,0,.25)]">

          <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] bg-orange-500/10 blur-3xl rounded-full" />

          <div className="absolute bottom-[-120px] left-[-120px] w-[320px] h-[320px] bg-orange-400/5 blur-3xl rounded-full" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>

              <div className="inline-flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-full mb-6">

                <Download className="w-4 h-4 text-orange-500" />

                <span className="text-orange-400 text-sm font-medium">

                  Disponible próximamente

                </span>

              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-[-2px]">

                Descarga
                <span className="text-orange-500">
                  {' '}FASTY
                </span>

                <br />

                App

              </h2>

              <p className="text-zinc-400 mt-6 text-base md:text-lg leading-relaxed max-w-xl">

                Pide comida, compra productos y recibe entregas rápidas desde tu celular con una experiencia moderna y rápida.

              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">

                <button className="bg-orange-500 hover:bg-orange-600 transition-all px-7 h-14 rounded-2xl font-semibold text-white shadow-lg shadow-orange-500/20">

                  Google Play

                </button>

                <button className="border border-zinc-700 hover:border-orange-500 text-white hover:bg-orange-500 transition-all px-7 h-14 rounded-2xl font-semibold">

                  App Store

                </button>

              </div>

            </div>

            <div className="flex justify-center lg:justify-end">

              <div className="relative">

                <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full scale-110" />

                <div className="relative w-[250px] h-[500px] bg-black border-[5px] border-zinc-700 rounded-[42px] shadow-2xl overflow-hidden">

                  <div className="bg-orange-500 h-20 flex items-center justify-center">

                    <Smartphone className="w-9 h-9 text-white" />

                  </div>

                  <div className="p-5 space-y-4">

                    <div className="bg-zinc-800 rounded-[24px] h-20" />

                    <div className="bg-zinc-800 rounded-[24px] h-20" />

                    <div className="bg-zinc-800 rounded-[24px] h-20" />

                    <div className="bg-zinc-800 rounded-[24px] h-20" />

                  </div>

                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-zinc-700 rounded-full" />

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}