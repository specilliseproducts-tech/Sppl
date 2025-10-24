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
import { principalProductInsertSchema } from './schema';
import { generateSlug } from '@/lib/utils/slug';
import { JSX } from 'react/jsx-runtime';

interface Props {
  data?: z.infer<typeof principalProductInsertSchema>;
  submitAction: JSX.Element;
  onSubmit(values: z.infer<typeof principalProductInsertSchema>): void;
}

export function PrincipalProductForm(props: Props) {
  const form = useForm<z.infer<typeof principalProductInsertSchema>>({
    resolver: zodResolver(principalProductInsertSchema),
    defaultValues: {
      slug: '',
      title: '',
      description: '',
      imagePath: '',
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
          name="imagePath"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Logo</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <MediaUploader
                    onUpload={(urls) => {
                      if (urls.length > 0) {
                        field.onChange(urls[0]);
                      }
                    }}
                    multiple={false}
                  />
                  {field.value && (
                    <div className="flex items-center space-x-2">
                      <Image
                        src={field.value}
                        alt="Company logo preview"
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <span className="text-sm text-muted-foreground">
                        Current logo
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Principal Product title" {...field} />
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
                  placeholder="Principal Product description"
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
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug (Auto-generated from title)</FormLabel>
              <FormControl>
                <Input
                  placeholder="principal-product-slug"
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
