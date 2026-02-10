# Viewer 组件与 ER 服务契约

**Feature**: 003-toggle-columns-table-names  
**Phase**: 1

本功能为纯前端；以下为组件与服务的**接口契约**（等价于 API 契约）。

---

## 1. Viewer 组件 (src/components/viewer/viewer.tsx)

### Props（入参）

| 属性 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| database | `import('@dbml/core').Database` 或项目内使用的 Database 类型 | 是 | 当前解析得到的 DBML 数据库结构，用于生成 ER 图。 |

### 新增内部状态（本功能）

| 状态 | 类型 | 说明 |
| --- | --- | --- |
| viewMode | `'full' \| 'tableOnly'` | 当前视图模式；默认 `'full'`。可选从 localStorage 初始化。 |

### 用户动作 → 行为

| 用户动作 | 行为 |
| --- | --- |
| 点击「仅表名」开关（设为 tableOnly） | 设置 viewMode 为 `'tableOnly'`；使用 `parseDatabaseToER(database, { tableOnly: true })` 得到 model，执行 layout 后 `graph.fromJSON(models)`。 |
| 点击「完整」开关（设为 full） | 设置 viewMode 为 `'full'`；使用 `parseDatabaseToER(database, { tableOnly: false })` 得到 model，执行 layout 后 `graph.fromJSON(models)`。 |
| database 变更（由父组件传入） | 使用当前 viewMode 重新调用 `parseDatabaseToER(database, { tableOnly: viewMode === 'tableOnly' })`，layout 后更新图。 |

### 工具栏新增

- 一个切换控件（Button 或 Switch），标签如「仅表名」/「表名」；切换时更新 viewMode 并触发上述数据流。

---

## 2. ER 服务 (src/services/er/index.ts)

### parseDatabaseToER

**签名（扩展后）**：

```ts
function parseDatabaseToER(
  database: Database,
  options?: { tableOnly?: boolean },
): { nodes: NodeData[]; edges: EdgeData[] };
```

**参数**：

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| database | Database | 与现有一致。 |
| options.tableOnly | boolean | 可选，默认 false。为 true 时：节点不包含 list 组端口（仅表头）；边的 source/target 不包含 port，仅 cell。 |

**返回值**：与现有一致，`nodes` 与 `edges` 符合 X6 `Model.FromJSONData` 的节点/边结构。

### parseTableToNode（内部或导出）

当 `options?.tableOnly === true` 时：

- 返回的节点 `ports` 不包含 `list` 组（或 list 组为空）。
- 节点 `height` 为单行高度（如 24）。

### parseRef（内部或导出）

当 `options?.tableOnly === true` 时：

- 返回的 edge 的 `source` 仅包含 `cell`，不包含 `port`。
- 返回的 edge 的 `target` 仅包含 `cell`，不包含 `port`。

---

## 3. 常量（可选）

若集中管理枚举，可新增：

```ts
// src/constants/viewMode.ts 或等效路径
export type ViewMode = 'full' | 'tableOnly';
export const VIEW_MODE = { FULL: 'full', TABLE_ONLY: 'tableOnly' } as const;
```

以上契约在实现时须保持；测试与 E2E 可依赖这些接口编写。
