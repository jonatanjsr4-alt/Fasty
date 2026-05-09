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
    <section className="py-24 px-6 bg-zinc-950">

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">

        {stats.map((stat) => (
          <div
            key={stat.label}
           className="glass-card rounded-3xl p-10 text-center"
          >

            <h2 className="text-5xl font-extrabold text-orange-500">
              {stat.number}
            </h2>

            <p className="text-gray-400 mt-4 text-lg">
              {stat.label}
            </p>

          </div>
        ))}

      </div>

    </section>
  )
}