# Tasks: ER 图列切换与仅表名视图

**Input**: Design documents from `/specs/003-toggle-columns-table-names/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: 功能规格要求新增至少 1 个 E2E 场景（SC-004），已包含在收尾阶段。

**Organization**: 按用户故事分组，US1 与 US2 均为 P1；US2 依赖 US1 的数据流（同属一个 MVP 交付）。

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: 可并行（不同文件、无未完成依赖）
- **[Story]**: 所属用户故事（US1, US2）
- 描述中含精确文件路径

## Path Conventions

- 单项目：仓库根下 `src/`、`tests/`（与 plan.md 一致）

---

## Phase 1: Setup（共享基础设施）

**Purpose**: 确认项目就绪，无需新建后端或新包

- [x] T001 按 plan.md 确认项目为单前端结构（src/、tests/），无新增后端或 npm 包，便于在 Viewer 与 er 服务中实现本功能

---

## Phase 2: Foundational（阻塞性前置）

**Purpose**: 所有用户故事实现前必须满足的前置条件

**⚠️ CRITICAL**: 本阶段完成前不得开始用户故事开发

- [x] T002 确认 ER 图数据流唯一入口为 `src/components/viewer/viewer.tsx` 与 `src/services/er/index.ts`（database → parseDatabaseToER → layout → fromJSON），便于注入 viewMode 与 tableOnly 参数

**Checkpoint**: 基础就绪，可开始用户故事实现

---

## Phase 3: User Story 1 - 在 ER 图中切换「仅表名」视图 (Priority: P1) 🎯 MVP

**Goal**: 用户可通过工具栏一键切换「仅表名」与「完整」视图；仅表名时图中只显示表名块与关系线，切换回完整时恢复列与端口。

**Independent Test**: 打开含多表与 Ref 的 DBML，点击「仅表名」→ 图仅显示表名块与关系线；再点击恢复 → 列重新显示且关系线连到正确列。

### Implementation for User Story 1

- [x] T003 [P] [US1] 在 `src/constants/viewMode.ts` 中新增 ViewMode 类型与常量（`'full' | 'tableOnly'`，可选；若集中到 Viewer 内则可省略本任务）
- [x] T004 [US1] 在 `src/services/er/index.ts` 中为 `parseDatabaseToER` 增加可选参数 `options?: { tableOnly?: boolean }`，并向下传递给 `parseTableToNode` 与 `parseRef`
- [x] T005 [US1] 在 `src/services/er/index.ts` 中修改 `parseTableToNode`：当 `options?.tableOnly === true` 时不向 `ports` 添加 list 组，节点 `height` 设为单行（如 24）
- [x] T006 [US1] 在 `src/components/viewer/viewer.tsx` 中新增状态 `viewMode: 'full' | 'tableOnly'`（默认 `'full'`），并在缩放工具栏旁增加「仅表名」切换控件（Button 或 Switch）
- [x] T007 [US1] 在 `src/components/viewer/viewer.tsx` 中使 `useEffect` 依赖 `props.database` 与 `viewMode`，在二者任一变化时使用 `parseDatabaseToER(database, { tableOnly: viewMode === 'tableOnly' })` 得到 model，经 layout 后 `setModels` 并保证 graph.fromJSON 使用新 model

**Checkpoint**: 用户可切换仅表名/完整视图，图中节点在仅表名时仅显示表头

---

## Phase 4: User Story 2 - 关系线在仅表名视图下吸附表名节点 (Priority: P1)

**Goal**: 在仅表名模式下，关系线端点吸附在表名节点上（节点边框/锚点），无断线或错位。

**Independent Test**: 在仅表名视图下观察所有 Ref 两端均终止于对应表名节点边缘，拖拽画布或缩放时关系线随节点正确重绘。

### Implementation for User Story 2

- [x] T008 [US2] 在 `src/services/er/index.ts` 中修改 `parseRef`：当 `options?.tableOnly === true` 时返回的 edge 的 `source`/`target` 仅包含 `cell`，不包含 `port`
- [x] T009 [US2] 在 `src/components/viewer/viewer.tsx` 或 `src/services/er/index.ts` 中确保 tableOnly 下边不指定 port 时，X6 使用节点锚点（如 midSide）；若默认行为不符合，则在生成 edge 时显式设置 `anchor: 'midSide'` 或等效配置

**Checkpoint**: 仅表名视图下关系线正确吸附到表名节点，布局与重绘正常

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: 横切关注点与规格要求的测试、可选增强

- [x] T010 [P] 在 `tests/e2e/` 中新增 E2E 场景：进入页面 → 等待 ER 图加载（含多表与 Ref）→ 点击「仅表名」→ 断言关系线存在且连接节点 → 切回「完整」→ 断言列显示（满足 SC-004）
- [x] T011 [P] 可选：在 `src/components/viewer/viewer.tsx` 中从 localStorage 读取/写入 `dbml-editor-er-view-mode`，实现视图模式会话记忆（FR-001 可选）
- [x] T012 运行 `pnpm test` 与 `pnpm run test:e2e`，确认现有单测与 E2E 通过且无新增 lint/类型错误；按 quickstart.md 做一次手动验证

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: 无依赖，可立即开始
- **Phase 2 (Foundational)**: 依赖 Phase 1，阻塞所有用户故事
- **Phase 3 (US1)**: 依赖 Phase 2，实现切换与仅表名节点
- **Phase 4 (US2)**: 依赖 Phase 3（同一 ER 数据流下补全边的 tableOnly 行为）
- **Phase 5 (Polish)**: 依赖 Phase 3、Phase 4 完成

### User Story Dependencies

- **User Story 1 (P1)**: 仅依赖 Phase 2；交付「仅表名」切换与节点仅表头
- **User Story 2 (P1)**: 依赖 US1 的 parseDatabaseToER/parseRef 扩展；交付关系线吸附到表名节点

### Within Each User Story

- US1：T004 → T005 与 T006、T007 可部分并行（T004+T005 在 er 服务，T006+T007 在 Viewer；T007 依赖 T004/T005 的接口）
- US2：T008 在 er 服务，T009 可能依赖 T008 或仅配置；T008 完成后即可验证吸附

### Parallel Opportunities

- T003 与 T004 可并行（不同文件）
- T005 与 T006 可并行（er vs viewer）
- T010 与 T011 可并行（E2E 与 localStorage 互不依赖）

---

## Parallel Example: User Story 1

```text
# 可先并行：常量 vs 服务签名
T003: 在 src/constants/viewMode.ts 中新增 ViewMode 类型与常量
T004: 在 src/services/er/index.ts 中为 parseDatabaseToER 增加 options

# 随后：表节点逻辑 + UI 状态与控件
T005: parseTableToNode 在 tableOnly 时不添加 list 端口
T006: Viewer 增加 viewMode 与工具栏切换

# 最后：数据流串联
T007: useEffect(database, viewMode) → parseDatabaseToER(...) → layout → setModels
```

---

## Implementation Strategy

### MVP First（User Story 1 + User Story 2）

1. 完成 Phase 1、Phase 2
2. 完成 Phase 3（US1）：切换 + 仅表名节点
3. 完成 Phase 4（US2）：关系线吸附
4. **STOP and VALIDATE**：按 Independent Test 验证仅表名视图与关系线
5. 完成 Phase 5：E2E + 可选 localStorage + 全量测试

### Incremental Delivery

1. Phase 1 + 2 → 基础就绪
2. Phase 3 + 4 → 可演示「仅表名」切换与关系线吸附（MVP）
3. Phase 5 → 自动化测试与体验增强

### Format Verification

- 所有任务均含：`- [ ]`、任务 ID（T001–T012）、[P]/[US1]/[US2] 标签（按规则）、描述与文件路径
- 用户故事阶段任务均带 [US1] 或 [US2] 标签；搭建与基础阶段无故事标签；收尾阶段无故事标签
