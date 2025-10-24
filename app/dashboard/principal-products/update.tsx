'use client';

import { z } from 'zod';
import {
  principalProductInsertSchema,
  principalProductSelectSchema,
} from './schema';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { EnhancedPrincipalProductForm } from './enhanced-form';
import { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { useUpdatePrincipalProduct } from '@/hooks/use-queries';

interface Props {
  data: z.infer<typeof principalProductSelectSchema>;
  children: JSX.Element;
}

export function UpdatePrincipalProduct({ data, children }: Props) {
  const updatePrincipalProductMutation = useUpdatePrincipalProduct();

  async function updatePrincipalProduct(
    updateData: z.infer<typeof principalProductInsertSchema>,
  ) {
    updatePrincipalProductMutation.mutate({ id: data.id, data: updateData });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Admin Principal</DialogTitle>
        </DialogHeader>
        <EnhancedPrincipalProductForm
          data={data}
          onSubmit={updatePrincipalProduct}
          submitAction={
            <div className="flex justify-end gap-3 pt-4">
              <DialogClose asChild>
                <Button variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  type="submit"
                  disabled={updatePrincipalProductMutation.isPending}
                >
                  {updatePrincipalProductMutation.isPending
                    ? 'Updating...'
                    : 'Update Admin Principal'}
                </Button>
              </DialogClose>
            </div>
          }
        />
      </DialogContent>
    </Dialog>
  );
}
