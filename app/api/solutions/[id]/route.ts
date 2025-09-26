import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const solutionUpdateSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  imagePath: z.string().min(1, 'Main image is required'),
  images: z.array(z.string()).max(4, 'Maximum 4 images allowed').default([]),
  link: z.string().min(1, 'Link is required'),
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

    return NextResponse.json({
      success: true,
      data: solution
    });
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
    
    console.log('Solution update request:', { id, body });
    
    const validatedData = solutionUpdateSchema.parse(body);
    
    console.log('Validated data:', validatedData);

    // Check if solution exists first
    const existingSolution = await prisma.solution.findUnique({
      where: { id },
    });

    if (!existingSolution) {
      console.error('Solution not found:', id);
      return NextResponse.json(
        { error: 'Solution not found' },
        { status: 404 },
      );
    }

    const solution = await prisma.solution.update({
      where: { id },
      data: validatedData,
    });

    console.log('Updated solution:', solution);

    return NextResponse.json({
      success: true,
      data: solution
    });
  } catch (error) {
    console.error('Error updating solution:', error);
    
    if (error instanceof z.ZodError) {
      console.error('Validation errors:', error.errors);
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 },
      );
    }

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
