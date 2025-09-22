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

      {/* Our Strengths Section */}
      <section id="strengths" className="w-full py-20 bg-card">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Our Strengths
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We focus on customized solutions, working interactively with
                customers to conceptualize their needs, then designing and
                manufacturing products to meet their imagination.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {strengths.map((strength, index) => (
              <FeatureCard
                key={index}
                icon={strength.icon}
                title={strength.title}
                description={strength.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section id="process" className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Our Process
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We follow a comprehensive process to ensure that we deliver
                solutions that perfectly match our customers&apos; requirements.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProcessSteps.map((step) => (
              <ProcessStep
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="group" size="lg">
              <Link href="/process">
                View Full Process
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Collaborators Section */}
      <section id="collaborators" className="w-full py-20 bg-card">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Our Collaborators
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We work with leading technology partners to provide
                comprehensive solutions to our customers.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredCollaborators.map((collaborator, index) => (
              <ScrollReveal
                key={collaborator.id}
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <div className="bg-background p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow hover:-translate-y-1 duration-300">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {collaborator.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {collaborator.description}
                  </p>
                  <Link
                    href={`/collaborators#${collaborator.id}`}
                    className="text-secondary font-medium hover:underline inline-flex items-center group"
                  >
                    Find out more{' '}
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="group" size="lg">
              <Link href="/collaborators">
                View All Collaborators
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
