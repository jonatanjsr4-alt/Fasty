import Link from 'next/link'
import {
  ArrowRight,
  Store,
  ShoppingBag,
} from 'lucide-react'

export default function CTA() {
  return (
    <section className="px-5 md:px-6">

      <div className="max-w-7xl mx-auto">

        <div className="relative overflow-hidden rounded-[36px] bg-[#111111] px-6 md:px-12 py-12 md:py-16 shadow-[0_20px_70px_rgba(0,0,0,.12)]">

          <div className="absolute top-[-200px] right-[-200px] w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-3xl" />

          <div className="absolute bottom-[-200px] left-[-200px] w-[400px] h-[400px] bg-orange-400/10 rounded-full blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            <div>

              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full mb-6">

                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

                <p className="text-xs md:text-sm text-white/80 font-medium">

                  FASTY disponible en Quibdó

                </p>

              </div>

              <h2 className="text-white text-4xl md:text-6xl font-black leading-[0.95] tracking-[-2px] max-w-2xl">

                Todo lo que
                <br />

                necesitas,
                <br />

                entregado
                <span className="text-orange-500">
                  {' '}rápido
                </span>

              </h2>

              <p className="text-zinc-400 text-base md:text-lg mt-6 leading-relaxed max-w-xl">

                Restaurantes, supermercados, farmacias
                y negocios locales en una sola plataforma moderna.

              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">

                <Link
                  href="/auth"
                  className="group bg-orange-500 hover:bg-orange-600 transition-all text-white px-7 h-14 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-lg shadow-orange-500/20"
                >

                  <ShoppingBag size={18} />

                  Pedir ahora

                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-all"
                  />

                </Link>

                <Link
                  href="/business"
                  className="bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/10 transition-all text-white px-7 h-14 rounded-2xl font-semibold flex items-center justify-center gap-3"
                >

                  <Store size={18} />

                  Registrar negocio

                </Link>

              </div>

              <div className="flex flex-wrap items-center gap-8 mt-12">

                <div>

                  <h3 className="text-3xl md:text-4xl font-black text-white">
                    +10K
                  </h3>

                  <p className="text-zinc-500 mt-1 text-sm">
                    Pedidos
                  </p>

                </div>

                <div>

                  <h3 className="text-3xl md:text-4xl font-black text-white">
                    +500
                  </h3>

                  <p className="text-zinc-500 mt-1 text-sm">
                    Negocios
                  </p>

                </div>

                <div>

                  <h3 className="text-3xl md:text-4xl font-black text-white">
                    24/7
                  </h3>

                  <p className="text-zinc-500 mt-1 text-sm">
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
                  className="w-full h-[360px] md:h-[460px] object-cover rounded-[32px] shadow-2xl"
                />

                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-xl">

                  <p className="text-[#999] text-xs">
                    Delivery promedio
                  </p>

                  <h3 className="text-2xl md:text-3xl font-black text-[#18181b] mt-1">

                    15 min

                  </h3>

                </div>

                <div className="absolute bottom-4 right-4 bg-[#111111]/90 backdrop-blur-xl border border-white/10 px-5 py-4 rounded-2xl shadow-2xl">

                  <p className="text-zinc-500 text-xs">
                    Restaurantes activos
                  </p>

                  <h3 className="text-3xl font-black text-white mt-1">

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