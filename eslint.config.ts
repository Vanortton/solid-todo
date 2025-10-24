import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import prettier from 'eslint-plugin-prettier'

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        plugins: { js, prettier },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.node },
        rules: {
            'no-undef': 'warn',
            'no-unused-expressions': 'off',
            'prefer-const': 'error',
            'no-unused-vars': 'warn',
            quotes: ['error', 'single'],
            'max-len': ['error', { code: 120 }],
            'object-curly-spacing': ['error', 'always'],
            'arrow-parens': ['error', 'as-needed'],
            'prettier/prettier': [
                'error',
                {
                    trailingComma: 'es5',
                    tabWidth: 4,
                    semi: false,
                    singleQuote: true,
                    jsxSingleQuote: true,
                    arrowParens: 'avoid',
                    printWidth: 120,
                    useTabs: false,
                    bracketSpacing: true,
                    jsxBracketSameLine: false,
                    proseWrap: 'preserve',
                    endOfLine: 'crlf',
                    htmlWhitespaceSensitivity: 'css',
                    vueIndentScriptAndStyle: false,
                },
            ],
        },
    },
    tseslint.configs.recommended,
])
