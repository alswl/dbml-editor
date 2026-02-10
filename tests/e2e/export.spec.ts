import { expect, test } from '@playwright/test';

test.describe('Export - SQL Export Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');
    await expect(page.locator('.react-shape-app')).toBeVisible({ timeout: 15000 });
  });

  test('should open export modal', async ({ page }) => {
    const exportButton = page.locator('.ant-float-btn').nth(1);
    await exportButton.click();

    const modal = page.locator('.ant-modal');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Export SQL');
  });

  test('should display exported SQL in textarea', async ({ page }) => {
    const exportButton = page.locator('.ant-float-btn').nth(1);
    await exportButton.click();

    const textarea = page.locator('.ant-modal textarea[readonly]');
    await expect(textarea).toBeVisible();

    const content = await textarea.inputValue();
    expect(content.length).toBeGreaterThan(0);
  });

  test('should export to MySQL format', async ({ page }) => {
    const exportButton = page.locator('.ant-float-btn').nth(1);
    await exportButton.click();

    // Select MySQL format
    const select = page.locator('.ant-modal .ant-select').first();
    await select.click();
    await page.waitForSelector('.ant-select-dropdown');

    const mysqlOption = page.locator(
      '.ant-select-item-option-content:has-text("MySQL")',
    );
    await mysqlOption.click();

    // Verify MySQL-specific syntax
    const textarea = page.locator('.ant-modal textarea[readonly]');
    const content = await textarea.inputValue();

    // MySQL uses backticks for identifiers
    expect(content).toMatch(/`[^`]+`/);
  });

  test('should export to PostgreSQL format', async ({ page }) => {
    const exportButton = page.locator('.ant-float-btn').nth(1);
    await exportButton.click();

    // Select Postgres format
    const select = page.locator('.ant-modal .ant-select').first();
    await select.click();
    await page.waitForSelector('.ant-select-dropdown');

    const postgresOption = page.locator(
      '.ant-select-item-option-content:has-text("Postgres")',
    );
    await postgresOption.click();

    // Verify PostgreSQL-specific syntax
    const textarea = page.locator('.ant-modal textarea[readonly]');
    const content = await textarea.inputValue();

    // PostgreSQL uses double quotes for identifiers
    expect(content).toMatch(/"[^"]+"/);
  });

  test('should export to MSSQL format', async ({ page }) => {
    const exportButton = page.locator('.ant-float-btn').nth(1);
    await exportButton.click();

    // Select MSSQL format
    const select = page.locator('.ant-modal .ant-select').first();
    await select.click();
    await page.waitForSelector('.ant-select-dropdown');

    const mssqlOption = page.locator(
      '.ant-select-item-option-content:has-text("MSSQL")',
    );
    await mssqlOption.click();

    const textarea = page.locator('.ant-modal textarea[readonly]');
    const content = await textarea.inputValue();

    // MSSQL uses square brackets for identifiers
    expect(content.length).toBeGreaterThan(0);
  });

  test('should export to Oracle format', async ({ page }) => {
    const exportButton = page.locator('.ant-float-btn').nth(1);
    await exportButton.click();

    // Select Oracle format
    const select = page.locator('.ant-modal .ant-select').first();
    await select.click();
    await page.waitForSelector('.ant-select-dropdown');

    const oracleOption = page.locator(
      '.ant-select-item-option-content:has-text("Oracle")',
    );
    await oracleOption.click();

    const textarea = page.locator('.ant-modal textarea[readonly]');
    const content = await textarea.inputValue();

    expect(content.length).toBeGreaterThan(0);
  });

  test('should export to JSON format', async ({ page }) => {
    const exportButton = page.locator('.ant-float-btn').nth(1);
    await exportButton.click();

    // Select JSON format
    const select = page.locator('.ant-modal .ant-select').first();
    await select.click();
    await page.waitForSelector('.ant-select-dropdown');

    const jsonOption = page.locator(
      '.ant-select-item-option-content:has-text("JSON")',
    );
    await jsonOption.click();

    const textarea = page.locator('.ant-modal textarea[readonly]');
    const content = await textarea.inputValue();

    // Verify JSON syntax
    expect(() => JSON.parse(content)).not.toThrow();
  });

  test('should export to DBML format', async ({ page }) => {
    const exportButton = page.locator('.ant-float-btn').nth(1);
    await exportButton.click();

    // Select DBML format
    const select = page.locator('.ant-modal .ant-select').first();
    await select.click();
    await page.waitForSelector('.ant-select-dropdown');

    const dbmlOption = page.locator(
      '.ant-select-item-option-content:has-text("DBML")',
    );
    await dbmlOption.click();

    const textarea = page.locator('.ant-modal textarea[readonly]');
    const content = await textarea.inputValue();

    // DBML contains Table definitions
    expect(content).toContain('Table');
  });

  test('should close export modal with OK button', async ({ page }) => {
    const exportButton = page.locator('.ant-float-btn').nth(1);
    await exportButton.click();

    const modal = page.locator('.ant-modal');
    await expect(modal).toBeVisible();

    const okButton = page.locator('.ant-modal .ant-btn-primary');
    await okButton.click();

    await expect(modal).not.toBeVisible();
  });

  test('should close export modal with Cancel button', async ({ page }) => {
    const exportButton = page.locator('.ant-float-btn').nth(1);
    await exportButton.click();

    const modal = page.locator('.ant-modal');
    await expect(modal).toBeVisible();

    const cancelButton = page.locator(
      '.ant-modal .ant-btn:not(.ant-btn-primary)',
    );
    await cancelButton.click();

    await expect(modal).not.toBeVisible();
  });

  test('should export CREATE TABLE statement', async ({ page }) => {
    const exportButton = page.locator('.ant-float-btn').nth(1);
    await exportButton.click();

    const textarea = page.locator('.ant-modal textarea[readonly]');
    const content = await textarea.inputValue();

    // Should contain CREATE TABLE statement
    expect(content).toMatch(/CREATE\s+TABLE/i);
  });

  test('should export schema with table name', async ({ page }) => {
    const exportButton = page.locator('.ant-float-btn').nth(1);
    await exportButton.click();

    const textarea = page.locator('.ant-modal textarea[readonly]');
    const content = await textarea.inputValue();

    // Should contain 'users' table from initial code
    expect(content.toLowerCase()).toContain('users');
  });
});
