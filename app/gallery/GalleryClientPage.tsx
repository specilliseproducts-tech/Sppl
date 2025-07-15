"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"

export default function GalleryClientPage() {
  // Sample gallery categories
  const categories = [
    { id: "products", name: "Products" },
    { id: "installations", name: "Installations" },
    { id: "events", name: "Events" },
    { id: "team", name: "Team" },
  ]

  // State to track active category
  const [activeCategory, setActiveCategory] = useState("products")

  // Sample gallery items with categories
  const galleryItems = [
    ...Array.from({ length: 4 }).map((_, i) => ({
      id: `product-${i}`,
      category: "products",
      title: `Product ${i + 1}`,
      subtitle: "Product Category",
      image: `/placeholder.svg?height=600&width=800&text=Product+Image+${i + 1}`,
    })),
    ...Array.from({ length: 3 }).map((_, i) => ({
      id: `installation-${i}`,
      category: "installations",
      title: `Installation ${i + 1}`,
      subtitle: "Client Installation",
      image: `/placeholder.svg?height=600&width=800&text=Installation+Image+${i + 1}`,
    })),
    ...Array.from({ length: 3 }).map((_, i) => ({
      id: `event-${i}`,
      category: "events",
      title: `Event ${i + 1}`,
      subtitle: "Company Event",
      image: `/placeholder.svg?height=600&width=800&text=Event+Image+${i + 1}`,
    })),
    ...Array.from({ length: 2 }).map((_, i) => ({
      id: `team-${i}`,
      category: "team",
      title: `Team Activity ${i + 1}`,
      subtitle: "Team Building",
      image: `/placeholder.svg?height=600&width=800&text=Team+Image+${i + 1}`,
    })),
  ]

  // Filter gallery items by active category
  const filteredItems = galleryItems.filter((item) => item.category === activeCategory)

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Product Gallery</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore our innovative products and solutions through our visual gallery.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Categories */}
      <section className="w-full py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={category.id === activeCategory ? "default" : "outline"}
                className="min-w-[120px]"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, i) => (
                <ScrollReveal key={item.id} delay={i * 0.05}>
                  <div className="group relative bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <h3 className="text-white font-bold">{item.title}</h3>
                          <p className="text-white/80 text-sm">{item.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-primary mb-2">No items found</h3>
              <p className="text-muted-foreground">No gallery items available for this category yet.</p>
            </div>
          )}

          {/* Load More Button */}
          {filteredItems.length > 0 && (
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load More
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Interested in Our Products?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore our product catalog to learn more about our innovative solutions.
          </p>
          <Button asChild size="lg" className="group">
            <Link href="/products">
              View Products
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
