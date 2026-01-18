import { Parser } from '@dbml/core';
import { render, waitFor } from '@testing-library/react';
import Viewer from '../viewer';

// Mock AntV X6
jest.mock('@antv/x6', () => {
  const mockGraph = {
    use: jest.fn(),
    fromJSON: jest.fn(),
    centerContent: jest.fn(),
    dispose: jest.fn(),
  };

  return {
    Graph: jest.fn().mockImplementation(() => mockGraph),
    Model: {},
  };
});

// Mock AntV X6 Snapline plugin
jest.mock('@antv/x6-plugin-snapline', () => ({
  Snapline: jest.fn(),
}));

// Mock parseDatabaseToER
jest.mock('@/services/er', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    nodes: [
      {
        id: 'public-users',
        shape: 'er-rect',
        label: 'users',
        width: 150,
        height: 24,
        ports: [],
      },
    ],
    edges: [],
  }),
}));

describe('Viewer Component', () => {
  const parser = new Parser();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const dbml = `
      Table users {
        id integer [pk]
        name varchar
      }
    `;
    const database = parser.parse(dbml, 'dbmlv2');

    const { container } = render(<Viewer database={database} />);

    expect(container.querySelector('.react-shape-app')).toBeInTheDocument();
    expect(container.querySelector('.app-content')).toBeInTheDocument();
  });

  it('should update when database changes', async () => {
    const dbml1 = `
      Table users {
        id integer [pk]
      }
    `;
    const database1 = parser.parse(dbml1, 'dbmlv2');

    const { rerender } = render(<Viewer database={database1} />);

    const dbml2 = `
      Table users {
        id integer [pk]
      }
      Table posts {
        id integer [pk]
      }
    `;
    const database2 = parser.parse(dbml2, 'dbmlv2');

    rerender(<Viewer database={database2} />);

    await waitFor(() => {
      const parseDatabaseToER = require('@/services/er').default;
      expect(parseDatabaseToER).toHaveBeenCalled();
    });
  });

  it('should create Graph instance', async () => {
    const dbml = `
      Table users {
        id integer [pk]
      }
    `;
    const database = parser.parse(dbml, 'dbmlv2');

    render(<Viewer database={database} />);

    await waitFor(() => {
      const { Graph } = require('@antv/x6');
      expect(Graph).toHaveBeenCalled();
    });
  });

  it('should apply Snapline plugin', async () => {
    const dbml = `
      Table users {
        id integer [pk]
      }
    `;
    const database = parser.parse(dbml, 'dbmlv2');

    render(<Viewer database={database} />);

    await waitFor(() => {
      const { Snapline } = require('@antv/x6-plugin-snapline');
      expect(Snapline).toHaveBeenCalled();
    });
  });
});
