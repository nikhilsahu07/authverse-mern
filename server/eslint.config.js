import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  // Global ignores
  {
    ignores: [
      'dist/',
      'build/',
      'node_modules/',
      'coverage/',
      '**/*.d.ts',
      '**/*.js.map',
      '**/*.d.ts.map',
      'logs/',
      '*.log',
      '.env*',
      'uploads/',
      'temp/',
      'eslint.config.js',
      'eslint.config.mjs',
      '*.config.js',
      '*.config.mjs',
    ],
  },

  // Base JavaScript configuration
  js.configs.recommended,

  // TypeScript configurations
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  // ...tseslint.configs.strict, // Intentionally disabled for this project
  ...tseslint.configs.stylistic,

  // Main configuration for TypeScript files
  {
    files: ['**/*.ts', '**/*.mts', '**/*.cts'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'off', // Disable prettier for now
      // Core JavaScript rules
      eqeqeq: ['error', 'always'],
      'no-self-compare': 'error',
      'valid-typeof': 'error',
      'no-throw-literal': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'object-shorthand': ['error', 'always'],
      'no-duplicate-imports': 'error',
      'no-unused-expressions': 'error',
      'no-unreachable': 'error',
      'no-useless-return': 'error',
      'consistent-return': 'error',
      'default-case': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-loop-func': 'error',
      'no-new-func': 'error',
      'no-param-reassign': 'error',
      'no-return-assign': 'error',
      'no-sequences': 'error',
      'no-unused-labels': 'error',
      'no-useless-concat': 'error',
      'prefer-destructuring': ['error', { object: true, array: false }],
      radix: 'error',
      'dot-notation': 'off', // Conflicts with process.env index signature requirements

      // Node.js specific rules
      'handle-callback-err': 'error',
      'no-new-require': 'error',
      'no-path-concat': 'error',
      'no-process-exit': 'error',

      // Styling rules
      'no-mixed-spaces-and-tabs': 'error',
      'semi-spacing': 'error',
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'comma-style': ['error', 'last'],
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-in-parens': ['error', 'never'],
      'space-unary-ops': ['error', { words: true, nonwords: false }],
      semi: ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'computed-property-spacing': ['error', 'never'],
      'func-call-spacing': ['error', 'never'],
      'template-curly-spacing': ['error', 'never'],

      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/return-await': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-duplicate-type-constituents': 'error',
      '@typescript-eslint/no-redundant-type-constituents': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/method-signature-style': ['error', 'property'],
      '@typescript-eslint/no-confusing-void-expression': 'error',
      '@typescript-eslint/no-meaningless-void-operator': 'error',
      '@typescript-eslint/no-mixed-enums': 'error',
      '@typescript-eslint/no-unnecessary-qualifier': 'error',
      '@typescript-eslint/prefer-literal-enum-member': 'error',
      '@typescript-eslint/prefer-regexp-exec': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/restrict-template-expressions': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/unified-signatures': 'error',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',

      // Naming conventions for authverse backend
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],

      // Console logging rules (allow for server logging)
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error', 'info', 'log'],
        },
      ],

      // Prettier integration
      'prettier/prettier': 'off',
    },
  },

  // Configuration for test files
  {
    files: ['test/**/*.ts', 'tests/**/*.ts', 'spec/**/*.ts', '**/*.spec.ts', '**/*.test.ts', '__tests__/**/*.ts'],
    rules: {
      // Relaxed rules for test files
      'prefer-arrow-callback': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      'no-console': 'off',
    },
  },

  // Configuration for config files (no type checking)
  {
    files: [
      '*.config.js',
      '*.config.mjs',
      '*.config.ts',
      'eslint.config.js',
      'eslint.config.mjs',
      'jest.config.*',
      'webpack.config.*',
      'rollup.config.*',
      'vite.config.*',
    ],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'no-console': 'off',
      // Disable all type-checking rules for config files
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/return-await': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
    },
  },

  // Configuration for middleware and route handlers
  {
    files: [
      'src/middleware/**/*.ts',
      'src/routes/**/*.ts',
      'src/controllers/**/*.ts',
      'middleware/**/*.ts',
      'routes/**/*.ts',
      'controllers/**/*.ts',
    ],
    rules: {
      // Allow unused parameters in middleware (next, req, res)
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^(req|res|next|_)',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
        },
      ],
    },
  },

  // Configuration for specific files
  {
    files: ['src/server.ts', 'src/config/database.ts'],
    rules: {
      'no-process-exit': 'off',
    },
  },

  // Prettier config (should be last)
  eslintConfigPrettier,
]);
