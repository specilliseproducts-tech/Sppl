import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"
import { collaborators } from "@/lib/constants"

export const metadata = {
  title: "Collaborators | Spécialisé Products",
  description: "Learn about our technology partners who help us provide comprehensive solutions.",
}

export default function CollaboratorsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Our Collaborators</h1>
            <p className="text-xl text-muted-foreground mb-8">
              We work with leading technology partners to provide comprehensive solutions to our customers.
            </p>
          </div>
        </div>
      </section>

      {/* Collaborators List */}
      <section className="w-full py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {collaborators.map((collaborator, index) => (
              <div key={collaborator.id} id={collaborator.id} className="scroll-mt-20">
                <ScrollReveal direction={index % 2 === 0 ? "left" : "right"}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="md:col-span-1">
                      <div className="bg-background p-8 rounded-xl flex items-center justify-center">
                        <Image
                          src={collaborator.logo || "/placeholder.svg"}
                          alt={collaborator.name}
                          width={200}
                          height={200}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <h2 className="text-3xl font-bold text-primary mb-4">{collaborator.name}</h2>
                      <div className="text-muted-foreground space-y-4 mb-6">
                        {collaborator.longDescription.split("\n\n").map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                      <Button asChild variant="outline" className="group">
                        <Link href={collaborator.website} target="_blank" rel="noopener noreferrer">
                          Visit Website
                          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>

                {index < collaborators.length - 1 && <div className="w-full h-px bg-muted my-16"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Become a Partner</h2>
              <p className="text-muted-foreground mb-8">
                We're always looking for new technology partners to help us provide the best solutions to our customers.
                If you're interested in collaborating with us, please get in touch.
              </p>
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  Contact Us
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
