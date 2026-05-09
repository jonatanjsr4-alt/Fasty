'use client'

import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        delay: 1.8,
        duration: 0.8,
      }}
      className="fixed inset-0 z-[999] bg-[#0f0f11] flex items-center justify-center pointer-events-none"
    >

      <div className="flex flex-col items-center">

        <motion.div
          initial={{
            scale: 0.8,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >

          <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-40 rounded-full" />

          <div className="relative w-24 h-24 rounded-[28px] bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-orange">

            <span className="text-white text-4xl font-black">

              F

            </span>

          </div>

        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.8,
          }}
          className="text-white text-3xl font-black tracking-[-2px] mt-8"
        >

          FASTY

        </motion.h1>

        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: 180,
          }}
          transition={{
            delay: 0.5,
            duration: 1,
            ease: 'easeInOut',
          }}
          className="h-[4px] rounded-full bg-orange-500 mt-8"
        />

      </div>

    </motion.div>
  )
}