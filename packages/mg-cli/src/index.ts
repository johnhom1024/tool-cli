import { Command } from 'commander';
import { mergeBranch } from './utils/merge';
const program = new Command();

program
  .name('mg-cli')
  .description('一个用来合并当前分支到对应分支的CLI工具')
  .version('1.0.0');

program
  .option('-t --target <string>', '要合并到的目标分支，默认合并到dev', 'dev')
  .action((options) => {
    const { target = '' } = options;
    mergeBranch({ target })
  });


program.parse(process.argv);