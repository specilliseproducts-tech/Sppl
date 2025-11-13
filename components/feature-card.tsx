"use client"

import { motion } from "framer-motion"
import { type LucideIcon, Lightbulb, Flag, Users, Wrench, Shield, HeartHandshake } from "lucide-react"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const getIcon = (): LucideIcon => {
    switch (icon) {
      case "Lightbulb":
        return Lightbulb
      case "Flag":
        return Flag
      case "Users":
        return Users
      case "Wrench":
        return Wrench
      case "Shield":
        return Shield
      case "HeartHandshake":
        return HeartHandshake
      default:
        return Lightbulb
    }
  }

  const Icon = getIcon()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.2 },
      }}
      className="bg-card p-6 rounded-xl shadow-md transition-all duration-300"
    >
      <motion.div
        className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4"
        whileHover={{
          rotate: 360,
          backgroundColor: "rgba(228, 88, 38, 0.2)",
          transition: { duration: 0.8 },
        }}
      >
        <Icon className="h-6 w-6 text-secondary" />
      </motion.div>
      <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  )
}
