'use client';
import { ReactNode } from 'react';
import InquiryPopup from '@/components/inquiry-popup';
import { useAutoPopup } from '@/hooks/use-auto-popup';
import { useSubmitInquiry } from '@/hooks/use-submit-inquiry';

interface SolutionDetailWrapperProps {
  children: ReactNode;
}

export default function SolutionDetailWrapper({ children }: SolutionDetailWrapperProps) {
  const { isOpen, closePopup } = useAutoPopup({ delay: 15000 }); // Show after 15 seconds
  const submitInquiry = useSubmitInquiry();

  const handleInquirySubmit = (data: any) => {
    submitInquiry.mutate(data);
  };

  return (
    <>
      {children}
      <InquiryPopup
        isOpen={isOpen}
        onClose={closePopup}
        onSubmit={handleInquirySubmit}
      />
    </>
  );
}
