'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ScrollReveal from '@/components/scroll-reveal';
import { usePrincipalProducts } from '@/hooks/use-queries';

interface Props {
  params: {
    slug: string;
    productSlug: string;
  };
}

export default function ProductPage({ params }: Props) {
  const { data: principalProductsData, isLoading } = usePrincipalProducts({
    perPage: 50,
  });

  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [principalProduct, setPrincipalProduct] = useState<any>(null);

  // Log params for debugging
  useEffect(() => {
    console.log('🔍 Page Params:', {
      slug: params.slug,
      productSlug: params.productSlug,
      type: {
        slugType: typeof params.slug,
        productSlugType: typeof params.productSlug,
      }
    });
  }, [params]);

  useEffect(() => {
    if (principalProductsData?.principalProducts && !isLoading) {
      const foundPrincipalProduct = principalProductsData.principalProducts.find(
        (p: any) => p.slug === params.slug
      );

      if (foundPrincipalProduct) {
        setPrincipalProduct(foundPrincipalProduct);
        
        if (foundPrincipalProduct.products) {
          // Debug: log all products and their slugs
          const debug = `Principal: ${foundPrincipalProduct.slug}\nProducts:\n${foundPrincipalProduct.products
            .map((p: any, i: number) => `  [${i}] slug="${p.slug}" title="${p.title}"`)
            .join('\n')}\nLooking for: ${params.productSlug}`;
          console.log('DEBUG:', debug);

          // Try to find product by slug
          let product = foundPrincipalProduct.products.find(
            (p: any) => p.slug === params.productSlug
          );

          // If not found by slug, try by index (for backward compatibility)
          if (!product && !isNaN(Number(params.productSlug))) {
            product = foundPrincipalProduct.products[Number(params.productSlug)];
            console.log(`Product found by index [${params.productSlug}]:`, product);
          }

          if (product) {
            setCurrentProduct(product);
          } else {
            console.warn(`Product not found with slug: ${params.productSlug}`);
            // Show first product as fallback for now
            if (foundPrincipalProduct.products.length > 0) {
              console.log('Showing first product as fallback');
              setCurrentProduct(foundPrincipalProduct.products[0]);
            }
          }
        }
      }
    }
  }, [principalProductsData, params.slug, params.productSlug, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
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
      {/* Hero Section: Navigation, Title & Images */}
      {currentProduct && (
        <section className="relative w-full py-16 bg-gradient-to-br from-primary/20 to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                {/* Back Button */}
                <div className="mb-8">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/principal-products/${params.slug}`}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Principal Product
                    </Link>
                  </Button>
                </div>

                {/* Title & Subtitle */}
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
                    {currentProduct.title || 'Untitled Master Product'}
                  </h1>
                  {currentProduct.subtitle && (
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                      {currentProduct.subtitle}
                    </p>
                  )}
                </div>

                {/* Images - Only show if images exist, centered */}
                {currentProduct.images && currentProduct.images.length > 0 && (
                  <div className="flex justify-center">
                    <div className="relative h-64 w-full max-w-lg rounded-xl overflow-hidden shadow-lg bg-background border-2 border-secondary/30 flex items-center justify-center">
                      <Image
                        src={currentProduct.images[0]}
                        alt={currentProduct.title || 'Master product'}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                  </div>
                )}
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      {/* Section 2: Key Features */}
      {currentProduct && currentProduct.keyFeatures && currentProduct.keyFeatures.length > 0 && (
        <section className="w-full py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
                  Key Features
                </h2>
                <div className="bg-card rounded-xl shadow-lg p-8 border-2 border-secondary/30">
                  <ul className="space-y-4">
                    {currentProduct.keyFeatures.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-4 text-foreground">
                        <span className="text-secondary font-bold text-xl mt-1 flex-shrink-0">✓</span>
                        <span className="text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Section 3: Specification Table */}
      {currentProduct && currentProduct.keyTechnicalSpecifications && currentProduct.keyTechnicalSpecifications.trim() && (
        <section className="w-full py-20 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                    Technical Specifications
                  </h2>
                  <div className="h-0.5 bg-secondary w-full max-w-xs mx-auto"></div>
                </div>
                <div className="bg-card rounded-xl shadow-lg border-2 border-secondary/30 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <tbody>
                        {currentProduct.keyTechnicalSpecifications
                          .split('\n')
                          .map((line: string) => line.trim())
                          .filter(Boolean)
                          .map((line: string, idx: number) => {
                            const [label, ...rest] = line.split(':');
                            const value = rest.join(':').trim();
                            return (
                              <tr
                                key={idx}
                                className="border-b border-secondary/20 last:border-b-0"
                              >
                                <td className="w-2/5 px-6 py-4 text-base font-semibold text-primary bg-background/50">
                                  {label || '-'}
                                </td>
                                <td className="w-3/5 px-6 py-4 text-base text-foreground bg-card">
                                  {value || ''}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Section 4: Applications */}
      {currentProduct && currentProduct.typicalApplications && currentProduct.typicalApplications.trim() && (
        <section className="w-full pt-12 pb-20 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                    Applications
                  </h2>
                  <div className="h-0.5 bg-secondary w-full max-w-xs mx-auto"></div>
                </div>
                <div className="bg-card rounded-xl shadow-lg border-2 border-secondary/30 overflow-hidden">
                  <div className="px-6 py-4">
                    <p className="text-base text-foreground">
                      {currentProduct.typicalApplications
                        .split('\n')
                        .map((line: string) => line.trim())
                        .filter(Boolean)
                        .join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Section 5: User Products */}
      {currentProduct && (
        <section className="w-full py-20 bg-background border-t-2 border-secondary/30">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
                    User Products
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Explore our comprehensive range of user products and solutions
                  </p>
                </div>

                {/* User Products Cards */}
                {currentProduct.userProducts && currentProduct.userProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentProduct.userProducts.map((userProduct: any, index: number) => (
                      <Card 
                        key={index} 
                        className="bg-card border-2 border-secondary/30 hover:border-secondary hover:shadow-xl hover:shadow-secondary/20 transition-all duration-300 h-full flex flex-col overflow-hidden"
                      >
                        <CardContent className="p-0 flex flex-col h-full">
                          {/* Top section with title and image */}
                          <div className="bg-card border-b border-secondary/20">
                            {/* User Product Title */}
                            <div className="px-6 pt-6 pb-4">
                              <h3 className="text-2xl font-bold text-primary">
                                {userProduct.title || `User Product ${index + 1}`}
                              </h3>
                            </div>

                            {/* Product Image */}
                            {userProduct.images && userProduct.images.length > 0 ? (
                              <div className="relative w-full aspect-video">
                                <Image
                                  src={userProduct.images[0]}
                                  alt={userProduct.title || `User product ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-full aspect-video bg-muted flex items-center justify-center border-b border-secondary/20">
                                <span className="text-muted-foreground">No image available</span>
                              </div>
                            )}

                            {/* Subtitle */}
                            {userProduct.subtitle && (
                              <div className="px-6 py-4 border-b border-secondary/20">
                                <p className="text-muted-foreground text-sm">{userProduct.subtitle}</p>
                              </div>
                            )}
                          </div>

                          {/* View Details Button - Always at bottom */}
                          <div className="p-6 mt-auto">
                            <Button 
                              asChild 
                              className="w-full font-semibold transition-colors"
                            >
                              <Link 
                                href={`/principal-products/${params.slug}/products/${params.productSlug}/view-details/${userProduct.slug || `user-product-${index}`}`}
                              >
                                View Details
                                <ChevronRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="bg-card border-2 border-secondary/30 rounded-xl shadow-lg p-12 text-center">
                    <p className="text-muted-foreground text-lg mb-4">No user products available for this master product.</p>
                    <p className="text-muted-foreground/70 text-sm">User products will appear here once they are created by the admin.</p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}
    </div>
  );
}
