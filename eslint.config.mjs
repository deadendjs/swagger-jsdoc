import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
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
