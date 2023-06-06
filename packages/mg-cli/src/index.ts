import { mergeProcess } from './utils/merge';

const pkg = require('../package.json');

import { cac } from 'cac';

const cli_name = 'amg';

const cli = cac(cli_name);

cli
  .command('[target_branch]', 'merge current branch into target_branch')
  .example('amg master    merge current branch into the branch which named "master"')
  .action((targetBranch: string | undefined) => {
    // 如果没有输入参数，则输出帮助信息
    if (targetBranch === undefined) {
      cli.outputHelp();
    } else {
      mergeProcess({ target: targetBranch });
    }
  });

cli.help();
cli.version(pkg.version);

cli.parse();
