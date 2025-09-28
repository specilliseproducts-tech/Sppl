'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product-card';
import ScrollReveal from '@/components/scroll-reveal';
import ProductFilter from '@/components/product-filter';
import InquiryPopup from '@/components/inquiry-popup';
import { useProducts } from '@/hooks/use-queries';
import { useAutoPopup } from '@/hooks/use-auto-popup';
import { useSubmitInquiry } from '@/hooks/use-submit-inquiry';
import { Product } from '../dashboard/products/schema';

export default function ProductsClientPage() {
  const { isOpen, closePopup } = useAutoPopup({ delay: 25000 }); // Show after 25 seconds
  const submitInquiry = useSubmitInquiry();

  const handleInquirySubmit = (data: any) => {
    submitInquiry.mutate(data);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Our Products
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore our range of high-precision laser-based technologies and
              customized solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Products with Filtering */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Browse Our Products
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Use the filters below to find the perfect solution for your
                needs.
              </p>
            </div>
          </ScrollReveal>

          <ProductsWithFilter />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Need a Customized Solution?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            We specialize in creating tailored solutions to meet your specific
            requirements. Contact us to discuss your needs.
          </p>
          <Button asChild size="lg" className="group">
            <Link href="/contact">
              Get in Touch
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Inquiry Popup */}
      <InquiryPopup
        isOpen={isOpen}
        onClose={closePopup}
        onSubmit={handleInquirySubmit}
      />
    </>
  );
}

function ProductsWithFilter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const { data: productsData, isLoading } = useProducts({
    search: searchTerm,
    perPage: 50, // Get all products for filtering
  });

  const allProducts = productsData?.products || [];

  // Filter products by category
  const filteredProducts = categoryFilter
    ? allProducts.filter((product) => product.category === categoryFilter)
    : allProducts;

  const handleFilterChange = (products: Product[]) => {
    // This function is called by ProductFilter component
    // We'll implement the filtering logic based on the filter criteria
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProductFilter onFilterChange={handleFilterChange} />

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
          <h3 className="text-xl font-bold text-primary mb-2">
            No Products Found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your filters to find what you&apos;re looking for.
          </p>
        </div>
      )}
    </>
  );
}
