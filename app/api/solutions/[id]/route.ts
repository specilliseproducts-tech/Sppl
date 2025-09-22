import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const solutionUpdateSchema = z.object({
  slug: z.string().min(1, 'Slug is required').optional(),
  title: z.string().min(1, 'Title is required').optional(),
  subtitle: z.string().optional(),
  description: z.string().min(1, 'Description is required').optional(),
  imagePath: z.string().min(1, 'Main image is required').optional(),
  images: z.array(z.string()).max(4, 'Maximum 4 images allowed').optional(),
  link: z.string().min(1, 'Link is required').optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const solution = await prisma.solution.findUnique({
      where: { id },
    });

    if (!solution) {
      return NextResponse.json(
        { error: 'Solution not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(solution);
  } catch (error) {
    console.error('Error fetching solution:', error);
    return NextResponse.json(
      { error: 'Failed to fetch solution' },
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
    const validatedData = solutionUpdateSchema.parse(body);

    const solution = await prisma.solution.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(solution);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 },
      );
    }

    console.error('Error updating solution:', error);
    return NextResponse.json(
      { error: 'Failed to update solution' },
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

    await prisma.solution.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting solution:', error);
    return NextResponse.json(
      { error: 'Failed to delete solution' },
      { status: 500 },
    );
  }
}
