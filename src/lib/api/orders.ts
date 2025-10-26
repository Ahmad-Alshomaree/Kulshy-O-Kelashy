import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Order {
  id: number;
  orderId: string;
  userId: string;
  customerEmail: string;
  customerName: string;
  stripePaymentIntentId?: string;
  stripeCheckoutSessionId?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  items: any;
  shippingAddress?: any;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
  orderItems?: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
  createdAt: string;
}

interface OrdersParams {
  limit?: number;
  offset?: number;
  status?: string;
}

// Fetch orders list
export async function fetchOrders(params: OrdersParams = {}): Promise<Order[]> {
  const searchParams = new URLSearchParams();
  
  if (params.limit) searchParams.set('limit', params.limit.toString());
  if (params.offset) searchParams.set('offset', params.offset.toString());
  if (params.status) searchParams.set('status', params.status);
  
  const response = await fetch(`/api/orders?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  
  return response.json();
}

// Fetch single order
export async function fetchOrder(id: number): Promise<Order> {
  const response = await fetch(`/api/orders?id=${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch order');
  }
  
  return response.json();
}

// Hook for fetching orders with caching
export function useOrders(params: OrdersParams = {}) {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => fetchOrders(params),
  });
}

// Hook for fetching single order
export function useOrder(id: number) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrder(id),
    enabled: !!id,
  });
}

// Hook for updating order
export function useUpdateOrder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Order> }) => {
      const response = await fetch(`/api/orders?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update order');
      }
      
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', variables.id] });
    },
  });
}

// Hook for creating Stripe checkout session
export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: async (data: {
      items: Array<{ productId: number; quantity: number }>;
      successUrl?: string;
      cancelUrl?: string;
      shippingAddress?: any;
    }) => {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create checkout session');
      }
      
      return response.json();
    },
  });
}
