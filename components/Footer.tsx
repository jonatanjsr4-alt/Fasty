import Link from 'next/link'
import {
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0f0f10] text-white mt-24">

      <div className="absolute top-[-200px] right-[-200px] w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-3xl" />

      <div className="absolute bottom-[-200px] left-[-200px] w-[400px] h-[400px] bg-orange-400/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-6 py-14">

        <div className="grid lg:grid-cols-[1.2fr_.8fr_.8fr_1fr] gap-10">

          <div>

            <div className="flex items-center gap-4">

              <div className="relative">

                <div className="absolute inset-0 bg-orange-500 blur-xl opacity-30 rounded-2xl" />

                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">

                  <span className="text-white text-lg font-black">
                    F
                  </span>

                </div>

              </div>

              <div>

                <h2 className="text-2xl font-black tracking-[-1px]">

                  FASTY

                </h2>

                <p className="text-zinc-500 text-sm mt-1">

                  Delivery Platform

                </p>

              </div>

            </div>

            <p className="text-zinc-400 leading-relaxed mt-6 max-w-md text-sm md:text-base">

              Plataforma moderna de delivery y domicilios
              para restaurantes, supermercados y negocios locales en Quibdó.

            </p>

            <div className="flex items-center gap-3 mt-8">

              <button className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-orange-500 transition-all flex items-center justify-center border border-white/5 hover:border-orange-500">

                <ArrowUpRight size={18} />

              </button>

              <button className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-orange-500 transition-all flex items-center justify-center border border-white/5 hover:border-orange-500">

                <Mail size={18} />

              </button>

              <button className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-orange-500 transition-all flex items-center justify-center border border-white/5 hover:border-orange-500">

                <Phone size={18} />

              </button>

            </div>

          </div>

          <div>

            <h3 className="text-lg font-black mb-6">

              Navegación

            </h3>

            <div className="flex flex-col gap-4 text-sm text-zinc-400">

              <Link
                href="/"
                className="hover:text-white transition-all"
              >
                Inicio
              </Link>

              <Link
                href="/business"
                className="hover:text-white transition-all"
              >
                Negocios
              </Link>

              <Link
                href="/dashboard"
                className="hover:text-white transition-all"
              >
                Dashboard
              </Link>

              <Link
                href="/auth"
                className="hover:text-white transition-all"
              >
                Ingresar
              </Link>

            </div>

          </div>

          <div>

            <h3 className="text-lg font-black mb-6">

              Categorías

            </h3>

            <div className="flex flex-col gap-4 text-sm text-zinc-400">

              <p>Restaurantes</p>

              <p>Supermercados</p>

              <p>Farmacias</p>

              <p>Licores</p>

              <p>Moda</p>

            </div>

          </div>

          <div>

            <h3 className="text-lg font-black mb-6">

              Contacto

            </h3>

            <div className="space-y-4 text-sm text-zinc-400">

              <div className="flex items-start gap-3">

                <MapPin
                  size={16}
                  className="text-orange-500 mt-0.5"
                />

                <p>
                  Quibdó, Chocó
                </p>

              </div>

              <div className="flex items-start gap-3">

                <Mail
                  size={16}
                  className="text-orange-500 mt-0.5"
                />

                <p>
                  contacto@fasty.com
                </p>

              </div>

              <div className="flex items-start gap-3">

                <Phone
                  size={16}
                  className="text-orange-500 mt-0.5"
                />

                <p>
                  +57 300 000 0000
                </p>

              </div>

            </div>

          </div>

        </div>

        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

          <p className="text-zinc-500 text-sm">

            © 2026 FASTY. Todos los derechos reservados.

          </p>

          <p className="text-zinc-600 text-sm">

            Hecho en Quibdó, Colombia 🇨🇴

          </p>

        </div>

      </div>

    </footer>
  )
}