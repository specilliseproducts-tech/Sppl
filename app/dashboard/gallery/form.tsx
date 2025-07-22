'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MediaUploader } from '@/components/media-uploader';
import { GalleryInsert, galleryInsertSchema, GallerySelect } from './schema';
import { galleryCategoryList } from '@/lib/constants';

interface GalleryFormProps {
  initialData?: Partial<GallerySelect>;
  onSubmit: (data: GalleryInsert) => void;
  isLoading?: boolean;
  submitText?: string;
}

export function GalleryForm({
  initialData,
  onSubmit,
  isLoading,
  submitText = 'Submit',
}: GalleryFormProps) {
  const form = useForm<GalleryInsert>({
    resolver: zodResolver(galleryInsertSchema),
    defaultValues: {
      category: initialData?.category || '',
      title: initialData?.title || '',
      subtitle: initialData?.subtitle || '',
      imagePath: initialData?.imagePath || '',
    },
  });

  const handleSubmit = (data: GalleryInsert) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category">
            Category <span className="text-destructive">*</span>
          </Label>
          <Select
            value={form.watch('category')}
            onValueChange={(value) => form.setValue('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {galleryCategoryList.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.category && (
            <p className="text-sm text-destructive">
              {form.formState.errors.category.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            {...form.register('title')}
            placeholder="Enter title"
          />
          {form.formState.errors.title && (
            <p className="text-sm text-destructive">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">
          Subtitle <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="subtitle"
          {...form.register('subtitle')}
          placeholder="Enter subtitle or description"
          rows={3}
        />
        {form.formState.errors.subtitle && (
          <p className="text-sm text-destructive">
            {form.formState.errors.subtitle.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="imagePath">
          Image <span className="text-destructive">*</span>
        </Label>
        <MediaUploader
          type="image"
          multiple={false}
          folderName="gallery"
          onUpload={(urls) => {
            if (urls.length > 0) {
              form.setValue('imagePath', urls[0]);
            }
          }}
          className="w-full"
        />
        {form.formState.errors.imagePath && (
          <p className="text-sm text-destructive">
            {form.formState.errors.imagePath.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : submitText}
        </Button>
      </div>
    </form>
  );
}
