import Database from '@dbml/core/types/model_structure/database';
import Field from '@dbml/core/types/model_structure/field';
import Ref from '@dbml/core/types/model_structure/ref';
import Table from '@dbml/core/types/model_structure/table';

function parseFieldToPort(
  field: Field,
  schemaName: string,
  tableName: string,
): any {
  let label = field.name;
  if (field.pk) {
    label += ' 🔑';
  }
  if (field.not_null) {
    label += ' 🚫';
  }
  return {
    id: `${schemaName}-${tableName}-${field.name}`,
    group: 'list',
    attrs: {
      portNameLabel: {
        text: label,
      },
      portTypeLabel: {
        text: field.type.type_name || 'unknown',
      },
    },
  };
}

function parseNoteToPort(
  note: string,
  schemaName: string,
  tableName: string,
): any {
  return {
    id: `${schemaName}-${tableName}-note`,
    group: 'note',
    attrs: {
      note: {
        text: note,
      },
    },
  };
}

export interface ParseErOptions {
  tableOnly?: boolean;
}

function parseTableToNode(
  table: Table,
  schemaName: string,
  options?: ParseErOptions,
): any {
  const tableOnly = options?.tableOnly === true;
  let fields: any[] = [];
  if (!tableOnly) {
    for (let k = 0; k < table.fields.length; k++) {
      const f = table.fields[k];
      const field = parseFieldToPort(f, schemaName, table.name);
      fields.push(field);
    }
  }
  if (table.note && !tableOnly) {
    const note = parseNoteToPort(table.note, schemaName, table.name);
    fields.push(note);
  }
  const lineHeight = 24;
  return {
    id: `${schemaName}-${table.name}`,
    shape: 'er-rect',
    label: table.name,
    width: 150,
    height: lineHeight,
    ports: fields,
  };
}

function parseRef(ref: Ref, options?: ParseErOptions): any {
  if (ref.endpoints.length !== 2) {
    console.warn('ref.endpoints.length !== 2');
    return null;
  }
  const source = ref.endpoints[0];
  const target = ref.endpoints[1];

  const sourceFieldName = source.fieldNames[0];
  const targetFieldName = target.fieldNames[0];
  const sSchemaName = source.schemaName || 'public';
  const tSchemaName = target.schemaName || 'public';
  const tableOnly = options?.tableOnly === true;

  const sourcePoint = {
    cell: `${sSchemaName}-${source.tableName}`,
    ...(tableOnly
      ? {}
      : { port: `${sSchemaName}-${source.tableName}-${sourceFieldName}` }),
  };
  const targetPoint = {
    cell: `${tSchemaName}-${target.tableName}`,
    ...(tableOnly
      ? {}
      : { port: `${tSchemaName}-${target.tableName}-${targetFieldName}` }),
  };

  return {
    id: ``,
    shape: 'edge',
    router: {
      name: 'er',
      args: {
        offset: 16,
        min: 4,
        direction: 'H',
      },
    },
    source: sourcePoint,
    target: targetPoint,
    labels: [
      {
        attrs: {
          label: {
            text: source.relation,
            fontFamily: 'monospace',
          },
        },
        position: 0.2,
      },
      {
        attrs: {
          label: {
            text: target.relation,
            fontFamily: 'monospace',
          },
        },
        position: 0.8,
      },
    ],
  };
}

function parseDatabaseToER(
  database: Database,
  options?: ParseErOptions,
): { nodes: any[]; edges: any[] } {
  const tableOnly = options?.tableOnly === true;
  const nodes: any[] = [];
  for (let i = 0; i < database.schemas.length; i++) {
    const schema = database.schemas[i];
    for (let j = 0; j < database.schemas[i].tables.length; j++) {
      const table = database.schemas[i].tables[j];
      const node = parseTableToNode(table, schema.name, { tableOnly });
      nodes.push(node);
    }
  }

  const edges: any[] = [];
  for (let i = 0; i < database.schemas.length; i++) {
    const schema = database.schemas[i];
    for (let j = 0; j < schema.refs.length; j++) {
      const ref = database.schemas[i].refs[j];
      const edge = parseRef(ref, { tableOnly });
      if (edge === null) {
        continue;
      }
      edges.push(edge);
    }
  }

  return { nodes, edges };
}

export default parseDatabaseToER;
