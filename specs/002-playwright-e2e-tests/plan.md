# Implementation Plan: Playwright E2E Tests Integration

**Branch**: `002-playwright-e2e-tests` | **Date**: 2026-02-09 | **Spec**: [link to spec] **Input**: Feature specification - Create Playwright E2E tests and integrate into CI

## Summary

本项目已集成 Playwright E2E 测试框架，配置已完成，CI 工作流已存在。需要扩展测试覆盖范围，确保满足章程要求的"关键用户路径"覆盖标准。

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18 **Primary Dependencies**: @playwright/test 1.40.0, Umi 4, Ant Design 5.x **Storage**: N/A (client-side application) **Testing**: Jest 29.7 (unit) + Playwright 1.40 (E2E) **Target Platform**: Web browser (cross-browser: Chromium, Firefox, WebKit) **Project Type**: Single web application (Umi 4 SPA) **Performance Goals**: E2E tests < 10 min total execution time **Constraints**: Offline-capable, client-side only **Scale/Scope**: 3 existing test suites (editor, ER diagram, import/export)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Check                  | Status  | Notes                    |
| ---------------------- | ------- | ------------------------ |
| TypeScript strict mode | PASS    | 现有配置支持             |
| No `any` types         | PASS    | Playwright 配置类型安全  |
| Unit tests exist       | PASS    | Jest 配置存在            |
| E2E tests defined      | PASS    | Playwright 已安装配置    |
| CI includes tests      | PASS    | GitHub Actions 已配置    |
| Critical paths covered | PARTIAL | 需增加 toolbar/zoom 测试 |
| Test coverage target   | PARTIAL | 需建立覆盖率基线         |

**GATE RESULT**: PASS (可继续，但需改进测试覆盖)

## Project Structure

### Documentation (this feature)

```text
specs/002-playwright-e2e-tests/
├── plan.md              # This file
├── research.md          # Phase 0 output (optional research findings)
├── data-model.md        # Test entities and patterns
├── quickstart.md        # Testing guide
├── contracts/           # N/A for E2E tests
└── tasks.md             # Phase 2 output (implementation tasks)
```

### Source Code (repository root)

```text
src/
├── components/
├── pages/
├── services/
├── utils/
└── models/

tests/
├── e2e/
│   ├── editor.spec.ts          # Editor tests
│   ├── er-diagram.spec.ts      # ER diagram tests
│   └── toolbar.spec.ts         # NEW: Toolbar/zoom tests
├── unit/
├── __mocks__/
└── setup.ts

playwright.config.ts            # Playwright configuration
.github/workflows/
└── test.yml                    # CI with E2E tests
```

**Structure Decision**: Single web project with Playwright E2E tests in `tests/e2e/`

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --- | --- | --- |
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
