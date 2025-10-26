import { Redis } from '@upstash/redis';

// Create Redis instance for caching
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Cache TTL constants (in seconds)
export const CACHE_TTL = {
  PRODUCTS: 60 * 5, // 5 minutes
  PRODUCT_DETAIL: 60 * 10, // 10 minutes
  CATEGORIES: 60 * 15, // 15 minutes
  SEARCH_RESULTS: 60 * 5, // 5 minutes
  USER_SESSION: 60 * 60 * 24, // 24 hours
  ANALYTICS: 60 * 2, // 2 minutes
} as const;

// Generic cache get function with type safety
export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const cached = await redis.get<T>(key);
    return cached;
  } catch (error) {
    console.error(`Redis GET error for key ${key}:`, error);
    return null;
  }
}

// Generic cache set function
export async function setCache<T>(
  key: string,
  value: T,
  ttl: number = CACHE_TTL.PRODUCTS
): Promise<void> {
  try {
    await redis.setex(key, ttl, JSON.stringify(value));
  } catch (error) {
    console.error(`Redis SET error for key ${key}:`, error);
  }
}

// Delete cache by key
export async function deleteCache(key: string): Promise<void> {
  try {
    await redis.del(key);
  } catch (error) {
    console.error(`Redis DEL error for key ${key}:`, error);
  }
}

// Delete cache by pattern
export async function deleteCachePattern(pattern: string): Promise<void> {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error(`Redis DEL pattern error for pattern ${pattern}:`, error);
  }
}

// Cache helper for products
export const productCache = {
  getAll: () => getCached<any[]>('products:all'),
  setAll: (products: any[], ttl?: number) => setCache('products:all', products, ttl || CACHE_TTL.PRODUCTS),
  
  getById: (id: number) => getCached<any>(`product:${id}`),
  setById: (id: number, product: any) => setCache(`product:${id}`, product, CACHE_TTL.PRODUCT_DETAIL),
  
  getBySeller: (sellerId: number) => getCached<any[]>(`products:seller:${sellerId}`),
  setBySeller: (sellerId: number, products: any[]) => 
    setCache(`products:seller:${sellerId}`, products, CACHE_TTL.PRODUCTS),
    
  invalidate: (id?: number) => {
    if (id) {
      deleteCache(`product:${id}`);
    }
    deleteCache('products:all');
    deleteCachePattern('products:seller:*');
  },
};

// Cache helper for categories
export const categoryCache = {
  getAll: () => getCached<any[]>('categories:all'),
  setAll: (categories: any[]) => setCache('categories:all', categories, CACHE_TTL.CATEGORIES),
  
  invalidate: () => deleteCache('categories:all'),
};

// Cache helper for search results
export const searchCache = {
  get: (query: string, filters?: string) => {
    const key = filters ? `search:${query}:${filters}` : `search:${query}`;
    return getCached<any[]>(key);
  },
  
  set: (query: string, results: any[], filters?: string) => {
    const key = filters ? `search:${query}:${filters}` : `search:${query}`;
    return setCache(key, results, CACHE_TTL.SEARCH_RESULTS);
  },
  
  invalidate: () => deleteCachePattern('search:*'),
};

// Analytics cache helpers
export const analyticsCache = {
  getSalesMetrics: (sellerId: number, timeRange: string) => 
    getCached<any>(`analytics:sales:${sellerId}:${timeRange}`),
  
  setSalesMetrics: (sellerId: number, timeRange: string, data: any) =>
    setCache(`analytics:sales:${sellerId}:${timeRange}`, data, CACHE_TTL.ANALYTICS),
    
  getProductPerformance: (sellerId: number, timeRange: string) =>
    getCached<any>(`analytics:products:${sellerId}:${timeRange}`),
    
  setProductPerformance: (sellerId: number, timeRange: string, data: any) =>
    setCache(`analytics:products:${sellerId}:${timeRange}`, data, CACHE_TTL.ANALYTICS),
    
  invalidate: (sellerId?: number) => {
    if (sellerId) {
      deleteCachePattern(`analytics:*:${sellerId}:*`);
    } else {
      deleteCachePattern('analytics:*');
    }
  },
};

export default redis;
