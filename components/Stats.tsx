export default function Stats() {
  return (
    <section className="px-6">

      <div className="max-w-7xl mx-auto">

        <div className="bg-white border border-[#efefef] rounded-[32px] px-8 py-10">

          <div className="grid md:grid-cols-4 gap-10">

            <div>

              <h3 className="text-4xl font-black text-[#18181b]">
                +10K
              </h3>

              <p className="text-[#666] mt-2">
                Pedidos entregados
              </p>

            </div>

            <div>

              <h3 className="text-4xl font-black text-[#18181b]">
                +500
              </h3>

              <p className="text-[#666] mt-2">
                Negocios activos
              </p>

            </div>

            <div>

              <h3 className="text-4xl font-black text-[#18181b]">
                +20K
              </h3>

              <p className="text-[#666] mt-2">
                Usuarios registrados
              </p>

            </div>

            <div>

              <h3 className="text-4xl font-black text-orange-500">
                24/7
              </h3>

              <p className="text-[#666] mt-2">
                Soporte disponible
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}