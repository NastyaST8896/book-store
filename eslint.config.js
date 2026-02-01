import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx,js}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      stylistic,
      simpleImportSort,
      unicorn
    },
    rules: {
      'stylistic/semi': 'error',
      'stylistic/indent': ['error', 2],
      'stylistic/brace-style': 'error',
      'stylistic/quotes': ['error', 'single'],
      'stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
      ],
      'simpleImportSort/imports': [
        'warn',
        {
          groups: [
            // Node.js builtins. You could also generate this regex if you use a .js config.
            // For example: ^(${require("module").builtinModules.join("|")})(/|$)
            [
              '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
            ],
            // Packages. react related packages come first.
            ['^react', '^redux', '^@?\\w'],
            // Components.
            ['@mui/*'],
            // Root path for project
            ['^#'],
            // Parent imports. Put .. last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and . last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],
    }
  },

]);
