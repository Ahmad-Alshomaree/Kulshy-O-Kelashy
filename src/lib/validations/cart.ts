import { z } from 'zod';

// Add to cart schema
export const addToCartSchema = z.object({
  userId: z.number().int().positive('User ID is required'),
  productId: z.number().int().positive('Product ID is required'),
  quantity: z.number().int().positive('Quantity must be at least 1').default(1),
  selectedColor: z.string().optional(),
  selectedSize: z.string().optional(),
});

// Update cart item schema
export const updateCartItemSchema = z.object({
  quantity: z.number().int().positive('Quantity must be at least 1'),
});

// Cart query params schema
export const cartQuerySchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number).optional(),
  userId: z.string().regex(/^\d+$/).transform(Number).optional(),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
export type CartQueryParams = z.infer<typeof cartQuerySchema>;
