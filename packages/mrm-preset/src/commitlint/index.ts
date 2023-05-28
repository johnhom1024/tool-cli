/**
 * 安装husky、lint-staged、
 */
import { install, packageJson, file } from 'mrm-core';
import path from 'path';
import prettier from 'prettier';
import { stringify } from 'comment-json';
import _ from 'lodash';

function commitlintTask() {
  // 在工程根目录下新增commitlint.config.js配置文件
  const commitlintConfigFile = 'commitlint.config.js';
  const commitlintPreset = ['@commitlint/config-conventional'];
  const commitlintConfigPath = path.resolve(
    process.cwd(),
    commitlintConfigFile
  );

  let commitlintConfig: Record<string, any> = {};

  // 如果没有commitlint.config.js文件
  if (file(commitlintConfigFile).exists()) {
    commitlintConfig = require(commitlintConfigPath);
  }

  commitlintConfig.extends = _.uniq([
    ..._.castArray(commitlintConfig.extends),
    ...commitlintPreset,
  ]).filter((preset) => preset);

  // 加上module.exports导出
  const commitlintConfigStr =
    'module.exports = ' + stringify(commitlintConfig, null, 2);
  // 格式化
  const result = prettier.format(commitlintConfigStr, { parser: 'babel' });

  // 保存commitlintConfig
  const e = file(commitlintConfigPath);
  e.save(result);
}

function installTask() {
  const packages = [
    'husky',
    'lint-staged',
    '@commitlint/cli',
    '@commitlint/config-conventional',
  ];

  // packageJson中新增lint-staged的配置
  const pkg = packageJson();
  // 在 npm install 之后触发postinstall钩子，执行husky的初始化
  pkg.prependScript('postinstall', 'husky install');

  // 新增一个pre_commit的husky钩子
  const pre_commit =
    "husky add .husky/pre-commit 'npx --no-install lint-staged'";
  pkg.setScript('husky:precommit', pre_commit);

  // 新增一个commit_msg的husky钩子
  const commit_msg =
    'husky add .husky/commit-msg \'npx --no-install commitlint --edit "$1"\'';
  pkg.setScript('husky:commitmsg', commit_msg);

  pkg.set('lint-staged', {
    '*.ts': ['eslint --fix'],
  });

  pkg.save();

  // 安装依赖
  install(packages);
}

const task = () => {
  installTask();
  commitlintTask();
};

task.description = '规范commit的提交和校验';

module.exports = task;
