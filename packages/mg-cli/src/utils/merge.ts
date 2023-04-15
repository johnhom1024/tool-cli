import {
  log,
  info,
  error,
  done,
  logWithSpinner,
  stopSpinner,
} from '@johnhom/cli-shared-utils';

import {
  getCurrentBranchName,
  hasGit,
  pullBranch,
  mergeBranch,
  checkoutBranch,
  pushToRemote,
} from './git';

export function mergeProcess({ target = 'dev', needPush = false }) {
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
  // 如果需要推送到远程
  if (needPush) {
    pushToRemote();
  }
}
