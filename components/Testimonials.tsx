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
    <section className="px-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">

          <div>

            <p className="text-orange-500 uppercase tracking-[4px] text-sm font-semibold">

              Testimonios

            </p>

            <h2 className="text-5xl md:text-6xl font-black text-[#18181b] mt-5 leading-[1] tracking-[-3px]">

              Lo que dicen
              <br />

              nuestros usuarios

            </h2>

          </div>

          <p className="text-[#666] text-lg leading-relaxed max-w-xl">

            FASTY conecta usuarios y negocios locales
            en una experiencia moderna, rápida y confiable.

          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {testimonials.map((item) => (

            <div
              key={item.name}
              className="group relative overflow-hidden bg-white border border-[#ececec] rounded-[40px] p-8 hover:shadow-[0_25px_60px_rgba(0,0,0,.08)] hover:-translate-y-1 transition-all duration-500"
            >

              <div className="absolute top-0 right-0 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="relative z-10">

                <div className="flex items-start justify-between gap-6">

                  <div className="flex items-center gap-5">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-3xl object-cover shadow-lg"
                    />

                    <div>

                      <h3 className="text-xl font-black text-[#18181b]">

                        {item.name}

                      </h3>

                      <p className="text-[#777] mt-1">

                        {item.role}

                      </p>

                    </div>

                  </div>

                  <div className="w-14 h-14 rounded-3xl bg-orange-100 flex items-center justify-center">

                    <Quote
                      size={24}
                      className="text-orange-500"
                    />

                  </div>

                </div>

                <div className="flex items-center gap-1 mt-8">

                  {[1, 2, 3, 4, 5].map((star) => (

                    <Star
                      key={star}
                      size={18}
                      className="text-orange-500 fill-orange-500"
                    />

                  ))}

                </div>

                <p className="text-[#18181b] text-2xl leading-relaxed font-medium mt-8">

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