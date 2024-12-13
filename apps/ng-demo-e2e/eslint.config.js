import tsESLint from 'typescript-eslint';
import baseConfig from '../../eslint.config.js';

export default tsESLint.config(...baseConfig, {
  files: ['**/*.ts'],
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
