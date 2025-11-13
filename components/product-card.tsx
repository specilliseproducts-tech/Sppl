"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  id: string
  slug: string
  title: string
  description: string
  image: string
  features: string[]
  color?: string
}

export default function ProductCard({
  id,
  slug,
  title,
  description,
  image,
  features,
  color = "#F9B208", // Golden Yellow
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -10,
        transition: { duration: 0.2 },
      }}
      className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-secondary/30 hover:border-secondary"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={300}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            isHovered ? "scale-110" : "scale-100",
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Animated overlay that appears on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="bg-card/90 text-primary font-bold py-2 px-4 rounded-full"
          >
            View Details
          </motion.div>
        </motion.div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>

        <div className="space-y-2 mb-6">
          {features.slice(0, 3).map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Check className="h-5 w-5 text-secondary shrink-0 mr-2 mt-0.5" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </motion.div>
          ))}
        </div>

        <Button asChild variant="outline" className="w-full group border-secondary text-secondary hover:bg-secondary/10">
          <Link href={`/products/${slug}`}>
            Learn More
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}
