import { Command } from 'commander';
import { mergeProcess } from './utils/merge';

const pkg = require('../package.json');
const program = new Command();

program
  .name('amg')
  .description('一个自动合并分支的CLI工具')
  .version(pkg.version, '-v --version')
  .usage('[option]')

program
  .requiredOption('-t, --target <string>', '要合并到的目标分支')
  .action((options) => {
    const { target = '' } = options;
    mergeProcess({ target});
  });

program.parse(process.argv);
