/**
 * ER diagram view mode: full (table name + columns) or table names only.
 */
export type ViewMode = 'full' | 'tableOnly';

export const VIEW_MODE = {
  FULL: 'full',
  TABLE_ONLY: 'tableOnly',
} as const;
