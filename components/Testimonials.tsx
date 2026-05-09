const testimonials = [
  {
    name: 'Laura Mosquera',
    role: 'Cliente FASTY',
    text: 'La experiencia es rápida y muy cómoda para pedir en Quibdó.',
  },
  {
    name: 'Kevin Cuesta',
    role: 'Negocio aliado',
    text: 'FASTY nos ayudó a aumentar pedidos y mejorar la atención.',
  },
]

export default function Testimonials() {
  return (
    <section className="px-6">

      <div className="max-w-7xl mx-auto">

        <div className="mb-12">

          <h2 className="text-3xl font-bold text-[#18181b]">
            Opiniones
          </h2>

          <p className="text-[#666] mt-2">
            Lo que dicen nuestros usuarios.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="bg-white border border-[#efefef] rounded-3xl p-8"
            >

              <div className="flex items-center gap-4 mb-6">

                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">

                  {item.name.charAt(0)}

                </div>

                <div>

                  <h3 className="font-semibold text-[#18181b]">
                    {item.name}
                  </h3>

                  <p className="text-sm text-[#666]">
                    {item.role}
                  </p>

                </div>

              </div>

              <p className="text-[#18181b] text-lg leading-relaxed">

                “{item.text}”

              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}