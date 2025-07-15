"use client"
import { useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import ScrollReveal from "@/components/scroll-reveal"
import ProductFilter from "@/components/product-filter"
import { products } from "@/lib/constants"

export default function ProductsClientPage() {
  // Client component for filtering
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Our Products</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore our range of high-precision laser-based technologies and customized solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Products with Filtering */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Browse Our Products</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Use the filters below to find the perfect solution for your needs.
              </p>
            </div>
          </ScrollReveal>

          <ProductsWithFilter />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Need a Customized Solution?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            We specialize in creating tailored solutions to meet your specific requirements. Contact us to discuss your
            needs.
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

function ProductsWithFilter() {
  const [filteredProducts, setFilteredProducts] = useState(products)

  return (
    <>
      <ProductFilter onFilterChange={setFilteredProducts} />

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug}
              title={product.name}
              description={product.shortDescription}
              image={product.imagePath}
              features={product.features.slice(0, 3)}
              color={product.color}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card rounded-xl">
          <h3 className="text-xl font-bold text-primary mb-2">No Products Found</h3>
          <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
        </div>
      )}
    </>
  )
}
