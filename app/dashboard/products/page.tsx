import { Button } from '@/components/ui/button';
import { CreateProduct } from './create';
import { EnhancedProductTable } from './table';
import { Suspense } from 'react';

function ProductsPageContent() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <CreateProduct>
          <Button>Create Product</Button>
        </CreateProduct>
      </div>

      <EnhancedProductTable />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading products...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
