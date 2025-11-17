'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/scroll-reveal';
import { usePrincipalProducts } from '@/hooks/use-queries';

interface Props {
  params: {
    slug: string;
    productSlug: string;
    userProductSlug: string;
  };
}

export default function ViewDetailsPage({ params }: Props) {
  const { data: principalProductsData, isLoading } = usePrincipalProducts({
    perPage: 50,
  });

  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [displayUserProduct, setDisplayUserProduct] = useState<any>(null);
  const [principalProduct, setPrincipalProduct] = useState<any>(null);

  useEffect(() => {
    if (principalProductsData?.principalProducts) {
      const foundPrincipalProduct = principalProductsData.principalProducts.find(
        (p: any) => p.slug === params.slug
      );

      console.log('Principal Slug:', params.slug);
      console.log('Product Slug:', params.productSlug);
      console.log('User Product Slug:', params.userProductSlug);
      console.log('Found Principal Product:', foundPrincipalProduct);

      if (foundPrincipalProduct && foundPrincipalProduct.products) {
        // Find master product by slug
        const masterProduct = foundPrincipalProduct.products.find(
          (p: any) => p.slug === params.productSlug
        );

        console.log('Found Master Product:', masterProduct);

        if (masterProduct) {
          setPrincipalProduct(foundPrincipalProduct);
          setCurrentProduct(masterProduct);

          // Find user product by slug
          if (masterProduct.userProducts && params.userProductSlug) {
            const userProduct = masterProduct.userProducts.find(
              (u: any) => u.slug === params.userProductSlug
            );

            console.log('Found User Product:', userProduct);

            if (userProduct) {
              setDisplayUserProduct(userProduct);
            }
          }
        }
      }
    }
  }, [principalProductsData, params.slug, params.productSlug, params.userProductSlug, isLoading]);

  if (isLoading && !currentProduct) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href={`/principal-products/${params.slug}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Principal Product
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Principal Information */}
      {principalProduct && (
        <section className="w-full pt-16 pb-6 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-[260px,1fr] gap-8 items-start rounded-2xl border border-secondary/20 bg-card/60 p-6 shadow-sm">
                  {/* Principal Image */}
                  <div className="flex justify-center">
                    <div className="relative w-60 h-60 rounded-xl border border-secondary/30 bg-background flex items-center justify-center overflow-hidden">
                      {principalProduct.imagePath ? (
                        <Image
                          src={principalProduct.imagePath}
                          alt={principalProduct.title}
                          fill
                          className="object-contain p-4"
                        />
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          No image available
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Principal Content */}
                  <div className="space-y-6">
                    {/* Title & Description */}
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                        {principalProduct.title}
                      </h2>
                      <p className="text-muted-foreground text-sm md:text-base">
                        {principalProduct.description}
                      </p>
                    </div>

                    {/* Key Facts */}
                    {principalProduct.keyFacts && principalProduct.keyFacts.length > 0 && (
                      <div className="rounded-xl bg-secondary/5 border border-secondary/20 p-4">
                        <h3 className="text-sm font-semibold text-secondary mb-3">
                          Key Facts
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {principalProduct.keyFacts.map((fact: string, idx: number) => (
                            <span
                              key={idx}
                              className="inline-flex items-center rounded-full bg-secondary/10 text-secondary px-3 py-1 text-xs font-medium"
                            >
                              {fact}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Product Range Overview Table */}
                    {principalProduct.productRangeOverview && (
                      <div className="rounded-xl bg-secondary/5 border border-secondary/20 p-4">
                        <h3 className="text-sm font-semibold text-secondary mb-3">
                          Product Range Overview
                        </h3>
                        <div className="overflow-x-auto rounded-lg border border-secondary/20 bg-card">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr>
                                {(principalProduct.productRangeOverview.headers || []).map(
                                  (header: string, idx: number) => (
                                    <th
                                      key={idx}
                                      className="px-3 py-2 border-b border-secondary/20 text-left text-xs font-semibold text-foreground bg-muted/50"
                                    >
                                      {header}
                                    </th>
                                  ),
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {(principalProduct.productRangeOverview.rows || []).map(
                                (row: string[], rowIndex: number) => (
                                  <tr
                                    key={rowIndex}
                                    className={rowIndex % 2 === 0 ? 'bg-background' : 'bg-muted/40'}
                                  >
                                    {(principalProduct.productRangeOverview.headers || []).map(
                                      (_: string, colIndex: number) => (
                                        <td
                                          key={colIndex}
                                          className="px-3 py-2 border-b border-secondary/10 text-xs text-muted-foreground"
                                        >
                                          {row?.[colIndex] || ''}
                                        </td>
                                      ),
                                    )}
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-6 justify-start">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/principal-products/${params.slug}/products/${params.productSlug}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Product
                  </Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
                {/* Image Section - Left */}
                <div className="flex justify-center">
                  {displayUserProduct?.images && displayUserProduct.images.length > 0 ? (
                    <div className="relative h-96 w-96 rounded-xl overflow-hidden shadow-lg bg-card border-2 border-secondary/30 flex items-center justify-center">
                      <Image
                        src={displayUserProduct.images[0]}
                        alt={displayUserProduct?.title || 'User product'}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                  ) : currentProduct?.images && currentProduct.images.length > 0 ? (
                    <div className="relative h-96 w-96 rounded-xl overflow-hidden shadow-lg bg-card border-2 border-secondary/30 flex items-center justify-center">
                      <Image
                        src={currentProduct.images[0]}
                        alt={currentProduct?.title || 'Master product'}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                  ) : (
                    <div className="relative h-96 w-96 rounded-xl overflow-hidden shadow-lg bg-card border-2 border-secondary/30 flex items-center justify-center">
                      <span className="text-muted-foreground">No images available</span>
                    </div>
                  )}
                </div>
                
                {/* Content Section - Right */}
                <div className="space-y-6">
                  {/* Title Section */}
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                      {displayUserProduct?.title || currentProduct?.title || 'Product Title'}
                    </h1>
                    {(displayUserProduct?.subtitle || currentProduct?.subtitle) && (
                      <p className="text-lg text-muted-foreground mb-6">
                        {displayUserProduct?.subtitle || currentProduct?.subtitle}
                      </p>
                    )}
                  </div>
                  
                  {/* Key Features Section */}
                  {displayUserProduct?.keyFeatures && displayUserProduct.keyFeatures.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-secondary mb-4">Key Features</h3>
                      <div className="flex flex-wrap gap-2">
                        {displayUserProduct.keyFeatures.map((feature: string, idx: number) => (
                          <span
                            key={idx}
                            className="inline-flex items-center rounded-full bg-secondary/10 text-secondary px-3 py-1 text-sm font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Features - Master Product (only if no user product) */}
                  {!displayUserProduct && currentProduct?.keyFeatures && currentProduct.keyFeatures.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-secondary mb-4">Key Features</h3>
                      <ul className="space-y-3">
                        {currentProduct.keyFeatures.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 text-foreground">
                            <span className="text-secondary font-bold mt-1">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* User Product Details Section */}
      {displayUserProduct && (
        <section className="w-full py-20 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <div className="mb-12">
                  <h2 className="text-4xl font-bold text-primary mb-2">Product Information</h2>
                  <p className="text-muted-foreground">Complete details about {displayUserProduct.title}</p>
                </div>

                <div className="space-y-10">
                  {/* Specification Table */}
                  {displayUserProduct.keyTechnicalSpecifications && (
                    <div>
                      <h3 className="text-xl font-bold text-secondary mb-6">Specification Table</h3>
                      <div className="bg-card rounded-lg p-0 border-2 border-secondary/30 overflow-hidden">
                        <table className="w-full border-collapse">
                          <tbody>
                            {displayUserProduct.keyTechnicalSpecifications
                              .split('\n')
                              .map((item: string, idx: number) => {
                                const line = item.trim();
                                if (!line) return null;
                                const [label, ...rest] = line.split(':');
                                const value = rest.join(':').trim();
                                return (
                                  <tr key={idx} className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/40'}>
                                    <td className="w-1/3 border-b border-secondary/20 px-4 py-3 font-medium text-foreground">
                                      {label || '-'}
                                    </td>
                                    <td className="border-b border-secondary/20 px-4 py-3 text-muted-foreground">
                                      {value || ''}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Applications */}
                  {displayUserProduct.typicalApplications && (
                    <div>
                      <h3 className="text-xl font-bold text-secondary mb-6">Applications</h3>
                      <div className="bg-card rounded-lg p-6 border-2 border-secondary/30">
                        <ul className="space-y-2">
                          {displayUserProduct.typicalApplications.split('\n').map((item: string, idx: number) => {
                            const line = item.trim();
                            if (!line) return null;
                            return (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="mt-1 text-secondary">➜</span>
                                <span className="text-foreground text-sm">{line}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Contact us to learn more about this product and how it can benefit your organization.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  Get in Touch
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="group">
                <Link href={`/principal-products/${params.slug}`}>
                  View All Products
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
