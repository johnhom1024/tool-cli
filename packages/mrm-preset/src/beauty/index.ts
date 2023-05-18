import { json, lines, install, file } from 'mrm-core';
import path from 'path';
import _ from 'lodash';
import prettier from 'prettier';
import { stringify } from 'comment-json';

function prettierTask() {
  const defaultPrettierOptions = {
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: true,
    quoteProps: 'as-needed',
    jsxSingleQuote: false,
    trailingComma: 'es5',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    arrowParens: 'always',
    endOfLine: 'lf',
  };

  // .prettierrc
  const prettierrc = json('.prettierrc');
  prettierrc.merge(defaultPrettierOptions).save();
}

function eslintTask() {
  const eslintPreset = ['@johnhom/eslint-config-ts', 'prettier'];
  const legacyConfigFile = '.eslintrc.js';
  const eslintConfigPath = path.resolve(process.cwd(), legacyConfigFile);
  const ignores = ['node_modules/'];
  const packages = ['eslint', 'eslint-config-prettier', ...eslintPreset];

  let eslintConfig: Record<string, any> = {};
  if (file('.eslintrc.js').exists()) {
    eslintConfig = require(eslintConfigPath);
  }

  // 与原有的extends中的值相组合
  eslintConfig.extends = _.uniq([
    ..._.castArray(eslintConfig.extends),
    ...eslintPreset,
  ]).filter((preset) => preset);
  
  const configStr = stringify(eslintConfig, null, 2);
  // 加上module.exports导出
  const eslintConfigStr = 'module.exports = ' + configStr;

  // 对.eslintrc.js的内容进行格式化
  const result = prettier.format(eslintConfigStr, { parser: 'babel' });
  // 保存 .eslintrc.js文件
  const e = file(eslintConfigPath);
  e.save(result);

  // .eslintignore
  lines('.eslintignore').add(ignores).save();

  // 安装依赖
  install(packages);
}

const task = () => {
  // 先跑prettier的task
  prettierTask();
  // 再跑eslint的task
  eslintTask();
};

task.description = 'Adds ESLint and Prettier to the project';

module.exports = task;
