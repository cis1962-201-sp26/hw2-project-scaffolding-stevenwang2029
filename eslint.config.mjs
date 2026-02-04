// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', 'jest.config.js'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Rule 1: Enforce === and !== over == and !=
      eqeqeq: 'error',

      // Rule 2: Disallow unused variables with underscore exception
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // Rule 3: Require explicit return types on functions
      '@typescript-eslint/explicit-function-return-type': 'warn',

      // Rule 4: Disallow console.log (allow console.error and console.warn)
      'no-console': ['warn', { allow: ['error', 'warn'] }],
    },
  },
);
