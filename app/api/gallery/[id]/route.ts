import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const galleryUpdateSchema = z.object({
  category: z.string().min(1, 'Category is required').max(50, 'Category too long').optional(),
  title: z.string().min(1, 'Title is required').max(200, 'Title too long').optional(),
  subtitle: z.string().min(1, 'Subtitle is required').max(300, 'Subtitle too long').optional(),
  imagePath: z.string().url('Must be a valid URL').optional(),
});

// Protected endpoint - get single gallery item
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const galleryItem = await prisma.gallery.findUnique({
      where: { id: params.id },
    });
    
    if (!galleryItem) {
      return NextResponse.json(
        { error: 'Gallery item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ galleryItem });
  } catch (error) {
    console.error('Gallery item fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Protected endpoint - update gallery item
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const validatedData = galleryUpdateSchema.parse(body);
    
    // Check if gallery item exists
    const existingGalleryItem = await prisma.gallery.findUnique({
      where: { id: params.id },
    });
    
    if (!existingGalleryItem) {
      return NextResponse.json(
        { error: 'Gallery item not found' },
        { status: 404 }
      );
    }
    
    // Update gallery item
    const galleryItem = await prisma.gallery.update({
      where: { id: params.id },
      data: validatedData,
    });
    
    return NextResponse.json({
      message: 'Gallery item updated successfully',
      galleryItem,
    });
  } catch (error) {
    console.error('Gallery item update error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Protected endpoint - delete gallery item
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check if gallery item exists
    const existingGalleryItem = await prisma.gallery.findUnique({
      where: { id: params.id },
    });
    
    if (!existingGalleryItem) {
      return NextResponse.json(
        { error: 'Gallery item not found' },
        { status: 404 }
      );
    }
    
    // Delete gallery item
    await prisma.gallery.delete({
      where: { id: params.id },
    });
    
    return NextResponse.json({
      message: 'Gallery item deleted successfully',
    });
  } catch (error) {
    console.error('Gallery item delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
