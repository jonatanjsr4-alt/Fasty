'use client'

import { motion } from 'framer-motion'

export default function FloatingCard({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 18,
      }}
    >
      {children}
    </motion.div>
  )
}