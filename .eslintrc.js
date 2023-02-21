module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'no-param-reassign': 0,
    'no-console': 0,
    'no-unused-expressions': 0,
    'import/no-extraneous-dependencies': 0,
    '@typescript-eslint/no-unused-expressions': 0,
    'react-hooks/rules-of-hooks': 0,
    'no-nested-ternary': 0, // 允许多元表达式
    'no-var': 2, // 禁用var，用let和const代替
    'react/no-array-index-key': 0, // 可以使用index作为key, 但是只能是展示列表的时候使用
    semi: [2, 'always'], // 语句强制分号结尾
    'react-hooks/exhaustive-deps': 0,
  },
};
