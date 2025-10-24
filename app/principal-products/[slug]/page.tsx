import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PrincipalProductDetailPage from './PrincipalProductDetailPage';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // You can fetch the product data here to generate dynamic metadata
  // For now, we'll use a generic title
  return {
    title: `Principal Product | Spécialisé Products`,
    description: 'Learn more about our principal products and partnerships.',
  };
}

export default function PrincipalProductPage({ params }: Props) {
  return <PrincipalProductDetailPage slug={params.slug} />;
}
