'use client';

import { z } from 'zod';
import { solutionInsertSchema, solutionSelectSchema } from './schema';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SolutionForm } from './form';
import { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { useUpdateSolution } from '@/hooks/use-queries';

interface Props {
  data: z.infer<typeof solutionSelectSchema>;
  children: JSX.Element;
}

export function UpdateSolution({ data, children }: Props) {
  const updateSolutionMutation = useUpdateSolution();

  async function updateSolution(
    updateData: z.infer<typeof solutionInsertSchema>,
  ) {
    console.log('Updating solution with data:', { id: data.id, updateData });
    updateSolutionMutation.mutate({ id: data.id, data: updateData });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Solution</DialogTitle>
        </DialogHeader>
        <SolutionForm
          data={data}
          onSubmit={updateSolution}
          submitAction={
            <DialogClose asChild>
              <Button type="submit" disabled={updateSolutionMutation.isPending}>
                {updateSolutionMutation.isPending
                  ? 'Updating...'
                  : 'Update Solution'}
              </Button>
            </DialogClose>
          }
        />
      </DialogContent>
    </Dialog>
  );
}
