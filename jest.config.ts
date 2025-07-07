import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest/presets/default',
  transform: {
    '\\.ts$': ['ts-jest', { useESM: true }]
  },
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.spec.ts']
};

export default config;
