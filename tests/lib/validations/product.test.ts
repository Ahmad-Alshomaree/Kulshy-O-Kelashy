import { describe, it, expect } from 'vitest';
import { productSchema, updateProductSchema, productQuerySchema } from '@/lib/validations/product';

describe('Product Validation', () => {
  describe('productSchema', () => {
    it('should validate a valid product', () => {
      const validProduct = {
        productName: 'Test Product',
        description: 'This is a test product description',
        sellingPrice: 99.99,
        stock: 10,
      };

      const result = productSchema.safeParse(validProduct);
      expect(result.success).toBe(true);
    });

    it('should reject product with missing required fields', () => {
      const invalidProduct = {
        productName: 'Test Product',
        // missing description and sellingPrice
      };

      const result = productSchema.safeParse(invalidProduct);
      expect(result.success).toBe(false);
    });

    it('should reject product with negative price', () => {
      const invalidProduct = {
        productName: 'Test Product',
        description: 'Description',
        sellingPrice: -10,
      };

      const result = productSchema.safeParse(invalidProduct);
      expect(result.success).toBe(false);
    });

    it('should accept optional fields', () => {
      const productWithOptionals = {
        productName: 'Test Product',
        description: 'Description',
        sellingPrice: 99.99,
        originalPrice: 129.99,
        colors: ['red', 'blue'],
        size: ['M', 'L'],
      };

      const result = productSchema.safeParse(productWithOptionals);
      expect(result.success).toBe(true);
    });
  });

  describe('productQuerySchema', () => {
    it('should validate query parameters', () => {
      const query = {
        limit: '20',
        offset: '0',
        search: 'test',
      };

      const result = productQuerySchema.safeParse(query);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.limit).toBe(20);
        expect(result.data.offset).toBe(0);
      }
    });

    it('should enforce maximum limit', () => {
      const query = {
        limit: '200', // exceeds max of 100
      };

      const result = productQuerySchema.safeParse(query);
      expect(result.success).toBe(false);
    });
  });
});
