import { z } from 'zod';

export const userProductSchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  images: z.array(z.string()).max(2, 'Maximum 2 images allowed').optional().default([]),
  keyFeatures: z.array(z.string()).optional().default([]),
  productFamily: z.string().optional(),
  components: z.string().optional(),
  keyTechnicalSpecifications: z.string().optional(),
  applicationsTargetMarkets: z.string().optional(),
  technicalHighlights: z.string().optional(),
  typicalApplications: z.string().optional(),
  targetMarketsEndUsers: z.string().optional(),
  keyDifferentiatorsPositioning: z.string().optional(),
});

export const productSchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  images: z.array(z.string()).max(2, 'Maximum 2 images allowed').optional().default([]),
  keyFeatures: z.array(z.string()).optional().default([]),
  userProducts: z.array(userProductSchema).optional().default([]),
});

export const principalProductInsertSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imagePath: z.string().min(1, 'Image path is required'),
  link: z.string().min(1, 'Link is required'),
  products: z.array(productSchema).optional().default([]),
});

export const principalProductSelectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  imagePath: z.string(),
  link: z.string(),
  products: z.array(productSchema).optional().default([]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserProduct = z.infer<typeof userProductSchema>;
export type Product = z.infer<typeof productSchema>;
export type PrincipalProduct = z.infer<typeof principalProductSelectSchema>;
export type PrincipalProductInsert = z.infer<
  typeof principalProductInsertSchema
>;
