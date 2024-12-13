import coveragePlugin, {
  getNxCoveragePaths,
} from '@code-pushup/coverage-plugin';
import eslintPlugin, {
  eslintConfigFromAllNxProjects,
} from '@code-pushup/eslint-plugin';
import jsPackagesPlugin from '@code-pushup/js-packages-plugin';
import { mergeConfigs, slugify } from '@code-pushup/utils';
import type { CoreConfig } from '@code-pushup/models';
import 'dotenv/config';

const esLintConfig: CoreConfig = {
  plugins: [await eslintPlugin(await eslintConfigFromAllNxProjects())],
  categories: [
    {
      slug: 'bug-prevention',
      title: 'Bug prevention',
      refs: [{ type: 'group', plugin: 'eslint', slug: 'problems', weight: 1 }],
    },
    {
      slug: 'code-style',
      title: 'Code style',
      refs: [
        { type: 'group', plugin: 'eslint', slug: 'suggestions', weight: 1 },
      ],
    },
    {
      slug: 'formatting',
      title: 'Formatting',
      refs: [
        { type: 'group', plugin: 'eslint', slug: 'formatting', weight: 1 },
      ],
    },
    {
      slug: 'modern-angular',
      title: 'Modern Angular',
      refs: [
        {
          type: 'audit' as const,
          plugin: 'eslint',
          slug: '@angular-eslint/template/prefer-control-flow',
          weight: 3,
        },
        {
          type: 'audit' as const,
          plugin: 'eslint',
          slug: '@angular-eslint/template/prefer-ngsrc',
          weight: 1,
        },
        {
          type: 'audit' as const,
          plugin: 'eslint',
          slug: '@angular-eslint/template/prefer-self-closing-tags',
          weight: 1,
        },
        {
          type: 'audit' as const,
          plugin: 'eslint',
          slug: '@angular-eslint/prefer-standalone',
          weight: 3,
        },
        {
          type: 'audit' as const,
          plugin: 'eslint',
          slug: '@angular-eslint/use-injectable-provided-in',
          weight: 1,
        },
        {
          type: 'audit' as const,
          plugin: 'eslint',
          slug: '@angular-eslint/prefer-output-readonly',
          weight: 1,
        },
        {
          type: 'audit' as const,
          plugin: 'eslint',
          slug: '@angular-eslint/prefer-on-push-component-change-detection',
          weight: 1,
        },
        {
          type: 'audit' as const,
          plugin: 'eslint',
          slug: '@angular-eslint/use-lifecycle-interface',
          weight: 1,
        },
      ].map((ref) => ({ ...ref, slug: slugify(ref.slug) })),
    },
    {
      slug: 'type-safety',
      title: 'Type safety',
      refs: [
        {
          type: 'audit' as const,
          plugin: 'eslint',
          slug: '@typescript-eslint/no-explicit-any',
          weight: 3,
        },
        {
          type: 'audit' as const,
          plugin: 'eslint',
          slug: '@typescript-eslint/explicit-module-boundary-types',
          weight: 1,
        },
        {
          type: 'audit' as const,
          plugin: 'eslint',
          slug: '@typescript-eslint/no-non-null-assertion',
          weight: 2,
        },
        {
          type: 'audit' as const,
          plugin: 'eslint',
          slug: '@typescript-eslint/no-floating-promises',
          weight: 1,
        },
        {
          type: 'audit' as const,
          plugin: 'eslint',
          slug: '@typescript-eslint/no-unnecessary-type-assertion',
          weight: 1,
        },
        {
          type: 'audit' as const,
          plugin: 'eslint',
          slug: '@typescript-eslint/no-misused-promises',
          weight: 1,
        },
        {
          type: 'audit' as const,
          plugin: 'eslint',
          slug: '@typescript-eslint/prefer-readonly',
          weight: 1,
        },
        {
          type: 'audit' as const,
          plugin: 'eslint',
          slug: '@typescript-eslint/prefer-readonly-parameter-types',
          weight: 1,
        },
        {
          type: 'audit' as const,
          plugin: 'eslint',
          slug: '@typescript-eslint/prefer-optional-chain',
          weight: 1,
        },
        {
          type: 'audit' as const,
          plugin: 'eslint',
          slug: '@typescript-eslint/prefer-ts-expect-error',
          weight: 1,
        },
        {
          type: 'audit' as const,
          plugin: 'eslint',
          slug: '@typescript-eslint/unified-signatures',
          weight: 1,
        },
      ].map((ref) => ({ ...ref, slug: slugify(ref.slug) })),
    },
  ],
};

const coverageConfig: CoreConfig = {
  plugins: [
    await coveragePlugin({
      coverageToolCommand: {
        command: 'npx',
        args: ['nx', 'run-many', '-t', 'test', '--coverage', '--skipNxCache'],
      },
      reports: await getNxCoveragePaths(['test']),
    }),
  ],
  categories: [
    {
      slug: 'coverage',
      title: 'Coverage',
      refs: [
        { type: 'group', plugin: 'coverage', slug: 'coverage', weight: 1 },
      ],
    },
  ],
};

const jsPackagesConfig: CoreConfig = {
  plugins: [await jsPackagesPlugin({ packageManager: 'npm' })],
  categories: [
    {
      slug: 'security',
      title: 'Security',
      refs: [
        { type: 'group', plugin: 'js-packages', slug: 'npm-audit', weight: 1 },
      ],
    },
    {
      slug: 'updates',
      title: 'Updates',
      refs: [
        {
          type: 'group',
          plugin: 'js-packages',
          slug: 'npm-outdated',
          weight: 1,
        },
      ],
    },
  ],
};

const portalUploadConfig = process.env.CP_API_KEY
  ? {
      upload: {
        server: 'https://api.staging.code-pushup.dev/graphql',
        apiKey: process.env.CP_API_KEY,
        organization: 'demos',
        project: 'ng-demo',
      },
    }
  : {};

export default mergeConfigs(
  esLintConfig,
  jsPackagesConfig,
  coverageConfig,
  portalUploadConfig
);
