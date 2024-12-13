import jest from '@code-pushup/eslint-config/jest';
import typescript from '@code-pushup/eslint-config/typescript';
import nxESLintPlugin from '@nx/eslint-plugin';
import tsESLint from 'typescript-eslint';

export default tsESLint.config(
  ...typescript,
  ...jest,
  { plugins: { '@nx': nxESLintPlugin } },
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['tsconfig.base.json', 'node_modules/rxjs/tsconfig.json'],
        },
      },
    },
  },
  {
    ignores: [
      '/dist',
      '/tools',
      '**/*.md',
      '**/*.scss',
      '**/*.less',
      '**/assets',
      '**/*.ico',
      '**/*.yml',
      '**/*.yaml',
      '**/Dockerfile',
      '**/nginx.conf',
    ],
  },
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
);
