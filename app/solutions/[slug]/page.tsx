import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ChevronLeft, Check, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/scroll-reveal';

// Helper to fetch a solution by slug from the database
async function fetchSolutionBySlug(slug: string) {
  const solution = await prisma.solution.findUnique({
    where: { slug },
  });
  return solution;
}

// Helper to fetch all solutions (for static params) from the database
async function fetchAllSolutions() {
  const solutions = await prisma.solution.findMany({
    select: { slug: true, title: true },
  });
  return solutions;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const solution = await fetchSolutionBySlug(params.slug);
  if (!solution) {
    return {
      title: 'Solution Not Found | Spécialisé Products',
    };
  }
  return {
    title: `${solution.title} | Spécialisé Products`,
    description: solution.description,
  };
}

export async function generateStaticParams() {
  const solutions = await fetchAllSolutions();
  return solutions.map((solution) => ({
    slug: solution.slug,
  }));
}

export default async function SolutionPage({
  params,
}: {
  params: { slug: string };
}) {
  const solution = await fetchSolutionBySlug(params.slug);
  if (!solution) {
    notFound();
  }

  // Fetch all solutions for navigation
  const solutions = await fetchAllSolutions();
  const currentIndex = solutions.findIndex((s) => s.slug === params.slug);
  const prevSolution = currentIndex > 0 ? solutions[currentIndex - 1] : null;
  const nextSolution =
    currentIndex < solutions.length - 1 ? solutions[currentIndex + 1] : null;

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              {solution.title}
            </h1>
            {solution.subtitle && (
              <p className="text-2xl md:text-3xl font-medium text-white mb-8">
                {solution.subtitle}
              </p>
            )}
            <Button asChild variant="default" size="lg" className="group">
              <Link href={solution.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-5 w-5" />
                Visit Solution
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Solution Overview */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-white">
                <Image
                  src={solution.imagePath}
                  alt={solution.title}
                  fill
                  className="object-contain"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">
                  Solution Overview
                </h2>
                <div className="text-muted-foreground space-y-4 mb-8">
                  {solution.description
                    .split('\n')
                    .map((paragraph: string, index: number) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                </div>
                <Button asChild size="lg" className="group">
                  <Link href={solution.link} target="_blank" rel="noopener noreferrer">
                    Learn More
                    <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Solution Details */}
      <section className="w-full py-20 bg-card">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">
              Solution Details
            </h2>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <div className="bg-background p-8 rounded-xl shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4">Title</h3>
                  <p className="text-muted-foreground">{solution.title}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4">Subtitle</h3>
                  <p className="text-muted-foreground">{solution.subtitle || 'No subtitle provided'}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4">Category</h3>
                  <p className="text-muted-foreground">Custom Solution</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4">Images</h3>
                  <p className="text-muted-foreground">
                    {solution.images ? `${solution.images.length + 1} images` : '1 image'} (1 main + {solution.images?.length || 0} additional)
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold text-primary mb-4">External Link</h3>
                  <Button asChild variant="outline" className="group">
                    <Link href={solution.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Solution Page
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Gallery */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">
              Solution Gallery
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Main Image */}
            <ScrollReveal delay={0}>
              <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                <div className="aspect-video relative bg-white">
                  <Image
                    src={solution.imagePath}
                    alt={`${solution.title} - Main Image`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="p-3 bg-card">
                  <p className="text-sm font-medium text-primary">Main Image</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Additional Images */}
            {solution.images && solution.images.length > 0 ? (
              solution.images.map((imageUrl, index) => (
                <ScrollReveal key={index} delay={(index + 1) * 0.1}>
                  <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="aspect-video relative bg-white">
                      <Image
                        src={imageUrl}
                        alt={`${solution.title} - Image ${index + 2}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="p-3 bg-card">
                      <p className="text-sm font-medium text-primary">Image {index + 2}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))
            ) : (
              // Show placeholder images if no additional images
              [1, 2].map((i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="aspect-video relative bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">No additional images</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Solution Navigation */}
      <section className="w-full py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            {prevSolution ? (
              <Button asChild variant="outline" className="mb-4 sm:mb-0">
                <Link href={`/solutions/${prevSolution.slug}`}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  {prevSolution.title}
                </Link>
              </Button>
            ) : (
              <div></div>
            )}

            <Button asChild>
              <Link href="/solutions">All Solutions</Link>
            </Button>

            {nextSolution ? (
              <Button asChild variant="outline" className="mt-4 sm:mt-0">
                <Link href={`/solutions/${nextSolution.slug}`}>
                  {nextSolution.title}
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
            Interested in this Solution?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Contact us to learn more about the {solution.title} and how it can
            benefit your operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="group">
              <Link
                href={`/contact?message=${encodeURIComponent(
                  `Hey , I'm interested in this solution - ${
                    process.env.NEXT_PUBLIC_BASE_URL
                      ? process.env.NEXT_PUBLIC_BASE_URL
                      : ''
                  }/solutions/${solution.slug}\nLet's connect`,
                )}`}
              >
                Get in Touch
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group">
              <Link href={solution.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-5 w-5" />
                Visit Solution
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
