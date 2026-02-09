import { expect, test } from '@playwright/test';

test.describe('Visual - ER Diagram Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.react-shape-app', { timeout: 10000 });
    await page.waitForTimeout(2000); // Wait for initial render
  });

  test('should render ER diagram container', async ({ page }) => {
    // Check that the diagram container is visible
    const diagram = page.locator('.react-shape-app');
    await expect(diagram).toBeVisible();
  });

  test('should render table nodes correctly', async ({ page }) => {
    // Check that table nodes are rendered
    const nodes = page.locator('svg g[data-cell-id]');
    const nodeCount = await nodes.count();

    expect(nodeCount).toBeGreaterThan(0);
  });

  test('should render table names in SVG', async ({ page }) => {
    // Check that table names are visible
    const tableNames = page.locator('svg text');
    const textCount = await tableNames.count();

    expect(textCount).toBeGreaterThan(0);

    // Verify 'users' table is present
    const allText = await tableNames.allTextContents();
    expect(allText.join(' ')).toContain('users');
  });

  test('should render connections between tables', async ({ page }) => {
    // Wait for the editor to load
    await page.waitForSelector('.monaco-editor', { timeout: 10000 });

    // Add relationship to the editor
    const editor = page.locator('.monaco-editor').first();
    await editor.click();
    await page.keyboard.press('Meta+A');

    const dbmlWithRelation = `
Table users {
  id integer [pk]
}

Table posts {
  id integer [pk]
  user_id integer
}

Ref: posts.user_id > users.id
`;
    await page.keyboard.type(dbmlWithRelation);

    // Wait for diagram to update
    await page.waitForTimeout(3000);

    // Check that edges (connections) are rendered
    const edges = page.locator('svg path[stroke]');
    const edgeCount = await edges.count();

    expect(edgeCount).toBeGreaterThan(0);
  });

  test('should maintain layout after zoom operations', async ({ page }) => {
    // Get zoom level
    const zoomLevel = page.locator('.zoom-level');

    // Zoom in
    const zoomInButton = page.locator('.zoom-toolbar button').first();
    await zoomInButton.click();
    await page.waitForTimeout(500);

    // Reset
    const resetButton = page.locator('.zoom-toolbar button').nth(3);
    await resetButton.click();
    await page.waitForTimeout(500);

    // Verify zoom is back to 100%
    const afterReset = await zoomLevel.textContent();
    expect(afterReset).toBe('100%');
  });

  test('should have SVG with proper viewBox', async ({ page }) => {
    // Check that SVG elements have proper positioning
    const svg = page.locator('svg').first();
    await expect(svg).toBeVisible();

    // Check that viewBox is set correctly
    const viewBox = await svg.getAttribute('viewBox');
    expect(viewBox).toBeTruthy();
  });
});
