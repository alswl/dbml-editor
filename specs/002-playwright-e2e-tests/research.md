# Research: Playwright E2E Test Integration

## Findings Summary

Playwright E2E 测试框架已**基本集成完成**。以下是需要改进的领域。

## Current State

### Already Implemented

| Component | Status | Details |
| --- | --- | --- |
| Playwright installation | DONE | `@playwright/test: ^1.40.0` installed |
| Configuration | DONE | `playwright.config.ts` with CI support |
| Test scripts | DONE | `test:e2e`, `test:e2e:debug`, `test:e2e:ui` |
| CI integration | DONE | `.github/workflows/test.yml` includes E2E job |
| Browser support | DONE | Chromium, Firefox, Webkit + Mobile |
| Reporters | DONE | HTML, JSON, JUnit formats |

### Existing Test Coverage

- **editor.spec.ts**: Basic features, editing, import/export, error handling
- **er-diagram.spec.ts**: Diagram rendering, interaction, layout, visual

### Missing Coverage (per Constitution)

- [ ] Toolbar controls (zoom, fit, layout buttons)
- [ ] Visual regression testing
- [ ] DBML format-specific import/export tests
- [ ] Edge cases for syntax errors

## Recommendations

### Priority 1: Toolbar Tests

```typescript
// tests/e2e/toolbar.spec.ts
test.describe('Toolbar - Zoom Controls', () => {
  test('should zoom in/out', async ({ page }) => { ... });
  test('should fit to screen', async ({ page }) => { ... });
  test('should reset view', async ({ page }) => { ... });
});
```

### Priority 2: CI Improvements

- Add caching for node_modules and Playwright browsers
- Parallelize unit and E2E jobs
- Add lint/type check before tests

### Priority 3: Enhanced Coverage

- Visual regression with `playwright-test-reporter`
- Database-specific export tests (MySQL, Postgres, etc.)

## Decision

**Continue with incremental improvements** - Framework is in place, need to expand test scenarios.

## Alternatives Considered

| Alternative | Rejected Because                      |
| ----------- | ------------------------------------- |
| Cypress     | Playwright already installed          |
| Selenium    | Less suitable for modern SPA          |
| Puppeteer   | Less feature-complete than Playwright |
