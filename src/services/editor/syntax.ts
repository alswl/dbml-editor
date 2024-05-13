import * as monaco from 'monaco-editor';

function registerSyntax() {
  monaco.languages.register({ id: 'dbml' });

  // source https://github.com/mattmeyers/vscode-dbml/blob/master/syntaxes/dbml.tmLanguage.json
  // convert by ChatGPT
  // TODO monaco support tmlanguage file, https://github.com/microsoft/monaco-editor/issues/171
  monaco.languages.setMonarchTokensProvider('dbml', {
    keywords: [
      'as',
      'by',
      'bool',
      'boolean',
      'bit',
      'blob',
      'decimal',
      'double',
      'enum',
      'float',
      'long',
      'longblob',
      'longtext',
      'medium',
      'mediumblob',
      'mediumint',
      'mediumtext',
      'time',
      'timestamp',
      'timestamptz',
      'tinyblob',
      'tinyint',
      'tinytext',
      'text',
      'bigint',
      'int',
      'int1',
      'int2',
      'int3',
      'int4',
      'int8',
      'integer',
      'float4',
      'float8',
      'char',
      'varbinary',
      'varchar',
      'varcharacter',
      'precision',
      'date',
      'datetime',
      'year',
      'unsigned',
      'signed',
      'numeric',
      'ucase',
      'lcase',
      'mid',
      'len',
      'round',
      'rank',
      'now',
      'format',
      'coalesce',
      'ifnull',
      'isnull',
      'nvl',
    ],
    typeKeywords: [
      'boolean',
      'double',
      'byte',
      'int',
      'short',
      'char',
      'void',
      'long',
      'float',
    ],
    operators: [
      '=',
      '>',
      '<',
      '!',
      '~',
      '?',
      ':',
      '==',
      '<=',
      '>=',
      '!=',
      '&&',
      '||',
      '++',
      '--',
      '+',
      '-',
      '*',
      '/',
      '&',
      '|',
      '^',
      '%',
      '<<',
      '>>',
      '>>>',
      '+=',
      '-=',
      '*=',
      '/=',
      '&=',
      '|=',
      '^=',
      '%=',
      '<<=',
      '>>=',
      '>>>=',
    ],
    symbols: '/[=><!~?:&|+\\-*\\/\\^%]+/',
    escapes:
      '/\\\\(?:[abfnrtv\\\\"\']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/',
    tokenizer: {
      root: [
        // identifiers and keywords
        [
          /[_$a-z][\w$]*/,
          {
            cases: {
              '@typeKeywords': 'keyword',
              '@keywords': 'keyword',
              '@default': 'identifier',
            },
          },
        ],
        [/[A-Z][\w$]*/, 'type.identifier'], // to show class names nicely

        // whitespace
        { include: '@whitespace' },

        // delimiters and operators
        // eslint-disable-next-line no-useless-escape
        [/[\[\]{}().,;]/, '@brackets'],
        [
          /@symbols/,
          {
            cases: {
              '@operators': 'operator',
              '@default': '',
            },
          },
        ],

        // numbers
        // eslint-disable-next-line no-useless-escape
        [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
        [/0[xX][0-9a-fA-F]+/, 'number.hex'],
        [/\d+/, 'number'],

        // strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-terminated string
        [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],

        // characters
        [/'[^\\']'/, 'string'],
        [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
        [/'/, 'string.invalid'],
      ],

      comment: [
        // eslint-disable-next-line no-useless-escape
        [/[^\/*]+/, 'comment'],
        [/\*\//, 'comment', '@pop'],
        // eslint-disable-next-line no-useless-escape
        [/[\/*]/, 'comment'],
      ],

      string: [
        [/[^\\"]+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
      ],

      whitespace: [
        [/[ \t\r\n]+/, 'white'],
        [/\/\*/, 'comment', '@comment'],
        [/\/\/.*$/, 'comment'],
      ],
    },
  });
}

export default registerSyntax;
