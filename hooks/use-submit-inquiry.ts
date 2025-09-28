'use client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface InquiryFormData {
  name: string;
  email: string;
  contactNumber: string;
  productOfInterest: string;
  application: string;
  additionalInfo?: string;
}

async function submitInquiry(data: InquiryFormData) {
  const response = await fetch('/api/inquiries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to submit inquiry');
  }

  return response.json();
}

export function useSubmitInquiry() {
  return useMutation({
    mutationFn: submitInquiry,
    onSuccess: (data) => {
      toast.success(data.message || 'Inquiry submitted successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to submit inquiry. Please try again.');
    },
  });
}
