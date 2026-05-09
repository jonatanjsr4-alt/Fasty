export default function Footer() {
  return (
    <footer className="px-6 py-16 border-t border-zinc-900 mt-28">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">

          <div>

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center">

                <span className="text-black font-black">
                  F
                </span>

              </div>

              <h2 className="text-white text-2xl font-bold tracking-tight">
                FASTY
              </h2>

            </div>

            <p className="text-zinc-500 mt-5 max-w-md leading-relaxed">

              Plataforma moderna de domicilios y delivery para negocios y usuarios en Quibdó.

            </p>

          </div>

          <div className="flex items-center gap-8 text-sm text-zinc-500">

            <a href="#" className="hover:text-white transition-all">
              Inicio
            </a>

            <a href="#" className="hover:text-white transition-all">
              Negocios
            </a>

            <a href="#" className="hover:text-white transition-all">
              Categorías
            </a>

            <a href="#" className="hover:text-white transition-all">
              Contacto
            </a>

          </div>

        </div>

        <div className="border-t border-zinc-900 mt-12 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">

          <p className="text-zinc-600 text-sm">
            © 2026 FASTY. Todos los derechos reservados.
          </p>

          <p className="text-zinc-600 text-sm">
            Hecho en Quibdó, Colombia.
          </p>

        </div>

      </div>

    </footer>
  )
}