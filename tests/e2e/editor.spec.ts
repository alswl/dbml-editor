import { expect, test } from '@playwright/test';

test.describe('DBML Editor - Basic Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load homepage', async ({ page }) => {
    await expect(page).toHaveTitle(/dbml/i);

    const editor = page.locator('.editor');
    await expect(editor).toBeVisible();

    const viewer = page.locator('.react-shape-app');
    await expect(viewer).toBeVisible();
  });

  test('应该显示初始代码', async ({ page }) => {
    // 等待 Monaco 编辑器加载
    await page.waitForSelector('.monaco-editor', { timeout: 10000 });
    await page.waitForTimeout(1000);

    const editorContent = await page.locator('.view-lines').textContent();
    expect(editorContent).toMatch(/Table\s+users/);
  });

  test('should display ER diagram', async ({ page }) => {
    const canvas = page.locator('.app-content');
    await expect(canvas).toBeVisible();

    const svg = page.locator('svg').first();
    await expect(svg).toBeVisible({ timeout: 5000 });
  });

  test('should display import and export buttons', async ({ page }) => {
    const floatButtons = page.locator('.ant-float-btn');
    await expect(floatButtons).toHaveCount(2);
  });
});

test.describe('DBML Editor - Editing Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should edit DBML code', async ({ page }) => {
    await page.waitForSelector('.monaco-editor', { timeout: 10000 });

    const editor = page.locator('.monaco-editor').first();
    await editor.click();

    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');

    const newCode = `Table products {
  id integer [pk]
  name varchar
}`;
    await page.keyboard.type(newCode);

    await page.waitForTimeout(2500);

    const content = await editor.textContent();
    expect(content).toContain('products');
  });

  test('should update ER diagram in real-time', async ({ page }) => {
    await page.waitForSelector('.monaco-editor', { timeout: 10000 });
    await page.waitForSelector('svg', { timeout: 5000 });
    await page.waitForTimeout(2000);

    const editor = page.locator('.monaco-editor').first();
    await editor.click();
    await page.keyboard.press('Meta+A');

    const newCode = `Table products {
  id integer [pk]
  name varchar
}

Table orders {
  id integer [pk]
  product_id integer
}`;

    await page.keyboard.type(newCode, { delay: 50 });

    await page.waitForTimeout(3000);

    const updatedRects = await page.locator('svg rect').count();
    expect(updatedRects).toBeGreaterThanOrEqual(2);
  });
});

test.describe('DBML Editor - Import Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should open import dialog', async ({ page }) => {
    const importButton = page.locator('.ant-float-btn').first();
    await importButton.click();

    const modal = page.locator('.ant-modal');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Import SQL');
  });

  test('should select import format', async ({ page }) => {
    const importButton = page.locator('.ant-float-btn').first();
    await importButton.click();

    await page.waitForSelector('.ant-modal');

    const select = page.locator('.ant-select').first();
    await select.click();

    await expect(page.locator('.ant-select-item-option-content')).toContainText(
      ['MySQL', 'Postgres'],
    );
  });

  test('should input and import SQL', async ({ page }) => {
    const importButton = page.locator('.ant-float-btn').first();
    await importButton.click();

    const textarea = page.locator('textarea[placeholder="Import your schema"]');
    await textarea.fill(
      'CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(50));',
    );

    const okButton = page.locator('.ant-modal .ant-btn-primary');
    await okButton.click();

    await expect(page.locator('.ant-modal')).not.toBeVisible();

    await page.waitForTimeout(1000);
  });

  test('should close import dialog', async ({ page }) => {
    const importButton = page.locator('.ant-float-btn').first();
    await importButton.click();

    const cancelButton = page.locator('.ant-modal .ant-btn').first();
    await cancelButton.click();

    await expect(page.locator('.ant-modal')).not.toBeVisible();
  });
});

test.describe('DBML Editor - Export Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should open export dialog', async ({ page }) => {
    const exportButton = page.locator('.ant-float-btn').nth(1);
    await exportButton.click();

    const modal = page.locator('.ant-modal');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Export SQL');
  });

  test('should display exported SQL', async ({ page }) => {
    const exportButton = page.locator('.ant-float-btn').nth(1);
    await exportButton.click();

    await page.waitForSelector('.ant-modal');
    await page.waitForTimeout(500);

    const textarea = page.locator('.ant-modal textarea[readonly]');
    await expect(textarea).toBeVisible();

    const content = await textarea.inputValue();
    expect(content.length).toBeGreaterThan(0);
  });

  test('should select export format', async ({ page }) => {
    const exportButton = page.locator('.ant-float-btn').nth(1);
    await exportButton.click();

    await page.waitForSelector('.ant-modal');

    const select = page.locator('.ant-select').first();
    await select.click();

    await expect(page.locator('.ant-select-item-option-content')).toContainText(
      ['MySQL', 'Postgres', 'Oracle'],
    );
  });

  test('should close export dialog', async ({ page }) => {
    const exportButton = page.locator('.ant-float-btn').nth(1);
    await exportButton.click();

    const okButton = page.locator('.ant-modal .ant-btn-primary');
    await okButton.click();

    await expect(page.locator('.ant-modal')).not.toBeVisible();
  });
});

test.describe('DBML Editor - Error Handling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display syntax error message', async ({ page }) => {
    await page.waitForSelector('.monaco-editor', { timeout: 10000 });

    const editor = page.locator('.monaco-editor').first();
    await editor.click();
    await page.keyboard.press('Meta+A');
    await page.keyboard.type('Invalid DBML Code!!!');

    await page.waitForTimeout(2500);

    const errorMessage = page.locator('.ant-message-error');
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
  });
});
