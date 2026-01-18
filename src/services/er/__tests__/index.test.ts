import parseDatabaseToER from '@/services/er';
import { Parser } from '@dbml/core';

describe('parseDatabaseToER', () => {
  const parser = new Parser();

  it('should parse simple table structure', () => {
    const dbml = `
      Table users {
        id integer [primary key]
        name varchar
      }
    `;
    const database = parser.parse(dbml, 'dbmlv2');
    const result = parseDatabaseToER(database);

    expect(result).toHaveProperty('nodes');
    expect(result).toHaveProperty('edges');
    expect(result.nodes).toHaveLength(1);
    expect(result.nodes[0].label).toBe('users');
    expect(result.nodes[0].shape).toBe('er-rect');
  });

  it('should parse fields and primary keys correctly', () => {
    const dbml = `
      Table users {
        id integer [pk]
        email varchar [not null]
        name varchar
      }
    `;
    const database = parser.parse(dbml, 'dbmlv2');
    const result = parseDatabaseToER(database);

    const userNode = result.nodes[0];
    expect(userNode.ports).toHaveLength(3);

    const idPort = userNode.ports[0];
    expect(idPort.attrs.portNameLabel.text).toContain('🔑');

    const emailPort = userNode.ports[1];
    expect(emailPort.attrs.portNameLabel.text).toContain('🚫');
  });

  it('should parse table relationships', () => {
    const dbml = `
      Table users {
        id integer [pk]
      }
      
      Table posts {
        id integer [pk]
        user_id integer
      }
      
      Ref: posts.user_id > users.id
    `;
    const database = parser.parse(dbml, 'dbmlv2');
    const result = parseDatabaseToER(database);

    expect(result.nodes).toHaveLength(2);
    expect(result.edges).toHaveLength(1);

    const edge = result.edges[0];
    expect(edge.shape).toBe('edge');
    expect(edge.source.cell).toContain('posts');
    expect(edge.target.cell).toContain('users');
  });

  it('should handle table notes', () => {
    const dbml = `
      Table users {
        id integer [pk]
        
        Note: 'User table with authentication'
      }
    `;
    const database = parser.parse(dbml, 'dbmlv2');
    const result = parseDatabaseToER(database);

    const userNode = result.nodes[0];
    const notePort = userNode.ports.find((p: any) => p.group === 'note');

    expect(notePort).toBeDefined();
    expect(notePort.attrs.note.text).toBe('User table with authentication');
  });

  it('should handle multiple schemas', () => {
    const dbml = `
      Table public.users {
        id integer [pk]
      }
      
      Table admin.admins {
        id integer [pk]
      }
    `;
    const database = parser.parse(dbml, 'dbmlv2');
    const result = parseDatabaseToER(database);

    expect(result.nodes).toHaveLength(2);
    expect(result.nodes[0].id).toContain('public');
    expect(result.nodes[1].id).toContain('admin');
  });

  it('should handle complex field types', () => {
    const dbml = `
      Table products {
        id integer [pk]
        price decimal(10,2)
        created_at timestamp
        metadata json
      }
    `;
    const database = parser.parse(dbml, 'dbmlv2');
    const result = parseDatabaseToER(database);

    const productNode = result.nodes[0];
    expect(productNode.ports).toHaveLength(4);

    expect(productNode.ports[1].attrs.portTypeLabel.text).toBe('decimal(10,2)');
    expect(productNode.ports[2].attrs.portTypeLabel.text).toBe('timestamp');
  });

  it('should ignore invalid relationships', () => {
    const dbml = `
      Table users {
        id integer [pk]
      }
    `;
    const database = parser.parse(dbml, 'dbmlv2');

    const result = parseDatabaseToER(database);

    expect(result.edges).toHaveLength(0);
  });
});
