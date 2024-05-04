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

function parseTableToNode(table: Table, schemaName: string): any {
  let fields: any[] = [];
  for (let k = 0; k < table.fields.length; k++) {
    const f = table.fields[k];
    const field = parseFieldToPort(f, schemaName, table.name);
    fields.push(field);
  }
  return {
    id: `${schemaName}-${table.name}`,
    shape: 'er-rect',
    label: table.name,
    width: 150,
    height: 24,
    ports: fields,
  };
}

function parseRef(ref: Ref): any {
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

  return {
    id: ``,
    shape: 'edge',
    source: {
      cell: `${sSchemaName}-${source.tableName}`,
      port: `${sSchemaName}-${source.tableName}-${sourceFieldName}`,
    },
    target: {
      cell: `${tSchemaName}-${target.tableName}`,
      port: `${tSchemaName}-${target.tableName}-${targetFieldName}`,
    },
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

function parseDatabaseToER(database: Database): any {
  // parse nodes
  let nodes: any[] = [];
  for (let i = 0; i < database.schemas.length; i++) {
    const schema = database.schemas[i];
    for (let j = 0; j < database.schemas[i].tables.length; j++) {
      const table = database.schemas[i].tables[j];
      // handle fields
      const node = parseTableToNode(table, schema.name);
      nodes.push(node);
    }
  }

  // passe edges
  let edges: any[] = [];
  for (let i = 0; i < database.schemas.length; i++) {
    const schema = database.schemas[i];
    for (let j = 0; j < schema.refs.length; j++) {
      const ref = database.schemas[i].refs[j];
      const edge = parseRef(ref);
      if (edge === null) {
        continue;
      }
      console.log(edge);
      edges.push(edge);
    }
  }

  return { nodes: nodes, edges: edges };
}

export default parseDatabaseToER;
