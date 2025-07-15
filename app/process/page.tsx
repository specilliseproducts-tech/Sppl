import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProcessStep from "@/components/process-step"
import ScrollReveal from "@/components/scroll-reveal"
import { processSteps } from "@/lib/constants"

export const metadata = {
  title: "Our Process | Spécialisé Products",
  description: "Learn about our comprehensive process for delivering customized solutions.",
}

export default function ProcessPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Our Process</h1>
            <p className="text-xl text-muted-foreground mb-8">
              We follow a comprehensive process to ensure that we deliver solutions that perfectly match our customers'
              requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="w-full py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step) => (
              <ProcessStep key={step.number} number={step.number} title={step.title} description={step.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Process Flow</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A visual representation of our step-by-step approach to delivering customized solutions.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative max-w-4xl mx-auto">
            {/* Process Flow Diagram - Simple version for now */}
            <div className="hidden md:block h-2 bg-primary/20 absolute top-1/2 left-0 right-0 -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[1, 2, 3, 4, 5].map((step) => (
                <ScrollReveal key={step} delay={step * 0.1}>
                  <div className="relative flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg z-10">
                      {step}
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="font-bold text-primary">{processSteps[step - 1].title}</h3>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-8">
              {[6, 7, 8, 9, 10].map((step) => (
                <ScrollReveal key={step} delay={(step - 5) * 0.1}>
                  <div className="relative flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg z-10">
                      {step}
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="font-bold text-primary">{processSteps[step - 1].title}</h3>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Ready to Start Your Project?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Let's begin the journey of creating a customized solution for your specific needs.
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
