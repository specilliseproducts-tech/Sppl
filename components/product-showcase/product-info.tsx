"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Check } from "lucide-react"

interface ProductInfoProps {
  product: {
    name: string
    shortDescription: string
    features: string[]
    color: string
  }
  isVisible: boolean
  onClose: () => void
}

export default function ProductInfo({ product, isVisible, onClose }: ProductInfoProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm p-6 overflow-auto"
          style={{ zIndex: 10 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            aria-label="Close product information"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="max-w-2xl mx-auto mt-8">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-2xl font-bold text-primary mb-4"
            >
              {product.name}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-white/90 mb-6"
            >
              {product.shortDescription}
            </motion.p>

            <motion.h4
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="text-lg font-semibold text-primary mb-3"
            >
              Key Features
            </motion.h4>

            <ul className="space-y-2">
              {product.features.slice(0, 5).map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="flex items-start"
                >
                  <Check className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                  <span className="text-white/90">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="mt-8 p-4 border border-primary/30 rounded-lg bg-primary/10"
            >
              <h4 className="text-lg font-semibold text-primary mb-2">Learn More</h4>
              <p className="text-white/80">Visit the product page for detailed specifications and applications.</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
