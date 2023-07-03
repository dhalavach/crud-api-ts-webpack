// Sync object
const config = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globalSetup: './tests/setup/jestGlobalSetup.ts',
  globalTeardown: './tests/teardown/jestGlobalTeardown.js',
};
export default config;
