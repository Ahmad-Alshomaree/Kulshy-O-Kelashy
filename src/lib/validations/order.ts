import { z } from 'zod';

export const orderItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
  size: z.string().optional(),
  colors: z.array(z.string()).optional(),
});

export const createOrderSchema = z.object({
  customerEmail: z.string().email(),
  customerName: z.string().min(1),
  location: z.string().min(1),
  state: z.string().min(1),
  items: z.array(orderItemSchema).min(1, 'Order must have at least one item'),
  paymentMethodId: z.string().optional(),
});

export const updateOrderSchema = z.object({
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']).optional(),
  deliveringTime: z.string().optional(),
  deliveringCompanyId: z.number().int().positive().optional(),
});

export type OrderItemInput = z.infer<typeof orderItemSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;
