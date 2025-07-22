'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useDeleteGalleryItem } from '@/hooks/use-queries';
import { GallerySelect } from './schema';

interface DeleteGalleryItemProps {
  data: GallerySelect;
  children: React.ReactNode;
}

export function DeleteGalleryItem({ data, children }: DeleteGalleryItemProps) {
  const [open, setOpen] = useState(false);
  const deleteGalleryItem = useDeleteGalleryItem();

  const handleDelete = async () => {
    deleteGalleryItem.mutate(data.id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Gallery Item</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the gallery item{' '}
            <span className="font-medium">"{data.title}"</span>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteGalleryItem.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteGalleryItem.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteGalleryItem.isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
