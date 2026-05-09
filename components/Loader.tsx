'use client'

import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center pointer-events-none"
    >

      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-7xl font-extrabold text-orange-500"
      >
        FASTY
      </motion.h1>

    </motion.div>
  )
}