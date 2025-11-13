'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface ProductCardProps {
  product: {
    id?: string;
    slug?: string;
    title: string;
    subtitle: string;
    images: string[];
    keyFeatures?: string[];
  };
  productIndex: number;
  principalProductSlug: string;
}

export function ProductCard({ product, productIndex, principalProductSlug }: ProductCardProps) {
  // Use slug if available, otherwise fallback to index
  const productLink = product.slug || productIndex.toString();
  
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-card border-2 border-secondary/30 hover:border-secondary">
      {/* Content Section - Dark Background */}
      <CardContent className="p-6 bg-card space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-primary leading-tight">
          {product.title}
        </h3>
        
        {/* Image Section - Below Title */}
        <div className="relative bg-white p-4 rounded-lg">
          {product.images && product.images.length > 0 ? (
            <div className="relative aspect-square max-h-48 mx-auto">
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="aspect-square max-h-48 mx-auto flex items-center justify-center bg-gray-100 rounded">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}
        </div>
        
        {/* Subtitle/Description */}
        {product.subtitle && (
          <p className="text-muted-foreground text-sm leading-relaxed">
            {product.subtitle}
          </p>
        )}
        
        {/* Key Features - Only show if custom features are provided */}
        {product.keyFeatures && product.keyFeatures.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-primary">Key Features:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              {product.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary font-bold">{index + 1}.</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white group">
            <Link href={`/principal-products/${principalProductSlug}/products/${productLink}`}>
              Learn More
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <Button variant="ghost" size="sm" asChild className="w-full text-muted-foreground hover:text-primary">
            <Link href={`/principal-products/${principalProductSlug}/products/${productLink}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
