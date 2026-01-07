'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/scroll-reveal';
import { usePrincipalProducts } from '@/hooks/use-queries';

export default function PrincipalProductsClientPage() {
  const { data: principalProductsData, isLoading } = usePrincipalProducts({
    perPage: 50, // Get all principal products
  });

  const principalProducts = principalProductsData?.principalProducts || [];

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Principal Products
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover our principal products and partnerships with leading
              technology providers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Principal Products Overview */}
      <section className="w-full py-20 bg-card">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Our Principal Products
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We represent leading global brands and provide comprehensive
                support for their innovative products and solutions.
              </p>
            </div>
          </ScrollReveal>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">
                  Loading principal products...
                </p>
              </div>
            </div>
          ) : principalProducts.length > 0 ? (
            <div className="space-y-24">
              {principalProducts.map((product, index) => (
                <div
                  key={product.id}
                  id={product.slug}
                  className="scroll-mt-20"
                >
                  <ScrollReveal direction="left">
                    <div className="flex flex-col gap-8">
                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold text-primary text-center">
                        {product.title}
                      </h3>
                      
                      {/* Image */}
                      <div className="flex justify-center">
                        <div className="relative h-80 w-full max-w-md rounded-xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
                          <Image
                            src={product.imagePath || '/placeholder.svg'}
                            alt={product.title}
                            fill
                            className="object-contain p-4"
                          />
                        </div>
                      </div>

                      {/* Product Range Overview Table */}
                      {product.productRangeOverview && 
                       (product.productRangeOverview.headers?.length > 0 || product.productRangeOverview.rows?.length > 0) && (
                        <div>
                          <h4 className="text-xl font-semibold text-primary mb-4 text-center">
                            Product Range Overview
                          </h4>
                          <div className="bg-card rounded-xl shadow-lg p-4 border-2 border-secondary/30">
                            <div className="overflow-x-auto rounded-lg border border-secondary/20 bg-background">
                              <table className="w-full border-collapse">
                                <thead>
                                  <tr>
                                    {(product.productRangeOverview.headers || []).map(
                                      (header: string, idx: number) => (
                                        <th
                                          key={idx}
                                          className="px-4 py-3 border-b-2 border-secondary/30 text-left text-sm font-semibold text-secondary bg-secondary/10"
                                        >
                                          {header}
                                        </th>
                                      ),
                                    )}
                                  </tr>
                                </thead>
                                <tbody>
                                  {(product.productRangeOverview.rows || []).map(
                                    (row: string[], rowIndex: number) => (
                                      <tr
                                        key={rowIndex}
                                        className={rowIndex % 2 === 0 ? 'bg-card' : 'bg-background'}
                                      >
                                        {(product.productRangeOverview.headers || ['']).map(
                                          (_: string, colIndex: number) => {
                                            const cellContent = row?.[colIndex] || '';
                                            // Check if content has newlines (bullet points)
                                            const hasNewlines = cellContent.includes('\n');
                                            
                                            return (
                                              <td
                                                key={colIndex}
                                                className="px-4 py-3 border-b border-secondary/10 text-sm text-foreground"
                                              >
                                                {hasNewlines ? (
                                                  <ul className="list-none space-y-1">
                                                    {cellContent
                                                      .split('\n')
                                                      .filter((line: string) => line.trim())
                                                      .map((line: string, lineIdx: number) => {
                                                        // Remove existing bullet symbols if present
                                                        const cleanLine = line.trim().replace(/^[•\-\*]\s*/, '');
                                                        return (
                                                          <li key={lineIdx} className="flex items-start text-sm">
                                                            <span className="text-secondary mr-2">•</span>
                                                            <span>{cleanLine}</span>
                                                          </li>
                                                        );
                                                      })}
                                                  </ul>
                                                ) : (
                                                  <span>{cellContent}</span>
                                                )}
                                              </td>
                                            );
                                          },
                                        )}
                                      </tr>
                                    ),
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Buttons */}
                      <div className="flex gap-3 justify-center">
                        <Button asChild className="group">
                          <Link
                            href={product.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Learn More
                            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                          </Link>
                        </Button>
                        <Button variant="outline" asChild className="group">
                          <Link href={`/principal-products/${product.slug}`}>
                            View Details
                            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-bold text-primary mb-2">
                No Principal Products Available
              </h3>
              <p className="text-muted-foreground">
                Please check back later for our principal products.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Key Benefits */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Why Choose Our Principal Products?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We provide comprehensive support and expertise for every product
                we represent.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Expert Support',
                description:
                  'Our team provides technical expertise and comprehensive support for all principal products.',
              },
              {
                title: 'Quality Assurance',
                description:
                  'We represent only the highest quality products from trusted global manufacturers.',
              },
              {
                title: 'Local Presence',
                description:
                  'Local representation with global reach for seamless service and support.',
              },
              {
                title: 'Training & Education',
                description:
                  'Comprehensive training programs and educational resources for our products.',
              },
              {
                title: 'Custom Solutions',
                description:
                  'Tailored solutions and configurations to meet your specific requirements.',
              },
              {
                title: 'Ongoing Partnership',
                description:
                  'Long-term partnerships with continuous support and product development.',
              },
            ].map((benefit, i) => (
              <ScrollReveal key={benefit.title} delay={i * 0.1}>
                <div className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Interested in Our Principal Products?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Contact us to learn more about our principal products and how they
            can benefit your organization.
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
