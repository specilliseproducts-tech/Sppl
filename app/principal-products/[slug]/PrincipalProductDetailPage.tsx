'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ScrollReveal from '@/components/scroll-reveal';
import { usePrincipalProducts } from '@/hooks/use-queries';
import { ProductCard } from './ProductCard';

interface Props {
  slug: string;
}

export default function PrincipalProductDetailPage({ slug }: Props) {
  const { data: principalProductsData, isLoading } = usePrincipalProducts({
    perPage: 50,
  });

  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [masterProducts, setMasterProducts] = useState<any[]>([]);

  useEffect(() => {
    if (principalProductsData?.principalProducts) {
      const products = principalProductsData.principalProducts;
      const product = products.find((p: any) => p.slug === slug);
      
      if (product) {
        setCurrentProduct(product);
        // Set master products from the current principal product
        setMasterProducts(product.products || []);
      }
    }
  }, [principalProductsData, slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The principal product you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/principal-products">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Principal Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Navigation between principal products
  const allPrincipalProducts = principalProductsData?.principalProducts || [];
  const currentIndex = allPrincipalProducts.findIndex((p: any) => p.slug === slug);
  const prevProduct = currentIndex > 0 ? allPrincipalProducts[currentIndex - 1] : null;
  const nextProduct = currentIndex < allPrincipalProducts.length - 1 ? allPrincipalProducts[currentIndex + 1] : null;

  return (
    <>
      {/* Hero Section: Image & Title */}
      <section className="relative w-full py-16 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              {/* Back Button */}
              <div className="mb-8">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/principal-products">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to Principal Products
                  </Link>
                </Button>
              </div>
              
              {/* Title & Image */}
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-8">
                  {currentProduct.title}
                </h1>
                <div className="flex justify-center">
                  <div className="relative w-64 h-64 rounded-xl overflow-hidden bg-background border-2 border-secondary/30 flex items-center justify-center shadow-lg">
                    <Image
                      src={currentProduct.imagePath || '/placeholder.svg'}
                      alt={currentProduct.title}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Product Range Overview Section */}
      {currentProduct.productRangeOverview && 
       (currentProduct.productRangeOverview.headers?.length > 0 || currentProduct.productRangeOverview.rows?.length > 0) && (
        <section className="w-full py-20 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                    Product Range Overview
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Comprehensive overview of our product range and specifications.
                  </p>
                  </div>
                  
                <div className="bg-card rounded-xl shadow-lg p-6 border-2 border-secondary/30">
                  <div className="overflow-x-auto rounded-lg border border-secondary/20 bg-background">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          {(currentProduct.productRangeOverview.headers || []).map(
                            (header: string, idx: number) => (
                              <th
                                key={idx}
                                className="px-4 py-3 border-b-2 border-secondary/30 text-left text-base font-semibold text-secondary bg-secondary/10"
                              >
                                {header}
                              </th>
                            ),
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {(currentProduct.productRangeOverview.rows || []).map(
                          (row: string[], rowIndex: number) => (
                            <tr
                              key={rowIndex}
                              className={rowIndex % 2 === 0 ? 'bg-card' : 'bg-background'}
                            >
                              {(currentProduct.productRangeOverview.headers || ['']).map(
                                (_: string, colIndex: number) => {
                                  const cellContent = row?.[colIndex] || '';
                                  // Check if content has newlines (bullet points)
                                  const hasNewlines = cellContent.includes('\n');
                                  
                                  return (
                                    <td
                                      key={colIndex}
                                      className="px-4 py-3 border-b border-secondary/10 text-base text-foreground"
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
                                                <li key={lineIdx} className="flex items-start text-base">
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
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-6xl mx-auto">
              {/* Heading with underline */}
              <div className="mb-12 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-3">
                  About {currentProduct.title}
                </h2>
                <div className="h-0.5 bg-secondary w-full"></div>
              </div>

              {/* Description with special formatting */}
              {currentProduct.description && (
                <div className="bg-card rounded-xl shadow-lg p-8">
                  <div className="text-lg md:text-xl text-muted-foreground leading-relaxed text-left">
                    {currentProduct.description
                      .split(/\n\s*\n/)
                      .filter((para: string) => para.trim())
                      .map((paragraph: string, idx: number) => {
                        const trimmedPara = paragraph.trim().replace(/\n/g, ' ');
                        // Check if paragraph starts with **Heading:** format
                        const headingMatch = trimmedPara.match(/^\*\*([^*]+):\*\*\s*(.+)$/);
                        
                        if (headingMatch) {
                          // Special highlighted section with heading
                          const heading = headingMatch[1];
                          const content = headingMatch[2];
                          return (
                            <div key={idx} className="mb-6 last:mb-0 bg-secondary/5 rounded-lg border-l-4 border-secondary pl-6 pr-4 py-4">
                              <h3 className="font-bold text-primary mb-2">{heading}</h3>
                              <p className="text-muted-foreground">{content}</p>
                            </div>
                          );
                        } else {
                          // Regular paragraph
                          return (
                            <p key={idx} className="mb-6 last:mb-0">
                              {trimmedPara}
                            </p>
                          );
                        }
                      })}
                  </div>
                </div>
              )}

              {/* Key Facts */}
              {currentProduct.keyFacts && currentProduct.keyFacts.length > 0 && (
                <div className="mt-8 bg-card rounded-xl shadow-lg p-8">
                  <div className="flex flex-wrap gap-3 justify-center">
                    {currentProduct.keyFacts.map((fact: string, idx: number) => (
                      <span
                        key={idx}
                        className="inline-flex items-center rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium"
                      >
                        {fact}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Sections */}
              {currentProduct.customSections && 
               Array.isArray(currentProduct.customSections) && 
               currentProduct.customSections.length > 0 && (
                <div className="mt-12 space-y-8">
                  {currentProduct.customSections.map((section: any, sectionIndex: number) => {
                    // Ensure section has title and descriptions
                    if (!section.title || !section.descriptions || !Array.isArray(section.descriptions) || section.descriptions.length === 0) {
                      return null;
                    }

                    return (
                      <div key={sectionIndex} className="bg-card rounded-xl shadow-lg p-8 border-2 border-secondary/30">
                        <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                          {section.title}
                        </h3>
                        <div className="space-y-4">
                          {section.descriptions.map((description: string, descIndex: number) => {
                            if (!description || !description.trim()) return null;
                            
                            // Process bold formatting (**text**)
                            const processedDescription = description
                              .split(/(\*\*.*?\*\*)/g)
                              .map((part: string, partIndex: number) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                  const boldText = part.slice(2, -2);
                                  return <strong key={partIndex} className="font-bold text-primary">{boldText}</strong>;
                                }
                                return <span key={partIndex}>{part}</span>;
                              });

                            return (
                              <p 
                                key={descIndex} 
                                className="text-lg text-muted-foreground leading-relaxed"
                              >
                                {processedDescription}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Master Products Section */}
      {masterProducts && masterProducts.length > 0 && (
        <section className="w-full py-20 bg-background border-t-2 border-secondary/30">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Master Products
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore our comprehensive range of master products and solutions.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {masterProducts.map((product: any, index: number) => (
                <ScrollReveal key={product.id || index} delay={index * 0.1}>
                  <ProductCard
                    product={product}
                    productIndex={index}
                    principalProductSlug={slug}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      {(prevProduct || nextProduct) && (
        <section className="w-full py-20 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center">
                  {prevProduct ? (
                    <Button variant="outline" asChild className="group">
                      <Link href={`/principal-products/${prevProduct.slug}`}>
                        <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        {prevProduct.title}
                      </Link>
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  
                  {nextProduct ? (
                    <Button variant="outline" asChild className="group">
                      <Link href={`/principal-products/${nextProduct.slug}`}>
                        {nextProduct.title}
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Interested in {currentProduct.title}?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Contact us to learn more about this principal product and how it can benefit your organization.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  Get in Touch
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="group">
                <Link href={currentProduct.link} target="_blank" rel="noopener noreferrer">
                  Visit Official Site
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
