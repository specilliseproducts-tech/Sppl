'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import SolutionCard from '@/components/solution-card';
import ScrollReveal from '@/components/scroll-reveal';
import SolutionFilter from '@/components/solution-filter';
import { useSolutions } from '@/hooks/use-queries';
import { Solution } from '../dashboard/solutions/schema';

export default function SolutionsClientPage() {
  // Client component for filtering
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Our Solutions
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive solutions tailored to meet the unique needs of
              various industries.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions with Filtering */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Browse Our Solutions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Use the filters below to find the perfect solution for your
                needs.
              </p>
            </div>
          </ScrollReveal>

          <SolutionsWithFilter />
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="w-full py-20 bg-card">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Industries We Serve
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our solutions are designed to meet the specific needs of various
                industries.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Research & Education',
              'Telecom',
              'Medical',
              'Aerospace & Defense',
              'Manufacturing',
              'Oil & Gas',
              'Petrochemical',
              'Engineering',
            ].map((industry, i) => (
              <ScrollReveal key={industry} delay={i * 0.1}>
                <div
                  className="bg-background p-6 rounded-xl shadow-md hover:shadow-lg 
                transition-all duration-300 hover:-translate-y-1 text-center"
                >
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {industry}
                  </h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
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
    </>
  );
}

function SolutionsWithFilter() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: solutionsData, isLoading } = useSolutions({
    search: searchTerm,
    perPage: 50, // Get all solutions for filtering
  });

  const allSolutions = solutionsData?.solutions || [];

  const handleFilterChange = (solutions: Solution[]) => {
    // This function is called by SolutionFilter component
    // We'll implement the filtering logic based on the filter criteria
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading solutions...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SolutionFilter solutions={allSolutions} onFilterChange={handleFilterChange} />

      {allSolutions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allSolutions.map((solution) => (
            <SolutionCard
              key={solution.id}
              id={solution.id}
              slug={solution.slug}
              title={solution.title}
              subtitle={solution.subtitle}
              description={solution.description}
              image={solution.imagePath}
              link={solution.link}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card rounded-xl">
          <h3 className="text-xl font-bold text-primary mb-2">
            No Solutions Found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your filters to find what you&apos;re looking for.
          </p>
        </div>
      )}
    </>
  );
}
