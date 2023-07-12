/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', 'standard-with-typescript'],
  overrides: [],
  parser: 'vue-eslint-parser', // 新增
  parserOptions: {
    parser: '@typescript-eslint/parser', // 新增
    project: ['tsconfig.json'], // 新增
    // tsconfigRootDir: __dirname,
    extraFileExtensions: ['.vue'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    '@typescript-eslint/semi': 'off', // 分号
    '@typescript-eslint/member-delimiter-style': 'off', // 分号
    '@typescript-eslint/comma-dangle': 'off', // 逗号
    '@typescript-eslint/explicit-function-return-type': 'off', // 函数返回类型
    '@typescript-eslint/array-type': 'off', // 数组类型
    '@typescript-eslint/space-before-function-paren': 'off', // 函数前空格
    '@typescript-eslint/restrict-plus-operands': 'off', // 禁止对 string 和 number 使用 + 操作符
    '@typescript-eslint/strict-boolean-expressions': 'off', // 禁止在可能的情况下使用简化的赋值操作符 += 和 -=
    '@typescript-eslint/consistent-type-definitions': 'off', // 要求一致的类型定义
    '@typescript-eslint/no-non-null-assertion': 'off', // 禁止使用非空断言
    '@typescript-eslint/no-unnecessary-type-assertion': 'off', // 禁止不必要的类型断言
    '@typescript-eslint/quotes': 'off', // 引号
  },
};
