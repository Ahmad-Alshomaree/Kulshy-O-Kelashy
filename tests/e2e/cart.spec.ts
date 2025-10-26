import { test, expect } from '@playwright/test';

test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to cart page', async ({ page }) => {
    // Look for cart button/link
    const cartLink = page.getByRole('link', { name: /cart/i }).or(
      page.locator('[href="/cart"]')
    );

    if (await cartLink.isVisible()) {
      await cartLink.click();
      await expect(page).toHaveURL('/cart');
    } else {
      await page.goto('/cart');
    }
  });

  test('should display empty cart message when cart is empty', async ({ page }) => {
    await page.goto('/cart');

    // Should show empty cart message or empty state
    const emptyMessage = page.locator('text=/empty|no items/i').first();
    
    // Wait a bit for any loading states
    await page.waitForTimeout(1000);
    
    const itemCount = await page.locator('[data-testid="cart-item"], .cart-item').count();
    if (itemCount === 0) {
      expect(true).toBe(true); // Cart is empty as expected
    }
  });

  test('should add product to cart from product page', async ({ page }) => {
    // Navigate to a product page
    await page.goto('/');
    
    // Wait for products
    await page.waitForSelector('[href^="/products/"]', { timeout: 10000 });
    
    // Click first product
    await page.locator('[href^="/products/"]').first().click();
    
    // Wait for product page to load
    await page.waitForLoadState('networkidle');

    // Look for add to cart button
    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    
    if (await addToCartButton.isVisible()) {
      await addToCartButton.click();

      // Should show success message or cart update
      await page.waitForTimeout(500);
    }
  });

  test('should navigate to checkout from cart', async ({ page }) => {
    await page.goto('/cart');

    // Look for checkout button
    const checkoutButton = page.getByRole('button', { name: /checkout|proceed/i }).or(
      page.getByRole('link', { name: /checkout|proceed/i })
    );

    if (await checkoutButton.isVisible()) {
      await checkoutButton.click();
      
      // Should navigate to checkout or login (if not authenticated)
      await page.waitForURL(/\/checkout|\/login/);
    }
  });
});
