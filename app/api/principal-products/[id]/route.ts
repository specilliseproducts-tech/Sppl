import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const userProductSchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  images: z.array(z.string()).max(2, 'Maximum 2 images allowed').optional().default([]),
  keyFeatures: z.array(z.string()).optional().default([]),
  productFamily: z.string().optional(),
  components: z.string().optional(),
  keyTechnicalSpecifications: z.string().optional(),
  applicationsTargetMarkets: z.string().optional(),
  technicalHighlights: z.string().optional(),
  typicalApplications: z.string().optional(),
  targetMarketsEndUsers: z.string().optional(),
  keyDifferentiatorsPositioning: z.string().optional(),
});

const productSchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  images: z.array(z.string()).max(2, 'Maximum 2 images allowed').optional().default([]),
  keyFeatures: z.array(z.string()).optional().default([]),
  keyTechnicalSpecifications: z.string().optional(),
  typicalApplications: z.string().optional(),
  userProducts: z.array(userProductSchema).optional().default([]),
});

// Product Range Overview Table Schema
const productRangeOverviewTableSchema = z.object({
  headers: z.array(z.string()).default([]),
  rows: z.array(z.array(z.string())).default([]),
});

const principalProductUpdateSchema = z.object({
  slug: z.string().min(1, 'Slug is required').optional(),
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  imagePath: z.string().min(1, 'Image path is required').optional(),
  link: z.string().optional(),
  keyFacts: z.array(z.string()).optional(),
  productRangeOverview: productRangeOverviewTableSchema.optional(),
  products: z.array(productSchema).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const principalProduct = await prisma.principalProduct.findUnique({
      where: { id },
    });

    if (!principalProduct) {
    return NextResponse.json(
      { success: false, error: 'Principal product not found' },
      { status: 404 },
    );
    }

    return NextResponse.json({
      success: true,
      data: principalProduct,
    });
  } catch (error) {
    console.error('Error fetching principal product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch principal product' },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = principalProductUpdateSchema.parse(body);

    const principalProduct = await prisma.principalProduct.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json({
      success: true,
      data: principalProduct,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 },
      );
    }

    console.error('Error updating principal product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update principal product' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await prisma.principalProduct.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, data: null });
  } catch (error) {
    console.error('Error deleting principal product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete principal product' },
      { status: 500 },
    );
  }
}
