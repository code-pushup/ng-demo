import coveragePlugin, {
  getNxCoveragePaths,
} from '@code-pushup/coverage-plugin';
import eslintPlugin, {
  eslintConfigFromAllNxProjects,
} from '@code-pushup/eslint-plugin';
import jsPackagesPlugin from '@code-pushup/js-packages-plugin';
import { mergeConfigs } from '@code-pushup/utils';
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
