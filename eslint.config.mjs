import pluginJs from '@eslint/js';
import pluginJest from 'eslint-plugin-jest';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['{test,examples}/**/*.spec.{ts,js}'],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals
    }
  },
  {
    languageOptions: { globals: globals.node }
  },
  {
    rules: {
      eqeqeq: ['error', 'always']
    }
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  { ignores: ['docusaurus/**'] }
]);
