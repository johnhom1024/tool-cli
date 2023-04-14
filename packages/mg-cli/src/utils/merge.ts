import shell from 'shelljs';
import {
  log,
  info,
  error,
  done,
  logWithSpinner,
  stopSpinner,
} from '@johnhom/cli-shared-utils';
// 命令结果不输出到终端
shell.config.silent = false;
// 设置第一次出错时退出，如果这里不设置，则不会触发reject
shell.set('-e');

async function getCurrentBranchName() {
  try {
    const result = await shell.exec('git symbolic-ref --short -q HEAD', {
      silent: true,
    });
    const { stdout } = result;
    // 这里存在尾换行符
    const currentBranch = stdout.trim();
    info(`当前的分支是：${currentBranch}`);
    return currentBranch;
  } catch (error) {
    throw error;
  }
}

async function pullTargetBranch(targetBranch: string): Promise<void> {
  try {
    const { stdout } = await shell.exec('git remote');
    if (stdout) {
      // 执行pull
      logWithSpinner(`下拉${targetBranch}分支的代码...`);
      await shell.exec('git pull');
      stopSpinner();
      done('下拉完成');
    }
  } catch (error) {
    info('目标分支没有远程分支');
  }
}

export async function mergeBranch({ target = 'dev', needPush = false }) {
  if (!shell.which('git')) {
    error('Sorry, this script requires git');
    shell.exit(1);
  }

  // 获取当前分支的名称
  const sourceBranch = await getCurrentBranchName();

  // 这里判断当前分支和目标分支的名称是否一致
  if (sourceBranch === target) {
    error('当前分支与目标分支是同一个分支');
    return;
  }

  // 下拉当前分支的代码
  try {
    const { stdout } = await shell.exec('git remote');
    if (stdout) {
      // 执行pull
      logWithSpinner(`下拉当前分支的代码...`);
      await shell.exec('git pull');
      stopSpinner();
      done('下拉完成');
    }
  } catch (error) {
    info('当前分支没有远程分支');
  }


  // 切换到目标分支
  info(`准备切换到目标分支：${target}`);

  try {
    await shell.exec(`git checkout ${target}`);
    info(`已切到分支：${target}`);
  } catch (errorInstance) {
    // 不存在该分支
    error(`切换到${target}分支时出现错误，请检查是否存在该分支`);
    return;
  }

  // 如果存在远程分支，则拉取远程分支
  await pullTargetBranch(target);

  try {
    logWithSpinner(`开始把${sourceBranch}合并到${target}...`);
    // 合并当前分支到目标分支
    await shell.exec(`git merge ${sourceBranch}`);
    stopSpinner();
    done('合并分支成功');
  } catch (errorInstance) {
    error('合并存在冲突，需要手动处理。');
    return;
  }

  // 如果需要推送到远程
  if (needPush) {
    try {
      logWithSpinner('合并完毕，准备推送到远程仓库...');
      await shell.exec('git push');
      stopSpinner();
      done('推送到远程分支成功');
    } catch (errorInstance) {
      error('推送出现问题');
      return;
    }
  }

  try {
    info('准备切换回分支：dev');
    await shell.exec(`git checkout ${sourceBranch}`);
    done('已切回分支');
  } catch (errorInstance) {
    error('切换回功能分支出现问题');
    return;
  }
}
