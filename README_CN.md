# DBML Editor

![build-status](https://github.com/alswl/dbml-editor/actions/workflows/ci.yaml/badge.svg) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个免费的在线 [DBML](https://dbml.dbdiagram.io/home/) 编辑器，支持实时可视化。通过实时 ER 图预览和强大的 SQL 导入/导出功能，轻松设计数据库模式。

**[🚀 在线体验](https://dbml-editor.alswl.com/)** | [English](./README.md)

## 为什么选择 DBML Editor？

- **💾 隐私优先** - 所有操作都在浏览器本地完成，零数据上传
- **⚡ 实时预览** - 输入即可看到 ER 图实时更新
- **🔄 通用兼容** - 支持 MySQL、PostgreSQL、MSSQL、Oracle、JSON 导入/导出
- **🎯 开发者友好** - Monaco 编辑器，支持语法高亮和智能提示
- **🎨 现代化界面** - 基于 Ant Design 和 AntV X6 构建的简洁响应式界面

## 快速开始

### 在线使用（推荐）

访问 **[dbml-editor.alswl.com](https://dbml-editor.alswl.com/)** - 无需安装，立即使用。

### 本地部署

```bash
git clone https://github.com/alswl/dbml-editor.git
cd dbml-editor
pnpm install && pnpm dev
```

## 使用指南

### 编写 DBML

```dbml
Table users {
  id int [pk, increment]
  email varchar(255) [unique, not null]
  username varchar(50) [not null]
  created_at timestamp [default: `now()`]

  indexes {
    email
    (username, created_at)
  }
}

Table posts {
  id int [pk, increment]
  user_id int [ref: > users.id]
  title varchar(255) [not null]
  content text
  status varchar(20) [default: 'draft']
  created_at timestamp
}

Ref: posts.user_id > users.id [delete: cascade]
```

### 导入现有数据库

1. 点击**导入**按钮
2. 选择数据库类型（MySQL/PostgreSQL/MSSQL/JSON）
3. 粘贴 SQL DDL 语句
4. 查看转换后的 DBML 和 ER 图

### 导出为 SQL

1. 点击**导出**按钮
2. 选择目标数据库
3. 复制生成的 SQL 代码

## 技术栈

| 组件        | 技术                                                        |
| ----------- | ----------------------------------------------------------- |
| 框架        | [Umi 4](https://umijs.org/)                                 |
| UI 库       | [Ant Design 5](https://ant.design/)                         |
| 编辑器      | [Monaco Editor](https://microsoft.github.io/monaco-editor/) |
| 图表引擎    | [AntV X6](https://x6.antv.antgroup.com/)                    |
| DBML 解析器 | [@dbml/core](https://www.npmjs.com/package/@dbml/core)      |

## 开发计划

- [ ] 内联语法错误提示
- [ ] 可自定义图表主题
- [ ] 导出为 PNG/SVG
- [ ] 保存/恢复图表布局
- [ ] 键盘快捷键
- [ ] 模式对比和版本管理

## 类似工具

- [dbdiagram.io](https://dbdiagram.io/) - DBML 官方商业工具
- [dbml.org](https://dbml.org/) - DBML 规范文档
- [dber](https://dber.tech/) - 数据库 ER 设计器
- [TruDan/dbdiagram-oss](https://github.com/TruDan/dbdiagram-oss) - 开源分支版本

## 参与贡献

欢迎贡献！提交重大更改前请先开 issue 讨论。

```bash
git checkout -b feature/your-feature
git commit -m "feat: add amazing feature"
git push origin feature/your-feature
```

## 开源协议

本项目基于 MIT 协议开源 - 详见 [LICENSE](LICENSE) 文件。

## ⭐ 支持项目

如果这个项目对你有帮助，请给个 ⭐️！
