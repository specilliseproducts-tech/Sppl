import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const inquirySchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  contactNumber: z.string().min(1).max(20),
  productOfInterest: z.string().min(1),
  application: z.string().min(1),
  additionalInfo: z.string().max(1000).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = inquirySchema.parse(body);
    
    // Here you would typically save to database
    // For now, we'll just log it and return success
    console.log('New inquiry received:', validatedData);
    
    // TODO: Save to database
    // await prisma.inquiry.create({ data: validatedData });
    
    // TODO: Send email notification
    // await sendInquiryEmail(validatedData);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Inquiry submitted successfully! We will contact you soon.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing inquiry:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid form data', 
          errors: error.errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
