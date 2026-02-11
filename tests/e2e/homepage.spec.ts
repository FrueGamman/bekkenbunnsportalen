import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page loads without errors
    await expect(page).toHaveTitle(/Bekkenbunnsportalen/);
    
    // Check for main navigation
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByText('Hjem')).toBeVisible();
    await expect(page.getByText('Helsetilstander')).toBeVisible();
    await expect(page.getByText('Spesialiserte fagområder')).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation to conditions page
    await page.getByText('Helsetilstander').click();
    await expect(page).toHaveURL(/.*conditions/);
    
    // Go back to homepage
    await page.goto('/');
    
    // Test navigation to specialized content
    await page.getByText('Spesialiserte fagområder').click();
    await expect(page).toHaveURL(/.*spesialiserte-fagomrader/);
  });

  test('should have working theme toggle', async ({ page }) => {
    await page.goto('/');
    
    const themeToggle = page.getByRole('button', { name: /switch to/i });
    await expect(themeToggle).toBeVisible();
    
    // Click theme toggle
    await themeToggle.click();
    
    // Check if theme changed (this would be visible in the DOM classes)
    const html = page.locator('html');
    await expect(html).toHaveClass(/light|dark/);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check if mobile menu button is visible
    const mobileMenuButton = page.getByRole('button', { name: /toggle mobile menu/i });
    await expect(mobileMenuButton).toBeVisible();
    
    // Open mobile menu
    await mobileMenuButton.click();
    
    // Check if mobile navigation is visible
    await expect(page.getByText('Hjem')).toBeVisible();
    await expect(page.getByText('Helsetilstander')).toBeVisible();
  });

  test('should have accessible form elements', async ({ page }) => {
    await page.goto('/');
    
    // Check search input accessibility
    const searchInput = page.getByRole('searchbox');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('aria-label');
    
    // Check language selector accessibility
    const languageSelector = page.getByRole('combobox');
    await expect(languageSelector).toBeVisible();
  });

  test('should load without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('/');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    expect(consoleErrors).toHaveLength(0);
  });
});
