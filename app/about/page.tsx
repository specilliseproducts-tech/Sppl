import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/feature-card"
import ScrollReveal from "@/components/scroll-reveal"
import { strengths, aboutCompany } from "@/lib/constants"

export const metadata = {
  title: "About Us | Spécialisé Products",
  description: "Learn about Spécialisé Products, our history, vision, mission, and strengths.",
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">About Spécialisé Products</h1>
            <p className="text-xl text-muted-foreground mb-8">
              With over 30 years of experience, we provide innovative, customized solutions for demanding applications.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="w-full py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{aboutCompany.title}</h2>
                <div className="text-muted-foreground space-y-4">
                  {aboutCompany.description.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative aspect-square max-w-md mx-auto rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Our Team"
                  width={600}
                  height={600}
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal>
              <div className="bg-card p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
                <p className="text-muted-foreground">{aboutCompany.vision}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-card p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
                <p className="text-muted-foreground">{aboutCompany.mission}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Strengths */}
      <section className="w-full py-20 bg-card">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Strengths</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                What sets us apart and enables us to deliver exceptional solutions to our customers.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {strengths.map((strength, index) => (
              <FeatureCard key={index} icon={strength.icon} title={strength.title} description={strength.description} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Ready to Work With Us?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Let's collaborate to create customized solutions that meet your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="group">
              <Link href="/products">
                Explore Our Products
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
