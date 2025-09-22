import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const solutionCreateSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  imagePath: z.string().min(1, 'Main image is required'),
  images: z.array(z.string()).max(4, 'Maximum 4 images allowed').default([]),
  link: z.string().min(1, 'Link is required'),
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
          subtitle: {
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

    const [solutions, total] = await Promise.all([
      prisma.solution.findMany({
        where,
        skip,
        take: perPage,
        orderBy,
      }),
      prisma.solution.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        solutions,
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
    console.error('Error fetching solutions:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch solutions',
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = solutionCreateSchema.parse(body);

    const solution = await prisma.solution.create({
      data: validatedData,
    });

    return NextResponse.json(
      { success: true, data: solution },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 },
      );
    }

    console.error('Error creating solution:', error);
    return NextResponse.json(
      { error: 'Failed to create solution' },
      { status: 500 },
    );
  }
}
