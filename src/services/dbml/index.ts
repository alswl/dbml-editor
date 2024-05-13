import { CompilerDiagnostic } from '@dbml/core';
import { CompilerError } from '@dbml/core/types/parse/error';

type ImportFormat =
  | 'dbml'
  | 'mysql'
  | 'postgres'
  | 'json'
  | 'mssql'
  | 'postgresLegacy';
type ExportFormat = 'dbml' | 'mysql' | 'postgres' | 'json' | 'mssql' | 'oracle';

export default function ErrorFmt(e: CompilerError): string {
  const diags = e.diags
    .map((d: CompilerDiagnostic) => {
      return `${d.location.start.line}:${d.location.start.column} ${d.message}`;
    })
    .join('\n');
  return diags;
}

export type { ExportFormat, ImportFormat };
