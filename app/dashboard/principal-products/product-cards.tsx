'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, ExternalLink } from 'lucide-react';
import { Product } from './schema';

interface ProductCardsProps {
  products: (Product & { keyFeatures?: string[]; userProducts?: any[] })[];
  principalProductSlug: string;
}

export function ProductCards({ products, principalProductSlug }: ProductCardsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 mt-8 p-6 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary">Created Master Products ({products.length})</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card key={product.id || index} className="group hover:shadow-lg transition-all duration-300 bg-card border shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  Master Product {index + 1}
                </Badge>
              </div>
              <CardTitle className="text-lg line-clamp-2 text-primary">{product.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {product.subtitle && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.subtitle}
                </p>
              )}
              
              {product.images && product.images.length > 0 && (
                <div className="space-y-2">
                  <div className="flex gap-2 overflow-x-auto">
                    {product.images.slice(0, 2).map((image, imgIndex) => (
                      <div key={imgIndex} className="relative flex-shrink-0">
                        <Image
                          src={image}
                          alt={`${product.title} - Image ${imgIndex + 1}`}
                          width={120}
                          height={80}
                          className="w-30 h-20 object-cover rounded border"
                        />
                      </div>
                    ))}
                  </div>
                  {product.images.length > 2 && (
                    <p className="text-xs text-muted-foreground">
                      +{product.images.length - 2} more images
                    </p>
                  )}
                </div>
              )}
              
              {/* User Products Section */}
              {product.userProducts && product.userProducts.length > 0 && (
                <div className="border-t pt-3">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                    User Products ({product.userProducts.length})
                  </h4>
                  <div className="space-y-2">
                    {product.userProducts.slice(0, 2).map((userProduct, userIndex) => (
                      <div key={userIndex} className="text-xs bg-muted/50 p-2 rounded">
                        <div className="font-medium">{userProduct.title || `User Product ${userIndex + 1}`}</div>
                        {userProduct.subtitle && (
                          <div className="text-muted-foreground line-clamp-1">{userProduct.subtitle}</div>
                        )}
                      </div>
                    ))}
                    {product.userProducts.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{product.userProducts.length - 2} more user products
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link href={`/principal-products/${principalProductSlug}/products/${index}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
