import { z } from 'zod';

export const reviewSchema = z.object({
  id: z.number().int().positive().optional(),
  productId: z.number().int().positive(),
  userId: z.number().int().positive(),
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
  title: z.string().max(255).nullable().optional(),
  comment: z.string().min(1, 'Comment is required'),
  isVerifiedPurchase: z.boolean().default(false),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const createReviewSchema = reviewSchema.omit({
  id: true,
  isVerifiedPurchase: true,
  createdAt: true,
  updatedAt: true,
});

export const updateReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  title: z.string().max(255).nullable().optional(),
  comment: z.string().min(1),
});

export type Review = z.infer<typeof reviewSchema>;
export type CreateReview = z.infer<typeof createReviewSchema>;
export type UpdateReview = z.infer<typeof updateReviewSchema>;
