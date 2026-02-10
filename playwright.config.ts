import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E 测试配置
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/e2e',

  /* 并行运行测试 */
  fullyParallel: true,

  /* 失败时重试次数 */
  retries: process.env.CI ? 2 : 0,

  /* CI 环境禁用并行 */
  workers: process.env.CI ? 1 : undefined,

  /* 测试报告配置：CI 下加 list 便于日志，同时保留 html 以生成 playwright-report 供上传 */
  reporter: [
    ...(process.env.CI ? [['list']] : []),
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],

  /* 全局配置 */
  use: {
    /* 基础 URL */
    baseURL: process.env.BASE_URL || 'http://localhost:8000',

    /* 失败时截图 */
    screenshot: 'only-on-failure',

    /* 失败时录制视频 */
    video: 'retain-on-failure',

    /* 失败时保存追踪 */
    trace: 'on-first-retry',
  },

  /* 配置本地开发服务器 */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:8000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  /* 配置不同浏览器 */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* 移动端测试 */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});
