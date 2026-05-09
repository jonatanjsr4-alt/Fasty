const steps = [
  {
    number: '01',
    title: 'Explora negocios',
    text: 'Encuentra restaurantes, supermercados y tiendas locales cerca de ti.',
  },
  {
    number: '02',
    title: 'Realiza tu pedido',
    text: 'Ordena fácilmente desde una experiencia rápida y moderna.',
  },
  {
    number: '03',
    title: 'Recibe en minutos',
    text: 'FASTY conecta tu pedido con entregas rápidas y seguras.',
  },
]

export default function HowItWorks() {
  return (
    <section className="px-6 py-10">

      <div className="max-w-7xl mx-auto">

        <div className="mb-20">

          <p className="text-[#9b8773] uppercase tracking-[4px] text-sm font-semibold">
            CÓMO FUNCIONA
          </p>

          <h2 className="text-5xl md:text-6xl font-black text-[#18181b] leading-[1] tracking-[-3px] mt-6 max-w-3xl">

            Delivery diseñado para ser simple.

          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-16">

          {steps.map((step) => (
            <div key={step.number}>

              <span className="text-[5rem] font-black text-orange-200 leading-none">

                {step.number}

              </span>

              <h3 className="text-2xl font-bold text-[#18181b] mt-6">

                {step.title}

              </h3>

              <p className="text-[#7c6f64] leading-relaxed mt-5 text-lg">

                {step.text}

              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}