"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Info, RotateCcw, ZoomIn, ZoomOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductViewer from "./product-viewer"
import ProductInfo from "./product-info"
import { cn } from "@/lib/utils"
import { products } from "@/lib/constants"

export default function ProductShowcase() {
  const [activeProduct, setActiveProduct] = useState(products[0])
  const [showInfo, setShowInfo] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [autoRotate, setAutoRotate] = useState(true)
  const [is3DEnabled, setIs3DEnabled] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleProductChange = (product: (typeof products)[0]) => {
    setActiveProduct(product)
    setShowInfo(false)
  }

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
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Interactive Product Showcase</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our high-precision products. Rotate, zoom, and learn about our cutting-edge technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Product Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-background rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-primary">Our Products</h3>
              <div className="space-y-3">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductChange(product)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg transition-all duration-300",
                      activeProduct.id === product.id
                        ? "bg-primary/20 border-l-4 border-primary"
                        : "bg-card hover:bg-card/80",
                    )}
                  >
                    <h4 className="font-medium">{product.name}</h4>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Viewer */}
          <div className="lg:col-span-3 relative">
            <div
              ref={containerRef}
              className="bg-background/50 rounded-xl overflow-hidden relative aspect-[4/3] w-full"
            >
              {is3DEnabled ? (
                <ProductViewer
                  modelPath={activeProduct.modelPath}
                  zoom={zoom}
                  autoRotate={autoRotate}
                  color={activeProduct.color}
                  onError={handle3DError}
                />
              ) : (
                // Fallback to 2D image if 3D fails
                <div className="w-full h-full flex items-center justify-center bg-background">
                  <div className="text-center p-6">
                    <div className="w-full max-w-md mx-auto mb-4 bg-card rounded-lg overflow-hidden">
                      <img
                        src={activeProduct.imagePath || "/placeholder.svg"}
                        alt={activeProduct.name}
                        className="w-full h-auto"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">{activeProduct.name}</h3>
                    <p className="text-muted-foreground">{activeProduct.shortDescription}</p>
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
                    className={cn(
                      "text-white hover:bg-white/20 h-9 w-9",
                      autoRotate ? "bg-white/20" : "bg-transparent",
                    )}
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
              <ProductInfo product={activeProduct} isVisible={showInfo} onClose={() => setShowInfo(false)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
