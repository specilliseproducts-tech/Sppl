'use client';
import { useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';

import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product-card';
import SolutionCard from '@/components/solution-card';
import ScrollReveal from '@/components/scroll-reveal';
import InquiryPopup from '@/components/inquiry-popup';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useSolutions, usePrincipalProducts } from '@/hooks/use-queries';
import { useAutoPopup } from '@/hooks/use-auto-popup';
import { useSubmitInquiry } from '@/hooks/use-submit-inquiry';

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

      {/* Products Section */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Browse Our Products
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our comprehensive range of solutions and principal products.
              </p>
            </div>
          </ScrollReveal>

          {/* Our Solution Products Section */}
          <SolutionsSection />

          {/* Principal Products Section */}
          <PrincipalProductsSection />
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

// Our Solution Products Section
function SolutionsSection() {
  const { data: solutionsData, isLoading } = useSolutions({
    perPage: 50, // Get all solutions
  });

  const solutions = solutionsData?.solutions || [];

  // Initialize autoplay plugin with useMemo to prevent recreation on each render
  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: 3000, // 3 seconds
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    []
  );

  return (
    <div className="mb-20">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Our Solution Products
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our innovative technology solutions designed for various industries.
          </p>
        </div>
      </ScrollReveal>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading solutions...</p>
          </div>
        </div>
      ) : solutions.length > 0 ? (
        <>
          <div className="px-4 md:px-8 lg:px-12">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              plugins={[autoplayPlugin]}
              className="w-full"
            >
              <CarouselContent>
                {solutions.map((solution: any) => (
                  <CarouselItem key={solution.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <SolutionCard
                        id={solution.id}
                        slug={solution.slug}
                        title={solution.title}
                        subtitle={solution.subtitle}
                        description={solution.description}
                        image={solution.imagePath}
                        link={solution.link}
                        brochureUrl={solution.brochureUrl}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 md:-left-12" />
              <CarouselNext className="right-0 md:-right-12" />
            </Carousel>
          </div>
          <div className="mt-8 text-center">
            <Button asChild className="group" size="lg">
              <Link href="/solutions">
                View Our Solution Products
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-card rounded-xl">
          <h3 className="text-xl font-bold text-primary mb-2">
            No Solutions Available
          </h3>
          <p className="text-muted-foreground">
            Check back later for our solution products.
          </p>
        </div>
      )}
    </div>
  );
}

// Principal Products Section
function PrincipalProductsSection() {
  const { data: principalProductsData, isLoading } = usePrincipalProducts({
    perPage: 50, // Get all principal products
  });

  const principalProducts = principalProductsData?.principalProducts || [];

  return (
    <div>
      <ScrollReveal>
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Principal Products
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our principal products and partnerships with leading technology providers.
          </p>
        </div>
      </ScrollReveal>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading principal products...</p>
          </div>
        </div>
      ) : principalProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {principalProducts.map((product: any) => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                title={product.title}
                description={product.description?.substring(0, 150) + (product.description?.length > 150 ? '...' : '') || 'No description available'}
                image={product.imagePath}
                features={product.keyFacts || []}
                href={`/principal-products/${product.slug}`}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="group">
              <Link href="/principal-products">
                View All Principal Products
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-card rounded-xl">
          <h3 className="text-xl font-bold text-primary mb-2">
            No Principal Products Available
          </h3>
          <p className="text-muted-foreground">
            Check back later for our principal products.
          </p>
        </div>
      )}
    </div>
  );
}
