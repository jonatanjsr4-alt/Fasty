import Link from 'next/link'

import {
  ArrowRight,
} from 'lucide-react'

export default function CTA() {
  return (
    <section className="px-5 md:px-6">

      <div className="max-w-7xl mx-auto">

        <div className="relative overflow-hidden rounded-[42px] min-h-[620px] shadow-[0_30px_100px_rgba(0,0,0,.14)]">

          <img
            src="https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1800&auto=format&fit=crop"
            alt="FASTY Delivery"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />

          <div className="relative z-10 h-full flex items-center">

            <div className="max-w-3xl px-8 md:px-14 py-16 md:py-24">

              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2 mb-8">

                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

                <p className="text-white/90 text-sm font-medium">

                  FASTY está creciendo en Quibdó

                </p>

              </div>

              <h2 className="text-5xl md:text-7xl font-bold leading-[0.92] tracking-[-5px] text-white">

                Todo lo que
                <br />

                necesitas,
                <br />

                en minutos.

              </h2>

              <p className="text-white/70 text-lg md:text-xl leading-relaxed mt-8 max-w-2xl">

                Restaurantes, supermercados y negocios
                locales conectados en una experiencia moderna,
                elegante y rápida.

              </p>

              <div className="flex flex-wrap gap-4 mt-12">

                <Link
                  href="/auth"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 h-14 rounded-2xl font-medium flex items-center gap-3 transition-all shadow-xl shadow-orange-500/20"
                >

                  Pedir ahora

                  <ArrowRight size={18} />

                </Link>

                <Link
                  href="/business"
                  className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white px-8 h-14 rounded-2xl font-medium flex items-center transition-all"
                >

                  Registrar negocio

                </Link>

              </div>

              <div className="flex items-center gap-12 mt-14 flex-wrap">

                <div>

                  <h3 className="text-4xl font-bold tracking-[-2px] text-white">

                    +10K

                  </h3>

                  <p className="text-white/60 text-sm mt-1">

                    Pedidos entregados

                  </p>

                </div>

                <div>

                  <h3 className="text-4xl font-bold tracking-[-2px] text-white">

                    +500

                  </h3>

                  <p className="text-white/60 text-sm mt-1">

                    Negocios activos

                  </p>

                </div>

                <div>

                  <h3 className="text-4xl font-bold tracking-[-2px] text-white">

                    24/7

                  </h3>

                  <p className="text-white/60 text-sm mt-1">

                    Soporte premium

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}