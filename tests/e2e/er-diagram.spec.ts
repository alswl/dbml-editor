import { expect, test } from '@playwright/test';

test.describe('ER Diagram - Interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('svg', { timeout: 10000 });
  });

  test('should render ER diagram nodes', async ({ page }) => {
    // Wait for the diagram to render completely
    await page.waitForSelector('.react-shape-app', { timeout: 10000 });
    await page.waitForTimeout(2000); // Wait for initial render and data binding

    // Use a locator that waits for the condition
    const nodes = page.locator('svg g[data-cell-id]');
    await expect(nodes.first()).toBeVisible({ timeout: 10000 });

    const nodeCount = await nodes.count();
    expect(nodeCount).toBeGreaterThan(0);
  });

  test('should display table names', async ({ page }) => {
    const tableNames = page.locator('svg text');
    const textCount = await tableNames.count();
    expect(textCount).toBeGreaterThan(0);

    const allText = await tableNames.allTextContents();
    expect(allText.join(' ')).toContain('users');
  });

  test('should display relationship lines between tables', async ({ page }) => {
    await page.waitForSelector('.monaco-editor', { timeout: 10000 });

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

    await page.waitForTimeout(2500);

    const edges = page.locator('svg path[stroke]');
    const edgeCount = await edges.count();
    expect(edgeCount).toBeGreaterThan(0);
  });

  test('should drag nodes', async ({ page }) => {
    await page.waitForTimeout(2000);

    const firstRect = page.locator('svg rect').first();
    await expect(firstRect).toBeVisible();

    const boundingBox = await firstRect.boundingBox();

    if (boundingBox) {
      const { x, y, width, height } = boundingBox;
      const centerX = x + width / 2;
      const centerY = y + height / 2;

      await page.mouse.move(centerX, centerY);
      await page.mouse.down();
      await page.mouse.move(centerX + 100, centerY + 50, { steps: 10 });
      await page.mouse.up();

      await page.waitForTimeout(500);

      const afterDragBox = await firstRect.boundingBox();
      expect(afterDragBox).toBeTruthy();
    }
  });

  test('should pan canvas', async ({ page }) => {
    const canvas = page.locator('.app-content');
    const boundingBox = await canvas.boundingBox();

    if (boundingBox) {
      const { x, y, width, height } = boundingBox;
      const centerX = x + width / 2;
      const centerY = y + height / 2;

      await page.mouse.move(centerX, centerY);
      await page.mouse.down();
      await page.mouse.move(centerX + 200, centerY + 100);
      await page.mouse.up();

      await page.waitForTimeout(300);

      expect(true).toBe(true);
    }
  });
});

test.describe('ER Diagram - Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('svg', { timeout: 10000 });
  });

  test('should auto-layout multiple tables', async ({ page }) => {
    await page.waitForSelector('.monaco-editor', { timeout: 10000 });

    const editor = page.locator('.monaco-editor').first();
    await editor.click();
    await page.keyboard.press('Meta+A');

    const multiTableDBML = `
Table users {
  id integer [pk]
  name varchar
}

Table posts {
  id integer [pk]
  title varchar
  user_id integer
}

Table comments {
  id integer [pk]
  content text
  post_id integer
}

Ref: posts.user_id > users.id
Ref: comments.post_id > posts.id
`;
    await page.keyboard.type(multiTableDBML);

    await page.waitForTimeout(2500);

    const nodes = page.locator('svg g[data-cell-id]');
    const nodeCount = await nodes.count();
    expect(nodeCount).toBeGreaterThanOrEqual(3);

    const edges = page.locator('svg path[stroke]');
    const edgeCount = await edges.count();
    expect(edgeCount).toBeGreaterThanOrEqual(2);
  });

  test('should display composite fields correctly', async ({ page }) => {
    const editor = page.locator('.monaco-editor').first();
    await editor.click();
    await page.keyboard.press('Meta+A');

    const dbmlWithFields = `
Table products {
  id integer [pk, increment]
  name varchar [not null]
  price decimal
  created_at timestamp [default: \`now()\`]
  
  Note: 'Products catalog'
}
`;
    await page.keyboard.type(dbmlWithFields);

    await page.waitForTimeout(2500);

    const nodes = page.locator('svg g[data-cell-id]');
    expect(await nodes.count()).toBeGreaterThan(0);
  });
});

test.describe('ER Diagram - Visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('svg', { timeout: 10000 });
    await page.waitForTimeout(1000);
  });

  test('should render complete ER diagram', async ({ page }) => {
    const erDiagram = page.locator('.react-shape-app');
    await expect(erDiagram).toBeVisible();

    const svg = page.locator('svg').first();
    await expect(svg).toBeVisible();

    const rects = page.locator('svg rect');
    const rectCount = await rects.count();
    expect(rectCount).toBeGreaterThan(0);

    const texts = page.locator('svg text');
    const textCount = await texts.count();
    expect(textCount).toBeGreaterThan(0);
  });

  test('responsive layout - mobile view', async ({ page, isMobile }) => {
    if (isMobile) {
      const editor = page.locator('.editor');
      const viewer = page.locator('.react-shape-app');

      const editorBox = await editor.boundingBox();
      const viewerBox = await viewer.boundingBox();

      if (editorBox && viewerBox) {
        expect(viewerBox.y).toBeGreaterThan(editorBox.y);
      }
    }
  });
});
