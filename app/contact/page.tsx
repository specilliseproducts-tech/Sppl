import { Suspense } from 'react';
import ContactPageContent from './contact-page-content';

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading contact form...</div>}>
      <ContactPageContent />
    </Suspense>
  );
}
