import {
  Star,
  Quote,
} from 'lucide-react'

const testimonials = [
  {
    name: 'Laura Mosquera',
    role: 'Cliente FASTY',
    text: 'La experiencia es rápida y muy cómoda para pedir en Quibdó.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Kevin Cuesta',
    role: 'Negocio aliado',
    text: 'FASTY nos ayudó a aumentar pedidos y mejorar la atención.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
  },
]

export default function Testimonials() {
  return (
    <section className="px-5 md:px-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">

          <div>

            <p className="text-orange-500 uppercase tracking-[4px] text-xs font-semibold">

              Testimonios

            </p>

            <h2 className="text-4xl md:text-5xl font-black text-[#18181b] mt-3 leading-none tracking-[-2px]">

              Lo que dicen
              <br />

              nuestros usuarios

            </h2>

          </div>

          <p className="text-[#666] text-sm md:text-base leading-relaxed max-w-xl">

            FASTY conecta usuarios y negocios locales
            en una experiencia moderna, rápida y confiable.

          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-5">

          {testimonials.map((item) => (

            <div
              key={item.name}
              className="group relative overflow-hidden bg-white border border-[#ececec] rounded-[30px] p-6 hover:shadow-[0_15px_40px_rgba(0,0,0,.06)] hover:-translate-y-1 transition-all duration-300"
            >

              <div className="absolute top-0 right-0 w-28 h-28 bg-orange-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="relative z-10">

                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-center gap-4">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-2xl object-cover shadow-md"
                    />

                    <div>

                      <h3 className="text-lg font-black text-[#18181b] leading-none">

                        {item.name}

                      </h3>

                      <p className="text-[#777] text-sm mt-1.5">

                        {item.role}

                      </p>

                    </div>

                  </div>

                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center flex-shrink-0">

                    <Quote
                      size={18}
                      className="text-orange-500"
                    />

                  </div>

                </div>

                <div className="flex items-center gap-1 mt-6">

                  {[1, 2, 3, 4, 5].map((star) => (

                    <Star
                      key={star}
                      size={15}
                      className="text-orange-500 fill-orange-500"
                    />

                  ))}

                </div>

                <p className="text-[#18181b] text-lg md:text-xl leading-relaxed font-medium mt-6">

                  “{item.text}”

                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}