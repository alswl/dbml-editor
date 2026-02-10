# Research: 仅表名视图与关系线吸附

**Feature**: 003-toggle-columns-table-names  
**Phase**: 0

## 1. 仅表名视图在 AntV X6 中的实现方式

### Decision（决策）

采用 **同一节点类型 `er-rect` + 视图模式控制「是否渲染 list 组端口」** 的方案：在 `tableOnly` 模式下，生成/更新到画布的节点不包含 `list` 组端口（或端口数量为 0），节点高度仅保留表头一行；关系线在 tableOnly 模式下改为连接**节点主体**（或每个表一个虚拟的「表级」端口），通过 X6 的 `source/target: { cell, port? }` 在 tableOnly 时只指定 `cell` 并使用节点锚点（如 `midSide`）实现吸附。

### Rationale（理由）

- 现有 `parseDatabaseToER` 已按「表 → 节点 + 列 → ports」生成数据；边通过 `source.port` / `target.port` 连到具体列。若在 tableOnly 时改为不传 ports（或传空 list 组），节点自然只渲染表头；边若仍带 port 会失效，故需在 tableOnly 下改为仅指定 `cell` 并用节点默认锚点，这样关系线会吸附到表名节点边框/中心，满足「snap to table names」。
- 不新增节点类型可避免重复维护两套 markup/attrs，且切换时只需用同一套 `parseTableToNode` 的「是否包含列」分支即可。

### Alternatives considered（考虑的备选）

- **备选 A**：注册第二种节点 `er-rect-table-only`，无 list 端口，边连节点。缺点：两套节点样式需同步，切换时需整图替换 shape，复杂度更高。
- **备选 B**：保留所有端口但用 CSS/attrs 隐藏端口视觉。缺点：布局上节点仍占列高，无法实现「只显示表名」的紧凑布局；边仍连到隐藏端口，对「吸附到表名」的语义不直观。

---

## 2. 关系线在仅表名视图下的锚点策略

### Decision（决策）

在 **tableOnly** 模式下，边的 `source`/`target` 只设置 `cell`，不设置 `port`；依赖 Graph 的 `connecting.anchor` 或边的 `anchor` 使用 **`midSide`（或 `left`/`right` 按方向）**，使连线吸附在表名节点的侧面中点，保持与 Dagre 水平布局（LR）一致。

### Rationale（理由）

- X6 当 target/source 不指定 port 时，会使用节点的默认锚点；`midSide` 已在本项目 Graph 配置中使用，表名节点在 tableOnly 下为单行矩形，侧面中点即表名块边缘，语义清晰。
- Dagre 的 `rankdir: 'LR'` 下，边从节点左右两侧连出，用水平方向的 midSide 可避免连线穿过节点。

### Alternatives considered（考虑的备选）

- **备选 A**：为每个表在 tableOnly 下暴露一个虚拟 port（如 `table-only`），边仍连到该 port。实现略复杂，且效果与「不设 port + 节点锚点」等价。
- **备选 B**：使用 `anchor: 'center'`。缺点：多条边时都从中心连出，易重叠，可读性差。

---

## 3. 视图模式状态与数据流

### Decision（决策）

- 在 **Viewer 组件** 内用 `useState<'full'|'tableOnly'>` 保存视图模式；工具栏增加一个 Switch/Button 切换。
- **parseDatabaseToER** 增加可选参数 `viewMode`（或等价的 `tableOnly: boolean`）：为 `tableOnly` 时，`parseTableToNode` 不添加 list 组端口；`parseRef` 在 tableOnly 时返回的 edge 不包含 `source.port`/`target.port`，仅包含 `source.cell`/`target.cell`。
- 当 `props.database` 或视图模式变化时，重新执行 `parseDatabaseToER(..., viewMode)` 并 `setModels(layout.layout(...))`，保证图与模式同步。

### Rationale（理由）

- 单一数据源：ER 图数据仍由 `database + viewMode` 推导，不保留「两套 model」；切换时重算 model 并 fromJSON，逻辑简单且与现有 `useEffect([props.database])` 一致。
- 可选：将 viewMode 写入 localStorage，在 Viewer 初始化时读回，实现「会话内记忆」。

### Alternatives considered（考虑的备选）

- **备选 A**：在 X6 层动态显示/隐藏端口。需要遍历节点改 attrs 或 port 的 visible，且边仍连到 port，需同时改边的 source/target，与「吸附到表名」目标不符。
- **备选 B**：维护两套 JSON model 并切换时替换。冗余且易不同步，不采用。

---

## 4. 布局（Dagre）与节点尺寸

### Decision（决策）

- tableOnly 下节点 `height` 为单行（如 24px），`width` 可与完整视图一致（如 150px）；Dagre 布局在每次 `layout.layout(m)` 时按当前节点尺寸计算，因此切换视图后重新执行一次 layout，避免重叠或留白过大。
- 不改变 Dagre 的 `rankdir`/`ranksep`/`nodesep` 等配置；仅因节点变小，整体图会更紧凑。

### Rationale（理由）

- 现有代码已在 `props.database` 变化时执行 `setModels(layout.layout(m))`；扩展为 `viewMode` 变化也触发同样流程即可，Dagre 会根据新尺寸重新排布，关系线由 router 重算，自然「snap」到新位置。

### Alternatives considered（考虑的备选）

- **备选 A**：不重新 layout，只改节点高度。可能导致节点重叠（原为多行高度，现为单行），不采用。
- **备选 B**：tableOnly 使用不同 ranksep/nodesep。可后续做 UX 微调，非必须。

---

## 5. 小结（Phase 0 输出）

- **实现路径**：Viewer 内 viewMode 状态 + 工具栏开关；`parseDatabaseToER(database, { tableOnly })` 在 tableOnly 时不输出列端口、边不带 port；切换或 database 变化时重新 layout 并 fromJSON。
- **锚点**：tableOnly 下边仅指定 cell，用节点默认锚点（midSide）实现吸附到表名节点。
- **无未决项**：技术上下文无 NEEDS CLARIFICATION，可直接进入 Phase 1 设计与契约。
