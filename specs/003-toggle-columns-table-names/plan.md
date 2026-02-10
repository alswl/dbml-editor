# Implementation Plan: ER 图列切换与仅表名视图

**Branch**: `003-toggle-columns-table-names` | **Date**: 2026-02-09 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/003-toggle-columns-table-names/spec.md`

## Summary

在 ER 图工具栏增加「仅表名」视图切换：隐藏列、只显示表名块，关系线保留并吸附到表名节点；切换回完整视图时恢复列与端口绑定。技术上通过视图模式状态 + X6 节点/边数据或渲染分支实现，不改变 DBML 或 @dbml/core 解析结果。

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18  
**Primary Dependencies**: Umi 4, Ant Design 5.x, AntV X6, @antv/layout (Dagre), @dbml/core, Monaco Editor  
**Storage**: N/A（纯前端；可选 localStorage 记忆视图模式）  
**Testing**: Jest（单元）, Playwright（E2E）  
**Target Platform**: 现代浏览器（客户端 Web）；**Project Type**: single（前端单体）  
**Performance Goals**: 100 表以内 schema 下视图切换与图同步 &lt;500ms（章程要求）  
**Constraints**: 隐私优先（全部客户端）、TypeScript strict、无 any/ts-ignore（章程）  
**Scale/Scope**: 单页 ER 编辑与可视化，表数量级 10² 以内

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| 章程条款 | 状态 | 说明 |
| --- | --- | --- |
| I. 隐私优先 | ✅ | 视图模式与渲染仅在前端，无数据上传。 |
| II. 实时可视化 | ✅ | 切换为展示层状态，不改变解析；DBML 变更后仍按现有流程同步，模式保持。 |
| III. 类型安全 | ✅ | 新增 ViewMode 等类型，无 any；X6/Monaco 等已有例外在章程允许范围内。 |
| IV. 测试纪律 | ✅ | 计划新增 E2E 覆盖「仅表名」切换与关系线吸附；单元测试覆盖 viewMode 与 ER 转换逻辑（若有新函数）。 |
| V. 浏览器优先 | ✅ | 功能纯前端，无服务端依赖。 |
| 质量门禁 | ✅ | TypeScript strict、lint、单元/E2E 通过方可合并。 |

**结论**: 无违规，通过门禁。

## Project Structure

### Documentation (this feature)

```text
specs/003-toggle-columns-table-names/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (组件/状态契约)
└── tasks.md             # Phase 2 output (/speckit.tasks - NOT created by plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── editor/
│   └── viewer/          # ER 图：Viewer.tsx，视图模式状态与工具栏开关
├── constants/           # 可选：ViewMode 枚举
├── models/
├── nodes/
│   └── er.ts            # er-rect 注册；可能扩展「仅表头」或端口可见性
├── pages/
│   └── Home/
├── services/
│   ├── dbml/
│   └── er/              # parseDatabaseToER；可能支持 tableOnly 的 model 形态
└── utils/

tests/
├── e2e/                 # 新增：仅表名切换与关系线吸附场景
├── setup.ts
└── (unit under src/**/__tests__)
```

**Structure Decision**: 单项目结构（Umi 4 前端），ER 相关逻辑在 `src/components/viewer`、`src/services/er`、`src/nodes/er.ts`；本功能不新增后端或新包。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

（无违规，本节留空。）
