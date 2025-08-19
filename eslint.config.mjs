import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import astroEslintParser from 'astro-eslint-parser';
import astro from 'eslint-plugin-astro';

export default [
  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript configuration
  {
    files: ['**/*.{js,ts,tsx,mjs}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
    },
  },

  // Astro configuration
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
    plugins: {
      astro,
    },
    rules: {
      ...astro.configs.recommended.rules,
      'astro/no-set-html-directive': 'error',
      'astro/no-set-text-directive': 'error',
    },
  },

  // Global ignores
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.astro/**',
      'public/**',
      '*.config.*',
    ],
  },
];
