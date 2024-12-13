import angular from '@code-pushup/eslint-config/angular';
import storybook from '@code-pushup/eslint-config/storybook';
import tsESLint from 'typescript-eslint';
import baseConfig from '../../eslint.config.js';

export default tsESLint.config(...baseConfig, ...angular, ...storybook, {
  files: ['**/*.ts'],
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    '@angular-eslint/prefer-standalone': 'error',

    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/prefer-readonly': 'warn',
    '@typescript-eslint/prefer-readonly-parameter-types': 'warn',
    '@typescript-eslint/prefer-ts-expect-error': 'error',
  },
});
