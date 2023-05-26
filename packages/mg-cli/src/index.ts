import { Command } from 'commander';
import { mergeProcess } from './utils/merge';

const pkg = require('../package.json');
const program = new Command();

program
  .name('mg-cli')
  .description('一个用来合并当前分支到对应分支的CLI工具')
  .version(pkg.version, '-v --version')
  .usage('[option]')

program
  .requiredOption('-t, --target <string>', '要合并到的目标分支')
  .action((options) => {
    const { target = '' } = options;
    mergeProcess({ target});
  });

program.parse(process.argv);
