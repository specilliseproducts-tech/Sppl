"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Only try to play if video exists and is loaded
    if (videoRef.current) {
      const handleCanPlay = () => {
        setVideoLoaded(true)
        // Only try to play after we know it can play
        videoRef.current?.play().catch((error) => {
          console.error("Error playing video:", error)
          // If autoplay fails, we still want to show the video
          setVideoLoaded(true)
        })
      }

      // Listen for the canplay event
      videoRef.current.addEventListener("canplay", handleCanPlay)

      // If the video is already loaded (from cache), trigger play
      if (videoRef.current.readyState >= 3) {
        handleCanPlay()
      }

      return () => {
        videoRef.current?.removeEventListener("canplay", handleCanPlay)
      }
    }
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
      {/* Background Video or Fallback */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/70 z-10"></div>

        {/* Fallback image that's always shown first */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${videoLoaded ? "opacity-0" : "opacity-100"}`}
        >
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Video that fades in when loaded */}
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
          muted
          loop
          playsInline
        >
          <source src="/placeholder.svg?height=1080&width=1920" type="video/mp4" />
          {/* No text fallback needed as we have the image fallback */}
        </video>
      </div>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.div variants={itemVariants} className="flex items-center mb-6">
              <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 relative mr-6 bg-white rounded-full p-3 shadow-lg border-2 border-primary/10 flex items-center justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_Disc%20shaped_without%20background%20%281%29-OQoxElFApTHusoL6AA21rF47oxtJzy.png"
                  alt="Spécialisé Products Logo"
                  width={128}
                  height={128}
                  className="object-contain w-full h-full"
                />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">Customized Solutions Company </h2>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Customized Solutions for Your Demanding Applications
            </motion.h2>

            <motion.p variants={itemVariants} className="text-muted-foreground text-lg mb-8 max-w-xl">
              With over 30 years of experience, we provide innovative, high-precision laser-based technologies and
              customized solutions for various industries.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="default" className="group">
                <Link href="/products">
                  Explore Our Products
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
            className="hidden md:block"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Laser Technology"
                width={600}
                height={600}
                className="object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
