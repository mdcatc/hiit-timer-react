import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Prefer Sonner over deprecated shadcn/ui toast component
      // Disallow importing any variant of the local toast component path
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@/components/ui/toast',
              message:
                'shadcn/ui toast is deprecated. Use Sonner instead: import { Toaster, toast } from "sonner" and the wrapper in src/components/ui/sonner.',
            },
            {
              name: 'components/ui/toast',
              message:
                'shadcn/ui toast is deprecated. Use Sonner instead: import { Toaster, toast } from "sonner" and the wrapper in src/components/ui/sonner.',
            },
            {
              name: '../components/ui/toast',
              message:
                'shadcn/ui toast is deprecated. Use Sonner instead: import { Toaster, toast } from "sonner" and the wrapper in src/components/ui/sonner.',
            },
            {
              name: '../../components/ui/toast',
              message:
                'shadcn/ui toast is deprecated. Use Sonner instead: import { Toaster, toast } from "sonner" and the wrapper in src/components/ui/sonner.',
            },
          ],
          patterns: [
            {
              group: ['**/components/ui/toast', '**/ui/toast']
              ,
              message:
                'shadcn/ui toast is deprecated. Use Sonner instead: import { Toaster, toast } from "sonner" and the wrapper in src/components/ui/sonner.',
            },
          ],
        },
      ],
      // Allow exporting constants alongside components to support shadcn/ui patterns
      'react-refresh/only-export-components': ['error', { allowConstantExport: true }],
    },
  },
  {
    files: ['**/ui/**/*.ts', '**/ui/**/*.tsx', '**/tools/theme-provider.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
