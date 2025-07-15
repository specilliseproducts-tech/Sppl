import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"

export const metadata = {
  title: "Life at SPPL | Spécialisé Products",
  description: "Discover what it's like to work at Spécialisé Products and our company culture.",
}

export default function LifeAtSPPLPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Life at SPPL</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover our vibrant company culture and what makes Spécialisé Products a great place to work.
            </p>
          </div>
        </div>
      </section>

      {/* Our Culture */}
      <section className="w-full py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Culture</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    At Spécialisé Products, we foster a culture of innovation, collaboration, and continuous learning.
                    Our team members are encouraged to think creatively, share ideas, and push the boundaries of what's
                    possible in laser technology and customized solutions.
                  </p>
                  <p>
                    We believe that our greatest asset is our people, and we're committed to creating an environment
                    where everyone can thrive professionally and personally. Our diverse team brings together experts
                    from various fields, creating a rich tapestry of knowledge and experience.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative aspect-video max-w-md mx-auto rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="SPPL Team Culture"
                  width={600}
                  height={400}
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The core principles that guide our work and relationships.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="bg-card p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-primary mb-4">Innovation</h3>
                <p className="text-muted-foreground">
                  We constantly seek new and better ways to solve problems and create value for our customers.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-card p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-primary mb-4">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for the highest standards in everything we do, from product design to customer service.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="bg-card p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-primary mb-4">Collaboration</h3>
                <p className="text-muted-foreground">
                  We believe in the power of teamwork and partnership, both within our company and with our customers.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team Photos */}
      <section className="w-full py-20 bg-card">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The talented individuals who make Spécialisé Products a success.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-background rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square relative">
                    <Image
                      src={`/placeholder.svg?height=300&width=300&text=Team+Member+${i}`}
                      alt={`Team Member ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-primary">Team Member {i}</h3>
                    <p className="text-sm text-muted-foreground">Position</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="w-full py-20 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Join Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            We're always looking for talented individuals to join our team. Check out our current openings or send us
            your resume.
          </p>
          <Button asChild size="lg" className="group">
            <Link href="/contact">
              View Openings
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
