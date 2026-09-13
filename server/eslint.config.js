import js from '@eslint/js';
export default [js.configs.recommended, { files: ['src/**/*.js', 'tests/**/*.js'], languageOptions: { sourceType: 'module', globals: { console: 'readonly', process: 'readonly', describe: 'readonly', test: 'readonly', expect: 'readonly' } }, rules: { 'no-unused-vars': ['error', { argsIgnorePattern: '^_' }] } }];
