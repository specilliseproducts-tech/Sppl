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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-orange-500 mb-4">Product Not Found</h1>
          <p className="text-gray-400 mb-6">The product you're looking for doesn't exist.</p>
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
      {/* Master Product Info */}
      {currentProduct && (
        <div className="bg-gradient-to-br from-primary/20 to-secondary/20 border-b border-gray-700 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Left: Images (Reduced size) */}
              <div className="flex flex-col gap-4">
                {currentProduct.images && currentProduct.images.length > 0 ? (
                  <>
                    {currentProduct.images.map((image: string, idx: number) => (
                      <div key={idx} className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-700">
                        <Image
                          src={image}
                          alt={`Master product image ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-700 bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">No images available</span>
                  </div>
                )}
              </div>

              {/* Right: Title and Details (2 columns width) */}
              <div className="md:col-span-2 space-y-8">
                {/* Title */}
                <div>
                  <h1 className="text-5xl font-bold text-orange-500 mb-4">
                    {currentProduct.title || 'Untitled Master Product'}
                  </h1>
                  {currentProduct.subtitle && (
                    <p className="text-gray-400 text-xl mb-6">{currentProduct.subtitle}</p>
                  )}
                </div>

                {/* Key Features */}
                {currentProduct.keyFeatures && currentProduct.keyFeatures.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-orange-500 mb-4">Key Features</h3>
                    <ul className="space-y-3">
                      {currentProduct.keyFeatures.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-300">
                          <span className="text-orange-500 font-bold mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Products Cards Section */}
      <section className="w-full py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-orange-500 mb-4">User Products</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Explore our comprehensive range of user products and solutions.
              </p>
            </div>

            {/* User Products Cards */}
            {currentProduct.userProducts && currentProduct.userProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {currentProduct.userProducts.map((userProduct: any, index: number) => (
                    <Card 
                      key={index} 
                      className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 h-full flex flex-col overflow-hidden"
                    >
                      <CardContent className="p-0 flex flex-col h-full">
                        {/* Top section with title and image */}
                        <div className="bg-gray-900 border-b border-gray-700">
                          {/* User Product Title */}
                          <div className="px-6 pt-6 pb-4">
                            <h3 className="text-2xl font-bold text-orange-500">
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
                            <div className="w-full aspect-video bg-gray-800 flex items-center justify-center border-b border-gray-700">
                              <span className="text-gray-500">No image available</span>
                            </div>
                          )}

                          {/* Subtitle */}
                          {userProduct.subtitle && (
                            <div className="px-6 py-4 border-b border-gray-700">
                              <p className="text-gray-400 text-sm">{userProduct.subtitle}</p>
                            </div>
                          )}
                        </div>

                        {/* View Details Button - Always at bottom */}
                        <div className="p-6 mt-auto">
                          <Button 
                            asChild 
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors"
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

                {/* Grid divider */}
                <div className="my-12 border-t border-gray-700"></div>
              </>
            ) : (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
                <p className="text-gray-400 text-lg mb-4">No user products available for this master product.</p>
                <p className="text-gray-500 text-sm">User products will appear here once they are created by the admin.</p>
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
