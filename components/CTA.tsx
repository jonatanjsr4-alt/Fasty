export default function CTA() {
  return (
    <section className="py-32 px-6 bg-black">

      <div className="max-w-6xl mx-auto">

        <div className="relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-[50px] p-14 md:p-24 text-center">

          <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-orange-500/20 blur-3xl rounded-full" />

          <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-orange-500/10 blur-3xl rounded-full" />

          <div className="relative">

            <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Únete hoy a
              <span className="text-orange-500"> FASTY</span>
            </h2>

            <p className="text-gray-400 text-xl mt-8 max-w-3xl mx-auto">
              Miles de usuarios, negocios y domiciliarios ya están usando FASTY en Quibdó.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center mt-14">

              <button className="bg-orange-500 hover:bg-orange-600 transition-all px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/30">
                Pedir Ahora
              </button>

              <button className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all px-10 py-5 rounded-2xl font-bold text-lg">
                Registrar Negocio
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}