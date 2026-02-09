# Tasks: Playwright E2E Tests Integration

**Input**: Design documents from `/specs/002-playwright-e2e-tests/` **Prerequisites**: plan.md (required), research.md, data-model.md, quickstart.md

**Note**: 此功能主要是扩展现有测试覆盖，不涉及新代码实现。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to
- Include exact file paths in descriptions

---

## Phase 1: 现有配置验证

**目标**: 验证现有 Playwright 配置和测试正常运行

- [ ] T001 验证 playwright.config.ts 配置正确性
- [ ] T002 [P] 运行现有 E2E 测试确保基础通过 `pnpm test:e2e -- --project=chromium --reporter=list`
- [ ] T003 [P] 验证 CI 工作流结构 `.github/workflows/test.yml`

**Checkpoint**: 现有配置验证通过

---

## Phase 2: Toolbar 控件测试 (P1) 🎯 MVP

**目标**: 添加 toolbar zoom/fit 控件的 E2E 测试覆盖

**独立测试**: `pnpm test:e2e -- tests/e2e/toolbar.spec.ts --project=chromium`

### 测试实现

- [ ] T004 [P] [US1] 创建 tests/e2e/toolbar.spec.ts 文件
- [ ] T005 [P] [US1] 实现 Zoom In 功能测试
- [ ] T006 [P] [US1] 实现 Zoom Out 功能测试
- [ ] T007 [P] [US1] 实现 Fit to Screen 功能测试
- [ ] T008 [P] [US1] 实现 Reset View 功能测试

**Checkpoint**: Toolbar 测试完整，通过 `pnpm test:e2e -- --project=chromium`

---

## Phase 3: 数据库导出测试 (P2)

**目标**: 添加 MySQL/PostgreSQL 导出格式的测试覆盖

**独立测试**: `pnpm test:e2e -- tests/e2e/export.spec.ts --project=chromium`

### 测试实现

- [ ] T009 [P] [US2] 创建 tests/e2e/export.spec.ts 文件
- [ ] T010 [P] [US2] 实现 MySQL 导出格式测试
- [ ] T011 [P] [US2] 实现 PostgreSQL 导出格式测试
- [ ] T012 [US2] 验证导出 SQL 语法正确性

**Checkpoint**: 数据库导出测试完整

---

## Phase 4: CI 优化 (P2)

**目标**: 优化 CI 工作流的缓存和并行执行

- [ ] T013 为 GitHub Actions 添加 node_modules 缓存
- [ ] T014 [P] 添加 Playwright 浏览器缓存
- [ ] T015 [P] 优化单元测试和 E2E 测试并行执行

---

## Phase 5: 视觉回归测试 (P3)

**目标**: 添加基础的视觉回归检查

- [ ] T016 创建 tests/e2e/visual.spec.ts
- [ ] T017 [P] 实现 ER 图初始渲染截图测试
- [ ] T018 [P] 配置 Playwright 截图对比

---

## Dependencies & Execution Order

### Phase 依赖

| Phase   | 依赖    | 说明                     |
| ------- | ------- | ------------------------ |
| Phase 1 | 无      | 可立即开始               |
| Phase 2 | Phase 1 | Toolbar 测试依赖基础配置 |
| Phase 3 | Phase 1 | 数据库测试依赖基础配置   |
| Phase 4 | Phase 1 | CI 优化可与测试并行      |
| Phase 5 | Phase 2 | 视觉测试依赖渲染完成     |

### 用户故事依赖

- **US1 (Toolbar)**: Phase 1 后可开始
- **US2 (Export)**: Phase 1 后可开始
- **Phase 4 (CI)**: 可与 Phase 2/3 并行

### 并行机会

- T001, T002, T003 可并行执行
- T004-T008 (Toolbar) 内部可并行
- T009-T012 (Export) 内部可并行
- Phase 4 (CI) 可与 Phase 2/3 并行

---

## Parallel Example

```bash
# 运行 Toolbar 测试（US1）
pnpm test:e2e -- tests/e2e/toolbar.spec.ts --project=chromium

# 运行 Export 测试（US2）
pnpm test:e2e -- tests/e2e/export.spec.ts --project=chromium
```

---

## Implementation Strategy

### MVP (Minimal Viable Product)

1. 完成 Phase 1: 配置验证
2. 完成 Phase 2: Toolbar 测试
3. **验证**: `pnpm test:e2e` 完整通过

### 增量交付

1. MVP 验证通过
2. 添加 Phase 3: Export 测试
3. 添加 Phase 4: CI 优化
4. 添加 Phase 5: 视觉测试（可选）

---

## Notes

- 所有测试应使用 Playwright 的 expect 断言
- 使用 data-model.md 中的 locators
- CI 测试使用 `--project=chromium` 减少时间
- 提交信息使用 `test:` 前缀
