'use client'

import { motion } from 'framer-motion'

export default function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative"
    >

      <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full scale-110" />

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
        className="relative w-[260px] h-[540px] bg-zinc-900 border-4 border-zinc-700 rounded-[45px] shadow-2xl shadow-orange-500/30 overflow-hidden"
      >

        <div className="bg-orange-500 h-20 flex items-center justify-center">

          <h2 className="text-4xl font-extrabold text-white">
            FASTY
          </h2>

        </div>

        <div className="p-5 space-y-4">

          <div className="glass-card rounded-3xl p-4 hover:bg-zinc-700 transition-all">

            <h3 className="text-white font-bold text-lg">
              Burger House
            </h3>

            <p className="text-gray-400 mt-1 text-sm">
              Hamburguesas • 15 min
            </p>

          </div>

          <div className="glass-card rounded-3xl p-4 hover:bg-zinc-700 transition-all">

            <h3 className="text-white font-bold text-lg">
              Pizza Gold
            </h3>

            <p className="text-gray-400 mt-1 text-sm">
              Pizza • 20 min
            </p>

          </div>

          <div className="glass-card rounded-3xl p-4 hover:bg-zinc-700 transition-all">

            <h3 className="text-white font-bold text-lg">
              Helados Frost
            </h3>

            <p className="text-gray-400 mt-1 text-sm">
              Postres • 10 min
            </p>

          </div>

        </div>

      </motion.div>

    </motion.div>
  )
}