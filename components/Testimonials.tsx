const testimonials = [
  {
    name: 'Laura Mosquera',
    role: 'Cliente FASTY',
    text: 'La experiencia es rápida, moderna y mucho más cómoda para pedir en Quibdó.',
  },
  {
    name: 'Kevin Cuesta',
    role: 'Negocio aliado',
    text: 'FASTY nos ayudó a aumentar pedidos y mejorar la atención a nuestros clientes.',
  },
]

export default function Testimonials() {
  return (
    <section className="px-6 py-10">

      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-10">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="bg-[#fffaf4] border border-[#e7ded4] rounded-[40px] p-10 shadow-[0_10px_40px_rgba(0,0,0,.04)]"
            >

              <div className="flex items-center gap-4 mb-8">

                <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg">

                  {item.name.charAt(0)}

                </div>

                <div>

                  <h3 className="text-[#18181b] font-bold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-[#7c6f64] text-sm mt-1">
                    {item.role}
                  </p>

                </div>

              </div>

              <p className="text-2xl leading-relaxed text-[#18181b] font-medium">

                “{item.text}”

              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}