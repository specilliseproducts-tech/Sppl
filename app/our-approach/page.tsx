import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"
import ProcessStep from "@/components/process-step"

export const metadata = {
  title: "Our Approach | Spécialisé Products",
  description: "Learn about our comprehensive approach to delivering customized solutions.",
}

export default function OurApproachPage() {
  // Our approach steps
  const approachSteps = [
    {
      number: "01",
      title: "Initial Discussion",
      description: "Initial discussion with prospects on what is needed? What do they imagine about his solution?",
    },
    {
      number: "02",
      title: "Broad Outline",
      description: "Make broad outline on what is practical & possible?",
    },
    {
      number: "03",
      title: "Fine Tuning Requirements",
      description: "Many rounds of interaction to fine tune the requirements of the customer.",
    },
    {
      number: "04",
      title: "First Proposal",
      description: "Once agreed, send proposal with detailed specifications and performance commitment.",
    },
    {
      number: "05",
      title: "Preliminary Design Review",
      description:
        'When purchase process is completed, we meet again with "Preliminary Design Review" (PDR) so that we are in sync with the customer\'s requirement.',
    },
    {
      number: "06",
      title: "Critical Design Review",
      description: "After PDR, we go for Critical Design Review (CDR) and final design.",
    },
    {
      number: "07",
      title: "Manufacturing",
      description: "Once Final Design is completed, we go for manufacturing.",
    },
    {
      number: "08",
      title: "Feedback Process",
      description: "We call customer to see the manufactured system and request for the feedback.",
    },
    {
      number: "09",
      title: "Delivery",
      description: "Once agreed, we make changes and proceed for delivery.",
    },
    {
      number: "10",
      title: "Installation, Training and Support",
      description: "We visit customer for installation & training. We assure for long term support.",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Our Approach</h1>
            <p className="text-xl text-muted-foreground mb-8">
              We follow a comprehensive approach to ensure that we deliver solutions that perfectly match our customers'
              requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Approach Overview */}
      <section className="w-full py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Customer-Centric Approach</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    At Spécialisé Products, we believe in a collaborative and iterative approach to developing
                    customized solutions. We work closely with our customers throughout the entire process, from initial
                    concept to final delivery and support.
                  </p>
                  <p>
                    Our approach is designed to ensure that we fully understand our customers' needs and deliver
                    solutions that exceed their expectations. We focus on clear communication, thorough planning, and
                    rigorous quality control at every stage.
                  </p>
                  <p>
                    This systematic approach has helped us build long-lasting relationships with our customers and
                    deliver innovative solutions that address their most challenging requirements.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative aspect-video max-w-md mx-auto rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Our Approach"
                  width={600}
                  height={400}
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Approach Steps */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Process</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A step-by-step approach to delivering customized solutions that meet our customers' specific
                requirements.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {approachSteps.map((step) => (
              <ProcessStep key={step.number} number={step.number} title={step.title} description={step.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="w-full py-20 bg-card">
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
                      <h3 className="font-bold text-primary">{approachSteps[step - 1].title}</h3>
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
                      <h3 className="font-bold text-primary">{approachSteps[step - 1].title}</h3>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Benefits of Our Approach</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                How our systematic approach benefits our customers and ensures successful project outcomes.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="bg-card p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-primary mb-4">Clear Understanding</h3>
                <p className="text-muted-foreground">
                  Our iterative approach ensures that we fully understand your requirements before proceeding with
                  design and manufacturing.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-card p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-primary mb-4">Quality Assurance</h3>
                <p className="text-muted-foreground">
                  Multiple review stages and feedback loops ensure that the final product meets the highest quality
                  standards.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="bg-card p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-primary mb-4">Long-term Support</h3>
                <p className="text-muted-foreground">
                  Our commitment doesn't end with delivery. We provide comprehensive installation, training, and ongoing
                  support.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-br from-primary/20 to-secondary/20">
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
