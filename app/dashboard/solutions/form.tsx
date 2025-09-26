'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MediaUploader } from '@/components/media-uploader';
import { solutionInsertSchema } from './schema';
import { generateSlug } from '@/lib/utils/slug';
import { JSX } from 'react/jsx-runtime';

interface Props {
  data?: z.infer<typeof solutionInsertSchema>;
  submitAction: JSX.Element;
  onSubmit(values: z.infer<typeof solutionInsertSchema>): void;
}

export function SolutionForm(props: Props) {
  const form = useForm<z.infer<typeof solutionInsertSchema>>({
    resolver: zodResolver(solutionInsertSchema),
    defaultValues: {
      slug: '',
      title: '',
      subtitle: '',
      description: '',
      imagePath: '',
      images: [],
      link: '',
      ...props.data,
    },
  });

  // Watch title changes to auto-generate slug
  const titleValue = form.watch('title');

  useEffect(() => {
    if (titleValue && !props.data?.slug) {
      const slug = generateSlug(titleValue);
      form.setValue('slug', slug);
    }
  }, [titleValue, form, props.data?.slug]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug (Auto-generated from title)</FormLabel>
              <FormControl>
                <Input
                  placeholder="solution-slug"
                  disabled
                  className="bg-muted"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Solution title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtitle (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Solution subtitle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Solution description"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imagePath"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Image</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <MediaUploader
                    onUpload={(urls) => {
                      if (urls.length > 0) {
                        field.onChange(urls[0]);
                      }
                    }}
                    multiple={false}
                    folder="solutions"
                  />
                  {field.value && (
                    <div className="flex items-center space-x-2">
                      <Image
                        src={field.value}
                        alt="Solution main image preview"
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <span className="text-sm text-muted-foreground">
                        Main image
                      </span>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Images (Up to 4)</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <MediaUploader
                    onUpload={(urls) => {
                      const currentImages = field.value || [];
                      const newImages = [...currentImages, ...urls].slice(0, 4); // Limit to 4 images
                      field.onChange(newImages);
                    }}
                    multiple={true}
                    folder="solutions"
                  />
                  {field.value && field.value.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">
                        Current images ({field.value.length}/4):
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {field.value.map((imageUrl, index) => (
                          <div key={index} className="relative">
                            <Image
                              src={imageUrl}
                              alt={`Solution image ${index + 1}`}
                              width={80}
                              height={80}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = field.value.filter((_, i) => i !== index);
                                field.onChange(newImages);
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {props.submitAction}
      </form>
    </Form>
  );
}
