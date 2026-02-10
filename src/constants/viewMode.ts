/**
 * ER 图视图模式：完整（表名+列）或仅表名
 */
export type ViewMode = 'full' | 'tableOnly';

export const VIEW_MODE = {
  FULL: 'full',
  TABLE_ONLY: 'tableOnly',
} as const;
