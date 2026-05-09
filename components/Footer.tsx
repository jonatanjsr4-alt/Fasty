import Link from 'next/link'
import {
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0f0f10] text-white mt-32">

      <div className="absolute top-[-250px] right-[-250px] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl" />

      <div className="absolute bottom-[-250px] left-[-250px] w-[500px] h-[500px] bg-orange-400/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-14">

          <div>

            <div className="flex items-center gap-4">

              <div className="relative">

                <div className="absolute inset-0 bg-orange-500 blur-xl opacity-30 rounded-2xl" />

                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-xl shadow-orange-500/20">

                  <span className="text-white text-xl font-black">
                    F
                  </span>

                </div>

              </div>

              <div>

                <h2 className="text-3xl font-black tracking-[-1px]">

                  FASTY

                </h2>

                <p className="text-zinc-500 mt-1">

                  Delivery Platform

                </p>

              </div>

            </div>

            <p className="text-zinc-400 leading-relaxed mt-8 max-w-md text-lg">

              Plataforma moderna de delivery y domicilios
              para restaurantes, supermercados y negocios locales en Quibdó.

            </p>

            <div className="flex items-center gap-4 mt-10">

              <button className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-orange-500 transition-all flex items-center justify-center border border-white/5 hover:border-orange-500">

                <Instagram size={20} />

              </button>

              <button className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-orange-500 transition-all flex items-center justify-center border border-white/5 hover:border-orange-500">

                <Facebook size={20} />

              </button>

              <button className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-orange-500 transition-all flex items-center justify-center border border-white/5 hover:border-orange-500">

                <Twitter size={20} />

              </button>

            </div>

          </div>

          <div>

            <h3 className="text-xl font-black mb-8">

              Navegación

            </h3>

            <div className="flex flex-col gap-5 text-zinc-400">

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

            <h3 className="text-xl font-black mb-8">

              Categorías

            </h3>

            <div className="flex flex-col gap-5 text-zinc-400">

              <p>Restaurantes</p>

              <p>Supermercados</p>

              <p>Farmacias</p>

              <p>Licores</p>

              <p>Moda</p>

            </div>

          </div>

          <div>

            <h3 className="text-xl font-black mb-8">

              Contacto

            </h3>

            <div className="space-y-5 text-zinc-400">

              <div className="flex items-start gap-4">

                <MapPin
                  size={18}
                  className="text-orange-500 mt-1"
                />

                <p>
                  Quibdó, Chocó
                </p>

              </div>

              <div className="flex items-start gap-4">

                <Mail
                  size={18}
                  className="text-orange-500 mt-1"
                />

                <p>
                  contacto@fasty.com
                </p>

              </div>

              <div className="flex items-start gap-4">

                <Phone
                  size={18}
                  className="text-orange-500 mt-1"
                />

                <p>
                  +57 300 000 0000
                </p>

              </div>

            </div>

          </div>

        </div>

        <div className="border-t border-white/5 mt-20 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          <p className="text-zinc-500">

            © 2026 FASTY. Todos los derechos reservados.

          </p>

          <p className="text-zinc-600">

            Hecho en Quibdó, Colombia 🇨🇴

          </p>

        </div>

      </div>

    </footer>
  )
}