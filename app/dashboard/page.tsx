import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/products">
          <div className="bg-secondary overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow cursor-pointer">
            <div className="p-6">
              <h3 className="text-lg font-medium text-primary">Products</h3>
              <p className="mt-2 text-sm text-secondary-content">
                Manage product information and settings
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
