import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Product {
  productId: number;
  productName: string;
  description: string;
  sellingPrice: number;
  originalPrice?: number;
  stock: number;
  rating: number;
  viewCount: number;
  isNew: boolean;
  isSaled: boolean;
  discount?: string;
  colors?: string[];
  size?: string[];
  images?: string[];
  sellerId?: number;
  productCategories?: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductsParams {
  limit?: number;
  offset?: number;
  search?: string;
  categoryId?: number;
  sellerId?: number;
  isNew?: boolean;
  isSale?: boolean;
}

// Fetch products list
export async function fetchProducts(params: ProductsParams = {}): Promise<Product[]> {
  const searchParams = new URLSearchParams();
  
  if (params.limit) searchParams.set('limit', params.limit.toString());
  if (params.offset) searchParams.set('offset', params.offset.toString());
  if (params.search) searchParams.set('search', params.search);
  if (params.categoryId) searchParams.set('categoryId', params.categoryId.toString());
  if (params.sellerId) searchParams.set('sellerId', params.sellerId.toString());
  if (params.isNew !== undefined) searchParams.set('isNew', params.isNew.toString());
  if (params.isSale !== undefined) searchParams.set('isSale', params.isSale.toString());
  
  const response = await fetch(`/api/products?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
}

// Fetch single product
export async function fetchProduct(id: number): Promise<Product> {
  const response = await fetch(`/api/products?id=${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  
  return response.json();
}

// Hook for fetching products with caching
export function useProducts(params: ProductsParams = {}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
  });
}

// Hook for fetching single product
export function useProduct(id: number) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });
}

// Hook for creating product
export function useCreateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<Product>) => {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create product');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

// Hook for updating product
export function useUpdateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Product> }) => {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update product');
      }
      
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
    },
  });
}

// Hook for deleting product
export function useDeleteProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete product');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
