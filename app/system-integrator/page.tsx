import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"

export const metadata = {
  title: "System Integrator | Spécialisé Products",
  description: "Learn about our system integration capabilities and services.",
}

export default function SystemIntegratorPage() {
  // Sample integration services
  const integrationServices = [
    {
      title: "Custom System Design",
      description: "We design custom integrated systems tailored to your specific requirements and applications.",
      icon: "/placeholder.svg?height=100&width=100",
    },
    {
      title: "Hardware Integration",
      description: "We integrate various hardware components to create cohesive, efficient systems.",
      icon: "/placeholder.svg?height=100&width=100",
    },
    {
      title: "Software Development",
      description: "We develop custom software solutions to control and monitor integrated systems.",
      icon: "/placeholder.svg?height=100&width=100",
    },
    {
      title: "Testing & Validation",
      description: "We thoroughly test and validate integrated systems to ensure optimal performance.",
      icon: "/placeholder.svg?height=100&width=100",
    },
    {
      title: "Installation & Training",
      description: "We provide professional installation services and comprehensive training for your team.",
      icon: "/placeholder.svg?height=100&width=100",
    },
    {
      title: "Ongoing Support",
      description: "We offer continued support and maintenance services for all integrated systems.",
      icon: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">System Integration Services</h1>
            <p className="text-xl text-muted-foreground mb-8">
              We specialize in developing Indian Original Equipment Manufacturer (OEM) and System Integrator (SI)
              solutions in different fields.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="w-full py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Integration Expertise</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    At Spécialisé Products, we excel in integrating various technologies and components to create
                    comprehensive, efficient systems that address complex challenges across industries.
                  </p>
                  <p>
                    Our system integration approach combines our deep technical knowledge with a thorough understanding
                    of industry-specific requirements, resulting in solutions that are both innovative and practical.
                  </p>
                  <p>
                    We take pride in our ability to develop Indian Original Equipment Manufacturer (OEM) and System
                    Integrator (SI) solutions that meet international standards while supporting the Make in India
                    initiative.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative aspect-square max-w-md mx-auto rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="System Integration"
                  width={600}
                  height={600}
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Integration Services */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Integration Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive system integration services to meet your specific needs.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {integrationServices.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-card p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 mb-6 mx-auto">
                    <Image
                      src={service.icon || "/placeholder.svg"}
                      alt={service.title}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3 text-center">{service.title}</h3>
                  <p className="text-muted-foreground text-center">{service.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Process */}
      <section className="w-full py-20 bg-card">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Integration Process</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A systematic approach to ensure successful system integration.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative max-w-4xl mx-auto">
            {/* Process Flow Diagram */}
            <div className="hidden md:block h-2 bg-primary/20 absolute top-1/2 left-0 right-0 -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {["Requirements Analysis", "System Design", "Integration & Testing", "Deployment & Support"].map(
                (step, index) => (
                  <ScrollReveal key={step} delay={index * 0.2}>
                    <div className="relative flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg z-10">
                        {index + 1}
                      </div>
                      <div className="mt-4 text-center">
                        <h3 className="font-bold text-primary">{step}</h3>
                      </div>
                    </div>
                  </ScrollReveal>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Need System Integration Services?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Contact us to discuss how our system integration expertise can help you create efficient, comprehensive
            solutions.
          </p>
          <Button asChild size="lg" className="group">
            <Link href="/contact">
              Get in Touch
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
