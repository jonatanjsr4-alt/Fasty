const stats = [
  {
    number: '+10K',
    label: 'Pedidos entregados',
  },
  {
    number: '+500',
    label: 'Negocios activos',
  },
  {
    number: '+20K',
    label: 'Usuarios',
  },
  {
    number: '24/7',
    label: 'Soporte',
  },
]

export default function Stats() {
  return (
    <section className="px-6">

      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#111111] border border-zinc-900 rounded-3xl p-8"
            >

              <h2 className="text-4xl md:text-5xl font-black text-white">
                {stat.number}
              </h2>

              <p className="text-zinc-500 mt-3 text-sm">
                {stat.label}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}