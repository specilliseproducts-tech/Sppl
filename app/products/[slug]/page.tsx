import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ChevronLeft, Check, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/scroll-reveal';
import ProductShowcaseSingleWrapper from '@/components/product-showcase/product-showcase-single-wrapper';
import ProductDetailWrapper from '@/components/product-detail-wrapper';

// Helper to fetch a product by slug from the database
async function fetchProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
  });
  return product;
}

// Helper to fetch all products (for static params) from the database
async function fetchAllProducts() {
  const products = await prisma.product.findMany({
    select: { slug: true, name: true },
  });
  return products;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) {
    return {
      title: 'Product Not Found | Spécialisé Products',
    };
  }
  return {
    title: `${product.name} | Spécialisé Products`,
    description: product.shortDescription,
  };
}

export async function generateStaticParams() {
  const products = await fetchAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  // Fetch all products for navigation
  const products = await fetchAllProducts();
  const currentIndex = products.findIndex((p) => p.slug === params.slug);
  const prevProduct = currentIndex > 0 ? products[currentIndex - 1] : null;
  const nextProduct =
    currentIndex < products.length - 1 ? products[currentIndex + 1] : null;

  return (
    <ProductDetailWrapper>
      {/* Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              {product.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {product.shortDescription}
            </p>
            <Button asChild variant="default" size="lg" className="group">
              <Link href={product.brochureUrl} target="_blank" download>
                <Download className="mr-2 h-5 w-5" />
                Download Brochure
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 3D Product Showcase */}
      <ProductShowcaseSingleWrapper product={product} />

      {/* Product Details */}
      <section className="w-full py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">
                  Overview
                </h2>
                <div className="text-muted-foreground space-y-4">
                  {product.description
                    .split('\n\n')
                    .map((paragraph: string, index: number) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="bg-background p-6 rounded-xl">
                <h2 className="text-3xl font-bold text-primary mb-6">
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-secondary shrink-0 mr-3 mt-1" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Product Image Gallery */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">
              Product Gallery
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video relative">
                    <Image
                      src={product.imagePath}
                      alt={`${product.name} - Image`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="w-full py-20 bg-card">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">
              Applications
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.applications.map((application: string, index: number) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-background p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {application}
                  </h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">
              Technical Specifications
            </h2>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto bg-card p-6 rounded-xl">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border-b border-muted">
                <div className="font-semibold text-foreground">Model</div>
                <div className="text-muted-foreground">{product.name}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border-b border-muted">
                <div className="font-semibold text-foreground">Category</div>
                <div className="text-muted-foreground">{product.category}</div>
              </div>
              {/* Add more specifications as needed */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div className="font-semibold text-foreground">
                  Documentation
                </div>
                <div className="text-muted-foreground">
                  <Button asChild variant="outline" size="sm" className="group">
                    <Link href={product.brochureUrl} target="_blank" download>
                      <Download className="mr-2 h-4 w-4" />
                      Download Brochure
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Navigation */}
      <section className="w-full py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            {prevProduct ? (
              <Button asChild variant="outline" className="mb-4 sm:mb-0">
                <Link href={`/products/${prevProduct.slug}`}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  {prevProduct.name}
                </Link>
              </Button>
            ) : (
              <div></div>
            )}

            <Button asChild>
              <Link href="/products">All Products</Link>
            </Button>

            {nextProduct ? (
              <Button asChild variant="outline" className="mt-4 sm:mt-0">
                <Link href={`/products/${nextProduct.slug}`}>
                  {nextProduct.name}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Interested in this Product?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Contact us to learn more about the {product.name} and how it can
            benefit your operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="group">
              <Link
                href={`/contact?message=${encodeURIComponent(
                  `Hey , I'm interested in this product - ${
                    process.env.NEXT_PUBLIC_BASE_URL
                      ? process.env.NEXT_PUBLIC_BASE_URL
                      : ''
                  }/products/${product.slug}\nLet's connect`,
                )}`}
              >
                Get in Touch
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={product.brochureUrl} target="_blank" download>
                <Download className="mr-2 h-5 w-5" />
                Download Brochure
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </ProductDetailWrapper>
  );
}
