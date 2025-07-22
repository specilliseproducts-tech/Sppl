import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required').max(20, 'Phone too long'),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(200, 'Subject too long'),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(2000, 'Message too long'),
});

// Public endpoint - anyone can create a contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = contactFormSchema.parse(body);

    // Create contact form
    const contactForm = await prisma.contactForm.create({
      data: validatedData,
    });

    return NextResponse.json(
      {
        message: 'Contact form submitted successfully',
        id: contactForm.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Contact form creation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

// Public endpoint - get all contact forms (for admin dashboard)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    // Build search filter
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
            { subject: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    // Get contact forms with pagination
    const [contactForms, total] = await Promise.all([
      prisma.contactForm.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.contactForm.count({ where }),
    ]);

    return NextResponse.json({
      contactForms,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Contact forms fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
