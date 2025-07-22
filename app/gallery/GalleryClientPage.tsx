"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"
import { useGalleryItems } from "@/hooks/use-queries"
import { galleryCategories } from "@/lib/constants"
import type { GallerySelect } from "@/app/dashboard/gallery/schema"

export default function GalleryClientPage() {
  // State to track active category
  const [activeCategory, setActiveCategory] = useState("Products")

  // Fetch gallery items with category filter
  const { data: galleryData, isLoading } = useGalleryItems({
    category: activeCategory,
    perPage: 50, // Adjust based on needs
  })

  const galleryItems = galleryData?.galleryItems || []

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
            {galleryCategories.map((category) => (
              <Button
                key={category.id}
                variant={category.name === activeCategory ? "default" : "outline"}
                className="min-w-[120px]"
                onClick={() => setActiveCategory(category.name)}
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
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl overflow-hidden shadow-md animate-pulse">
                  <div className="aspect-[4/3] bg-muted"></div>
                </div>
              ))}
            </div>
          ) : galleryItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item: GallerySelect, i: number) => (
                <ScrollReveal key={item.id} delay={i * 0.05}>
                  <div className="group relative bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={item.imagePath || "/placeholder.svg"}
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
              <p className="text-muted-foreground">
                No gallery items available for {activeCategory} category yet.
              </p>
            </div>
          )}

          {/* Load More Button */}
          {galleryItems.length > 0 && !isLoading && (
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
