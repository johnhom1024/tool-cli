import { packageJson } from 'mrm-core';
import path from 'path';
import _ from 'lodash';

const task = () => {
  const packageName = path.basename(process.cwd());
  // 带有特定顺序的默认值
  const defaultValue = {
    name: packageName,
    version: '1.0.0',
    description: '',
    author: '',
    main: 'index.js',
    files: ['index.js'],
    scripts: {},
    license: 'ISC',
    keywords: [],
    homepage: '',
    repository: '',
    publishConfig: {
      registry: 'https://registry.npmjs.org/',
      access: 'public',
    },
    dependencies: {},
    devDependencies: {},
  };

  const pkg = packageJson();

  // 这里按照defaultPackage的顺序进行排列
  const pkgValueSorted = _.merge(defaultValue, pkg.get());

  // 为了让package.json的key按照pkgSortedObj顺序排列
  // 这里先unset掉key，再重新set
  Object.entries(pkgValueSorted).forEach(([key, value]) => {
    pkg.unset(key);
    pkg.set(key, value);
  });

  pkg.save();
};

task.description = 'update package.json with specific order';

module.exports = task;
