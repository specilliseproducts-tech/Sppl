import { Button } from '@/components/ui/button';
import { ContactFormTable } from './table';
import { Suspense } from 'react';

function ContactFormsPageContent() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Contact Forms</h1>
          <p className="text-muted-foreground">
            Manage customer inquiries and messages
          </p>
        </div>
      </div>

      <ContactFormTable />
    </div>
  );
}

export default function ContactFormsPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading contact forms...</div>}>
      <ContactFormsPageContent />
    </Suspense>
  );
}
