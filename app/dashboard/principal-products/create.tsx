'use client';

import { z } from 'zod';
import { principalProductInsertSchema } from './schema';
import { EnhancedPrincipalProductForm } from './enhanced-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCreatePrincipalProduct } from '@/hooks/use-queries';
import { useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export function CreatePrincipalProduct({ children }: Props) {
  const [open, setOpen] = useState(false);
  const createPrincipalProductMutation = useCreatePrincipalProduct();

  async function createPrincipalProduct(
    data: z.infer<typeof principalProductInsertSchema>,
  ) {
    console.log('📝 Submitting Principal Product:', {
      title: data.title,
      slug: data.slug,
      productsCount: data.products?.length,
      products: data.products?.map((p, i) => ({
        index: i,
        title: p.title,
        slug: p.slug,
        userProductsCount: p.userProducts?.length,
        userProducts: p.userProducts?.map((up, j) => ({
          index: j,
          title: up.title,
          slug: up.slug,
        })),
      })),
    });
    
    createPrincipalProductMutation.mutate(data, {
      onSuccess: () => {
        console.log('✅ Principal product created successfully!');
        setOpen(false);
      },
      onError: (error) => {
        console.error('❌ Error creating principal product:', error);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create Admin Principal</DialogTitle>
        </DialogHeader>
        
        <EnhancedPrincipalProductForm
          onSubmit={createPrincipalProduct}
          submitAction={
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createPrincipalProductMutation.isPending}
              >
                {createPrincipalProductMutation.isPending
                  ? 'Creating...'
                  : 'Create Admin Principal'}
              </Button>
            </div>
          }
        />
      </DialogContent>
    </Dialog>
  );
}
