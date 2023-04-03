import shell from 'shelljs';

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
    console.log('你当前的功能分支是：', currentBranch);
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
      console.log('执行下拉...');
      await shell.exec('git pull');
    }
  } catch (error) {
    console.log('目标分支没有远程分支');
  }
}

export async function mergeBranch({ target = 'dev', needPush = false }) {
  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
  }

  // 获取当前分支的名称
  const sourceBranch = await getCurrentBranchName();

  // 这里判断当前分支和目标分支的名称是否一致
  if (sourceBranch === target) {
    console.log('当前分支与目标分支是同一个分支');
    return;
  }

  // 切换到目标分支
  console.log(`切换到目标分支：\n ${target}`);

  try {
    await shell.exec(`git checkout ${target}`);
    console.log(`已切到分支：${target}`);
  } catch (error) {
    // 不存在该分支
    console.error(`切换到${target}分支时出现错误，请检查是否存在该分支`);
    return;
  }

  // 如果存在远程分支，则拉取远程分支
  await pullTargetBranch(target);

  console.log(`开始把${sourceBranch}合并到${target}...`);

  try {
    // 合并当前分支到目标分支
    await shell.exec(`git merge ${sourceBranch}`);
  } catch (error) {
    console.log('合并存在冲突，需要手动处理。');
    return;
  }

  // 如果需要推送到远程
  if (needPush) {
    try {
      console.log('合并完毕，准备推送到远程仓库...');
      await shell.exec('git push');
    } catch (error) {
      console.log('推送出现问题');
      return;
    }
  }

  try {
    await shell.exec(`git checkout ${sourceBranch}`);
    console.log('已切回分支：', sourceBranch);
  } catch (error) {
    console.log('切换回功能分支出现问题');
    return;
  }
}
