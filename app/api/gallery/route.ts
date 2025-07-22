import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const gallerySchema = z.object({
  category: z.string().min(1, 'Category is required').max(50, 'Category too long'),
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  subtitle: z.string().min(1, 'Subtitle is required').max(300, 'Subtitle too long'),
  imagePath: z.string().url('Must be a valid URL'),
});

// Protected endpoint - get all gallery items
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    
    const skip = (page - 1) * limit;
    
    // Build search filter
    const where: any = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { subtitle: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (category) {
      where.category = category;
    }
    
    // Get gallery items with pagination
    const [galleryItems, total] = await Promise.all([
      prisma.gallery.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.gallery.count({ where }),
    ]);
    
    return NextResponse.json({
      galleryItems,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Gallery items fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Protected endpoint - create gallery item
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // Validate input
    const validatedData = gallerySchema.parse(body);
    
    // Create gallery item
    const galleryItem = await prisma.gallery.create({
      data: validatedData,
    });
    
    return NextResponse.json(
      { 
        message: 'Gallery item created successfully',
        galleryItem 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Gallery item creation error:', error);
    
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
