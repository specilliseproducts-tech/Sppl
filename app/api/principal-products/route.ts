import { Prisma } from '@prisma/client';
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

const principalProductCreateSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imagePath: z.string().min(1, 'Image path is required'),
  link: z.string().optional().default(''),
  keyFacts: z.array(z.string()).optional().default([]),
  productRangeOverview: productRangeOverviewTableSchema.optional(),
  products: z.array(productSchema).optional().default([]),
});

type PrismaWhere = {
  OR?: {
    [key: string]: {
      contains: string;
      mode: 'insensitive';
    };
  }[];
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '10');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'title';
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    const skip = (page - 1) * perPage;

    // Build filter conditions
    const where: PrismaWhere = {};
    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          slug: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    // Build sort conditions - only allow sorting by valid fields
    const validSortFields = [
      'title',
      'slug',
      'createdAt',
      'updatedAt',
    ] as const;
    type ValidSortField = (typeof validSortFields)[number];
    const validSortField = validSortFields.includes(sortBy as ValidSortField)
      ? sortBy
      : 'title';
    const validSortOrder = sortOrder === 'desc' ? 'desc' : 'asc';

    const orderBy: { [key: string]: Prisma.SortOrder } = {
      [validSortField]: validSortOrder,
    };

    const [principalProducts, total] = await Promise.all([
      prisma.principalProduct.findMany({
        where,
        skip,
        take: perPage,
        orderBy,
      }),
      prisma.principalProduct.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        principalProducts,
        pagination: {
          page,
          perPage,
          totalCount: total,
          totalPages: Math.ceil(total / perPage),
          hasNextPage: page < Math.ceil(total / perPage),
          hasPrevPage: page > 1,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching principal products:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch principal products',
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = principalProductCreateSchema.parse(body);

    const principalProduct = await prisma.principalProduct.create({
      data: validatedData,
    });

    return NextResponse.json(
      { success: true, data: principalProduct },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 },
      );
    }

    console.error('Error creating principal product:', error);
    return NextResponse.json(
      { error: 'Failed to create principal product' },
      { status: 500 },
    );
  }
}
