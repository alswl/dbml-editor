# 图表缩放功能实现说明

## 功能概述

已成功实现完整的图表缩放与平移功能，包括：

✅ 鼠标滚轮缩放（Ctrl/Cmd + 滚轮） ✅ 缩放工具栏（放大/缩小/适应屏幕/重置） ✅ 实时显示当前缩放比例

## 实现细节

### 1. 启用鼠标滚轮缩放

在 `src/components/viewer/viewer.tsx` 中修改 Graph 配置：

```typescript
mousewheel: {
  enabled: true,
  modifiers: ['ctrl', 'meta'],
  minScale: 0.2,
  maxScale: 4,
}
```

- 使用 `Ctrl` (Windows/Linux) 或 `Cmd` (Mac) + 滚轮进行缩放
- 缩放范围：20% - 400%
- 保持平移功能（`panning: true`）

### 2. 缩放工具栏

添加了 4 个控制按钮：

- **放大** (PlusOutlined): 每次增加 10% 缩放
- **缩小** (MinusOutlined): 每次减少 10% 缩放
- **适应屏幕** (CompressOutlined): 自动调整缩放以显示全部内容（padding: 20px）
- **重置视图** (RedoOutlined): 恢复到 100% 缩放并居中显示

### 3. 缩放比例显示

- 实时显示当前缩放百分比
- 自动监听缩放事件更新
- 显示格式：`{zoom * 100}%`（四舍五入）

### 4. Graph 实例管理

使用 `useRef` 保存 graph 实例：

```typescript
const graphRef = useRef<Graph | null>(null);
```

这样可以在按钮点击时访问 graph API 进行缩放控制。

### 5. 样式优化

在 `src/pages/Home/index.less` 中添加工具栏样式：

```less
.zoom-toolbar {
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 10;
  background: white;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
```

工具栏位于右上角，使用白色背景和阴影效果，保持良好的视觉效果。

## 使用说明

### 鼠标操作

- **Ctrl/Cmd + 滚轮上**: 放大图表
- **Ctrl/Cmd + 滚轮下**: 缩小图表
- **拖拽**: 平移图表（保持原有功能）
- **拖拽节点**: 移动表节点（保持原有功能）

### 工具栏按钮

悬停在按钮上会显示提示信息：

1. **+** 按钮: 放大 (Ctrl/Cmd + 滚轮向上)
2. **-** 按钮: 缩小 (Ctrl/Cmd + 滚轮向下)
3. **适应** 按钮: 适应屏幕
4. **重置** 按钮: 重置视图

### 缩放比例

工具栏底部实时显示当前缩放比例，例如：`100%`、`150%`、`75%`

## 技术要点

### 事件监听

```typescript
graph.on('scale', ({ sx }) => {
  setZoom(sx);
});
```

监听 scale 事件，实时更新缩放状态。

### 内存清理

```typescript
return () => {
  graph.dispose();
  graphRef.current = null;
};
```

在组件卸载时清理 graph 实例，防止内存泄漏。

### 回调优化

使用 `useCallback` 包裹缩放控制函数，避免不必要的重新渲染：

```typescript
const handleZoomIn = useCallback(() => {
  if (graphRef.current) {
    graphRef.current.zoom(0.1);
    setZoom(graphRef.current.zoom());
  }
}, []);
```

## 用户体验改进

1. **直观的图标**: 使用 Ant Design 的标准图标，易于理解
2. **工具提示**: 悬停显示操作说明和快捷键提示
3. **视觉反馈**: 实时显示缩放比例，用户清楚当前状态
4. **合理的缩放范围**: 20%-400% 适合大多数使用场景
5. **一键适应**: 快速调整视图以显示全部内容
6. **快捷操作**: 键盘修饰键 + 滚轮的组合符合用户习惯

## 后续优化建议

1. 添加键盘快捷键（如 `+`/`-` 键缩放）
2. 支持触摸屏双指缩放
3. 记住用户的缩放设置到 localStorage
4. 添加缩放动画效果
5. 支持双击空白区域重置视图

## 相关文件

- `src/components/viewer/viewer.tsx` - 主要实现逻辑
- `src/pages/Home/index.less` - 样式定义
- `package.json` - 依赖项（@antv/x6, @ant-design/icons）
