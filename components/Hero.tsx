'use client'

export default function Hero() {

  return (

    <section
      className="
        relative
        min-h-screen
        flex
        items-center
        overflow-hidden
        px-6
      "
    >

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center">

        <div>

          <div
            className="
              inline-flex
              items-center
              gap-3
              px-5
              py-3
              rounded-full
              bg-white/5
              border
              border-white/10
              mb-8
            "
          >

            <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />

            <span className="text-sm text-zinc-300">

              Delivery premium en minutos

            </span>

          </div>

          <h1
            className="
              text-6xl
              md:text-8xl
              font-black
              leading-[0.9]
              tracking-[-5px]
            "
          >

            Pide comida
            <br />

            <span className="text-gradient">

              rápida y brutal

            </span>

          </h1>

          <p
            className="
              mt-8
              text-xl
              text-zinc-400
              max-w-xl
              leading-relaxed
            "
          >

            Restaurantes premium, entregas rápidas
            y una experiencia moderna diseñada para
            Quibdó.

          </p>

          <div className="flex flex-wrap gap-5 mt-10">

            <button
              className="
                h-16
                px-10
                rounded-full
                orange-gradient
                text-black
                font-black
                text-lg
                hover:scale-105
                transition-all
              "
            >

              Pedir ahora

            </button>

            <button
              className="
                h-16
                px-10
                rounded-full
                border
                border-white/10
                bg-white/5
                text-white
                font-bold
                hover:bg-white/10
                transition-all
              "
            >

              Ver restaurantes

            </button>

          </div>

        </div>

        <div className="relative">

          <div
            className="
              absolute
              inset-0
              bg-orange-500/20
              blur-[120px]
            "
          />

          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1400&auto=format&fit=crop"
            alt="Food"
            className="
              relative
              z-10
              rounded-[40px]
              object-cover
              w-full
              h-[700px]
              shadow-2xl
            "
          />

        </div>

      </div>

    </section>

  )
}