import { json, lines, install } from 'mrm-core';
import _ from 'lodash';
import { logWithSpinner, stopSpinner } from "@johnhom/cli-shared-utils";

const task = async () => {
  // 加入对ts代码的eslint 配置
  const eslintPreset = '@johnhom/eslint-config-ts';
  const legacyConfigFile = '.eslintrc.js';
  const ignores = ['node_modules/'];
  // 需要安装的依赖
  const packages = ['eslint',  eslintPreset];

  // eslintrc
  const eslintrc = json(legacyConfigFile);
  const hasCustomPreset = _.castArray(eslintrc.get('extends', [])).find((x) =>
    x.startsWith(eslintPreset)
  );
  if (!hasCustomPreset) {
    const presets = eslintrc.get('extends');
    if (!presets) {
      eslintrc.set('extends', eslintPreset);
    } else {
      eslintrc.set('extends', [eslintPreset, ..._.castArray(presets)]);
    }
  }

  eslintrc.save();

  // .eslintignore
  lines('.eslintignore').add(ignores).save();

  // 安装依赖 install会自动识别当前的项目的包管理工具
  logWithSpinner('开始安装beauty配置的相关依赖...');
  install(packages, { dev: true });
  stopSpinner();

  return Promise.resolve();
};

task.description = 'Adds ESLint and Prettier to the project';

module.exports = task;
