"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Sample data for the cards
  const slidesData = [
    {
      title: "Our Solutions",
      cards: [
        {
          title: "Axis Manipulator",
          description: "Automatic Alignment Assembly  for  Defence.",
          image: "https://res.cloudinary.com/dtcaaevst/image/upload/v1758868805/wlskjpvbidnsvof8tzjm.png"
        },
        {
          title: "CNC Machining",
          description: "Advanced CNC machining services for complex parts",
          image: "https://res.cloudinary.com/dtcaaevst/image/upload/v1758868213/bgz38vyiu8oo2zisvnte.png"
        },
        {
          title: "Quality Control",
          description: "Comprehensive quality control and inspection services",
          image: "https://res.cloudinary.com/dtcaaevst/image/upload/v1758867275/qu0mgyva43ix43pzdqog.png"
        }
      ]
    },
    {
      title: "Principal Products",
      cards: [
        {
          title: "Prototype Development",
          description: "Rapid prototyping for product development",
          image: "/placeholder.svg?height=400&width=600"
        },
        {
          title: "Custom Manufacturing",
          description: "Tailored manufacturing solutions for unique requirements",
          image: "/placeholder.svg?height=400&width=600"
        },
        {
          title: "Technical Support",
          description: "Expert technical support and consultation services",
          image: "/placeholder.svg?height=400&width=600"
        }
      ]
    },
    {
      title: "System Integrators",
      cards: [
        {
          title: "3D Printing",
          description: "State-of-the-art 3D printing capabilities",
          image: "/placeholder.svg?height=400&width=600"
        },
        {
          title: "Automation Systems",
          description: "Smart automation solutions for enhanced productivity",
          image: "/placeholder.svg?height=400&width=600"
        },
        {
          title: "Digital Solutions",
          description: "Digital transformation and IoT integration",
          image: "/placeholder.svg?height=400&width=600"
        }
      ]
    }
  ]

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])


  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/65 z-10"></div>

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/Bg_image.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Slider Content */}
      <div className="container mx-auto px-4 z-20 relative mt-20">
        <div className="max-w-6xl mx-auto">
          {/* Slide Title */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              {slidesData[currentSlide].title}
            </h2>
          </motion.div>

          {/* Cards Container */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {slidesData[currentSlide].cards.map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-96 overflow-hidden border-2 border-secondary/30 hover:border-secondary"
                  >
                    {/* Image Section - Full Card */}
                    <div className="relative h-full w-full">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center items-center mt-12">
            <div className="flex space-x-2">
              {slidesData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
