import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().int().positive().optional(),
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').max(255),
  passwordHash: z.string().optional(),
  role: z.enum(['customer', 'seller', 'admin']).default('customer'),
  avatarUrl: z.string().url().nullable().optional(),
  phone: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').max(255),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['customer', 'seller', 'admin']).default('customer'),
});

export const updateUserSchema = userSchema.partial().omit({
  id: true,
  passwordHash: true,
  createdAt: true,
});

export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
