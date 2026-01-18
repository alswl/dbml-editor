import ErrorFmt from '@/services/dbml';
import { CompilerError } from '@dbml/core/types/parse/error';

describe('DBML Service', () => {
  describe('ErrorFmt', () => {
    it('should format single compiler error', () => {
      const mockError: CompilerError = {
        diags: [
          {
            location: {
              start: { line: 5, column: 10, offset: 0 },
              end: { line: 5, column: 15, offset: 0 },
            },
            message: 'Unexpected token',
            severity: 'error',
          } as any,
        ],
      } as CompilerError;

      const result = ErrorFmt(mockError);
      expect(result).toBe('5:10 Unexpected token');
    });

    it('should format multiple compiler errors', () => {
      const mockError: CompilerError = {
        diags: [
          {
            location: {
              start: { line: 5, column: 10, offset: 0 },
              end: { line: 5, column: 15, offset: 0 },
            },
            message: 'Unexpected token',
            severity: 'error',
          } as any,
          {
            location: {
              start: { line: 10, column: 5, offset: 0 },
              end: { line: 10, column: 8, offset: 0 },
            },
            message: 'Missing semicolon',
            severity: 'error',
          } as any,
        ],
      } as CompilerError;

      const result = ErrorFmt(mockError);
      expect(result).toContain('5:10 Unexpected token');
      expect(result).toContain('10:5 Missing semicolon');
      expect(result).toContain('\n');
    });

    it('should handle empty diagnostics', () => {
      const mockError: CompilerError = {
        diags: [],
      } as CompilerError;

      const result = ErrorFmt(mockError);
      expect(result).toBe('');
    });
  });
});
