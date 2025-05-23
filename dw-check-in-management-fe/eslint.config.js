import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,
  
  // 将所有错误级别的规则降级为警告
  {
    rules: {
      // 将 js 规则降级为警告
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'no-console': 'warn',
      'no-debugger': 'warn',
      
      // 将 Vue 规则降级为警告
      'vue/multi-word-component-names': 'warn',
      'vue/no-unused-vars': 'warn',
      'vue/require-v-for-key': 'warn',
      'vue/no-unused-components': 'warn',
      'vue/valid-template-root': 'warn',
      'vue/valid-v-for': 'warn',
      'vue/valid-v-if': 'warn',
      'vue/valid-v-else': 'warn',
      'vue/valid-v-else-if': 'warn',
      'vue/valid-v-on': 'warn',
      'vue/valid-v-bind': 'warn',
      'vue/valid-v-model': 'warn',
      'vue/valid-v-slot': 'warn',
      'vue/no-parsing-error': 'warn',
    }
  }
])
