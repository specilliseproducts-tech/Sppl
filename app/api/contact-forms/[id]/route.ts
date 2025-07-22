import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const contactFormUpdateSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name too long')
    .optional(),
  email: z.string().email('Invalid email address').optional(),
  phone: z
    .string()
    .min(1, 'Phone is required')
    .max(20, 'Phone too long')
    .optional(),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(200, 'Subject too long')
    .optional(),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(2000, 'Message too long')
    .optional(),
});

// Protected endpoint - get single contact form
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const contactForm = await prisma.contactForm.findUnique({
      where: { id: params.id },
    });

    if (!contactForm) {
      return NextResponse.json(
        { error: 'Contact form not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ contactForm });
  } catch (error) {
    console.error('Contact form fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

// Protected endpoint - update contact form
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = contactFormUpdateSchema.parse(body);

    // Check if contact form exists
    const existingContactForm = await prisma.contactForm.findUnique({
      where: { id: params.id },
    });

    if (!existingContactForm) {
      return NextResponse.json(
        { error: 'Contact form not found' },
        { status: 404 },
      );
    }

    // Update contact form
    const contactForm = await prisma.contactForm.update({
      where: { id: params.id },
      data: validatedData,
    });

    return NextResponse.json({
      message: 'Contact form updated successfully',
      contactForm,
    });
  } catch (error) {
    console.error('Contact form update error:', error);

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

// Protected endpoint - delete contact form
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if contact form exists
    const existingContactForm = await prisma.contactForm.findUnique({
      where: { id: params.id },
    });

    if (!existingContactForm) {
      return NextResponse.json(
        { error: 'Contact form not found' },
        { status: 404 },
      );
    }

    // Delete contact form
    await prisma.contactForm.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      message: 'Contact form deleted successfully',
    });
  } catch (error) {
    console.error('Contact form delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
