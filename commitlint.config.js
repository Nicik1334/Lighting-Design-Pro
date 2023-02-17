module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['chore', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'],
    ],
  },
};
/**
 *  rule由key和配置数组组成
 *  如： 'key:[0, 'always', 72]'
 *       数组中第一位为level，可选0,1,2，0为disable，1为warning，2为error，
 *       第二位为是否应用，可选always | never，
 *       第三位该rule的值
 */

//     提交信息规范 (冒号后面有个空格) 例如(test: 增加单元测试)
//     feat: 新功能（feature）
//     fix：修补bug 修改业务
//     docs：文档（documentation）
//     style： 格式（不影响代码运行的变动,空格缩进等）
//     refactor：重构代码（即不是新增功能，也不是修改bug的代码变动）
//     test：增加测试
//     chore：构建过程或辅助工具的变动(新增或者删除依赖包)
//     revert: 回退代码
//     perf: 代码优化性能优化
