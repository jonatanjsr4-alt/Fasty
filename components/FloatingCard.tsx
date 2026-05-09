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
        y: -8,
        scale: 1.015,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 18,
      }}
    >
      {children}
    </motion.div>
  )
}