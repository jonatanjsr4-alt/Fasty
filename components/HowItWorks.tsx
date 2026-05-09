const steps = [
  {
    number: '01',
    title: 'Explora negocios',
    text: 'Encuentra restaurantes, supermercados y tiendas locales fácilmente.',
  },
  {
    number: '02',
    title: 'Haz tu pedido',
    text: 'Ordena rápidamente desde una experiencia moderna y simple.',
  },
  {
    number: '03',
    title: 'Recibe en minutos',
    text: 'FASTY conecta entregas rápidas y seguras en tu ciudad.',
  },
]

export default function HowItWorks() {
  return (
    <section className="px-6">

      <div className="max-w-7xl mx-auto">

        <div className="mb-12">

          <h2 className="text-3xl font-bold text-[#18181b]">
            Cómo funciona
          </h2>

          <p className="text-[#666] mt-2">
            Delivery simple y rápido.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white border border-[#efefef] rounded-3xl p-8"
            >

              <span className="text-orange-500 text-sm font-semibold">
                {step.number}
              </span>

              <h3 className="text-2xl font-bold text-[#18181b] mt-4">

                {step.title}

              </h3>

              <p className="text-[#666] leading-relaxed mt-4">

                {step.text}

              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}