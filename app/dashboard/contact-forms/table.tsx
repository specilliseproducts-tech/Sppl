'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, Trash2, Search, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useContactForms, useDeleteContactForm } from '@/hooks/use-queries';
import { format } from 'date-fns';
import { ViewContactForm } from './view';
import { DeleteContactForm } from './delete';

type ContactForm = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<ContactForm>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const contactForm = row.original;
      return (
        <div>
          <div className="font-medium">{contactForm.name}</div>
          <div className="text-sm text-muted-foreground">
            {contactForm.email}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => {
      return <span>{row.getValue('phone')}</span>;
    },
  },
  {
    accessorKey: 'subject',
    header: 'Subject',
    cell: ({ row }) => {
      const subject = row.getValue('subject') as string;
      return (
        <div className="max-w-[200px] truncate" title={subject}>
          {subject}
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return <span>{format(date, 'MMM d, yyyy')}</span>;
    },
  },
  {
    header: 'Actions',
    size: 100,
    meta: {
      align: 'right',
    },
    cell: ({ row }) => {
      const contactForm = row.original;
      return (
        <div className="flex space-x-2">
          <ViewContactForm data={contactForm}>
            <Button variant="outline" size="icon">
              <Eye className="h-4 w-4" />
            </Button>
          </ViewContactForm>
          <DeleteContactForm data={contactForm}>
            <Button variant="destructive" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </DeleteContactForm>
        </div>
      );
    },
  },
];

export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 10;

function ContactFormSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') || '',
  );

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set('search', value.trim());
    } else {
      params.delete('search');
    }
    params.set('page', '1'); // Reset to first page when searching
    router.push(`?${params.toString()}`);
  };

  const clearSearch = () => {
    setSearchTerm('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  return (
    <div className="flex items-center space-x-2 mb-6">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search by name, email, or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Button onClick={() => handleSearch(searchTerm)} variant="outline">
        Search
      </Button>
    </div>
  );
}

export function ContactFormDataTable({
  data,
  page,
  perPage,
  total,
}: {
  data: ContactForm[];
  page: number;
  perPage: number;
  total: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(total / perPage),
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No contact forms found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          Showing {Math.min((page - 1) * perPage + 1, total)} to{' '}
          {Math.min(page * perPage, total)} of {total} contact forms
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= Math.ceil(total / perPage)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactFormTable() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';

  const {
    data: contactFormsData,
    isLoading,
    error,
  } = useContactForms({
    page,
    perPage: DEFAULT_PER_PAGE,
    search,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <ContactFormSearch />
        <div className="flex items-center justify-center h-32">
          <div className="animate-pulse text-muted-foreground">
            Loading contact forms...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <ContactFormSearch />
        <div className="flex items-center justify-center h-32">
          <div className="text-destructive">Error loading contact forms</div>
        </div>
      </div>
    );
  }

  if (!contactFormsData) {
    return (
      <div className="space-y-4">
        <ContactFormSearch />
        <div className="flex items-center justify-center h-32">
          <div className="text-muted-foreground">No data available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ContactFormSearch />
      <ContactFormDataTable
        data={contactFormsData.contactForms}
        page={page}
        perPage={DEFAULT_PER_PAGE}
        total={contactFormsData.pagination.total}
      />
    </div>
  );
}
