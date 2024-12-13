const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: [String.raw`\.spec\.ts$`, 'generated'],
  coverageReporters: ['text', 'lcov', 'html'],
};
