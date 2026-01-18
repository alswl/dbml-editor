import { trim } from '@/utils/format';

describe('format utils', () => {
  describe('trim', () => {
    it('should remove whitespace from both ends', () => {
      expect(trim('  hello  ')).toBe('hello');
    });

    it('should handle whitespace-only strings', () => {
      expect(trim('   ')).toBe('');
    });

    it('should preserve whitespace in the middle', () => {
      expect(trim('  hello world  ')).toBe('hello world');
    });

    it('should handle empty strings', () => {
      expect(trim('')).toBe('');
    });

    it('should handle strings without whitespace', () => {
      expect(trim('hello')).toBe('hello');
    });
  });
});
