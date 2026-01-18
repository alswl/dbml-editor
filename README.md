# DBML Editor

![build-status](https://github.com/alswl/dbml-editor/actions/workflows/ci.yaml/badge.svg) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A free online editor for [DBML](https://dbml.dbdiagram.io/home/) with real-time visualization. Design database schemas with live ER diagram preview and powerful SQL import/export capabilities.

**[🚀 Try it online](https://dbml-editor.alswl.com/)** | [中文文档](./README_CN.md)

## Why DBML Editor?

- **💾 Privacy First** - Everything runs in your browser, zero data upload
- **⚡ Real-time Preview** - Instant ER diagram visualization as you type
- **🔄 Universal Compatibility** - Import/Export MySQL, PostgreSQL, MSSQL, Oracle, JSON
- **🎯 Developer Friendly** - Monaco Editor with syntax highlighting & IntelliSense
- **🎨 Modern UI** - Clean, responsive interface built with Ant Design & AntV X6

## Quick Start

### Online (Recommended)

Visit **[dbml-editor.alswl.com](https://dbml-editor.alswl.com/)** - No installation required.

### Self-hosted

```bash
git clone https://github.com/alswl/dbml-editor.git
cd dbml-editor
pnpm install && pnpm dev
```

## Usage

### Write DBML

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

### Import Existing Schema

1. Click **Import** button
2. Select database type (MySQL/PostgreSQL/MSSQL/JSON)
3. Paste your SQL DDL
4. View converted DBML & ER diagram

### Export to SQL

1. Click **Export** button
2. Choose target database
3. Copy generated SQL

## Tech Stack

| Component      | Technology                                                  |
| -------------- | ----------------------------------------------------------- |
| Framework      | [Umi 4](https://umijs.org/)                                 |
| UI Library     | [Ant Design 5](https://ant.design/)                         |
| Editor         | [Monaco Editor](https://microsoft.github.io/monaco-editor/) |
| Diagram Engine | [AntV X6](https://x6.antv.antgroup.com/)                    |
| DBML Parser    | [@dbml/core](https://www.npmjs.com/package/@dbml/core)      |

## Roadmap

- [ ] Inline syntax error hints
- [ ] Customizable diagram themes
- [ ] Export to PNG/SVG
- [ ] Save/restore diagram layouts
- [ ] Keyboard shortcuts
- [ ] Schema diff & versioning

## Alternatives

- [dbdiagram.io](https://dbdiagram.io/) - Official commercial DBML tool
- [dbml.org](https://dbml.org/) - DBML specification
- [dber](https://dber.tech/) - Database ER designer
- [TruDan/dbdiagram-oss](https://github.com/TruDan/dbdiagram-oss) - Open source fork

## Contributing

Contributions welcome! Please open an issue before submitting major changes.

```bash
git checkout -b feature/your-feature
git commit -m "feat: add amazing feature"
git push origin feature/your-feature
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!
