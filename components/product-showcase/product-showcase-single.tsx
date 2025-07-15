"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Info, RotateCcw, ZoomIn, ZoomOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductViewer from "./product-viewer"
import ProductInfo from "./product-info"
import { cn } from "@/lib/utils"
import type { products } from "@/lib/constants"

interface ProductShowcaseSingleProps {
  product: (typeof products)[0]
}

export default function ProductShowcaseSingle({ product }: ProductShowcaseSingleProps) {
  const [showInfo, setShowInfo] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [autoRotate, setAutoRotate] = useState(true)
  const [is3DEnabled, setIs3DEnabled] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 0.5))
  }

  const toggleRotation = () => {
    setAutoRotate((prev) => !prev)
  }

  const toggleInfo = () => {
    setShowInfo((prev) => !prev)
  }

  // Fallback to 2D view if 3D rendering fails
  const handle3DError = () => {
    setIs3DEnabled(false)
  }

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
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Interactive 3D Model</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the {product.name} in 3D. Rotate, zoom, and learn about its features.
          </p>
        </motion.div>

        <div className="relative">
          <div
            ref={containerRef}
            className="bg-background/50 rounded-xl overflow-hidden relative aspect-[4/3] w-full max-w-4xl mx-auto"
          >
            {is3DEnabled ? (
              <ProductViewer
                modelPath={product.modelPath}
                zoom={zoom}
                autoRotate={autoRotate}
                color={product.color}
                onError={handle3DError}
              />
            ) : (
              // Fallback to 2D image if 3D fails
              <div className="w-full h-full flex items-center justify-center bg-background">
                <div className="text-center p-6">
                  <div className="w-full max-w-md mx-auto mb-4 bg-card rounded-lg overflow-hidden">
                    <img src={product.imagePath || "/placeholder.svg"} alt={product.name} className="w-full h-auto" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{product.name}</h3>
                  <p className="text-muted-foreground">{product.shortDescription}</p>
                </div>
              </div>
            )}

            {/* Controls - only show if 3D is enabled */}
            {is3DEnabled && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleZoomOut}
                  className="text-white hover:bg-white/20 h-9 w-9"
                >
                  <ZoomOut className="h-5 w-5" />
                  <span className="sr-only">Zoom Out</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleZoomIn}
                  className="text-white hover:bg-white/20 h-9 w-9"
                >
                  <ZoomIn className="h-5 w-5" />
                  <span className="sr-only">Zoom In</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleRotation}
                  className={cn("text-white hover:bg-white/20 h-9 w-9", autoRotate ? "bg-white/20" : "bg-transparent")}
                >
                  <RotateCcw className="h-5 w-5" />
                  <span className="sr-only">Toggle Rotation</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleInfo}
                  className={cn("text-white hover:bg-white/20 h-9 w-9", showInfo ? "bg-white/20" : "bg-transparent")}
                >
                  <Info className="h-5 w-5" />
                  <span className="sr-only">Product Info</span>
                </Button>
              </div>
            )}

            {/* Product Info Overlay */}
            <ProductInfo product={product} isVisible={showInfo} onClose={() => setShowInfo(false)} />
          </div>
        </div>
      </div>
    </section>
  )
}
