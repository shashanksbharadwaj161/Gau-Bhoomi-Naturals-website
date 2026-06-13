import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // Context files intentionally export a provider component alongside its
      // hook/context — this only affects HMR fast-refresh, not correctness.
      'react-refresh/only-export-components': 'warn',
      // Setting loading/reset state at the top of a data-fetching effect is a
      // standard pattern; the react-hooks@7 rule is overly aggressive here.
      'react-hooks/set-state-in-effect': 'off',
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
