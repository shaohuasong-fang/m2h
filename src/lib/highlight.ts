import hljs from 'highlight.js'
import type { CompiledLanguage, Language, LanguageFn } from 'highlight.js'

const MONO = "'SF Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,'Courier New',monospace"

const HLJS_STYLES: Record<string, string> = {
  keyword: 'color:#c678dd',
  'meta-keyword': 'color:#c678dd',
  'template-tag': 'color:#e06c75',
  'template-variable': 'color:#e06c75',
  doctag: 'color:#c678dd',
  built_in: 'color:#56b6c2',
  type: 'color:#e5c07b',
  class: 'color:#e5c07b',
  title: 'color:#61afef',
  function: 'color:#61afef',
  section: 'color:#e5c07b',
  'selector-class': 'color:#e5c07b',
  'selector-id': 'color:#61afef',
  'selector-tag': 'color:#e06c75',
  'selector-attr': 'color:#d19a66',
  'selector-pseudo': 'color:#56b6c2',
  literal: 'color:#d19a66',
  number: 'color:#d19a66',
  symbol: 'color:#56b6c2',
  bool: 'color:#d19a66',
  string: 'color:#98c379',
  'meta-string': 'color:#98c379',
  regexp: 'color:#98c379',
  code: 'color:#98c379',
  char: 'color:#98c379',
  comment: 'color:#7f8797;font-style:italic',
  quote: 'color:#7f8797;font-style:italic',
  meta: 'color:#7f8797',
  attr: 'color:#d19a66',
  attribute: 'color:#e5c07b',
  property: 'color:#e06c75',
  variable: 'color:#e06c75',
  name: 'color:#e06c75',
  tag: 'color:#e06c75',
  subst: 'color:#e06c75',
  deletion: 'color:#e06c75',
  addition: 'color:#98c379',
  operator: 'color:#56b6c2',
  punctuation: 'color:#a3aab8',
  params: 'color:#abb2bf',
  bullet: 'color:#61afef',
  link: 'color:#61afef',
  formula: 'color:#56b6c2',
  emphasis: 'font-style:italic',
  strong: 'font-weight:700',
  default: 'color:#d6dae4'
}

const LANG_ALIASES: Record<string, string> = {
  js: 'javascript', jsx: 'javascript', mjs: 'javascript', cjs: 'javascript',
  ts: 'typescript', tsx: 'typescript',
  py: 'python', py3: 'python',
  sh: 'bash', zsh: 'bash', shell: 'bash', console: 'bash',
  yml: 'yaml', md: 'markdown',
  'c++': 'cpp', 'c#': 'csharp', cs: 'csharp',
  rb: 'ruby', kt: 'kotlin', kts: 'kotlin', rs: 'rust', golang: 'go',
  html: 'xml', htm: 'xml', vue: 'xml', svg: 'xml',
  jsonc: 'json', dockerfile: 'bash', ps1: 'powershell',
  plsql: 'plsql', 'pl/sql': 'plsql', 'pl-sql': 'plsql', oracle: 'plsql',
  plpgsql: 'pgsql', 'pl/pgsql': 'pgsql', 'pl-pgsql': 'pgsql',
  pgsql: 'pgsql', postgres: 'pgsql', postgresql: 'pgsql', pg: 'pgsql'
}

const LANG_LABELS: Record<string, string> = {
  javascript: 'JavaScript', typescript: 'TypeScript', python: 'Python', bash: 'Bash',
  shell: 'Shell', json: 'JSON', yaml: 'YAML', xml: 'HTML / XML', css: 'CSS',
  scss: 'SCSS', less: 'Less', java: 'Java', kotlin: 'Kotlin', go: 'Go',
  rust: 'Rust', c: 'C', cpp: 'C++', csharp: 'C#', php: 'PHP', ruby: 'Ruby',
  swift: 'Swift', sql: 'SQL', markdown: 'Markdown', diff: 'Diff', ini: 'INI',
  lua: 'Lua', r: 'R', perl: 'Perl', objectivec: 'Objective-C', makefile: 'Makefile',
  graphql: 'GraphQL', plaintext: 'Plain Text', vbnet: 'VB.NET', wasm: 'WebAssembly',
  'python-repl': 'Python REPL', 'php-template': 'PHP Template',
  plsql: 'PL/SQL', pgsql: 'PL/pgSQL'
}

// hljs 官方包不含 Oracle PL/SQL 语法，这里注册一份精简语法
const plsqlGrammar: LanguageFn = (): Language => ({
  name: 'PL/SQL',
  aliases: ['pl-sql', 'oracle'],
  case_insensitive: true,
  keywords: {
    keyword:
      'ACCESS ADD AFTER ALL ALTER ANALYZE AND ANY AS ASC AUDIT BEFORE BEGIN BETWEEN BODY BULK BY CASCADE CASE CHECK CLOSE CLUSTER COLLECT COLUMN COMMENT COMMIT COMPILE CONNECT CONSTRAINT CONTINUE CREATE CURSOR DATABASE DECLARE DEFAULT DELETE DESC DISTINCT DROP EACH ELSE ELSIF END EXCEPTION EXCLUSIVE EXECUTE EXISTS EXIT EXPLAIN EXTRACT FETCH FOR FORALL FROM FUNCTION GOTO GRANT GROUP HAVING IF IMMEDIATE IN INCREMENT INDEX INITIAL INNER INSERT INTERSECT INTO IS ISOLATION JOIN LANGUAGE LEVEL LIKE LIMIT LOCK LOOP MERGE MINUS MODE NOAUDIT NOCOMPRESS NOT NOWAIT OF OFFLINE ON OPEN OPTION OR ORDER OTHERS OUT OUTER OVER PACKAGE PARTITION PCTFREE PRAGMA PRIOR PRIVILEGES PROCEDURE PUBLIC PURGE RAISE RANGE RECORD REF REFERENCES RENAME REPLACE RESOURCE RETURN RETURNING REVERSE REVOKE ROLLBACK ROW ROWID ROWTYPE SAVEPOINT SCHEMA SELECT SESSION SET SOME SQL START SUBTYPE SYNONYM TABLE TABLESPACE THEN TO TRANSACTION TRIGGER TYPE UNION UNIQUE UPDATE USE USER USING VALUES VIEW WHEN WHERE WHILE WITH WORK',
    type:
      'NUMBER VARCHAR2 VARCHAR NVARCHAR2 NVARCHAR CHAR NCHAR DATE TIMESTAMP INTERVAL BOOLEAN BINARY_INTEGER PLS_INTEGER SIMPLE_INTEGER POSITIVE NATURAL INTEGER INT DECIMAL DEC NUMERIC FLOAT REAL DOUBLE PRECISION CLOB NCLOB BLOB BFILE RAW LONG UROWID XMLTYPE JSON',
    built_in:
      'ABS ADD_MONTHS ASCII AVG CAST CEIL CHR COALESCE CONCAT COUNT CURRENT_DATE CURRENT_TIMESTAMP DBMS_OUTPUT DECODE DENSE_RANK DUMP FLOOR GREATEST INITCAP INSTR LAG LEAD LEAST LENGTH LISTAGG LOWER LPAD LTRIM MAX MIN MOD MONTHS_BETWEEN NEXT_DAY NULLIF NVL NVL2 PUT_LINE GET_LINE RAISE_APPLICATION_ERROR RANK REGEXP_INSTR REGEXP_LIKE REGEXP_REPLACE REGEXP_SUBSTR ROUND ROW_NUMBER RPAD RTRIM SIGN SOUNDEX SQLCODE SQLERRM STDDEV SUBSTR SUM SYSDATE SYSTIMESTAMP TO_CHAR TO_CLOB TO_DATE TO_LOB TO_NCHAR TO_NUMBER TO_TIMESTAMP TRANSLATE TRIM TRUNC UPPER VARIANCE ' +
      'NO_DATA_FOUND TOO_MANY_ROWS DUP_VAL_ON_INDEX ZERO_DIVIDE INVALID_CURSOR CURSOR_ALREADY_OPEN INVALID_NUMBER VALUE_ERROR LOGIN_DENIED PROGRAM_ERROR STORAGE_ERROR TIMEOUT_ON_RESOURCE SELF_IS_NULL SUBSCRIPT_BEYOND_COUNT SUBSCRIPT_OUTSIDE_LIMIT COLLECTION_IS_NULL CASE_NOT_FOUND ACCESS_INTO_NULL ROWTYPE_MISMATCH',
    literal: 'TRUE FALSE NULL'
  },
  contains: [
    hljs.COMMENT('--', '$'),
    hljs.C_BLOCK_COMMENT_MODE,
    {
      className: 'string',
      begin: "'",
      end: "'",
      contains: [{ begin: "''" }]
    },
    hljs.C_NUMBER_MODE,
    { className: 'type', begin: /%\w+/ },
    { className: 'variable', begin: /\b[gvp]_[a-zA-Z_]\w*/ },
    { className: 'operator', begin: /[-+*/%=<>!~^|:]+/ },
    { className: 'punctuation', begin: /[;.,()[\]{}]/ }
  ]
})

if (!hljs.getLanguage('plsql')) {
  hljs.registerLanguage('plsql', plsqlGrammar)
}

// 官方 sql / pgsql 语法缺少少量常用关键字，这里基于原定义做轻量补丁
function patchGrammar(name: string, mutate: (grammar: Language) => void): void {
  const compiled = hljs.getLanguage(name) as CompiledLanguage | undefined
  if (!compiled || typeof compiled.rawDefinition !== 'function') return
  const raw = compiled.rawDefinition as () => Language
  hljs.registerLanguage(name, () => {
    const grammar = raw()
    mutate(grammar)
    return grammar
  })
}

patchGrammar('sql', (grammar) => {
  const keywords = grammar.keywords as Record<string, string | string[]>
  const words = keywords.keyword
  if (!Array.isArray(words)) return
  ;['limit', 'ilike', 'returning'].forEach((word) => {
    if (!words.includes(word)) words.push(word)
  })
})

patchGrammar('pgsql', (grammar) => {
  const keywords = grammar.keywords as Record<string, string | string[]>
  const words = keywords.keyword
  if (Array.isArray(words)) {
    words.push('errcode', 'sqlstate')
  } else {
    keywords.keyword = `${words ?? ''} ERRCODE SQLSTATE`
  }
})

export function normalizeLang(lang: string): string {
  if (!lang) return ''
  const key = String(lang).toLowerCase().trim()
  return LANG_ALIASES[key] ?? key
}

export function langLabel(lang: string): string {
  const key = normalizeLang(lang)
  if (!key) return 'Code'
  const label = LANG_LABELS[key]
  if (label) return label
  return key.charAt(0).toUpperCase() + key.slice(1)
}

export interface HighlightResult {
  html: string
  language: string
}

export function highlightCode(code: string, lang: string): HighlightResult {
  const language = normalizeLang(lang)
  let detected = ''
  let html = ''

  try {
    if (language && hljs.getLanguage(language)) {
      html = hljs.highlight(code, { language, ignoreIllegals: true }).value
    } else if (!language) {
      const auto = hljs.highlightAuto(code)
      if (auto.relevance >= 6) {
        html = auto.value
        detected = auto.language ?? ''
      } else {
        html = escapeHtml(code)
      }
    } else {
      html = escapeHtml(code)
    }
  } catch {
    html = escapeHtml(code)
  }

  const holder = document.createElement('div')
  holder.innerHTML = html
  Array.from(holder.querySelectorAll('span')).forEach((span) => {
    let cls = ''
    for (let i = 0; i < span.classList.length; i += 1) {
      if (span.classList[i].indexOf('hljs-') === 0) {
        cls = span.classList[i].slice(5)
        break
      }
    }
    const css = HLJS_STYLES[cls]
    span.removeAttribute('class')
    if (css) {
      span.setAttribute('style', css)
    } else {
      // 非 hljs 语义的包裹层（如 language-pgsql）直接拆掉，保持输出干净
      span.replaceWith(...Array.from(span.childNodes))
    }
  })

  return { html: holder.innerHTML, language: detected }
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export { MONO }
