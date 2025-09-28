import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product-card';
import FeatureCard from '@/components/feature-card';
import ProcessStep from '@/components/process-step';
import { HeroSection } from '@/components/hero-section';
import ScrollReveal from '@/components/scroll-reveal';
import ProductShowcaseWrapper from '@/components/product-showcase/product-showcase-wrapper';
import {
  products,
  processSteps,
  strengths,
  collaborators,
} from '@/lib/constants';

export default function Home() {
  // Get first 6 products for homepage
  const featuredProducts = products.slice(0, 6);
  // Get first 3 process steps for homepage
  const featuredProcessSteps = processSteps.slice(0, 3);
  // Get first 2 collaborators for homepage
  const featuredCollaborators = collaborators.slice(0, 2);

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
                Our Innovative Products
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We design and manufacture cutting-edge technology solutions for
                various industries, focusing on customization and precision.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                title={product.name}
                description={product.shortDescription}
                image={product.imagePath}
                features={product.features.slice(0, 3)}
                color={product.color}
              />
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-12 text-center">
              <Button asChild className="group" size="lg">
                <Link href="/products">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      
     

    
    </>
  );
}
