/***************************************************************************/
/* `rating-information-quote-overview`                                     */
/* `Workspace`                                                             */
/* `jest.config.js`                                                        */
/***************************************************************************/

/** @typedef {import('jest.config').JestGlobalConfiguration} JestGlobalConfiguration */
/** @typedef {import('jest.config').JestProjectConfiguration} JestProjectConfiguration */
/** @typedef {import('jest.config').JestProjectConfigurationIgnorePatterns} JestProjectConfigurationIgnorePatterns */

/** @type {JestProjectConfiguration} */
const jestESLintProjectConfig = {
  cacheDirectory: '<rootDir>/.jestcache/eslint',
  displayName: 'ESLint',
  runner: 'jest-runner-eslint',
  testMatch: [
    '<rootDir>/**//.*.cjs',
    '<rootDir>/**//.*.js',
    '<rootDir>/**//.*.jsx',
    '<rootDir>/**//.*.mjs',
    '<rootDir>/**//.*.ts',
    '<rootDir>/**//.*.tsx',
    '<rootDir>/**/*.cjs',
    '<rootDir>/**/*.js',
    '<rootDir>/**/*.jsx',
    '<rootDir>/**/*.mjs',
    '<rootDir>/**/*.ts',
    '<rootDir>/**/*.tsx',
  ],
}

/** @type {JestProjectConfiguration} */
const jestTestProjectConfig = {
  cacheDirectory: '<rootDir>/.jestcache/test',
  displayName: 'Test',
  moduleNameMapper: {
    '\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^react-native$': 'react-native-web',
  },
  modulePaths: ['<rootDir>'],
  roots: ['<rootDir>/src'],
  setupFiles: ['react-app-polyfill/jsdom', '<rootDir>/src/setupEnv.ts'],
  setupFilesAfterEnv: ['jest-extended', '<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jest-environment-jsdom-sixteen',
  testMatch: [
    '**/__tests__/**/*.test.cjs',
    '**/__tests__/**/*.test.js',
    '**/__tests__/**/*.test.jsx',
    '**/__tests__/**/*.test.mjs',
    '**/__tests__/**/*.test.ts',
    '**/__tests__/**/*.test.tsx',
  ],
  transform: {
    '^(?!.*\\.(cjs|css|js|json|jsx|mjs|sass|scss|ts|tsx)$)':
      '<rootDir>/node_modules/react-scripts/config/jest/fileTransform.js',
    '^.+\\.(cjs|js|jsx|mjs|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(css|sass|scss)$':
      '<rootDir>/node_modules/react-scripts/config/jest/cssTransform.js',
  },
}

/** @type {JestProjectConfigurationIgnorePatterns} */
const ignorePatterns = [
  '<rootDir>/**/.next/**',
  '<rootDir>/**/coverage/**',
  '<rootDir>/**/node_modules/**',
  '<rootDir>/**/out/**',
  '<rootDir>/**/patches/**',
  '<rootDir>/**/public/**',
]

/** @type {JestGlobalConfiguration} */
const jestConfig = {
  coveragePathIgnorePatterns: ignorePatterns,
  modulePathIgnorePatterns: ignorePatterns,
  projects: [
    ...(process.env.JEST_WITH_ALL || process.env.JEST_WITH_ESLINT
      ? [jestESLintProjectConfig]
      : []),
    jestTestProjectConfig,
  ],
  testPathIgnorePatterns: ignorePatterns,
  transformIgnorePatterns: ignorePatterns,
  watchPathIgnorePatterns: ignorePatterns,
  watchPlugins: [
    'jest-watch-select-projects',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}

module.exports = jestConfig
