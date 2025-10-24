import { Button } from '@/components/ui/button';
import { CreatePrincipalProduct } from './create';
import { PrincipalProductTable } from './table';
import { Suspense } from 'react';

function PrincipalProductsPageContent() {
  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Principals</h1>
          <p className="text-muted-foreground">
            Manage your admin principal catalog and master products
          </p>
        </div>
        <CreatePrincipalProduct>
          <Button>Create Admin Principal</Button>
        </CreatePrincipalProduct>
      </div>

      <PrincipalProductTable />
    </div>
  );
}

export default function PrincipalProductsPage() {
  return (
    <Suspense
      fallback={<div className="p-6">Loading principal products...</div>}
    >
      <PrincipalProductsPageContent />
    </Suspense>
  );
}
