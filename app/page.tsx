'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import SolutionCard from '@/components/solution-card';
import { HeroSection } from '@/components/hero-section';
import ScrollReveal from '@/components/scroll-reveal';
import ProductShowcaseWrapper from '@/components/product-showcase/product-showcase-wrapper';
import { useSolutions } from '@/hooks/use-queries';

export default function Home() {
  const { data: solutionsData, isLoading } = useSolutions({
    perPage: 6, // Get first 6 solutions for homepage
  });

  const featuredSolutions = solutionsData?.solutions || [];

  return (
    <>
      <HeroSection />

      {/* About Section */}
      

      {/* 3D Product Showcase */}
      <ProductShowcaseWrapper />

      {/* Products Section */}
      <section id="products" className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Our Solution Products
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We design and manufacture cutting-edge technology solutions for
                various industries, focusing on customization and precision.
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
          ) : featuredSolutions.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredSolutions.map((solution: any) => (
                  <SolutionCard
                    key={solution.id}
                    id={solution.id}
                    slug={solution.slug}
                    title={solution.title}
                    subtitle={solution.subtitle}
                    description={solution.description}
                    image={solution.imagePath}
                    link={solution.link}
                    brochureUrl={solution.brochureUrl}
                  />
                ))}
              </div>

              <ScrollReveal delay={0.3}>
                <div className="mt-12 text-center">
                  <Button asChild className="group" size="lg">
                    <Link href="/solutions">
                      View All Solutions
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No solutions available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      
     

    
    </>
  );
}
