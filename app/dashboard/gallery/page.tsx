import { Button } from '@/components/ui/button';
import { CreateGalleryItem } from './create';
import { GalleryItemTable } from './table';
import { Suspense } from 'react';

function GalleryPageContent() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gallery</h1>
          <p className="text-muted-foreground">
            Manage gallery images and content
          </p>
        </div>
        <CreateGalleryItem>
          <Button>Add Gallery Item</Button>
        </CreateGalleryItem>
      </div>

      <GalleryItemTable />
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading gallery...</div>}>
      <GalleryPageContent />
    </Suspense>
  );
}
