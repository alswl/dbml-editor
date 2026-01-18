import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../index';

// Mock antd components
jest.mock('antd', () => {
  const actual = jest.requireActual('antd');
  return {
    ...actual,
    Input: {
      TextArea: (props: any) => <textarea {...props} />,
    },
  };
});

// Mock @ant-design/pro-components
jest.mock('@ant-design/pro-components', () => ({
  PageContainer: ({ children }: any) => (
    <div data-testid="page-container">{children}</div>
  ),
}));

// Mock react-monaco-editor
jest.mock('react-monaco-editor', () => {
  return function MonacoEditor(props: any) {
    return (
      <div data-testid="monaco-editor">
        <textarea
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          data-testid="monaco-textarea"
        />
      </div>
    );
  };
});

// Mock Viewer component
jest.mock('@/components/viewer/viewer', () => {
  return function Viewer() {
    return <div data-testid="viewer">Viewer Component</div>;
  };
});

// Mock @dbml/core
jest.mock('@dbml/core', () => ({
  Parser: jest.fn().mockImplementation(() => ({
    parse: jest.fn().mockReturnValue({
      schemas: [
        {
          name: 'public',
          tables: [
            {
              name: 'users',
              fields: [],
            },
          ],
          refs: [],
        },
      ],
    }),
  })),
  importer: {
    import: jest.fn().mockReturnValue('Table users { id integer [pk] }'),
  },
  exporter: {
    export: jest
      .fn()
      .mockReturnValue('CREATE TABLE users (id INT PRIMARY KEY);'),
  },
}));

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render editor and viewer', () => {
    render(<Home />);

    expect(screen.getByTestId('monaco-editor')).toBeInTheDocument();
    expect(screen.getByTestId('viewer')).toBeInTheDocument();
  });

  it('should display import and export buttons', () => {
    render(<Home />);

    const importButton = screen.getByRole('button', { name: /import/i });
    const exportButton = screen.getByRole('button', { name: /export/i });

    expect(importButton).toBeInTheDocument();
    expect(exportButton).toBeInTheDocument();
  });

  it('should open import dialog', async () => {
    render(<Home />);

    const importButton = screen.getByRole('button', { name: /import/i });
    fireEvent.click(importButton);

    await waitFor(() => {
      expect(screen.getByText('Import SQL')).toBeInTheDocument();
    });
  });

  it('should open export dialog', async () => {
    render(<Home />);

    const exportButton = screen.getByRole('button', { name: /export/i });
    fireEvent.click(exportButton);

    await waitFor(() => {
      expect(screen.getByText('Export SQL')).toBeInTheDocument();
    });
  });

  it('should handle SQL import', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const importButton = screen.getByRole('button', { name: /import/i });
    await user.click(importButton);

    await waitFor(() => {
      expect(screen.getByText('Import SQL')).toBeInTheDocument();
    });

    const textarea = screen.getByPlaceholderText('Import your schema');
    await user.type(textarea, 'CREATE TABLE users (id INT);');

    const okButton = screen.getByRole('button', { name: /ok/i });
    await user.click(okButton);

    const { importer } = require('@dbml/core');
    expect(importer.import).toHaveBeenCalled();
  });

  it('should update when import format changes', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const importButton = screen.getByRole('button', { name: /import/i });
    await user.click(importButton);

    await waitFor(() => {
      expect(screen.getByText('Import SQL')).toBeInTheDocument();
    });

    const formatSelect = screen.getAllByRole('combobox')[0];
    expect(formatSelect).toBeInTheDocument();
  });

  it('should generate export SQL', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const exportButton = screen.getByRole('button', { name: /export/i });
    await user.click(exportButton);

    await waitFor(() => {
      expect(screen.getByText('Export SQL')).toBeInTheDocument();
    });

    const { exporter } = require('@dbml/core');
    await waitFor(() => {
      expect(exporter.export).toHaveBeenCalled();
    });
  });

  it('should close import dialog', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const importButton = screen.getByRole('button', { name: /import/i });
    await user.click(importButton);

    await waitFor(() => {
      expect(screen.getByText('Import SQL')).toBeVisible();
    });

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    await waitFor(() => {
      const modal = screen
        .queryByText('Import SQL')
        ?.closest('.ant-modal-wrap');
      expect(modal).toHaveStyle({ display: 'none' });
    });
  });
});
