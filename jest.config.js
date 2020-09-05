/**
 * @typedef {import('@jest/types').Config.InitialOptions} JestConfig
 */

/**
 * @type {Partial<JestConfig>}
 */
const jestConfig = {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'node',
    'ts',
    'tsx',
    'web.js',
    'web.jsx',
    'web.ts',
    'web.tsx',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^react-native$': 'react-native-web',
  },
  modulePaths: ['<rootDir>'],
  roots: ['<rootDir>/src'],
  setupFiles: ['react-app-polyfill/jsdom', '<rootDir>/src/setupEnv.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jest-environment-jsdom-fourteen',
  testMatch: ['<rootDir>/src/**/__tests__/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)':
      '<rootDir>/node_modules/react-scripts/config/jest/fileTransform.js',
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$':
      '<rootDir>/node_modules/react-scripts/config/jest/cssTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}

module.exports = jestConfig
