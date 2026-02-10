# Quickstart: 003-toggle-columns-table-names

**Feature**: ER 图列切换与仅表名视图  
**Branch**: `003-toggle-columns-table-names`

## 前置条件

- Node.js 18+
- pnpm
- 仓库根目录已执行 `pnpm install`

## 本地运行

```bash
cd /Users/alswl/dev/my/dbml-editor
pnpm run dev
```

在浏览器中打开控制台输出的本地地址（通常为 http://localhost:8000）。在编辑器中输入或加载包含多表与 Ref 的 DBML，右侧 ER 图会显示。

## 本功能验证步骤

1. **打开应用**：确保 ER 图已渲染（有至少 2 个表及 1 条关系线）。
2. **找切换控件**：在 ER 图区域旁的缩放工具栏附近，应有「仅表名」或类似开关/按钮。
3. **切换到仅表名**：点击后，图中每个表应只显示表名矩形，不显示列；关系线仍存在且两端吸附在表名节点上。
4. **切回完整视图**：再次点击切换，列重新显示，关系线连接到对应列。
5. **编辑 DBML**：在左侧编辑器中修改表或 Ref，确认图在约 500ms 内更新，且当前视图模式（仅表名/完整）保持正确。

## 测试

```bash
# 单元测试
pnpm test

# E2E（需先启动或使用 playwright 默认）
pnpm run test:e2e
```

本功能完成后，应至少有一条 E2E 场景覆盖：进入页面 → 等待 ER 图加载 → 点击仅表名 → 断言关系线存在且连接节点 → 切回完整 → 断言列显示。

## 相关文件

- 规格与计划：`specs/003-toggle-columns-table-names/spec.md`、`plan.md`
- 研究与数据模型：`research.md`、`data-model.md`
- 契约：`contracts/viewer-component-api.md`
- 实现涉及：`src/components/viewer/viewer.tsx`、`src/services/er/index.ts`、可选 `src/constants/`、`src/nodes/er.ts`（若需微调节点）
