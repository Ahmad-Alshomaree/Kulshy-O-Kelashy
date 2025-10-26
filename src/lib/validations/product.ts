import { z } from 'zod';

export const productSchema = z.object({
  productName: z.string().min(1, 'Product name is required').max(200, 'Product name too long'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000, 'Description too long'),
  sellingPrice: z.number().positive('Price must be positive'),
  originalPrice: z.number().positive('Original price must be positive').optional().nullable(),
  stock: z.number().int().min(0, 'Stock cannot be negative').default(0),
  sellerId: z.number().int().positive().optional().nullable(),
  productCategories: z.number().int().positive().optional().nullable(),
  rating: z.number().min(0).max(5).default(0),
  viewCount: z.number().int().min(0).default(0),
  isNew: z.boolean().default(false),
  isSaled: z.boolean().default(false),
  discount: z.string().max(50).optional().nullable(),
  colors: z.array(z.string()).optional().nullable(),
  size: z.array(z.string()).optional().nullable(),
  images: z.array(z.string().url('Invalid image URL')).optional().nullable(),
});

export const updateProductSchema = productSchema.partial();

export const productQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).default(10),
  offset: z.coerce.number().int().min(0).default(0),
  search: z.string().optional(),
  categoryId: z.coerce.number().int().positive().optional(),
  sellerId: z.coerce.number().int().positive().optional(),
  isNew: z.enum(['true', 'false']).optional(),
  isSale: z.enum(['true', 'false']).optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductQueryInput = z.infer<typeof productQuerySchema>;
