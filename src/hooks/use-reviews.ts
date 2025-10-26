import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Review, CreateReview, UpdateReview } from '@/lib/validations/review';

// Fetch reviews for a product
export const useReviews = (productId?: number) => {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      if (!productId) throw new Error('Product ID is required');
      const response = await fetch(`/api/reviews?productId=${productId}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch reviews');
      }
      return response.json() as Promise<Review[]>;
    },
    enabled: !!productId,
  });
};

// Fetch user reviews
export const useUserReviews = (userId?: number) => {
  return useQuery({
    queryKey: ['reviews', 'user', userId],
    queryFn: async () => {
      if (!userId) throw new Error('User ID is required');
      const response = await fetch(`/api/reviews?userId=${userId}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch user reviews');
      }
      return response.json() as Promise<Review[]>;
    },
    enabled: !!userId,
  });
};

// Create review mutation
export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateReview) => {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create review');
      }
      
      return response.json() as Promise<Review>;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.productId] });
      queryClient.invalidateQueries({ queryKey: ['products', variables.productId] });
    },
  });
};

// Update review mutation
export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateReview }) => {
      const response = await fetch(`/api/reviews?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update review');
      }
      
      return response.json() as Promise<Review>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};

// Delete review mutation
export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/reviews?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete review');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};
