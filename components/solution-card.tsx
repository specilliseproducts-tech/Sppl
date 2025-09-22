'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SolutionCardProps {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  link: string;
  color?: string;
}

export default function SolutionCard({
  id,
  slug,
  title,
  subtitle,
  description,
  image,
  link,
  color = '#4834D4',
}: SolutionCardProps) {
  return (
    <Card className="group h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden rounded-t-lg bg-white">
        <Image
          src={image || '/placeholder.svg'}
          alt={title}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-primary line-clamp-2 group-hover:text-[var(--solution-color)] transition-colors duration-300"
                   style={{ '--solution-color': color } as React.CSSProperties}>
          {title}
        </CardTitle>
        {subtitle && (
          <p className="text-lg font-medium text-white mb-2">
            {subtitle}
          </p>
        )}
        <CardDescription className="text-muted-foreground line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex flex-col gap-3">
          <Button asChild className="w-full group/btn">
            <Link href={`/solutions/${slug}`}>
              Learn More
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
          
          <div className="text-center">
            <span className="text-xs text-muted-foreground">
              View Details
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
