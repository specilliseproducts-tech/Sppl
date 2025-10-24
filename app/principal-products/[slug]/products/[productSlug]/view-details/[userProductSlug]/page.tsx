'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Star, CheckCircle, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-orange-500 mb-4">Product Not Found</h1>
          <p className="text-gray-400 mb-6">
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
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-6xl mx-auto">
              {/* Back Button */}
              <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="sm" asChild className="text-gray-400 hover:text-white">
                  <Link href={`/principal-products/${params.slug}/products/${params.productSlug}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Product
                  </Link>
                </Button>
                <Badge variant="secondary" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                  {displayUserProduct ? 'User Product Details' : 'Product Details'}
                </Badge>
              </div>

              {/* Hero Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Product Image */}
                <div className="order-2 lg:order-1">
                  {displayUserProduct?.images && displayUserProduct.images.length > 0 ? (
                    <div className="relative">
                      <div className="relative aspect-square max-w-lg mx-auto rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={displayUserProduct.images[0]}
                          alt={displayUserProduct?.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {/* Image Gallery */}
                      {displayUserProduct?.images.length > 1 && (
                        <div className="flex justify-center gap-4 mt-6">
                          {displayUserProduct.images.slice(1).map((image: string, index: number) => (
                            <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-600 hover:border-orange-500 transition-colors cursor-pointer">
                              <Image
                                src={image}
                                alt={`${displayUserProduct?.title} - Image ${index + 2}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : currentProduct?.images && currentProduct.images.length > 0 ? (
                    <div className="relative">
                      <div className="relative aspect-square max-w-lg mx-auto rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={currentProduct.images[0]}
                          alt={currentProduct?.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {/* Image Gallery */}
                      {currentProduct?.images.length > 1 && (
                        <div className="flex justify-center gap-4 mt-6">
                          {currentProduct.images.slice(1).map((image: string, index: number) => (
                            <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-600 hover:border-orange-500 transition-colors cursor-pointer">
                              <Image
                                src={image}
                                alt={`${currentProduct?.title} - Image ${index + 2}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>

                {/* Product Title and Info */}
                <div className="order-1 lg:order-2 text-center lg:text-left">
                  <h1 className="text-5xl md:text-6xl font-bold text-orange-500 mb-6 leading-tight">
                    {displayUserProduct?.title || currentProduct?.title || 'Product Title'}
                  </h1>
                  {(displayUserProduct?.subtitle || currentProduct?.subtitle) && (
                    <p className="text-2xl text-gray-300 mb-8">
                      {displayUserProduct?.subtitle || currentProduct?.subtitle}
                    </p>
                  )}

                  {/* Key Features for User Product */}
                  {displayUserProduct?.keyFeatures && displayUserProduct.keyFeatures.length > 0 && (
                    <div className="space-y-3 mb-8">
                      <h3 className="text-xl font-semibold text-orange-500 mb-4">Key Features</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {displayUserProduct.keyFeatures.map((feature: string, index: number) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Features - Master Product (only if no user product) */}
                  {!displayUserProduct && currentProduct?.keyFeatures && currentProduct.keyFeatures.length > 0 && (
                    <div className="space-y-3 mb-8">
                      <h3 className="text-xl font-semibold text-orange-500 mb-4">Key Highlights</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {currentProduct.keyFeatures.slice(0, 3).map((feature: string, index: number) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white group">
                      <Link href="/contact">
                        Contact Seller
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 group">
                      <Link href={`/principal-products/${params.slug}/products/${params.productSlug}`}>
                        View All Products
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* User Product Details Section */}
      {displayUserProduct && (
        <section className="w-full py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <div className="mb-12">
                  <h2 className="text-4xl font-bold text-orange-500 mb-2">Product Information</h2>
                  <p className="text-gray-400">Complete details about {displayUserProduct.title}</p>
                </div>

                <div className="space-y-10">
                  {/* Key Technical Specifications */}
                  {displayUserProduct.keyTechnicalSpecifications && (
                    <div>
                      <h3 className="text-xl font-bold text-orange-500 mb-6">Key Technical Specifications</h3>
                      <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 space-y-3">
                        {displayUserProduct.keyTechnicalSpecifications.split('\n').map((item: string, idx: number) => (
                          item.trim() && (
                            <div key={idx} className="flex items-start gap-3">
                              <span className="text-orange-500 font-bold text-lg mt-1">✓</span>
                              <span className="text-gray-300">{item.trim()}</span>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Applications & Target Markets */}
                  {displayUserProduct.applicationsTargetMarkets && (
                    <div>
                      <h3 className="text-xl font-bold text-orange-500 mb-6">Applications & Target Markets</h3>
                      <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 space-y-3">
                        {displayUserProduct.applicationsTargetMarkets.split('\n').map((item: string, idx: number) => (
                          item.trim() && (
                            <div key={idx} className="flex items-start gap-3">
                              <span className="text-orange-500 font-bold text-lg mt-1">✓</span>
                              <span className="text-gray-300">{item.trim()}</span>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technical Highlights */}
                  {displayUserProduct.technicalHighlights && (
                    <div>
                      <h3 className="text-xl font-bold text-orange-500 mb-6">Technical Highlights</h3>
                      <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 space-y-3">
                        {displayUserProduct.technicalHighlights.split('\n').map((item: string, idx: number) => (
                          item.trim() && (
                            <div key={idx} className="flex items-start gap-3">
                              <span className="text-orange-500 font-bold text-lg mt-1">✓</span>
                              <span className="text-gray-300">{item.trim()}</span>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Typical Applications */}
                  {displayUserProduct.typicalApplications && (
                    <div>
                      <h3 className="text-xl font-bold text-orange-500 mb-6">Typical Applications</h3>
                      <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 space-y-3">
                        {displayUserProduct.typicalApplications.split('\n').map((item: string, idx: number) => (
                          item.trim() && (
                            <div key={idx} className="flex items-start gap-3">
                              <span className="text-orange-500 font-bold text-lg mt-1">✓</span>
                              <span className="text-gray-300">{item.trim()}</span>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Target Markets / End Users */}
                  {displayUserProduct.targetMarketsEndUsers && (
                    <div>
                      <h3 className="text-xl font-bold text-orange-500 mb-6">Target Markets / End Users</h3>
                      <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 space-y-3">
                        {displayUserProduct.targetMarketsEndUsers.split('\n').map((item: string, idx: number) => (
                          item.trim() && (
                            <div key={idx} className="flex items-start gap-3">
                              <span className="text-orange-500 font-bold text-lg mt-1">✓</span>
                              <span className="text-gray-300">{item.trim()}</span>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Differentiators & Positioning */}
                  {displayUserProduct.keyDifferentiatorsPositioning && (
                    <div>
                      <h3 className="text-xl font-bold text-orange-500 mb-6">Key Differentiators & Positioning</h3>
                      <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 space-y-3">
                        {displayUserProduct.keyDifferentiatorsPositioning.split('\n').map((item: string, idx: number) => (
                          item.trim() && (
                            <div key={idx} className="flex items-start gap-3">
                              <span className="text-orange-500 font-bold text-lg mt-1">✓</span>
                              <span className="text-gray-300">{item.trim()}</span>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Product Family */}
                  {displayUserProduct.productFamily && (
                    <div>
                      <h3 className="text-xl font-bold text-orange-500 mb-6">Product Family</h3>
                      <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                        <div className="flex items-start gap-3">
                          <span className="text-orange-500 font-bold text-lg mt-1">✓</span>
                          <span className="text-gray-300">{displayUserProduct.productFamily}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Components */}
                  {displayUserProduct.components && (
                    <div>
                      <h3 className="text-xl font-bold text-orange-500 mb-6">Components</h3>
                      <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 space-y-3">
                        {displayUserProduct.components.split('\n').map((item: string, idx: number) => (
                          item.trim() && (
                            <div key={idx} className="flex items-start gap-3">
                              <span className="text-orange-500 font-bold text-lg mt-1">✓</span>
                              <span className="text-gray-300">{item.trim()}</span>
                            </div>
                          )
                        ))}
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
      <section className="w-full py-20 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Contact us to learn more about this product and how it can benefit your organization.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" className="group bg-orange-500 hover:bg-orange-600">
                <Link href="/contact">
                  Get in Touch
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="group border-gray-600 text-gray-300 hover:bg-gray-700">
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
