export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-16 px-6">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-4xl font-extrabold text-orange-500">
            FASTY
          </h2>

          <p className="text-gray-400 mt-4">
            Plataforma moderna de domicilios y negocios en Quibdó.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold text-xl mb-4">
            Empresa
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>Nosotros</li>
            <li>Contacto</li>
            <li>Trabaja con nosotros</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-xl mb-4">
            Servicios
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>Domicilios</li>
            <li>Negocios</li>
            <li>Pedidos</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-xl mb-4">
            Legal
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>Términos</li>
            <li>Privacidad</li>
            <li>Cookies</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-gray-500">
        © 2026 FASTY. Todos los derechos reservados.
      </div>

    </footer>
  )
}