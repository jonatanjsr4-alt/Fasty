'use client'

import { motion } from 'framer-motion'

export default function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative mt-20"
    >

      <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full" />

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
        className="relative w-[320px] h-[640px] bg-zinc-900 border-4 border-zinc-700 rounded-[50px] shadow-2xl shadow-orange-500/30 overflow-hidden"
      >

        <div className="bg-orange-500 h-24 flex items-center justify-center">

          <h2 className="text-3xl font-extrabold text-white">
            FASTY
          </h2>

        </div>

        <div className="p-6 space-y-5">

          <div className="bg-zinc-800 rounded-3xl p-5 hover:bg-zinc-700 transition-all">

            <h3 className="text-white font-bold text-xl">
              Burger House
            </h3>

            <p className="text-gray-400 mt-2">
              Hamburguesas • 15 min
            </p>

          </div>

          <div className="bg-zinc-800 rounded-3xl p-5 hover:bg-zinc-700 transition-all">

            <h3 className="text-white font-bold text-xl">
              Pizza Gold
            </h3>

            <p className="text-gray-400 mt-2">
              Pizza • 20 min
            </p>

          </div>

          <div className="bg-zinc-800 rounded-3xl p-5 hover:bg-zinc-700 transition-all">

            <h3 className="text-white font-bold text-xl">
              Helados Frost
            </h3>

            <p className="text-gray-400 mt-2">
              Postres • 10 min
            </p>

          </div>

        </div>

      </motion.div>

    </motion.div>
  )
}