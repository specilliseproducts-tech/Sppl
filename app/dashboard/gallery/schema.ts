import { z } from 'zod';

export const gallerySchema = z.object({
  category: z.string().min(1, 'Category is required').max(50, 'Category too long'),
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  subtitle: z.string().min(1, 'Subtitle is required').max(300, 'Subtitle too long'),
  imagePath: z.string().url('Must be a valid URL'),
});

export const galleryInsertSchema = gallerySchema;

export const galleryUpdateSchema = gallerySchema.partial();

export const gallerySelectSchema = gallerySchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type GalleryInsert = z.infer<typeof galleryInsertSchema>;
export type GalleryUpdate = z.infer<typeof galleryUpdateSchema>;
export type GallerySelect = z.infer<typeof gallerySelectSchema>;
