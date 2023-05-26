import * as readline from 'node:readline';
import { stdout, stdin } from 'node:process';

import { info } from '@johnhom/cli-shared-utils';

import {
  getCurrentBranchName,
  hasGit,
  pullBranch,
  mergeBranch,
  checkoutBranch,
  pushToRemote,
} from './git';

export async function mergeProcess({ target = 'dev' }) {

  hasGit();
  // 获取当前分支名称
  const sourceBranch = getCurrentBranchName();
  // 下拉当前分支的代码
  pullBranch(sourceBranch);
  info(`准备切换到目标分支：${target}`);
  // 切换到目标分支
  checkoutBranch(target);
  // 如果存在远程分支，则拉取远程分支
  pullBranch(target);
  // 合并代码
  mergeBranch(sourceBranch, target);
  // 询问是否需要推送到远程
  const wantPushRemote = await question('是否要上传到远程分支？(y/n)\n');

  if (wantPushRemote === 'y') {
    pushToRemote();
  }

  // 询问是否要返回原功能分支
  const wantBackToSourceBranch = await question('是否要返回原来的分支？(y/n)\n');

  if (wantBackToSourceBranch === 'y') {
    checkoutBranch(sourceBranch);
  }
}


// 将 question转换成promise
async function question(text: string) {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  return new Promise((resolve) => {
    rl.question(text, (answer) => {
      resolve(answer);
      rl.close();
    })
  })
}