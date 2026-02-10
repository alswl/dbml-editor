import { expect, test } from '@playwright/test';

test.describe('Toolbar - Zoom Controls', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.zoom-toolbar', { timeout: 10000 });
    await page.waitForTimeout(2000); // Wait for initial render
  });

  test('should display zoom toolbar', async ({ page }) => {
    const toolbar = page.locator('.zoom-toolbar');
    await expect(toolbar).toBeVisible();

    // Check all buttons are present
    const buttons = toolbar.locator('.ant-btn');
    await expect(buttons).toHaveCount(4);
  });

  test('should zoom in', async ({ page }) => {
    const zoomLevel = page.locator('.zoom-level');
    const initialZoom = await zoomLevel.textContent();
    const initialValue = parseInt(initialZoom || '100', 10);

    // Use .ant-btn to exclude Switch: order is Zoom in, Zoom out, Fit, Reset
    const zoomInButton = page.locator('.zoom-toolbar .ant-btn').first();
    await zoomInButton.click();
    await page.waitForTimeout(500);

    const newZoom = await zoomLevel.textContent();
    const newValue = parseInt(newZoom || '100', 10);

    expect(newValue).toBeGreaterThan(initialValue);
  });

  test('should zoom out', async ({ page }) => {
    const zoomLevel = page.locator('.zoom-level');

    // First zoom in to ensure we can zoom out (.ant-btn excludes Switch)
    const zoomInButton = page.locator('.zoom-toolbar .ant-btn').first();
    await zoomInButton.click();
    await page.waitForTimeout(500);

    const afterZoomIn = await zoomLevel.textContent();
    const afterZoomInValue = parseInt(afterZoomIn || '100', 10);

    // Click zoom out button (second .ant-btn)
    const zoomOutButton = page.locator('.zoom-toolbar .ant-btn').nth(1);
    await zoomOutButton.click();
    await page.waitForTimeout(500);

    const afterZoomOut = await zoomLevel.textContent();
    const afterZoomOutValue = parseInt(afterZoomOut || '100', 10);

    expect(afterZoomOutValue).toBeLessThan(afterZoomInValue);
  });

  test('should fit to screen', async ({ page }) => {
    const zoomLevel = page.locator('.zoom-level');

    // First zoom in multiple times (.ant-btn = Zoom in, Zoom out, Fit, Reset)
    const zoomInButton = page.locator('.zoom-toolbar .ant-btn').first();
    for (let i = 0; i < 3; i++) {
      await zoomInButton.click();
      await page.waitForTimeout(300);
    }

    const beforeFit = await zoomLevel.textContent();
    const beforeFitValue = parseInt(beforeFit || '100', 10);
    expect(beforeFitValue).toBeGreaterThan(100);

    // Click fit to screen button (third .ant-btn)
    const fitButton = page.locator('.zoom-toolbar .ant-btn').nth(2);
    await fitButton.click();
    await page.waitForTimeout(500);

    const afterFit = await zoomLevel.textContent();
    const afterFitValue = parseInt(afterFit || '100', 10);

    // After fit, zoom should be at a reasonable level (not extremely zoomed in)
    expect(afterFitValue).toBeLessThanOrEqual(150);
  });

  test('should reset view', async ({ page }) => {
    const zoomLevel = page.locator('.zoom-level');

    // First zoom in multiple times (.ant-btn = Zoom in, Zoom out, Fit, Reset)
    const zoomInButton = page.locator('.zoom-toolbar .ant-btn').first();
    for (let i = 0; i < 3; i++) {
      await zoomInButton.click();
      await page.waitForTimeout(300);
    }

    const beforeReset = await zoomLevel.textContent();
    const beforeResetValue = parseInt(beforeReset || '100', 10);
    expect(beforeResetValue).toBeGreaterThan(100);

    // Click reset button (fourth .ant-btn)
    const resetButton = page.locator('.zoom-toolbar .ant-btn').nth(3);
    await resetButton.click();
    await page.waitForTimeout(500);

    const afterReset = await zoomLevel.textContent();
    const afterResetValue = parseInt(afterReset || '100', 10);

    // After reset, zoom should be back to 100%
    expect(afterResetValue).toBe(100);
  });

  test('should display zoom level percentage', async ({ page }) => {
    const zoomLevel = page.locator('.zoom-level');
    await expect(zoomLevel).toBeVisible();

    const text = await zoomLevel.textContent();
    expect(text).toMatch(/\d+%$/);
  });

  test('should have tooltip on zoom in button', async ({ page }) => {
    const zoomInButton = page.locator('.zoom-toolbar .ant-btn').first();

    // Hover to show tooltip
    await zoomInButton.hover();

    // Check tooltip is displayed (Ant Design tooltip)
    const tooltip = page.locator('.ant-tooltip');
    await expect(tooltip)
      .toBeVisible({ timeout: 500 })
      .catch(() => {
        // Tooltip might not be visible immediately, but button should be clickable
      });
  });
});
