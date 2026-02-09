// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettierConfig = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = defineConfig([
    {
        // 1. GLOBAL PLUGIN DEFINITION
        // This ensures 'prettier' is available to all subsequent objects
        plugins: {
            prettier: prettierPlugin,
        },
    },
    {
        files: ['**/*.ts'],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
            ...angular.configs.tsRecommended,
            prettierConfig,
        ],
        processor: angular.processInlineTemplates,
        rules: {
            'prettier/prettier': ['error'],
            '@angular-eslint/directive-selector': [
                'error',
                { type: 'attribute', prefix: 'app', style: 'camelCase' },
            ],
            '@angular-eslint/component-selector': [
                'error', { type: 'element', prefix: 'app', style: 'kebab-case' },
            ],
        },
    },
    {
        files: ['**/*.html'],
        extends: [
            ...angular.configs.templateRecommended,
            ...angular.configs.templateAccessibility,
            prettierConfig, // Disables lint rules that conflict with formatting
        ],
        rules: {
            // 2. NOW THIS WILL WORK
            'prettier/prettier': ['error', { parser: 'angular' }],
            
            '@angular-eslint/template/click-events-have-key-events': 'off',
            '@angular-eslint/template/interactive-supports-focus': 'off',
            '@angular-eslint/template/label-has-associated-control': 'off',
            '@angular-eslint/template/prefer-control-flow': 'off',
        },
    },
]);