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
import { useCreateGalleryItem } from '@/hooks/use-queries';
import { GalleryForm } from './form';
import { GalleryInsert } from './schema';

interface CreateGalleryItemProps {
  children: React.ReactNode;
}

export function CreateGalleryItem({ children }: CreateGalleryItemProps) {
  const [open, setOpen] = useState(false);
  const createGalleryItem = useCreateGalleryItem();

  const handleSubmit = (data: GalleryInsert) => {
    createGalleryItem.mutate(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Gallery Item</DialogTitle>
          <DialogDescription>
            Add a new image to the gallery with category and description.
          </DialogDescription>
        </DialogHeader>
        
        <GalleryForm
          onSubmit={handleSubmit}
          isLoading={createGalleryItem.isPending}
          submitText="Create Gallery Item"
        />
      </DialogContent>
    </Dialog>
  );
}
