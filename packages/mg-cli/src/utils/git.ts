import shell from 'shelljs';
import {
  log,
  info,
  error,
  done,
  logWithSpinner,
  stopSpinner,
} from '@johnhom/cli-shared-utils';
// 命令运行结果输出到终端
shell.config.silent = false;
// 设置shell执行命令报错时不抛出异常
shell.config.fatal = false;

function handleError(err: string) {
  error(err);
  // 退出当前进程
  shell.exit(-1);
}

export function hasGit() {
  if (!shell.which('git')) {
    handleError('Sorry, this script requires git');
  }
}

export function getCurrentBranchName(): string {
  const { stdout, code, stderr } = shell.exec(
    'git symbolic-ref --short -q HEAD',
    {
      silent: true,
    }
  );
  if (code !== 0) {
    handleError(stderr);
  }
  // 这里存在尾换行符
  const currentBranch = stdout.trim();
  info(`当前的分支是：${currentBranch}`);
  return currentBranch;
}

export function pullBranch(targetBranch: string) {
  const { stdout, code, stderr } = shell.exec('git remote', {
    silent: true,
  });
  if (code !== 0) {
    handleError(stderr);
    return;
  }
  if (!stdout) {
    return;
  }
  // 执行pull
  logWithSpinner(`下拉${targetBranch}分支的代码...`);
  let {
    stdout: stdout1,
    code: code1,
    stderr: stderr1,
  } = shell.exec('git pull', {
    silent: true,
  });
  // 可能这个分支还没有推送到远程，这里也会导致code !== 0
  stopSpinner();
  if (code1 !== 0) {
    info('下拉分支遇到问题');
    return;
  }
  done('下拉完成');
}

export function checkoutBranch(branch: string) {
  const { code, stderr } = shell.exec(`git checkout ${branch}`);
  if (code !== 0) {
    handleError(stderr);
    return;
  }

  info(`已切到分支：${branch}`);
}

export function mergeBranch(sourceBranch: string, targetBranch: string) {
  logWithSpinner(`开始把${sourceBranch}合并到${targetBranch}...`);

  const { code } = shell.exec(`git merge ${sourceBranch}`);
  if (code !== 0) {
    error('合并存在问题，请手动处理');
    shell.exit(-1);
  }

  stopSpinner();
  done('合并分支成功');
}

// 推送当前分支到远程仓库
export function pushToRemote() {
  logWithSpinner('合并完毕，准备推送到远程仓库...');
  const { code } = shell.exec('git push');
  if (code !== 0) {
    error('推送出现问题');
    shell.exit(-1);
  }

  done('推送到远程分支成功');
}
