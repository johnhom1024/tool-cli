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
  .option('-p, --push', '合并后是否自动推送到远程')
  .action((options) => {
    const { target = '', push = false } = options;
    mergeProcess({ target, needPush: push });
  });

program.parse(process.argv);
