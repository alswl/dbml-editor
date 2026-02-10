# Data Model: 003-toggle-columns-table-names

**Feature**: ER 图列切换与仅表名视图  
**Phase**: 1

本功能不引入新的持久化数据或后端实体；仅扩展前端**视图状态**与 ER 图生成时的**参数**。

---

## 1. 视图模式（ViewMode）

| 字段/概念 | 类型 | 说明 |
| --- | --- | --- |
| ViewMode | `'full' \| 'tableOnly'` | 当前 ER 图展示模式：完整（表名+列）或仅表名。 |
| 持久化 | 可选 | 可存入 `localStorage`（如 key: `dbml-editor-er-view-mode`），会话间记忆用户选择。 |

**校验规则**：仅允许枚举值；默认 `'full'`。

---

## 2. 现有实体（本功能中的使用方式）

- **Database**（@dbml/core）：不变；仍为解析结果，Viewer 的 `props.database`。
- **ER 节点（er-rect）**：由 `parseTableToNode(table, schemaName, options?)` 生成；当 `options.tableOnly === true` 时，不向 `ports` 添加 `list` 组，仅保留表头，节点 `height` 为单行（如 24px）。
- **ER 边（Ref）**：由 `parseRef(ref, options?)` 生成；当 `options.tableOnly === true` 时，返回的 edge 的 `source`/`target` 只包含 `cell`，不包含 `port`，以便 X6 使用节点锚点吸附。

---

## 3. 状态转换

- **用户点击「仅表名」**：ViewMode `full` → `tableOnly`；触发重新 `parseDatabaseToER(database, { tableOnly: true })` + layout + fromJSON。
- **用户点击「完整」**：ViewMode `tableOnly` → `full`；触发重新 `parseDatabaseToER(database, { tableOnly: false })` + layout + fromJSON。
- **DBML 变更**：`database` 更新，当前 ViewMode 不变，按当前模式重新生成图并更新。

无其他状态机；无服务端同步。

---

## 4. 与章程的一致性

- 数据与解析均在客户端；ViewMode 不离开浏览器（可选 localStorage）。
- 无新增数据库表或 API 契约；仅前端组件状态与 ER 转换参数。
