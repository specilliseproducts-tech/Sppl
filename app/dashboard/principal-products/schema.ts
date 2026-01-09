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

export const customSectionSchema = z.object({
  title: z.string().min(1, 'Section title is required'),
  descriptions: z.array(z.string().min(1, 'Description cannot be empty')).min(1, 'At least one description is required'),
});

export const productSchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  images: z.array(z.string()).max(2, 'Maximum 2 images allowed').optional().default([]),
  keyFeatures: z.array(z.string()).optional().default([]),
  keyTechnicalSpecifications: z.string().optional(),
  typicalApplications: z.string().optional(),
  customSections: z.array(customSectionSchema).optional().default([]),
  primaryApplicationDomains: z.array(z.string()).optional().default([]),
  userProducts: z.array(userProductSchema).optional().default([]),
});

// Product Range Overview Table Schema
export const productRangeOverviewTableSchema = z.object({
  headers: z.array(z.string()).default([]),
  rows: z.array(z.array(z.string())).default([]),
  columnVisibility: z.array(z.boolean()).optional().default([]),
  rowVisibility: z.array(z.boolean()).optional().default([]),
});

export const principalProductInsertSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imagePath: z.string().min(1, 'Image path is required'),
  link: z.string().optional().default(''),
  keyFacts: z.array(z.string()).optional().default([]),
  productRangeOverview: productRangeOverviewTableSchema.optional(),
  products: z.array(productSchema).optional().default([]),
});

export const principalProductSelectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  imagePath: z.string(),
  link: z.string(),
  keyFacts: z.array(z.string()).optional().default([]),
  productRangeOverview: productRangeOverviewTableSchema.optional(),
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
