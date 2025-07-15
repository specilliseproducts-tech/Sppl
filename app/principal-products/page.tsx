import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"

export const metadata = {
  title: "Principal Products | Spécialisé Products",
  description: "Explore our flagship products and core technologies.",
}

export default function PrincipalProductsPage() {
  // Sample principal products data
  const principalProducts = [
    {
      id: "microchannel",
      name: "Microchannel Fabrication Machine",
      description:
        "Our flagship handheld machine for metallic and silicon substrate with ≤ 100 µm microchannel width and depth.",
      image: "/placeholder.svg?height=600&width=800",
      link: "/products/microchannel-fabrication-machine",
    },
    {
      id: "alestm",
      name: "ALESTM System",
      description:
        "Advanced Automatic Laser Exposure, Scanning & Temperature Mapping System for non-contact sample heating and thermal mapping.",
      image: "/placeholder.svg?height=600&width=800",
      link: "/products/alestm-system",
    },
    {
      id: "laser-marking",
      name: "Laser Marking & Cutting Machine",
      description:
        "High-precision, fully customizable marking, engraving & cutting machine based on Fibre or CO2 Laser technology.",
      image: "/placeholder.svg?height=600&width=800",
      link: "/products/laser-marking-cutting-machine",
    },
    {
      id: "fsoc",
      name: "Free Space Optics Communications",
      description: "State-of-the-art 10 Gbps outdoor FSO communications setup with auto alignment feature.",
      image: "/placeholder.svg?height=600&width=800",
      link: "/products/free-space-optics-communications",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Principal Products</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Our flagship products representing the core of our technological expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Principal Products Showcase */}
      <section className="w-full py-20 bg-card">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Flagship Products</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These products represent the pinnacle of our innovation and expertise in laser technology, thermal
                mapping, and communications.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-24">
            {principalProducts.map((product, index) => (
              <div key={product.id} id={product.id} className="scroll-mt-20">
                <ScrollReveal direction={index % 2 === 0 ? "left" : "right"}>
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">{product.name}</h3>
                      <p className="text-muted-foreground mb-6">{product.description}</p>
                      <Button asChild className="group">
                        <Link href={product.link}>
                          View Details
                          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Technologies */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Key Technologies</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The core technologies that power our principal products.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="bg-card p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-primary mb-4">Laser Technology</h3>
                <p className="text-muted-foreground">
                  Advanced laser systems for precision cutting, marking, and fabrication with exceptional accuracy and
                  reliability.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-card p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-primary mb-4">Thermal Mapping</h3>
                <p className="text-muted-foreground">
                  Sophisticated thermal imaging and mapping technology for precise temperature monitoring and analysis.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="bg-card p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-primary mb-4">Optical Communications</h3>
                <p className="text-muted-foreground">
                  High-speed, secure optical communication systems for reliable data transmission in various
                  environments.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Explore All Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover our complete range of products and solutions for various applications.
          </p>
          <Button asChild size="lg" className="group">
            <Link href="/products">
              View All Products
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
