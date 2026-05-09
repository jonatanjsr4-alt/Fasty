import Link from 'next/link'
import {
  ArrowRight,
  Store,
  ShoppingBag,
} from 'lucide-react'

export default function CTA() {
  return (
    <section className="px-6">

      <div className="max-w-7xl mx-auto">

        <div className="relative overflow-hidden rounded-[48px] bg-[#111111] px-8 md:px-16 py-16 md:py-20 shadow-[0_30px_100px_rgba(0,0,0,.12)]">

          <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-3xl" />

          <div className="absolute bottom-[-250px] left-[-250px] w-[500px] h-[500px] bg-orange-400/10 rounded-full blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-full mb-8">

                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />

                <p className="text-sm text-white/80 font-medium">

                  FASTY disponible en Quibdó

                </p>

              </div>

              <h2 className="text-white text-5xl md:text-7xl font-black leading-[0.95] tracking-[-4px] max-w-2xl">

                Todo lo que
                <br />

                necesitas,
                <br />

                entregado
                <span className="text-orange-500">
                  {' '}rápido
                </span>

              </h2>

              <p className="text-zinc-400 text-xl mt-8 leading-relaxed max-w-xl">

                Restaurantes, supermercados, farmacias
                y negocios locales en una sola plataforma moderna.

              </p>

              <div className="flex flex-col sm:flex-row gap-5 mt-12">

                <Link
                  href="/auth"
                  className="group bg-orange-500 hover:bg-orange-600 transition-all text-white px-9 h-16 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-xl shadow-orange-500/20"
                >

                  <ShoppingBag size={20} />

                  Pedir ahora

                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-all"
                  />

                </Link>

                <Link
                  href="/business"
                  className="bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/10 transition-all text-white px-9 h-16 rounded-2xl font-semibold flex items-center justify-center gap-3"
                >

                  <Store size={20} />

                  Registrar negocio

                </Link>

              </div>

              <div className="flex flex-wrap items-center gap-10 mt-16">

                <div>

                  <h3 className="text-4xl font-black text-white">
                    +10K
                  </h3>

                  <p className="text-zinc-500 mt-2">
                    Pedidos
                  </p>

                </div>

                <div>

                  <h3 className="text-4xl font-black text-white">
                    +500
                  </h3>

                  <p className="text-zinc-500 mt-2">
                    Negocios
                  </p>

                </div>

                <div>

                  <h3 className="text-4xl font-black text-white">
                    24/7
                  </h3>

                  <p className="text-zinc-500 mt-2">
                    Soporte
                  </p>

                </div>

              </div>

            </div>

            <div className="relative">

              <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full scale-110" />

              <div className="relative">

                <img
                  src="https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1400&auto=format&fit=crop"
                  alt="Delivery"
                  className="w-full h-[520px] object-cover rounded-[40px] shadow-2xl"
                />

                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-xl px-5 py-4 rounded-3xl shadow-xl">

                  <p className="text-[#999] text-sm">
                    Delivery promedio
                  </p>

                  <h3 className="text-3xl font-black text-[#18181b] mt-1">

                    15 min

                  </h3>

                </div>

                <div className="absolute bottom-6 right-6 bg-[#111111]/90 backdrop-blur-xl border border-white/10 px-6 py-5 rounded-3xl shadow-2xl">

                  <p className="text-zinc-500 text-sm">
                    Restaurantes activos
                  </p>

                  <h3 className="text-4xl font-black text-white mt-2">

                    +500

                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}