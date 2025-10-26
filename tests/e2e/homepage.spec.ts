import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/EcoShop/);
  });

  test('should display product sections', async ({ page }) => {
    await page.goto('/');
    
    // Check for product section headings
    await expect(page.getByText('High-Rated Items')).toBeVisible();
    await expect(page.getByText('Offers')).toBeVisible();
    await expect(page.getByText('Most Viewed')).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check if navigation elements are present
    const nav = page.locator('nav, header');
    await expect(nav).toBeVisible();
  });
});
