import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should display login page correctly', async ({ page }) => {
    await page.goto('/login');
    
    // Check page loaded
    await expect(page).toHaveURL(/\/login/);
    
    // Check for email and password fields
    const emailInput = page.getByLabel(/email/i);
    const passwordInput = page.getByLabel(/password/i);
    
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    
    // Check for login button
    const loginButton = page.getByRole('button', { name: /sign in|login/i });
    await expect(loginButton).toBeVisible();
  });

  test('should navigate to registration page', async ({ page }) => {
    await page.goto('/login');
    
    // Find and click register/signup link
    const registerLink = page.getByRole('link', { name: /register|sign up|create account/i });
    await registerLink.click();
    
    // Should navigate to signup page
    await expect(page).toHaveURL(/\/signup/);
  });

  test('should go directly to signup page', async ({ page }) => {
    await page.goto('/signup');
    await expect(page).toHaveURL(/\/signup/);
    
    // Check for customer and seller options
    await expect(page.getByText(/customer/i)).toBeVisible();
    await expect(page.getByText(/seller/i)).toBeVisible();
  });

  test('should handle empty login submission', async ({ page }) => {
    await page.goto('/login');
    
    const loginButton = page.getByRole('button', { name: /sign in|login/i });
    await loginButton.click();
    
    // Should show validation or stay on page
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/login/);
  });

  test('should navigate between login and signup', async ({ page }) => {
    // Start at login
    await page.goto('/login');
    await expect(page).toHaveURL(/\/login/);
    
    // Go to signup
    const signupLink = page.getByRole('link', { name: /sign up|create account|register/i }).first();
    if (await signupLink.isVisible()) {
      await signupLink.click();
      await expect(page).toHaveURL(/\/signup/);
      
      // Go back to login
      const loginLink = page.getByRole('link', { name: /sign in|login/i }).first();
      if (await loginLink.isVisible()) {
        await loginLink.click();
        await expect(page).toHaveURL(/\/login/);
      }
    }
  });
});