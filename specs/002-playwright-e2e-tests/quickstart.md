# Quickstart: E2E Testing with Playwright

## Running Tests

### Local Development

```bash
# Run all E2E tests
pnpm test:e2e

# Run with UI mode (interactive)
pnpm test:e2e:ui

# Debug mode
pnpm test:e2e:debug

# Run specific test file
pnpm test:e2e -- tests/e2e/editor.spec.ts

# Run with specific project
pnpm test:e2e -- --project=chromium
```

### CI Environment

```bash
# E2E tests run automatically in CI via GitHub Actions
# See .github/workflows/test.yml
```

## Test Structure

```
tests/
├── e2e/
│   ├── editor.spec.ts        # Core editor tests
│   ├── er-didiagram.spec.ts  # Diagram rendering tests
│   └── toolbar.spec.ts       # Toolbar controls (TODO)
├── setup.ts                  # Test configuration
└── __mocks__/                # Mock files
```

## Writing New Tests

### Basic Test Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should do something', async ({ page }) => {
    // Test implementation
  });
});
```

### Best Practices

1. Use `test.beforeEach` for navigation/setup
2. Use `expect` assertions from Playwright
3. Wait for elements with `toBeVisible()`, `toBeEnabled()`
4. Use `page.waitForTimeout()` sparingly (prefer explicit waits)
5. Add proper locators with accessibility labels

## Configuration

See `playwright.config.ts` for:

- Base URL and timeouts
- Browser projects
- Reporters
- CI settings
