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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pencil, Trash2, Eye, Search, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useGalleryItems } from '@/hooks/use-queries';
import { format } from 'date-fns';
import { UpdateGalleryItem } from './update';
import { DeleteGalleryItem } from './delete';
import { GallerySelect } from './schema';
import { galleryCategoryList } from '@/lib/constants';

export const columns: ColumnDef<GallerySelect>[] = [
  {
    accessorKey: 'imagePath',
    header: 'Image',
    size: 100,
    cell: ({ row }) => {
      const galleryItem = row.original;
      return (
        <div className="w-16 h-16">
          <img
            src={galleryItem.imagePath}
            alt={galleryItem.title}
            className="w-full h-full object-cover rounded"
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      const galleryItem = row.original;
      return (
        <div>
          <div className="font-medium">{galleryItem.title}</div>
          <div className="text-sm text-muted-foreground line-clamp-2">
            {galleryItem.subtitle}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      return <Badge variant="outline">{row.getValue('category')}</Badge>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return <span>{format(date, 'MMM d, yyyy')}</span>;
    },
  },
  {
    header: 'Actions',
    size: 120,
    meta: {
      align: 'right',
    },
    cell: ({ row }) => {
      const galleryItem = row.original;
      return (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => window.open(galleryItem.imagePath, '_blank')}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <UpdateGalleryItem data={galleryItem}>
            <Button variant="outline" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </UpdateGalleryItem>
          <DeleteGalleryItem data={galleryItem}>
            <Button variant="destructive" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </DeleteGalleryItem>
        </div>
      );
    },
  },
];

export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 10;

function GalleryItemSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') || '',
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || '',
  );

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || '');
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

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category && category !== 'all') {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    params.set('page', '1'); // Reset to first page when filtering
    router.push(`?${params.toString()}`);
  };

  const clearSearch = () => {
    setSearchTerm('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    router.push('/dashboard/gallery');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search gallery items..."
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

      <Select
        value={selectedCategory || 'all'}
        onValueChange={handleCategoryChange}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {galleryCategoryList.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <Button onClick={() => handleSearch(searchTerm)} variant="outline">
          Search
        </Button>
        {(searchTerm || selectedCategory) && (
          <Button onClick={clearFilters} variant="outline">
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}

export function GalleryItemDataTable({
  data,
  page,
  perPage,
  total,
}: {
  data: GallerySelect[];
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
                  No gallery items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          Showing {Math.min((page - 1) * perPage + 1, total)} to{' '}
          {Math.min(page * perPage, total)} of {total} gallery items
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

export function GalleryItemTable() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  const {
    data: galleryData,
    isLoading,
    error,
  } = useGalleryItems({
    page,
    perPage: DEFAULT_PER_PAGE,
    search,
    category,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <GalleryItemSearch />
        <div className="flex items-center justify-center h-32">
          <div className="animate-pulse text-muted-foreground">
            Loading gallery items...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <GalleryItemSearch />
        <div className="flex items-center justify-center h-32">
          <div className="text-destructive">Error loading gallery items</div>
        </div>
      </div>
    );
  }

  if (!galleryData) {
    return (
      <div className="space-y-4">
        <GalleryItemSearch />
        <div className="flex items-center justify-center h-32">
          <div className="text-muted-foreground">No data available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <GalleryItemSearch />
      <GalleryItemDataTable
        data={galleryData.galleryItems}
        page={page}
        perPage={DEFAULT_PER_PAGE}
        total={galleryData.pagination.total}
      />
    </div>
  );
}
