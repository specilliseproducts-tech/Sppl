'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useUpdateGalleryItem } from '@/hooks/use-queries';
import { GalleryForm } from './form';
import { GalleryInsert, GallerySelect } from './schema';

interface UpdateGalleryItemProps {
  data: GallerySelect;
  children: React.ReactNode;
}

export function UpdateGalleryItem({ data, children }: UpdateGalleryItemProps) {
  const [open, setOpen] = useState(false);
  const updateGalleryItem = useUpdateGalleryItem();

  const handleSubmit = (formData: GalleryInsert) => {
    updateGalleryItem.mutate(
      { id: data.id, data: formData },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Gallery Item</DialogTitle>
          <DialogDescription>
            Update the gallery item details and image.
          </DialogDescription>
        </DialogHeader>
        
        <GalleryForm
          initialData={data}
          onSubmit={handleSubmit}
          isLoading={updateGalleryItem.isPending}
          submitText="Update Gallery Item"
        />
      </DialogContent>
    </Dialog>
  );
}
