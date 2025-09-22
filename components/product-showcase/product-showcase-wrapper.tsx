"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import LoadingSpinner from "./loading-spinner"
import { motion } from "framer-motion"
import { products } from "@/lib/constants"

// Dynamically import the ProductViewer component with no SSR
const ProductViewer = dynamic(() => import("./product-viewer"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
})

export default function ProductShowcaseWrapper() {
  // Get first 3 products for the 3D showcase
  const showcaseProducts = products.slice(0, 3)

  return (
    <section className="w-full py-20 bg-card text-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            3D Product Showcase
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our high-precision products in interactive 3D. Rotate, zoom, and discover our cutting-edge technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {showcaseProducts.map((product, index) => {
            // Define button text for each card
            const buttonTexts = [
              "Our Solutions",
              "Principal Products", 
              "System Integrators"
            ];
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-background rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* 3D Model Container */}
                <div className="relative aspect-square w-full bg-gradient-to-br from-primary/10 to-accent/10">
                  <Suspense
                    fallback={
                      <div className="w-full h-full flex items-center justify-center">
                        <LoadingSpinner />
                      </div>
                    }
                  >
                    <ProductViewer
                      modelPath={product.modelPath}
                      zoom={1}
                      autoRotate={true}
                      color={product.color}
                      onError={() => {}}
                    />
                  </Suspense>
                </div>

                {/* Button Section */}
                <div className="p-6">
                  <button className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300">
                    {buttonTexts[index]}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
