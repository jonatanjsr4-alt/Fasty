'use client'

import { motion } from 'framer-motion'

export default function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative"
    >

      <div className="absolute inset-0 bg-orange-500/10 blur-3xl rounded-full scale-125" />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="relative w-[250px] h-[520px] bg-[#0f0f10] border border-zinc-800 rounded-[42px] shadow-2xl shadow-black/50 overflow-hidden"
      >

        <div className="bg-gradient-to-r from-orange-500 to-orange-400 h-20 flex items-center justify-center">

          <h2 className="text-3xl font-black tracking-wide text-white">
            FASTY
          </h2>

        </div>

        <div className="p-4 space-y-4">

          <div className="glass-card rounded-3xl overflow-hidden">

            <div className="h-28 bg-[url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd')] bg-cover bg-center" />

            <div className="p-4">

              <div className="flex items-center justify-between">

                <h3 className="text-white font-semibold text-sm">
                  Burger House
                </h3>

                <span className="text-orange-400 text-xs">
                  ⭐ 4.9
                </span>

              </div>

              <p className="text-zinc-400 text-xs mt-1">
                Hamburguesas • 15 min
              </p>

            </div>

          </div>

          <div className="glass-card rounded-3xl overflow-hidden">

            <div className="h-28 bg-[url('https://images.unsplash.com/photo-1513104890138-7c749659a591')] bg-cover bg-center" />

            <div className="p-4">

              <div className="flex items-center justify-between">

                <h3 className="text-white font-semibold text-sm">
                  Pizza Gold
                </h3>

                <span className="text-orange-400 text-xs">
                  ⭐ 4.8
                </span>

              </div>

              <p className="text-zinc-400 text-xs mt-1">
                Pizza • 20 min
              </p>

            </div>

          </div>

        </div>

      </motion.div>

    </motion.div>
  )
}