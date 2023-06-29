import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globalSetup: './tests/setup/jestGlobalSetup.js',
  globalTeardown: './tests/teardown/jestGlobalTeardown.js'
};
export default config;
