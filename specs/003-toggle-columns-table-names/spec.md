# Feature Specification: ER 图列切换与仅表名视图

**Feature Branch**: `003-toggle-columns-table-names`  
**Created**: 2026-02-09  
**Status**: Draft  
**Input**: User description: "A way to toggle the columns and just view the table names. The relationship should be preserved and snap to the table names. 后续我们使用中文"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - 在 ER 图中切换「仅表名」视图 (Priority: P1)

用户希望在一键切换后，ER 图只显示表名（不显示列/字段），以便在表很多时快速浏览表与表之间的关系；切换回「完整视图」后，列信息重新显示，关系线仍正确连接对应列。

**Why this priority**: 这是本功能的核心价值：简化视觉、保留关系语义。

**Independent Test**: 打开含多表的 DBML，点击工具栏「仅表名」开关，图仅显示表名块与关系线；再点击恢复，列重新显示且关系线仍连到正确列。可完全通过 UI 操作与视觉断言验证。

**Acceptance Scenarios**:

1. **Given** ER 图处于完整视图（显示表名+列），**When** 用户点击「仅表名」切换，**Then** 图中每个表只显示表名矩形，不显示列行；关系线仍存在且端点吸附在表名节点上。
2. **Given** ER 图处于仅表名视图，**When** 用户再次点击切换恢复完整视图，**Then** 列重新显示，关系线端点仍连接到正确的列（端口）。
3. **Given** 任意视图模式，**When** 用户编辑 DBML 导致表/列变化，**Then** 图在 500ms 内同步，且当前「仅表名/完整」模式保持生效。

---

### User Story 2 - 关系线在仅表名视图下吸附表名节点 (Priority: P1)

在「仅表名」模式下，关系线（Ref）的端点必须吸附在表名节点上（例如节点边框或中心），而不是悬空或错位，以便用户仍能清晰看到表与表之间的连线。

**Why this priority**: 与 Story 1 同属核心体验，无此则「仅表名」视图关系不可读。

**Independent Test**: 在仅表名视图下，拖拽画布或缩放，观察所有关系线两端均终止于对应表名节点边缘/端口位置，无断线或错连。

**Acceptance Scenarios**:

1. **Given** 仅表名视图，**When** 图中存在至少一条 Ref，**Then** 该 Ref 的 source/target 端点均吸附在对应表节点的可见边界或约定锚点上。
2. **Given** 仅表名视图且布局为 Dagre，**When** 用户切换为仅表名或从完整切回仅表名，**Then** 布局不因节点尺寸变化而错乱，关系线随节点位置正确重绘。

---

### Edge Cases

- 无列的表（仅表名）：仅表名视图与完整视图视觉上可能一致，切换时无异常。
- 空 schema / 无表：切换按钮可禁用或保持可点，图中无节点时切换不报错。
- 解析错误导致 database 为空或部分表缺失：当前行为保持（图不更新或显示空），不因「仅表名」逻辑引入新错误。

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: 系统必须在 ER 图工具栏或等效入口提供「仅表名」视图的开关（如按钮、Switch），且开关状态在会话内可记忆（可选：localStorage）。
- **FR-002**: 系统必须在「仅表名」视图中仅渲染表名（表头），不渲染列（ports 的 list 组）；表头样式与现有 er-rect 一致。
- **FR-003**: 系统必须在「仅表名」视图中保持所有 Ref 关系线可见，且关系线端点吸附在对应表名节点上（通过节点锚点或边框吸附实现）。
- **FR-004**: 系统必须在切换回「完整」视图时，恢复列（ports）的渲染，并将关系线端点重新绑定到正确的列端口。
- **FR-005**: 视图切换后，DBML 源码与图的同步行为须符合章程「实时可视化」：解析结果变更后 500ms 内图更新，且当前视图模式（仅表名/完整）仍正确应用。

### Key Entities _(include if feature involves data)_

- **视图模式 (ViewMode)**: 枚举 `full` | `tableOnly`，表示当前 ER 图显示模式；仅影响展示层，不改变 DBML 或 database 结构。
- **ER 节点 (er-rect)**: 现有节点类型；在 `tableOnly` 下通过不渲染 list 组或使用「仅表头」变体实现仅表名；关系线在 tableOnly 下连接节点主体或专用锚点。

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 用户可在一次点击内切换「仅表名」与「完整」视图，且切换在 100 表以内 schema 下无明显卡顿（主观流畅）。
- **SC-002**: 在仅表名视图下，所有关系线端点均吸附在表名节点上，无断线或明显错位。
- **SC-003**: 切换视图后，Dagre 布局保留（或重新跑一次布局），不出现节点重叠或关系线交叉恶化。
- **SC-004**: 现有 E2E 测试（如 ER 图渲染、导出）仍通过；新增至少 1 个 E2E 场景覆盖「切换仅表名 → 校验关系线 → 切回完整」路径。
