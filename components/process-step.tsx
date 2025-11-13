"use client"

import { motion } from "framer-motion"

interface ProcessStepProps {
  number: string
  title: string
  description: string
}

export default function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{
        borderColor: "rgba(228, 88, 38, 0.5)",
        backgroundColor: "rgba(228, 88, 38, 0.03)",
        transition: { duration: 0.2 },
      }}
      className="relative p-6 rounded-xl border border-muted transition-colors bg-card"
    >
      <motion.div
        className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-lg shadow-lg"
        whileHover={{
          scale: 1.1,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
          delay: 0.2,
        }}
      >
        {number}
      </motion.div>
      <h3 className="text-xl font-bold text-primary mb-3 mt-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  )
}
