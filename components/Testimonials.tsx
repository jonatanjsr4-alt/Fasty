const testimonials = [
  {
    name: 'Carlos Martínez',
    role: 'Cliente',
    comment:
      'FASTY cambió totalmente la forma en que hago pedidos en Quibdó.',
  },
  {
    name: 'Laura Mosquera',
    role: 'Negocio',
    comment:
      'Ahora recibimos muchos más pedidos gracias a FASTY.',
  },
  {
    name: 'Andrés Córdoba',
    role: 'Domiciliario',
    comment:
      'La plataforma es rápida, moderna y muy fácil de usar.',
  },
]

export default function Testimonials() {
  return (
    <section className="py-28 px-6 bg-zinc-950">

      <div className="max-w-7xl mx-auto text-center">

        <h2 className="text-5xl font-extrabold text-white">
          Lo que dicen nuestros usuarios
        </h2>

        <p className="text-gray-400 mt-6 text-xl">
          Personas y negocios que ya usan FASTY.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">

          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="glass-card rounded-3xl p-10 text-left"
            >

              <div className="flex items-center gap-4 mb-6">

                <div className="w-14 h-14 bg-orange-500 rounded-full" />

                <div>
                  <h3 className="text-white font-bold text-xl">
                    {testimonial.name}
                  </h3>

                  <p className="text-gray-400">
                    {testimonial.role}
                  </p>
                </div>

              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                “{testimonial.comment}”
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}