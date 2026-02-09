# Test Data Model - E2E Tests

## Test Entities

### 1. Page Components

| Entity        | Locator                        | Description          |
| ------------- | ------------------------------ | -------------------- |
| Editor        | `.monaco-editor`               | DBML code input area |
| Viewer        | `.react-shape-app`             | ER diagram canvas    |
| Toolbar       | `.ant-layout-header` or custom | Zoom/fit controls    |
| Import Button | `.ant-float-btn:first`         | Import modal trigger |
| Export Button | `.ant-float-btn:nth(1)`        | Export modal trigger |

### 2. Dialogs/Modals

| Entity       | Locator      | Assertions                  |
| ------------ | ------------ | --------------------------- |
| Import Modal | `.ant-modal` | Title contains "Import SQL" |
| Export Modal | `.ant-modal` | Title contains "Export SQL" |

### 3. Diagram Elements

| Entity      | Locator               | Attributes            |
| ----------- | --------------------- | --------------------- |
| Nodes       | `svg g[data-cell-id]` | Table representations |
| Edges       | `svg path[stroke]`    | Relationship lines    |
| Table Names | `svg text`            | Table labels          |

## Test Patterns

### Pattern: DBML Code Input

```typescript
async function clearAndTypeDBML(page: Page, dbml: string) {
  await page.waitForSelector('.monaco-editor', { timeout: 10000 });
  const editor = page.locator('.monaco-editor').first();
  await editor.click();
  await page.keyboard.press('Meta+A');
  await page.keyboard.type(dbml, { delay: 50 });
}
```

### Pattern: Wait for Diagram Sync

```typescript
async function waitForDiagramUpdate(page: Page, expectedNodes: number) {
  await page.waitForTimeout(3000); // Wait for debounce
  const nodes = page.locator('svg g[data-cell-id]');
  await expect(nodes).toHaveCount(expectedNodes);
}
```

### Pattern: Import SQL

```typescript
async function importSQL(page: Page, sql: string) {
  const importButton = page.locator('.ant-float-btn').first();
  await importButton.click();
  await page.waitForSelector('.ant-modal');

  const textarea = page.locator('textarea[placeholder="Import your schema"]');
  await textarea.fill(sql);

  const okButton = page.locator('.ant-modal .ant-btn-primary');
  await okButton.click();

  await expect(page.locator('.ant-modal')).not.toBeVisible();
}
```

## Test Data

### Sample DBML

```dbml
Table users {
  id integer [pk]
  name varchar
  email varchar
}

Table posts {
  id integer [pk]
  title varchar
  user_id integer
}

Ref: posts.user_id > users.id
```

### Sample SQL for Import

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255)
);

CREATE TABLE posts (
  id INT PRIMARY KEY,
  title VARCHAR(200),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Validation Rules

| Scenario     | Expected Result            |
| ------------ | -------------------------- |
| Valid DBML   | Diagram renders, no errors |
| Invalid DBML | Error message displayed    |
| Import MySQL | Tables appear in diagram   |
| Export       | SQL output in modal        |
| Zoom In      | Canvas scales up           |
| Fit Screen   | All tables visible         |
